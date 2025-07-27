import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/database";
import {
  updateOrderDeliveryAgentLocation,
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

    // Map orders to UI-friendly format with seller details
    const mapOrder = async (order: any) => {
      let sellerInfo: any = null;
      let productDetails: any[] = [];

      // Fetch seller information
      try {
        const { data: sellerOrders } = await supabase
          .from("seller_orders")
          .select(`
            seller:sellers(id, name, phone, businessAddress, businessName)
          `)
          .eq("orderId", order.id)
          .limit(1);
        
        if (sellerOrders && sellerOrders.length > 0) {
          sellerInfo = sellerOrders[0].seller;
        }
      } catch (error) {
        console.error("Error fetching seller info:", error);
      }

      // Fetch product details
      try {
        const { data: orderItems } = await supabase
          .from("order_items")
          .select(`
            quantity,
            product:products(name, description, price)
          `)
          .eq("orderId", order.id);
        
        if (orderItems) {
          productDetails = orderItems.map((item: any) => ({
            name: item.product?.name || "Unknown Product",
            quantity: item.quantity,
            price: item.product?.price || 0
          }));
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }

      return {
        id: order.orderNumber || order.id,
        seller: sellerInfo?.businessName || sellerInfo?.name || "-",
        sellerAddress: sellerInfo?.businessAddress || "-",
        sellerPhone: sellerInfo?.phone || "-",
        customer: order.customerName,
        pickup: sellerInfo?.businessAddress || order.customerAddress,
        delivery: order.customerAddress,
        amount: order.totalAmount,
        deliveryFee: order.deliveryFee,
        distance: "-", // Optionally calculate
        estimatedTime: "-", // Optionally calculate
        items: productDetails.length > 0 ? productDetails.map((p: any) => `${p.name} (${p.quantity})`).join(", ") : "-",
        productDetails: productDetails,
        customerPhone: order.customerPhone,
        status: order.orderStatus,
        created_at: order.created_at,
        updated_at: order.updated_at,
      };
    };

    // Fetch orders with seller details
    const availableOrdersWithDetails = await Promise.all(safeAvailableOrders.map(mapOrder));
    const activeDeliveriesWithDetails = await Promise.all(activeDeliveries.map(mapOrder));

    return NextResponse.json({
      availableOrders: availableOrdersWithDetails,
      activeDeliveries: activeDeliveriesWithDetails,
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
      updateData.orderStatus = "READY_FOR_PICKUP";
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
    const { action, orderId, location, deliveryAgentId } = body;
    if (!action || !orderId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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