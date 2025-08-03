import { type NextRequest, NextResponse } from "next/server"
import { supabase, createOrder, createSellerOrder, createPayment } from "@/lib/database"
import { realtimeManager } from "@/lib/realtime"

export async function POST(request: NextRequest) {
  console.log("API endpoint called")
  try {
    const body = await request.json()
    console.log("API received body:", body)
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
      console.log("Validation failed:", { customerId, items: items?.length, customerDetails, paymentMethod, totalAmount })
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Group items by seller
    const itemsBySeller = new Map()
    console.log("Processing items:", items)
    for (const item of items) {
      try {
        console.debug('[DEBUG] Looking up product', item.productId)
        const { data: product, error } = await supabase
          .from('products')
          .select('*, seller_id')
          .eq('id', item.productId)
          .single()
        console.debug('[DEBUG] Supabase product lookup result:', { product, error })
        if (error || !product) {
          return NextResponse.json({ error: `Product ${item.productId} not found` }, { status: 404 })
        }
        const sellerId = product.seller_id
        if (!itemsBySeller.has(sellerId)) {
          itemsBySeller.set(sellerId, [])
        }
        itemsBySeller.get(sellerId).push({
          productId: product.id,
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.price * item.quantity,
          productName: product.title,
          productImage: item.image,
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
        customerId: customerId,
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
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.price * item.quantity,
          productName: item.name,
          productImage: item.image,
          productCategory: item.category || "general"
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
        const commission = sellerSubtotal * 0.1 // 10% commission
        const netAmount = sellerSubtotal - commission

        const sellerOrder = await createSellerOrder({
          orderId: order.id,
          sellerId: sellerId,
          items: sellerItems,
          subtotal: sellerSubtotal,
          commission,
          netAmount
        })
        sellerOrders.push(sellerOrder)
        involvedSellerIds.push(sellerId)
      } catch (err) {
        console.error('[ERROR] Seller order creation failed for seller:', sellerId, err)
        return NextResponse.json({ error: 'Seller order creation failed', details: String(err) }, { status: 500 })
      }
    }

    // Create payment record
    try {
      await createPayment({
        orderId: order.id,
        userId: customerId,
        amount: totalAmount,
        paymentMethod: paymentMethod.toUpperCase()
      })
    } catch (err) {
      console.error('[ERROR] Payment creation failed:', err)
      // Don't fail the order if payment record creation fails
    }

    // Send real-time notifications
    try {
      // Notify customer
      await realtimeManager.sendNotification(customerId, {
        type: 'order_update',
        title: 'Order Placed Successfully! 🎉',
        message: `Your order #${order.order_number} has been placed successfully.`,
        data: {
          orderId: order.id,
          orderNumber: order.order_number,
          orderStatus: order.order_status,
          paymentStatus: order.payment_status,
          paymentMethod: order.payment_method,
          totalAmount: order.total_amount,
          estimatedDelivery: "30-45 minutes",
          sellerOrders: sellerOrders.length,
          deliveryOTP: deliveryOTP // Include OTP in response for customer
        },
        timestamp: new Date(),
        userId: customerId
      })

      // Notify each seller
      for (const sellerId of involvedSellerIds) {
        await realtimeManager.sendNotification(sellerId, {
          type: 'order_update',
          title: 'New Order Received! 📦',
          message: `You have received a new order #${order.order_number}.`,
          data: {
            orderId: order.id,
            orderNumber: order.order_number,
            customerName: customerDetails.name,
            customerPhone: customerDetails.phone,
            totalAmount: totalAmount
          },
          timestamp: new Date(),
          userId: sellerId
        })
      }
    } catch (notifyErr) {
      console.error('[ERROR] Failed to send real-time notifications:', notifyErr)
      // Don't fail the order if notifications fail
    }

    // Try to assign to delivery agent (optional)
    try {
      const { data: availableAgents } = await supabase
        .from('delivery_agents')
        .select('id')
        .eq('is_available', true)
        .limit(1)

      if (availableAgents && availableAgents.length > 0) {
        await supabase
          .from('orders')
          .update({ delivery_agent_id: availableAgents[0].id })
          .eq('id', order.id)
      }
    } catch (assignErr) {
      console.error('[ORDER PLACE] Failed to assign order to delivery agent:', assignErr)
      // Don't fail the order if assignment fails
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.order_number,
        orderStatus: order.order_status,
        paymentStatus: order.payment_status,
        paymentMethod: order.payment_method,
        totalAmount: order.total_amount,
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
        .eq('id', orderId)
        .single()
      if (error || !order) {
        console.error('[ORDER PLACE API] Order not found:', orderId, error)
        return NextResponse.json({ error: "Order not found" }, { status: 404 })
      }
      // Hide 'PENDING' payment method from user-facing response
      const userOrder = {
        ...order,
        paymentMethod: order.payment_method === 'PENDING' ? '' : order.payment_method
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
            order_number, 
            order_status, 
            customer_name, 
            customer_phone, 
            customer_address,
            total_amount, 
            payment_status, 
            payment_method, 
            created_at, 
            updated_at, 
            parcel_otp,
            estimated_delivery_time,
            actual_delivery_time,
            delivery_instructions,
            order_items(id, product_name, quantity, total_price),
            seller_orders(id, status),
            delivery_agent_id
          `)
          .eq('customer_id', customerId)
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
        .eq('customer_id', customerId)
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
    if (deliveryAgentId) {
      let query = supabase
        .from('orders')
        .select('id, order_number, order_status, customer_name, customer_phone, total_amount, payment_status, payment_method, created_at, updated_at')
        .eq('delivery_agent_id', deliveryAgentId)
        .order('created_at', { ascending: false })
        .range(skip, skip + limit - 1)
      
      if (status) {
        query = query.eq('order_status', status)
      }
      
      const { data: orders, error, count } = await query
      
      if (error) {
        console.error('[GET ERROR] Supabase error for delivery agent:', error)
        return NextResponse.json({ error: "Failed to fetch orders", details: error }, { status: 500 })
      }
      
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
    
    // Get all orders (admin view)
    let query = supabase
      .from('orders')
      .select('id, order_number, order_status, customer_name, customer_phone, total_amount, payment_status, payment_method, created_at, updated_at')
      .order('created_at', { ascending: false })
      .range(skip, skip + limit - 1)
    
    if (status) {
      query = query.eq('order_status', status)
    }
    
    const { data: orders, error, count } = await query
    
    if (error) {
      console.error('[GET ERROR] Supabase error for all orders:', error)
      return NextResponse.json({ error: "Failed to fetch orders", details: error }, { status: 500 })
    }
    
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
    console.error('[GET ERROR] Unexpected error:', error)
    return NextResponse.json({ error: "Internal server error", details: String(error) }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, status, deliveryAgentId } = body

    if (!orderId || !status) {
      return NextResponse.json({ error: "Order ID and status are required" }, { status: 400 })
    }

    console.log('[ORDER UPDATE] Updating order:', orderId, { status, deliveryAgentId })

    const updateData: any = { order_status: status }
    if (deliveryAgentId) {
      updateData.delivery_agent_id = deliveryAgentId
    }

    const { data: order, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', orderId)
      .select()
      .single()

    if (error) {
      console.error('[ORDER UPDATE] Error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Send real-time notification
    try {
      await realtimeManager.sendNotification(order.customer_id, {
        type: 'order_status_change',
        title: 'Order Status Updated',
        message: `Your order #${order.order_number} status has been updated to ${getStatusDescription(status)}.`,
        data: {
          orderId: order.id,
          orderNumber: order.order_number,
          status,
          statusDescription: getStatusDescription(status),
          location: getStatusLocation(status)
        },
        timestamp: new Date(),
        userId: order.customer_id
      })
    } catch (notifyErr) {
      console.error('[ORDER UPDATE] Failed to send notification:', notifyErr)
      // Don't fail the update if notification fails
    }

    return NextResponse.json({ 
      success: true, 
      order,
      message: "Order updated successfully" 
    })

  } catch (error) {
    console.error('[ORDER UPDATE] Error:', error)
    return NextResponse.json({ 
      error: "Failed to update order", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 })
  }
}

function getStatusDescription(status: string): string {
  const descriptions: Record<string, string> = {
    'PENDING': 'Order placed and waiting for confirmation',
    'CONFIRMED': 'Order confirmed by seller',
    'PREPARING': 'Order is being prepared',
    'READY_FOR_DELIVERY': 'Order is ready for pickup',
    'READY_FOR_PICKUP': 'Order is ready for pickup',
    'PICKED_UP': 'Order has been picked up by delivery agent',
    'IN_TRANSIT': 'Order is on its way',
    'OUT_FOR_DELIVERY': 'Order is out for delivery',
    'DELIVERED': 'Order has been delivered successfully',
    'CANCELLED': 'Order has been cancelled'
  }
  return descriptions[status] || 'Status updated'
}

function getStatusLocation(status: string): string {
  const locations: Record<string, string> = {
    'PENDING': 'Order placed',
    'CONFIRMED': 'Order confirmed',
    'PREPARING': 'Being prepared',
    'READY_FOR_DELIVERY': 'Ready for pickup',
    'READY_FOR_PICKUP': 'Ready for pickup',
    'PICKED_UP': 'Picked up',
    'IN_TRANSIT': 'In transit',
    'OUT_FOR_DELIVERY': 'Out for delivery',
    'DELIVERED': 'Delivered',
    'CANCELLED': 'Cancelled'
  }
  return locations[status] || 'Unknown location'
}
