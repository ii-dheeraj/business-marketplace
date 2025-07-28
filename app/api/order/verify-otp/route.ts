import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/database";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, deliveryAgentId, otp } = body;

    if (!orderId || !deliveryAgentId || !otp) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get the order to check the stored OTP
    const { data: order, error: fetchError } = await supabase
      .from("orders")
      .select("parcel_otp, orderStatus")
      .eq("id", Number(orderId))
      .single();

    if (fetchError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Verify OTP
    if (order.parcel_otp !== otp) {
      return NextResponse.json({ 
        success: false, 
        error: "Invalid OTP. Please check and try again." 
      }, { status: 400 });
    }

    // Update order status to PICKED_UP and clear OTP
    const { data: updatedOrder, error: updateError } = await supabase
      .from("orders")
      .update({ 
        orderStatus: "PICKED_UP",
        parcel_otp: null, // Clear OTP after successful verification
        updated_at: new Date()
      })
      .eq("id", Number(orderId))
      .select()
      .single();

    if (updateError) {
      console.error("Error updating order status:", updateError);
      return NextResponse.json({ error: "Failed to update order status" }, { status: 500 });
    }

    // Add tracking entry
    await supabase
      .from("order_tracking")
      .insert({
        orderId: Number(orderId),
        status: "PICKED_UP",
        description: "Parcel picked up successfully with OTP verification",
        location: "Seller Location"
      });

    return NextResponse.json({ 
      success: true, 
      message: "OTP verified successfully. Parcel picked up!",
      order: updatedOrder
    });

  } catch (error) {
    console.error("[API] Error verifying OTP:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
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