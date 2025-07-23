import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sellerId = searchParams.get("sellerId")
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "10")
  const from = (page - 1) * limit
  const to = from + limit - 1

  if (!sellerId) {
    return NextResponse.json({ error: "Seller ID is required" }, { status: 400 })
  }

  try {
    // Get orders for this seller from seller_orders table
    const { data: sellerOrders, error, count } = await supabase
      .from('seller_orders')
      .select('id, orderid, sellerid, status, items, subtotal, commission, netamount, created_at, updated_at', { count: 'exact' })
      .eq('sellerid', Number(sellerId))
      .order('created_at', { ascending: false })
      .range(from, to)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
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
    console.error("Error fetching seller orders:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 