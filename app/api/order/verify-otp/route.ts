import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, otp, deliveryAgentId } = body

    if (!orderId || !otp || !deliveryAgentId) {
      return NextResponse.json({ error: "Missing required fields: orderId, otp, deliveryAgentId" }, { status: 400 })
    }

    // Fetch the order to get the stored OTP
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', Number(orderId))
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Check if order is assigned to this delivery agent
    if (order.deliveryAgentId !== Number(deliveryAgentId)) {
      return NextResponse.json({ error: "Order is not assigned to this delivery agent" }, { status: 403 })
    }

    // Check if order is ready for delivery and not already delivered
    if (order.orderStatus !== 'OUT_FOR_DELIVERY') {
      return NextResponse.json({ error: "Order is not ready for delivery. Current status: " + order.orderStatus }, { status: 400 })
    }

    // Check if order is already delivered
    if (order.orderStatus === 'DELIVERED') {
      return NextResponse.json({ error: "Order has already been delivered" }, { status: 400 })
    }

    // Verify the OTP
    if (order.parcel_otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })
    }

    // Update order status to DELIVERED
    const { data: updatedOrder, error: updateError } = await supabase
      .from('orders')
      .update({ 
        orderStatus: 'DELIVERED',
        actualDeliveryTime: new Date().toISOString()
      })
      .eq('id', Number(orderId))
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: "Failed to update order status" }, { status: 500 })
    }

    // Create tracking entry for delivery
    await supabase.from('order_tracking').insert({
      orderId: Number(orderId),
      status: 'DELIVERED',
      description: 'Order delivered successfully. OTP verified by delivery agent.',
      location: 'Customer Location'
    })

    return NextResponse.json({
      success: true,
      message: "OTP verified successfully. Order marked as delivered.",
      order: {
        id: updatedOrder.id,
        orderNumber: updatedOrder.orderNumber,
        orderStatus: updatedOrder.orderStatus,
        actualDeliveryTime: updatedOrder.actualDeliveryTime
      }
    })

  } catch (error) {
    console.error("Error verifying OTP:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get("orderId")

  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId parameter" }, { status: 400 })
  }

  try {
    // Fetch order details (without OTP for security)
    const { data: order, error } = await supabase
      .from('orders')
      .select('id, orderNumber, orderStatus, customerName, customerPhone, customerAddress, deliveryAgentId, parcel_otp')
      .eq('id', Number(orderId))
      .single()

    if (error || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        orderStatus: order.orderStatus,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerAddress: order.customerAddress,
        deliveryAgentId: order.deliveryAgentId,
        hasOTP: !!order.parcel_otp // Only indicate if OTP exists, don't show the actual OTP
      }
    })

  } catch (error) {
    console.error("Error fetching order details:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 