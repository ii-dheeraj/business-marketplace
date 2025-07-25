import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/database";
import {
  setOrderParcelOTP,
  validateOrderParcelOTP,
  updateOrderDeliveryAgentLocation
} from "@/lib/database";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const deliveryAgentId = searchParams.get("deliveryAgentId");

    // Available orders: not assigned to any agent, status is confirmed/preparing/ready
    const { data: availableOrders, error: availableError } = await supabase
      .from("orders")
      .select("*")
      .is("deliveryAgentId", null)
      .in("orderStatus", ["CONFIRMED", "PREPARING", "READY_FOR_DELIVERY"])
      .order("created_at", { ascending: false })
      .limit(20);
    if (availableError) throw availableError;
    const safeAvailableOrders = availableOrders || [];

    // Active deliveries: assigned to this agent, not delivered
    let activeDeliveries = [];
    if (deliveryAgentId) {
      const { data: activeData, error: activeError } = await supabase
        .from("orders")
        .select("*")
        .eq("deliveryAgentId", Number(deliveryAgentId))
        .not("orderStatus", "eq", "DELIVERED")
        .order("created_at", { ascending: false })
        .limit(20);
      if (activeError) throw activeError;
      activeDeliveries = activeData || [];
    }

    // Stats for delivery agent
    let stats = {
      totalDeliveries: 0,
      todayDeliveries: 0,
      earnings: 0,
      rating: null,
    };
    if (deliveryAgentId) {
      // Total deliveries completed
      const { count: totalDeliveries = 0 } = await supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("deliveryAgentId", Number(deliveryAgentId))
        .eq("orderStatus", "DELIVERED");
      stats.totalDeliveries = totalDeliveries || 0;
      // Today's deliveries
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count: todayDeliveries = 0 } = await supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("deliveryAgentId", Number(deliveryAgentId))
        .eq("orderStatus", "DELIVERED")
        .gte("updated_at", today.toISOString());
      stats.todayDeliveries = todayDeliveries || 0;
      // Total earnings (sum of deliveryFee for delivered orders)
      const { data: deliveredOrders } = await supabase
        .from("orders")
        .select("deliveryFee")
        .eq("deliveryAgentId", Number(deliveryAgentId))
        .eq("orderStatus", "DELIVERED");
      stats.earnings = (deliveredOrders || []).reduce((sum: number, o: any) => sum + (o.deliveryFee || 0), 0);
      // Rating: not implemented, set to null or fetch if available
      stats.rating = null;
    }

    // Map orders to UI-friendly format
    const mapOrder = (order: any) => ({
      id: order.orderNumber || order.id,
      seller: "-", // Optionally fetch seller info
      customer: order.customerName,
      pickup: order.customerAddress,
      delivery: order.customerAddress,
      amount: order.totalAmount,
      deliveryFee: order.deliveryFee,
      distance: "-", // Optionally calculate
      estimatedTime: "-", // Optionally calculate
      items: order.items?.length ? order.items.map((i: any) => i.productName).join(", ") : "-",
      customerPhone: order.customerPhone,
      status: order.orderStatus,
      created_at: order.created_at,
      updated_at: order.updated_at,
    });

    return NextResponse.json({
      availableOrders: safeAvailableOrders.map(mapOrder),
      activeDeliveries: activeDeliveries.map(mapOrder),
      stats,
    });
  } catch (error) {
    console.error("[API] Error fetching delivery agent orders:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, deliveryAgentId, action } = body;
    if (!orderId || !deliveryAgentId || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let updateData: any = { deliveryAgentId: Number(deliveryAgentId) };
    if (action === "accept") {
      updateData.orderStatus = "OUT_FOR_DELIVERY";
    } else if (action === "picked_up") {
      updateData.orderStatus = "IN_TRANSIT";
    } else if (action === "delivered") {
      updateData.orderStatus = "DELIVERED";
      updateData.actualDeliveryTime = new Date();
    }

    const { data: order, error } = await supabase
      .from("orders")
      .update(updateData)
      .eq("id", Number(orderId))
      .select()
      .single();
    if (error) throw error;

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("[API] Error updating delivery order:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, orderId, otp, location, deliveryAgentId } = body;
    if (!action || !orderId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (action === "validate_otp") {
      if (!otp) return NextResponse.json({ error: "Missing OTP" }, { status: 400 });
      const valid = await validateOrderParcelOTP(Number(orderId), otp);
      if (!valid) return NextResponse.json({ success: false, error: "Invalid OTP" }, { status: 401 });
      // Mark as PICKED_UP and add tracking entry
      await supabase.from("orders").update({ orderStatus: "IN_TRANSIT" }).eq("id", Number(orderId));
      await supabase.from("order_tracking").insert({
        orderId: Number(orderId),
        status: "PICKED_UP",
        description: "Parcel picked up by delivery agent.",
        location: "Seller Location"
      });
      return NextResponse.json({ success: true });
    }

    if (action === "update_location") {
      if (!location || !deliveryAgentId) return NextResponse.json({ error: "Missing location or deliveryAgentId" }, { status: 400 });
      await updateOrderDeliveryAgentLocation(Number(orderId), location);
      // Optionally, also update delivery agent's currentLocation
      await supabase.from("delivery_agents").update({ currentLocation: JSON.stringify(location) }).eq("id", Number(deliveryAgentId));
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("[API] Error in delivery POST:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 