import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, otp, sellerId } = body

    if (!orderId || !otp || !sellerId) {
      return NextResponse.json({ 
        error: "Missing required fields: orderId, otp, and sellerId" 
      }, { status: 400 })
    }

    console.log('[OTP VERIFICATION] Verifying OTP for order:', orderId, 'seller:', sellerId)

    // Check if order exists and is in correct status
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, orderNumber, orderStatus, parcel_otp, otp_verified, otp_expires_at')
      .eq('id', Number(orderId))
      .single()

    if (orderError || !order) {
      console.error('[OTP VERIFICATION] Order not found:', orderId, orderError)
      return NextResponse.json({ 
        error: "Order not found" 
      }, { status: 404 })
    }

    // Check if order is in correct status for OTP verification
    if (order.orderStatus !== 'READY_FOR_PICKUP') {
      console.error('[OTP VERIFICATION] Invalid order status for OTP verification:', order.orderStatus)
      return NextResponse.json({ 
        error: "Order must be in READY_FOR_PICKUP status to verify OTP" 
      }, { status: 400 })
    }

    // Check if OTP is already verified
    if (order.otp_verified) {
      console.log('[OTP VERIFICATION] OTP already verified for order:', orderId)
      return NextResponse.json({
        success: true,
        message: "OTP already verified for this order",
        orderId: orderId
      })
    }

    // Check if OTP has expired
    if (order.otp_expires_at && new Date() > new Date(order.otp_expires_at)) {
      console.error('[OTP VERIFICATION] OTP expired for order:', orderId)
      return NextResponse.json({ 
        error: "OTP has expired. Please generate a new OTP." 
      }, { status: 400 })
    }

    // Verify OTP
    if (order.parcel_otp !== otp) {
      console.error('[OTP VERIFICATION] Invalid OTP for order:', orderId, 'provided:', otp, 'expected:', order.parcel_otp)
      return NextResponse.json({ 
        error: "Invalid OTP" 
      }, { status: 400 })
    }

    console.log('[OTP VERIFICATION] OTP verified successfully for order:', orderId)

    // Update order with OTP verification and change status to READY_FOR_DELIVERY (current DB schema)
    const { data: updatedOrder, error: updateError } = await supabase
      .from('orders')
      .update({
        otp_verified: true,
        otp_verified_at: new Date(),
        orderStatus: 'READY_FOR_DELIVERY', // Use existing status from current schema
        parcel_otp: null, // Clear OTP after successful verification
        updated_at: new Date()
      })
      .eq('id', Number(orderId))
      .select('id, orderNumber, orderStatus, otp_verified, otp_verified_at')
      .single()

    if (updateError || !updatedOrder) {
      console.error('[OTP VERIFICATION] Failed to update order after OTP verification:', updateError)
      return NextResponse.json({ 
        error: "Failed to update order status" 
      }, { status: 500 })
    }

    // Create tracking entry for OTP verification
    const { error: trackingError } = await supabase
      .from('order_tracking')
      .insert({
        orderId: Number(orderId),
        status: 'READY_FOR_DELIVERY', // Use existing status from current schema
        description: 'Parcel pickup verified with OTP. Ready for delivery.',
        location: 'Seller Location'
      })

    if (trackingError) {
      console.error('[OTP VERIFICATION] Failed to create tracking entry:', trackingError)
      // Don't fail the request if tracking fails
    }

    // Update seller_orders status
    const { error: sellerOrderError } = await supabase
      .from('seller_orders')
      .update({
        status: 'READY_FOR_DELIVERY', // Use existing status from current schema
        updated_at: new Date()
      })
      .eq('orderId', Number(orderId))
      .eq('sellerId', Number(sellerId))

    if (sellerOrderError) {
      console.error('[OTP VERIFICATION] Failed to update seller order status:', sellerOrderError)
      // Don't fail the request if seller order update fails
    }

    console.log('[OTP VERIFICATION] Order status updated successfully for order:', orderId)

    return NextResponse.json({
      success: true,
      message: "OTP verified successfully. Parcel ready for delivery!",
      order: updatedOrder
    })

  } catch (error) {
    console.error('[OTP VERIFICATION] Unexpected error:', error)
    return NextResponse.json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
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