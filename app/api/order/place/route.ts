import { type NextRequest, NextResponse } from "next/server"
import { supabase, createOrder, createSellerOrder, createPayment } from "@/lib/database"
import { realtimeManager } from "@/lib/realtime"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      customerId, 
      items, 
      customerDetails, 
      paymentMethod, 
      totalAmount, 
      subtotal, 
      deliveryFee,
      taxAmount = 0,
      deliveryInstructions 
    } = body

    if (!customerId || !items || !customerDetails || !paymentMethod || !totalAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Group items by seller
    const itemsBySeller = new Map()
    for (const item of items) {
      try {
        console.debug('[DEBUG] Looking up product', item.productId)
        const { data: product, error } = await supabase
          .from('products')
          .select('*, sellerId')
          .eq('id', Number(item.productId))
          .single()
        console.debug('[DEBUG] Supabase product lookup result:', { product, error })
        if (error || !product) {
          return NextResponse.json({ error: `Product ${item.productId} not found` }, { status: 404 })
        }
        const sellerId = product.sellerId
        if (!itemsBySeller.has(sellerId)) {
          itemsBySeller.set(sellerId, [])
        }
        itemsBySeller.get(sellerId).push({
          productId: product.id,
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.price * item.quantity,
          productName: product.name,
          productImage: product.image,
          productCategory: product.category
        })
      } catch (err) {
        console.error('[ERROR] Product lookup failed:', JSON.stringify(err, null, 2))
        return NextResponse.json({ error: 'Product lookup failed', details: String(err) }, { status: 500 })
      }
    }

    // Generate delivery OTP
    const deliveryOTP = Math.floor(100000 + Math.random() * 900000).toString()
    
    let order
    try {
      order = await createOrder({
        customerId: Number(customerId),
        customerName: customerDetails.name,
        customerPhone: customerDetails.phone,
        customerAddress: customerDetails.address,
        customerCity: customerDetails.city,
        customerArea: customerDetails.area,
        customerLocality: customerDetails.locality,
        subtotal,
        deliveryFee,
        taxAmount,
        totalAmount,
        paymentMethod: paymentMethod.toUpperCase(),
        deliveryInstructions,
        deliveryOTP, // Add OTP to order creation
        items: items.map((item: any) => ({
          productId: Number(item.productId),
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.price * item.quantity,
          productName: item.name,
          productImage: item.image,
          productCategory: item.category
        }))
      })
    } catch (err) {
      console.error('[ERROR] Order creation failed:', JSON.stringify(err, null, 2))
      return NextResponse.json({ error: 'Order creation failed', details: String(err) }, { status: 500 })
    }

    // Create seller orders for each seller
    const sellerOrders = []
    const involvedSellerIds = []
    for (const [sellerId, sellerItems] of itemsBySeller) {
      try {
        const sellerSubtotal = sellerItems.reduce((sum: number, item: any) => sum + item.totalPrice, 0)
        const commission = sellerSubtotal * 0.05 // 5% commission
        const netAmount = sellerSubtotal - commission
        const sellerOrder = await createSellerOrder({
          orderId: order.id,
          sellerId,
          items: sellerItems,
          subtotal: sellerSubtotal,
          commission,
          netAmount
        })
        sellerOrders.push(sellerOrder)
        involvedSellerIds.push(sellerId)
      } catch (err) {
        console.error('[ERROR] Seller order creation failed:', JSON.stringify(err, null, 2))
        return NextResponse.json({ error: 'Seller order creation failed', details: String(err) }, { status: 500 })
      }
    }

    // Only create payment record if paymentMethod is not PENDING
    if (paymentMethod.toUpperCase() !== 'PENDING') {
      try {
        const paymentStatus = paymentMethod.toUpperCase() === 'CASH_ON_DELIVERY' ? 'PENDING' : 'COMPLETED'
        await createPayment({
          orderId: order.id,
          userId: Number(customerId),
          amount: totalAmount,
          paymentMethod: paymentMethod.toUpperCase(),
          transactionId: paymentMethod.toUpperCase() !== 'CASH_ON_DELIVERY' ? `TXN-${Date.now()}` : undefined,
          gateway: paymentMethod.toUpperCase() !== 'CASH_ON_DELIVERY' ? 'PAYMENT_GATEWAY' : undefined
        })
        // Update order payment status
        await supabase
          .from('orders')
          .update({ paymentStatus: paymentStatus })
          .eq('id', order.id)
      } catch (err) {
        console.error('[ERROR] Payment creation failed:', JSON.stringify(err, null, 2))
        return NextResponse.json({ error: 'Payment creation failed', details: String(err) }, { status: 500 })
      }
    }

    // Create initial tracking entry
    try {
      await supabase.from('order_tracking').insert({
        orderId: order.id,
        status: 'ORDER_PLACED',
        description: 'Order has been placed successfully and is being processed.',
        location: 'Order Processing Center'
      })
    } catch (err) {
      console.error('[ERROR] Order tracking creation failed:', JSON.stringify(err, null, 2))
      return NextResponse.json({ error: 'Order tracking creation failed', details: String(err) }, { status: 500 })
    }



    // Send real-time notifications
    try {
      // Notify customer about order placement
      await realtimeManager.sendNotification(customerId.toString(), {
        type: 'order_update',
        title: 'Order Placed Successfully! 🎉',
        message: `Your order #${order.orderNumber} has been placed and is being processed. Your delivery OTP is ${deliveryOTP}.`,
        data: {
          orderId: order.id,
          orderNumber: order.orderNumber,
          totalAmount: order.totalAmount,
          estimatedDelivery: "30-45 minutes",
          deliveryOTP: deliveryOTP
        },
        timestamp: new Date(),
        userId: customerId.toString()
      })
      // Notify all sellers involved
      for (const [sellerId, sellerItems] of itemsBySeller) {
        const sellerSubtotal = sellerItems.reduce((sum: number, item: any) => sum + item.totalPrice, 0)
        await realtimeManager.sendNotification(sellerId.toString(), {
          type: 'order_update',
          title: 'New Order Received! 📦',
          message: `You have received a new order #${order.orderNumber} worth ₹${sellerSubtotal.toFixed(2)}`,
          data: {
            orderId: order.id,
            orderNumber: order.orderNumber,
            items: sellerItems,
            subtotal: sellerSubtotal,
            customerName: customerDetails.name
          },
          timestamp: new Date(),
          userId: sellerId.toString()
        })
      }
    } catch (err) {
      console.error('[ERROR] Real-time notification failed:', JSON.stringify(err, null, 2))
      // Don't fail the order if notifications fail
    }

    // Automatically assign order to available delivery agent
    try {
      console.log('[ORDER PLACE] Attempting to assign order to delivery agent:', order.id)
      const assignResponse = await fetch(`${request.nextUrl.origin}/api/delivery/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id })
      })

      if (assignResponse.ok) {
        const assignData = await assignResponse.json()
        console.log('[ORDER PLACE] Order assigned to delivery agent:', assignData)
        
        // Notify the assigned delivery agent
        if (assignData.deliveryAgent) {
          try {
            await realtimeManager.sendNotification(assignData.deliveryAgent.id.toString(), {
              type: 'order_update',
              title: 'New Order Assigned! 🚚',
              message: `You have been assigned order #${order.orderNumber} worth ₹${order.totalAmount}`,
              data: {
                orderId: order.id,
                orderNumber: order.orderNumber,
                totalAmount: order.totalAmount,
                customerName: customerDetails.name,
                customerAddress: customerDetails.address
              },
              timestamp: new Date(),
              userId: assignData.deliveryAgent.id.toString()
            })
          } catch (notifyErr) {
            console.error('[ORDER PLACE] Failed to notify delivery agent:', notifyErr)
          }
        }
      } else {
        console.log('[ORDER PLACE] No delivery agent available for assignment')
      }
    } catch (assignErr) {
      console.error('[ORDER PLACE] Failed to assign order to delivery agent:', assignErr)
      // Don't fail the order if assignment fails
    }

    // Send real-time notification to all involved sellers
    for (const sellerId of involvedSellerIds) {
      try {
        await realtimeManager.sendNotification(String(sellerId), {
          type: 'notification' as any,
          title: 'Order Placed',
          message: `A new order (ID: ${order.id}) was placed including your products.`,
          data: { orderId: order.id },
          timestamp: new Date(),
          userId: String(sellerId)
        })
      } catch (notifyErr) {
        console.error("[API] Failed to send real-time order notification to seller:", sellerId, JSON.stringify(notifyErr, null, 2))
      }
    }
    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        totalAmount: order.totalAmount,
        estimatedDelivery: "30-45 minutes",
        sellerOrders: sellerOrders.length,
        deliveryOTP: deliveryOTP // Include OTP in response for customer
      },
    })
  } catch (error) {
    // Enhanced error logging
    let errorMsg = '[ERROR] Unexpected error in order placement:'
    try {
      const body = await request.json()
      errorMsg += '\nRequest body: ' + JSON.stringify(body)
    } catch {}
    errorMsg += '\nError: ' + (typeof error === 'object' ? JSON.stringify(error, null, 2) : String(error))
    console.error(errorMsg)
    return NextResponse.json({ error: "Internal server error", details: errorMsg }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const customerId = searchParams.get("customerId")
  const orderId = searchParams.get("orderId")
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "10")
  const skip = (page - 1) * limit
  const deliveryAgentId = searchParams.get("deliveryAgentId")
  const status = searchParams.get("status")

  console.log('[ORDER PLACE API] GET request params:', { 
    customerId, orderId, page, limit, deliveryAgentId, status 
  })

  try {
    if (orderId) {
      const { data: order, error } = await supabase
        .from('orders')
        .select('*, order_items(*), seller_orders(*), payments(*)')
        .eq('id', Number(orderId))
        .single()
      if (error || !order) {
        console.error('[ORDER PLACE API] Order not found:', orderId, error)
        return NextResponse.json({ error: "Order not found" }, { status: 404 })
      }
      // Hide 'PENDING' payment method from user-facing response
      const userOrder = {
        ...order,
        paymentMethod: order.paymentMethod === 'PENDING' ? '' : order.paymentMethod
      }
      return NextResponse.json({ order: userOrder })
    }
    if (customerId) {
      let orders, error
      try {
        const result = await supabase
          .from('orders')
          .select(`
            id, 
            orderNumber, 
            orderStatus, 
            customerName, 
            customerPhone, 
            customerAddress,
            totalAmount, 
            paymentStatus, 
            paymentMethod, 
            created_at, 
            updated_at, 
            parcel_otp,
            estimatedDeliveryTime,
            actualDeliveryTime,
            deliveryInstructions,
            order_items(id, productName, quantity, totalPrice),
            seller_orders(id, status),
            deliveryAgent:delivery_agents(id, name, phone, vehicleNumber)
          `)
          .eq('customerId', Number(customerId))
          .order('created_at', { ascending: false })
          .range(skip, skip + limit - 1)
        orders = result.data
        error = result.error
      } catch (err) {
        console.error('[GET ERROR] Exception during orders fetch:', err)
        return NextResponse.json({ error: 'Internal server error', details: String(err) }, { status: 500 })
      }
      if (error) {
        console.error('[GET ERROR] Supabase error:', error)
        return NextResponse.json({ error: "Failed to fetch orders", details: error }, { status: 500 })
      }
      console.log('[DEBUG] Orders fetched for customer:', orders)
      const { count } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('customerId', Number(customerId))
      return NextResponse.json({ 
        orders,
        pagination: {
          page,
          limit,
          total: count,
          totalPages: Math.ceil((count || 0) / limit)
        }
      })
    }
    if (deliveryAgentId || status) {
      let query = supabase
        .from('orders')
        .select('id, orderNumber, orderStatus, customerName, customerPhone, totalAmount, paymentStatus, paymentMethod, deliveryAgentId, created_at, updated_at')
      
      // Apply filters
      if (deliveryAgentId) {
        query = query.eq('deliveryAgentId', Number(deliveryAgentId))
      }
      if (status) {
        query = query.eq('orderStatus', status)
      }
      
      // Apply pagination and ordering
      query = query.order('created_at', { ascending: false }).range(skip, skip + limit - 1)
      
      const { data: orders, error } = await query
      if (error) {
        console.error('[GET ERROR] Delivery agent orders fetch error:', error)
        return NextResponse.json({ error: "Failed to fetch orders", details: error }, { status: 500 })
      }
      
      // Get total count for pagination
      let countQuery = supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
      
      if (deliveryAgentId) {
        countQuery = countQuery.eq('deliveryAgentId', Number(deliveryAgentId))
      }
      if (status) {
        countQuery = countQuery.eq('orderStatus', status)
      }
      
      const { count } = await countQuery
      
      return NextResponse.json({
        orders: orders || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit)
        }
      })
    }
    // For admin/seller dashboard - optimized with pagination
    const { data: orders, error } = await supabase
      .from('orders')
      .select('id, orderNumber, orderStatus, customerName, customerPhone, totalAmount, paymentStatus, paymentMethod, created_at, updated_at, order_items(id, productName, quantity, unitPrice, totalPrice)')
      .order('created_at', { ascending: false })
      .range(skip, skip + limit - 1)
    if (error) {
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
    }
    const { count } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
    return NextResponse.json({ 
      orders,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })
  } catch (error) {
    console.error("[ORDER PLACE API] Error fetching orders:", error)
    return NextResponse.json({ 
      error: "Internal server error", 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get("orderId")
  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 })
  }
  try {
    const body = await request.json()
    console.log('[PATCH DEBUG] Request body:', JSON.stringify(body, null, 2))
    const { 
      orderStatus, 
      paymentStatus, 
      paymentMethod, 
      paymentDetails, 
      deliveryAgentId,
      estimatedDeliveryTime,
      actualDeliveryTime
    } = body
    const updateData: any = {
      ...(orderStatus && { orderStatus }),
      ...(paymentStatus && { paymentStatus }),
      ...(paymentMethod && { paymentMethod }),
      ...(deliveryAgentId && { deliveryAgentId: Number(deliveryAgentId) }),
      ...(estimatedDeliveryTime && { estimatedDeliveryTime: new Date(estimatedDeliveryTime) }),
      ...(actualDeliveryTime && { actualDeliveryTime: new Date(actualDeliveryTime) })
    }
    console.log('[PATCH DEBUG] Update data:', JSON.stringify(updateData, null, 2))
    const { data: order, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', Number(orderId))
      .select('*, order_items(*), seller_orders(*), payments(*)')
      .single()
    if (error || !order) {
      console.error('[PATCH ERROR] Failed to update order:', error)
      return NextResponse.json({ error: "Failed to update order", details: error }, { status: 500 })
    }
    console.log('[PATCH DEBUG] Order updated successfully:', order.id)
    // If paymentMethod and paymentDetails are provided, create a payment record
    if (paymentMethod && paymentDetails) {
      try {
        await createPayment({
          orderId: order.id,
          userId: order.customerId,
          amount: order.totalAmount,
          paymentMethod: paymentMethod.toUpperCase(),
          transactionId: paymentDetails.utrNumber || paymentDetails.cardLast4 || paymentDetails.walletUtr || `TXN-${Date.now()}`,
          gateway: paymentMethod.toUpperCase() !== 'CASH_ON_DELIVERY' ? 'PAYMENT_GATEWAY' : undefined
        })
        console.log('[PATCH DEBUG] Payment record created successfully')
        // Update order payment status
        await supabase
          .from('orders')
          .update({ paymentStatus: paymentMethod.toUpperCase() === 'CASH_ON_DELIVERY' ? 'PENDING' : 'COMPLETED' })
          .eq('id', order.id)
      } catch (paymentError) {
        console.error('[PATCH ERROR] Payment creation failed:', paymentError)
        return NextResponse.json({ error: "Payment creation failed", details: paymentError }, { status: 500 })
      }
    }
    // Create tracking entry for status change
    if (orderStatus) {
      try {
        await supabase.from('order_tracking').insert({
          orderId: order.id,
          status: orderStatus,
          description: getStatusDescription(orderStatus),
          location: getStatusLocation(orderStatus)
        })
        console.log('[PATCH DEBUG] Tracking entry created successfully')
      } catch (trackingError) {
        console.error('[PATCH ERROR] Tracking entry creation failed:', trackingError)
        return NextResponse.json({ error: "Tracking entry creation failed", details: trackingError }, { status: 500 })
      }
    }
    // Send real-time notifications for order status changes
    if (orderStatus) {
      try {
        // Notify customer about order status change
        await realtimeManager.sendOrderStatusChange(
          order.customerId.toString(),
          order.id.toString(),
          order.orderNumber,
          orderStatus
        )
        
        // Special notification for OUT_FOR_DELIVERY status
        if (orderStatus === 'OUT_FOR_DELIVERY') {
          await realtimeManager.sendDeliveryUpdate(
            order.customerId.toString(),
            order.id.toString(),
            order.orderNumber,
            'OUT_FOR_DELIVERY',
            'Your order is out for delivery! The delivery agent is on the way to your location.'
          )
        }
      } catch (error) {
        console.error("Error sending real-time notifications:", error)
        // Don't fail the update if notifications fail
      }
    }
    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Internal server error", details: error }, { status: 500 })
  }
}

