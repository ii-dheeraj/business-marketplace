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
        message: `Your order #${order.orderNumber} has been placed and is being processed.`,
        data: {
          orderId: order.id,
          orderNumber: order.orderNumber,
          totalAmount: order.totalAmount,
          estimatedDelivery: "30-45 minutes"
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
        sellerOrders: sellerOrders.length
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

  try {
    if (orderId) {
      const { data: order, error } = await supabase
        .from('orders')
        .select('*, order_items(*), seller_orders(*), payments(*)')
        .eq('id', Number(orderId))
        .single()
      if (error || !order) {
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
          .select('id, orderNumber, orderStatus, customerName, customerPhone, totalAmount, paymentStatus, paymentMethod, createdAt, updatedAt, order_items(id, productName, quantity, unitPrice, totalPrice, productImage)')
          .eq('customerId', Number(customerId))
          .order('createdAt', { ascending: false })
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
    // For admin/seller dashboard - optimized with pagination
    const { data: orders, error } = await supabase
      .from('orders')
      .select('id, orderNumber, orderStatus, customerName, customerPhone, totalAmount, paymentStatus, paymentMethod, createdAt, updatedAt, order_items(id, productName, quantity, unitPrice, totalPrice)')
      .order('createdAt', { ascending: false })
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
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
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
    const { data: order, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', Number(orderId))
      .select('*, order_items(*), seller_orders(*), payments(*)')
      .single()
    if (error || !order) {
      console.error('[PATCH ERROR] Failed to update order:', error)
      return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
    }
    // If paymentMethod and paymentDetails are provided, create a payment record
    if (paymentMethod && paymentDetails) {
      await createPayment({
        orderId: order.id,
        userId: order.customerId,
        amount: order.totalAmount,
        paymentMethod: paymentMethod.toUpperCase(),
        transactionId: paymentDetails.utrNumber || paymentDetails.cardLast4 || paymentDetails.walletUtr || `TXN-${Date.now()}`,
        gateway: paymentMethod.toUpperCase() !== 'CASH_ON_DELIVERY' ? 'PAYMENT_GATEWAY' : undefined
      })
      // Update order payment status
      await supabase
        .from('orders')
        .update({ paymentStatus: paymentMethod.toUpperCase() === 'CASH_ON_DELIVERY' ? 'PENDING' : 'COMPLETED' })
        .eq('id', order.id)
    }
    // Create tracking entry for status change
    if (orderStatus) {
      await supabase.from('order_tracking').insert({
        orderId: order.id,
        status: orderStatus,
        description: getStatusDescription(orderStatus),
        location: getStatusLocation(orderStatus)
      })
    }
    // Send real-time notifications for order status changes
    if (orderStatus) {
      try {
        // Notify customer about order status change
        // (Notification logic remains unchanged)
      } catch (error) {
        console.error("Error sending real-time notifications:", error)
        // Don't fail the update if notifications fail
      }
    }
    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
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
