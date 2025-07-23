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
    // Get orders for this seller from seller_orders table
    const { data: sellerOrders, error, count } = await supabase
      .from('seller_orders')
      .select('id, orderId, sellerId, status, items, subtotal, commission, netAmount, created_at, updated_at', { count: 'exact' })
      .eq('sellerId', Number(sellerId))
      .order('created_at', { ascending: false })
      .range(from, to)
    if (error) {
      console.error('[SELLER ORDERS API ERROR]', error)
      return NextResponse.json({ error: error.message, details: error }, { status: 500 })
    }
    console.log('[DEBUG] Seller orders fetched for seller:', sellerOrders)
    // Optionally, fetch order details for each seller order
    // (for now, just return the sellerOrders as is)
    return NextResponse.json({
      orders: sellerOrders,
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