// Helper functions for status descriptions and locations
function getStatusDescription(status: string): string {
  const descriptions: { [key: string]: string } = {
    'ORDER_PLACED': 'Order has been placed successfully and is being processed.',
    'ORDER_CONFIRMED': 'Order has been confirmed by the seller and is being prepared.',
    'PREPARING_ORDER': 'Your order is being prepared by the seller.',
    'READY_FOR_PICKUP': 'Order is ready for pickup by delivery agent.',
    'PICKED_UP': 'Order has been picked up by delivery agent.',
    'IN_TRANSIT': 'Order is in transit to your location.',
    'OUT_FOR_DELIVERY': 'Order is out for delivery and will arrive soon.',
    'DELIVERED': 'Order has been successfully delivered to your address.',
    'CANCELLED': 'Order has been cancelled.'
  }
  return descriptions[status] || 'Order status has been updated.'
}

function getStatusLocation(status: string): string {
  const locations: { [key: string]: string } = {
    'ORDER_PLACED': 'Order Processing Center',
    'ORDER_CONFIRMED': 'Seller Location',
    'PREPARING_ORDER': 'Seller Kitchen/Store',
    'READY_FOR_PICKUP': 'Seller Location',
    'PICKED_UP': 'In Transit',
    'IN_TRANSIT': 'Delivery Route',
    'OUT_FOR_DELIVERY': 'Your Area',
    'DELIVERED': 'Your Address',
    'CANCELLED': 'Order Processing Center'
  }
  return locations[status] || 'Processing Center'
}
