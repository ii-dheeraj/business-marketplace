import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get("orderId")
  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 })
  }
  try {
    const { data: tracking, error } = await supabase
      .from('order_tracking')
      .select('*')
      .eq('orderId', Number(orderId))
      .order('created_at', { ascending: true })
    if (error) {
      return NextResponse.json({ error: "Failed to fetch order tracking" }, { status: 500 })
    }
    return NextResponse.json({ tracking })
  } catch (error) {
    console.error("Error fetching order tracking:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, status, description, location } = body

    if (!orderId || !status || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create tracking entry
    const tracking = await supabase.from('order_tracking').insert({
      orderId: Number(orderId),
      status: status.toUpperCase(),
      description,
      location
    }).select().single()

    if (tracking.error) {
      return NextResponse.json({ error: "Failed to create tracking entry" }, { status: 500 })
    }

    // Update order status based on tracking status
    const statusMapping: { [key: string]: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY_FOR_DELIVERY' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED' } = {
      ORDER_PLACED: "PENDING",
      ORDER_CONFIRMED: "CONFIRMED",
      PREPARING_ORDER: "PREPARING",
      READY_FOR_PICKUP: "READY_FOR_DELIVERY",
      PICKED_UP: "OUT_FOR_DELIVERY",
      IN_TRANSIT: "OUT_FOR_DELIVERY",
      OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
      DELIVERED: "DELIVERED"
    }

    const newOrderStatus = statusMapping[status.toUpperCase()]
    if (newOrderStatus) {
      const { error: updateError } = await supabase.from('orders').update({ orderStatus: newOrderStatus }).eq('id', Number(orderId))
      if (updateError) {
        return NextResponse.json({ error: "Failed to update order status" }, { status: 500 })
      }
    }

    return NextResponse.json({
      success: true,
      tracking: tracking.data
    })
  } catch (error) {
    console.error("Error creating tracking entry:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 