import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get("orderId")
  const sellerId = searchParams.get("sellerId")

  console.log('[ORDER DETAILS API] Request params:', { orderId, sellerId })

  if (!orderId || !sellerId) {
    return NextResponse.json({ error: "Order ID and Seller ID are required" }, { status: 400 })
  }

  try {
    // First, check if the order exists
    console.log('[ORDER DETAILS API] Checking if order exists with ID:', orderId)
    const { data: orderExists, error: checkError } = await supabase
      .from('orders')
      .select('id')
      .eq('id', Number(orderId))
      .maybeSingle()

    if (checkError) {
      console.error('[ORDER DETAILS API ERROR] Order existence check failed:', checkError)
      return NextResponse.json({ 
        error: "Database error while checking order", 
        details: checkError.message 
      }, { status: 500 })
    }

    if (!orderExists) {
      console.error('[ORDER DETAILS API ERROR] Order not found for ID:', orderId)
      return NextResponse.json({ 
        error: "Order not found", 
        details: `Order with ID ${orderId} does not exist in the database` 
      }, { status: 404 })
    }

    // Get the main order details
    console.log('[ORDER DETAILS API] Fetching order with ID:', orderId)
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        id,
        orderNumber,
        orderStatus,
        customerName,
        customerPhone,
        customerAddress,
        customerCity,
        customerArea,
        customerLocality,
        subtotal,
        deliveryFee,
        taxAmount,
        totalAmount,
        paymentMethod,
        paymentStatus,
        deliveryInstructions,
        estimatedDeliveryTime,
        actualDeliveryTime,
        parcel_otp,
        created_at,
        updated_at
      `)
      .eq('id', Number(orderId))
      .single()

    if (orderError) {
      console.error('[ORDER DETAILS API ERROR] Order query failed:', orderError)
      return NextResponse.json({ 
        error: "Failed to fetch order details", 
        details: orderError.message 
      }, { status: 500 })
    }
    
    if (!order) {
      console.error('[ORDER DETAILS API ERROR] Order not found for ID:', orderId)
      return NextResponse.json({ 
        error: "Order not found", 
        details: `Order with ID ${orderId} was not found` 
      }, { status: 404 })
    }

    // Check if seller order exists
    console.log('[ORDER DETAILS API] Checking seller order for orderId:', orderId, 'sellerId:', sellerId)
    const { data: sellerOrderExists, error: sellerCheckError } = await supabase
      .from('seller_orders')
      .select('id')
      .eq('orderId', Number(orderId))
      .eq('sellerId', Number(sellerId))
      .maybeSingle()

    if (sellerCheckError) {
      console.error('[SELLER ORDER DETAILS API ERROR] Seller order check failed:', sellerCheckError)
      return NextResponse.json({ 
        error: "Database error while checking seller order", 
        details: sellerCheckError.message 
      }, { status: 500 })
    }

    if (!sellerOrderExists) {
      console.error('[SELLER ORDER DETAILS API ERROR] Seller order not found for orderId:', orderId, 'sellerId:', sellerId)
      return NextResponse.json({ 
        error: "Seller order not found", 
        details: `No seller order found for order ID ${orderId} and seller ID ${sellerId}` 
      }, { status: 404 })
    }

    // Get seller-specific order details
    console.log('[ORDER DETAILS API] Fetching seller order for orderId:', orderId, 'sellerId:', sellerId)
    const { data: sellerOrder, error: sellerOrderError } = await supabase
      .from('seller_orders')
      .select('*')
      .eq('orderId', Number(orderId))
      .eq('sellerId', Number(sellerId))
      .single()

    if (sellerOrderError) {
      console.error('[SELLER ORDER DETAILS API ERROR] Seller order query failed:', sellerOrderError)
      return NextResponse.json({ 
        error: "Failed to fetch seller order details", 
        details: sellerOrderError.message 
      }, { status: 500 })
    }
    
    if (!sellerOrder) {
      console.error('[SELLER ORDER DETAILS API ERROR] Seller order not found for orderId:', orderId, 'sellerId:', sellerId)
      return NextResponse.json({ 
        error: "Seller order not found", 
        details: `Seller order with ID ${orderId} and seller ID ${sellerId} was not found` 
      }, { status: 404 })
    }

    // Get order items for this seller
    const { data: orderItems, error: itemsError } = await supabase
      .from('order_items')
      .select(`
        id,
        quantity,
        unitPrice,
        totalPrice,
        productName,
        productImage,
        productCategory,
        product:products(id, name, description, price, image, category)
      `)
      .eq('orderId', Number(orderId))

    if (itemsError) {
      console.error('[ORDER ITEMS API ERROR]', itemsError)
      return NextResponse.json({ error: "Failed to fetch order items" }, { status: 500 })
    }

    // Filter items that belong to this seller (based on seller_orders.items)
    const sellerItems = sellerOrder.items || []
    const filteredItems = orderItems?.filter(item => {
      return sellerItems.some((sellerItem: any) => 
        sellerItem.productId === item.product?.id || 
        sellerItem.productName === item.productName
      )
    }) || []

    // Get delivery agent details if assigned
    let deliveryAgent = null
    if (order.deliveryAgentId) {
      const { data: agent, error: agentError } = await supabase
        .from('delivery_agents')
        .select('id, name, phone, vehicleNumber, vehicleType')
        .eq('id', order.deliveryAgentId)
        .single()
      
      if (!agentError && agent) {
        deliveryAgent = agent
      }
    }

    // Format the response
    const orderDetails = {
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        orderStatus: order.orderStatus,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerAddress: order.customerAddress,
        customerCity: order.customerCity,
        customerArea: order.customerArea,
        customerLocality: order.customerLocality,
        deliveryInstructions: order.deliveryInstructions,
        estimatedDeliveryTime: order.estimatedDeliveryTime,
        actualDeliveryTime: order.actualDeliveryTime,
        parcel_otp: order.parcel_otp,
        created_at: order.created_at,
        updated_at: order.updated_at
      },
      payment: {
        subtotal: order.subtotal,
        deliveryFee: order.deliveryFee,
        taxAmount: order.taxAmount,
        totalAmount: order.totalAmount,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus
      },
      sellerOrder: {
        status: sellerOrder.status,
        subtotal: sellerOrder.subtotal,
        commission: sellerOrder.commission,
        netAmount: sellerOrder.netAmount
      },
      items: filteredItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
        productName: item.productName,
        productImage: item.productImage,
        productCategory: item.productCategory,
        product: item.product
      })),
      deliveryAgent
    }

    return NextResponse.json({ success: true, orderDetails })
  } catch (error) {
    console.error('[ORDER DETAILS API UNEXPECTED ERROR]', error)
    return NextResponse.json({ error: 'Internal server error', details: String(error) }, { status: 500 })
  }
} 