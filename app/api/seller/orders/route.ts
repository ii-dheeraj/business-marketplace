import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sellerId = searchParams.get("sellerId")
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "10")
  const from = (page - 1) * limit
  const to = from + limit - 1
  const debug = searchParams.get("debug")

  if (debug === "1") {
    // Return all seller_orders for debugging
    const { data: allOrders, error } = await supabase
      .from('seller_orders')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ orders: allOrders })
  }

  if (!sellerId) {
    return NextResponse.json({ error: "Seller ID is required" }, { status: 400 })
  }

  try {
    // Get orders for this seller with complete order details
    const { data: sellerOrders, error, count } = await supabase
      .from('seller_orders')
      .select(`
        id, 
        orderId, 
        sellerId, 
        status, 
        items, 
        subtotal, 
        commission, 
        netAmount, 
        created_at, 
        updated_at,
        orders!inner(
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
          order_items(id, productName, quantity, unitPrice, totalPrice, productId, productImage),
          deliveryAgent:delivery_agents(id, name, phone, vehicleNumber)
        )
      `, { count: 'exact' })
      .eq('sellerId', Number(sellerId))
      .order('created_at', { ascending: false })
      .range(from, to)
    
    if (error) {
      console.error('[SELLER ORDERS API ERROR]', error)
      return NextResponse.json({ error: error.message, details: error }, { status: 500 })
    }
    
    console.log('[DEBUG] Seller orders fetched for seller:', sellerOrders)
    
    // Transform the data to flatten the structure
    const transformedOrders = sellerOrders?.map(sellerOrder => {
      const order = sellerOrder.orders
      return {
        // Seller order fields
        id: sellerOrder.id,
        orderId: sellerOrder.orderId,
        sellerId: sellerOrder.sellerId,
        status: sellerOrder.status,
        items: sellerOrder.items,
        subtotal: sellerOrder.subtotal,
        commission: sellerOrder.commission,
        netAmount: sellerOrder.netAmount,
        created_at: sellerOrder.created_at,
        updated_at: sellerOrder.updated_at,
        
        // Order fields
        orderNumber: order?.orderNumber,
        orderStatus: order?.orderStatus,
        customerName: order?.customerName,
        customerPhone: order?.customerPhone,
        customerAddress: order?.customerAddress,
        totalAmount: order?.totalAmount,
        paymentStatus: order?.paymentStatus,
        paymentMethod: order?.paymentMethod,
        parcel_otp: order?.parcel_otp,
        estimatedDeliveryTime: order?.estimatedDeliveryTime,
        actualDeliveryTime: order?.actualDeliveryTime,
        deliveryInstructions: order?.deliveryInstructions,
        order_items: order?.order_items || [],
        deliveryAgent: order?.deliveryAgent
      }
    }) || []
    
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
    console.error('[SELLER ORDERS API UNEXPECTED ERROR]', error)
    return NextResponse.json({ error: 'Internal server error', details: String(error) }, { status: 500 })
  }
} 