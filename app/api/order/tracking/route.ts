import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/database";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, deliveryAgentId, action, location, estimatedDeliveryTime } = body;

    if (!orderId || !deliveryAgentId || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (action === "update_location") {
      if (!location) {
        return NextResponse.json({ error: "Location data required" }, { status: 400 });
      }

      // Update order with delivery agent location
      const { data: order, error: updateError } = await supabase
        .from("orders")
        .update({ 
          delivery_agent_location: location,
          updated_at: new Date()
        })
        .eq("id", Number(orderId))
        .select()
        .single();

      if (updateError) {
        console.error("Error updating location:", updateError);
        return NextResponse.json({ error: "Failed to update location" }, { status: 500 });
      }

      // Add tracking entry
      await supabase
        .from("order_tracking")
        .insert({
          orderId: Number(orderId),
          status: "IN_TRANSIT",
          description: `Location updated: ${location.lat}, ${location.lng}`,
          location: JSON.stringify(location)
        });

      return NextResponse.json({ 
        success: true, 
        message: "Location updated successfully",
        location: location
      });

    } else if (action === "update_eta") {
      if (!estimatedDeliveryTime) {
        return NextResponse.json({ error: "Estimated delivery time required" }, { status: 400 });
      }

      // Update order with estimated delivery time
      const { data: order, error: updateError } = await supabase
        .from("orders")
        .update({ 
          estimatedDeliveryTime: new Date(estimatedDeliveryTime),
          updated_at: new Date()
        })
        .eq("id", Number(orderId))
        .select()
        .single();

      if (updateError) {
        console.error("Error updating ETA:", updateError);
        return NextResponse.json({ error: "Failed to update ETA" }, { status: 500 });
      }

      return NextResponse.json({ 
        success: true, 
        message: "ETA updated successfully",
        estimatedDeliveryTime: estimatedDeliveryTime
      });

    } else if (action === "start_delivery") {
      // Update order status to IN_TRANSIT
      const { data: order, error: updateError } = await supabase
        .from("orders")
        .update({ 
          orderStatus: "IN_TRANSIT",
          updated_at: new Date()
        })
        .eq("id", Number(orderId))
        .select()
        .single();

      if (updateError) {
        console.error("Error starting delivery:", updateError);
        return NextResponse.json({ error: "Failed to start delivery" }, { status: 500 });
      }

      // Add tracking entry
      await supabase
        .from("order_tracking")
        .insert({
          orderId: Number(orderId),
          status: "IN_TRANSIT",
          description: "Delivery started - en route to customer",
          location: "In Transit"
        });

      return NextResponse.json({ 
        success: true, 
        message: "Delivery started successfully",
        order: order
      });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });

  } catch (error) {
    console.error("[API] Error in tracking:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json({ error: "Order ID required" }, { status: 400 });
    }

    // Get order tracking history
    const { data: trackingHistory, error: trackingError } = await supabase
      .from("order_tracking")
      .select("*")
      .eq("orderId", Number(orderId))
      .order("created_at", { ascending: true });

    if (trackingError) {
      console.error("Error fetching tracking history:", trackingError);
      return NextResponse.json({ error: "Failed to fetch tracking history" }, { status: 500 });
    }

    // Get current order status and location
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("orderStatus, delivery_agent_location, estimatedDeliveryTime, actualDeliveryTime")
      .eq("id", Number(orderId))
      .single();

    if (orderError) {
      console.error("Error fetching order:", orderError);
      return NextResponse.json({ error: "Failed to fetch order details" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      trackingHistory: trackingHistory || [],
      currentStatus: order.orderStatus,
      currentLocation: order.delivery_agent_location,
      estimatedDeliveryTime: order.estimatedDeliveryTime,
      actualDeliveryTime: order.actualDeliveryTime
    });

  } catch (error) {
    console.error("[API] Error fetching tracking:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 