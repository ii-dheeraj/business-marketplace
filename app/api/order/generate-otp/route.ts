import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/database";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, deliveryAgentId, checkOnly } = body;

    if (!orderId || !deliveryAgentId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // First, check if an OTP already exists for this order
    const { data: existingOrder, error: fetchError } = await supabase
      .from("orders")
      .select("parcel_otp")
      .eq("id", Number(orderId))
      .single();

    if (fetchError) {
      console.error("Error fetching existing order:", fetchError);
      return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
    }

    // If OTP already exists, return it (static OTP)
    if (existingOrder.parcel_otp) {
      return NextResponse.json({ 
        success: true, 
        otp: existingOrder.parcel_otp,
        message: "Existing OTP retrieved",
        isExisting: true
      });
    }

    // If checkOnly is true and no OTP exists, return without generating
    if (checkOnly) {
      return NextResponse.json({ 
        success: false, 
        message: "No OTP exists for this order"
      });
    }

    // Generate a 6-digit OTP only if one doesn't exist
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Update the order with the generated OTP
    const { data: order, error } = await supabase
      .from("orders")
      .update({ 
        parcel_otp: otp,
        updated_at: new Date()
      })
      .eq("id", Number(orderId))
      .select()
      .single();

    if (error) {
      console.error("Error generating OTP:", error);
      return NextResponse.json({ error: "Failed to generate OTP" }, { status: 500 });
    }

    // Add tracking entry
    await supabase
      .from("order_tracking")
      .insert({
        orderId: Number(orderId),
        status: "READY_FOR_PICKUP",
        description: `OTP generated for pickup: ${otp}`,
        location: "Seller Location"
      });

    return NextResponse.json({ 
      success: true, 
      otp: otp,
      message: "OTP generated successfully for parcel pickup",
      isExisting: false
    });

  } catch (error) {
    console.error("[API] Error generating OTP:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 