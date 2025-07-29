import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, deliveryAgentId } = body

    if (!orderId || !deliveryAgentId) {
      return NextResponse.json({ 
        error: "Missing required fields: orderId and deliveryAgentId" 
      }, { status: 400 })
    }

    console.log('[OTP GENERATION] Generating OTP for order:', orderId, 'agent:', deliveryAgentId)

    // Check if order exists and is in correct status
    const { data: existingOrder, error: orderError } = await supabase
      .from('orders')
      .select('id, orderStatus, deliveryAgentId, parcel_otp')
      .eq('id', Number(orderId))
      .single()

    if (orderError || !existingOrder) {
      console.error('[OTP GENERATION] Order not found:', orderId, orderError)
      return NextResponse.json({ 
        error: "Order not found" 
      }, { status: 404 })
    }

    // Verify the delivery agent is assigned to this order
    if (existingOrder.deliveryAgentId !== Number(deliveryAgentId)) {
      console.error('[OTP GENERATION] Delivery agent mismatch:', existingOrder.deliveryAgentId, deliveryAgentId)
      return NextResponse.json({ 
        error: "Delivery agent not assigned to this order" 
      }, { status: 403 })
    }

    // Check if order is in correct status for OTP generation
    // Allow OTP generation for 'CONFIRMED' status (current DB schema)
    if (existingOrder.orderStatus !== 'CONFIRMED') {
      console.error('[OTP GENERATION] Invalid order status for OTP generation:', existingOrder.orderStatus)
      return NextResponse.json({ 
        error: `Order must be in CONFIRMED status to generate OTP. Current status: ${existingOrder.orderStatus}` 
      }, { status: 400 })
    }

    // Check if OTP already exists
    if (existingOrder.parcel_otp) {
      console.log('[OTP GENERATION] OTP already exists for order:', orderId)
      return NextResponse.json({
        success: true,
        message: "OTP already generated for this order",
        otp: existingOrder.parcel_otp,
        orderId: orderId
      })
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiresAt = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes expiry

    console.log('[OTP GENERATION] Generated OTP:', otp, 'for order:', orderId)

    // Update order with OTP and change status to READY_FOR_PICKUP (current DB schema)
    const { data: updatedOrder, error: updateError } = await supabase
      .from('orders')
      .update({
        parcel_otp: otp,
        orderStatus: 'READY_FOR_PICKUP', // Use existing status from current schema
        otp_expires_at: otpExpiresAt,
        updated_at: new Date()
      })
      .eq('id', Number(orderId))
      .select('id, orderNumber, orderStatus, parcel_otp')
      .single()

    if (updateError || !updatedOrder) {
      console.error('[OTP GENERATION] Failed to update order with OTP:', updateError)
      return NextResponse.json({ 
        error: "Failed to generate OTP" 
      }, { status: 500 })
    }

    // Create tracking entry for OTP generation
    const { error: trackingError } = await supabase
      .from('order_tracking')
      .insert({
        orderId: Number(orderId),
        status: 'READY_FOR_PICKUP', // Use existing status from current schema
        description: 'OTP generated for parcel pickup verification',
        location: 'Delivery Agent Dashboard'
      })

    if (trackingError) {
      console.error('[OTP GENERATION] Failed to create tracking entry:', trackingError)
      // Don't fail the request if tracking fails
    }

    console.log('[OTP GENERATION] OTP generated successfully for order:', orderId)

    return NextResponse.json({
      success: true,
      message: "OTP generated successfully",
      otp: otp,
      orderId: orderId,
      orderStatus: updatedOrder.orderStatus,
      expiresAt: otpExpiresAt
    })

  } catch (error) {
    console.error('[OTP GENERATION] Unexpected error:', error)
    return NextResponse.json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
} 