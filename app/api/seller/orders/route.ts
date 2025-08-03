import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sellerId = searchParams.get("sellerId")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const from = (page - 1) * limit
    const to = from + limit - 1

    console.log('[SELLER ORDERS API] Request params:', { sellerId, page, limit })

    if (!sellerId) {
      return NextResponse.json({ error: "Seller ID is required" }, { status: 400 })
    }

    // Verify seller exists
    const { data: seller, error: sellerError } = await supabase
      .from('sellers')
      .select('id, name, business_name')
      .eq('id', sellerId)
      .single()
    
    if (sellerError || !seller) {
      console.error('[SELLER ORDERS API] Seller not found:', sellerId, sellerError)
      return NextResponse.json({ error: "Seller not found" }, { status: 404 })
    }
    
    console.log('[SELLER ORDERS API] Found seller:', seller)

    // Check if there are any seller_orders for this seller
    const { data: basicSellerOrders, error: basicError } = await supabase
      .from('seller_orders')
      .select('id, order_id, seller_id, status, created_at')
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false })
    
    if (basicError) {
      console.error('[SELLER ORDERS API] Error fetching basic seller orders:', basicError)
      return NextResponse.json({ error: basicError.message }, { status: 500 })
    }
    
    console.log('[SELLER ORDERS API] Basic seller orders found:', basicSellerOrders?.length || 0)

    // Get orders for this seller with complete order details
    const { data: sellerOrders, error, count } = await supabase
      .from('seller_orders')
      .select(`
        id, 
        order_id, 
        seller_id, 
        status, 
        items, 
        subtotal, 
        commission, 
        net_amount, 
        created_at, 
        updated_at,
        orders!inner(
          id,
          order_number,
          order_status,
          customer_name,
          customer_phone,
          customer_address,
          total_amount,
          payment_status,
          payment_method,
          delivery_agent_id,
          created_at,
          updated_at,
          parcel_otp,
          estimated_delivery_time,
          actual_delivery_time,
          delivery_instructions,
          order_items(id, product_name, quantity, unit_price, total_price, product_id, product_image)
        )
      `, { count: 'exact' })
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false })
      .range(from, to)
    
    if (error) {
      console.error('[SELLER ORDERS API ERROR]', error)
      return NextResponse.json({ error: error.message, details: error }, { status: 500 })
    }
    
    console.log('[SELLER ORDERS API] Full seller orders fetched:', sellerOrders?.length || 0)
    console.log('[SELLER ORDERS API] Sample order data:', sellerOrders?.[0])
    
    // Transform the data to flatten the structure
    const transformedOrders = sellerOrders?.map(sellerOrder => {
      const order = sellerOrder.orders
      return {
        // Seller order fields
        id: sellerOrder.id,
        orderId: sellerOrder.order_id,
        sellerId: sellerOrder.seller_id,
        status: sellerOrder.status,
        items: sellerOrder.items,
        subtotal: sellerOrder.subtotal,
        commission: sellerOrder.commission,
        netAmount: sellerOrder.net_amount,
        created_at: sellerOrder.created_at,
        updated_at: sellerOrder.updated_at,
        
        // Order fields
        orderNumber: order?.order_number,
        orderStatus: order?.order_status,
        customerName: order?.customer_name,
        customerPhone: order?.customer_phone,
        customerAddress: order?.customer_address,
        totalAmount: order?.total_amount,
        paymentStatus: order?.payment_status,
        paymentMethod: order?.payment_method,
        deliveryAgentId: order?.delivery_agent_id,
        parcel_otp: order?.parcel_otp,
        estimatedDeliveryTime: order?.estimated_delivery_time,
        actualDeliveryTime: order?.actual_delivery_time,
        deliveryInstructions: order?.delivery_instructions,
        order_items: order?.order_items || []
      }
    }) || []
    
    console.log('[SELLER ORDERS API] Transformed orders:', transformedOrders.length)
    
    return NextResponse.json({
      orders: transformedOrders,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })
  } catch (error) {
    console.error('[SELLER ORDERS API] Unexpected error:', error)
    return NextResponse.json({ 
      error: "Internal server error", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, status } = body

    if (!orderId || !status) {
      return NextResponse.json({ error: "Order ID and status are required" }, { status: 400 })
    }

    console.log('[SELLER ORDERS API] Updating seller order:', orderId, { status })

    // Update seller order status
    const { data: sellerOrder, error } = await supabase
      .from('seller_orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single()

    if (error) {
      console.error('[SELLER ORDERS API] Update error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Also update the main order status if this is the only seller order
    // or if all seller orders have the same status
    const { data: allSellerOrders } = await supabase
      .from('seller_orders')
      .select('status')
      .eq('order_id', sellerOrder.order_id)

    if (allSellerOrders && allSellerOrders.length > 0) {
      const allSameStatus = allSellerOrders.every(so => so.status === status)
      if (allSameStatus) {
        await supabase
          .from('orders')
          .update({ order_status: status })
          .eq('id', sellerOrder.order_id)
      }
    }

    return NextResponse.json({ 
      success: true, 
      sellerOrder,
      message: "Seller order updated successfully" 
    })

  } catch (error) {
    console.error('[SELLER ORDERS API] Update error:', error)
    return NextResponse.json({ 
      error: "Failed to update seller order", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 })
  }
} 