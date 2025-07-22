import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const deliveryAgentId = searchParams.get("deliveryAgentId");

    // Available orders: not assigned to any agent, status is confirmed/preparing/ready
    const availableOrders = await prisma.order.findMany({
      where: {
        deliveryAgentId: null,
        orderStatus: { in: ["CONFIRMED", "PREPARING", "READY_FOR_DELIVERY"] },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    // Active deliveries: assigned to this agent, not delivered
    let activeDeliveries: any[] = [];
    if (deliveryAgentId) {
      activeDeliveries = await prisma.order.findMany({
        where: {
          deliveryAgentId: Number(deliveryAgentId),
          orderStatus: { not: "DELIVERED" },
        },
        orderBy: { createdAt: "desc" },
        take: 20,
      });
    }

    // Stats for delivery agent
    let stats = {
      totalDeliveries: 0,
      todayDeliveries: 0,
      earnings: 0,
      rating: null,
    }
    if (deliveryAgentId) {
      // Total deliveries completed
      stats.totalDeliveries = await prisma.order.count({
        where: {
          deliveryAgentId: Number(deliveryAgentId),
          orderStatus: "DELIVERED",
        },
      })
      // Today's deliveries
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      stats.todayDeliveries = await prisma.order.count({
        where: {
          deliveryAgentId: Number(deliveryAgentId),
          orderStatus: "DELIVERED",
          updatedAt: { gte: today },
        },
      })
      // Total earnings (sum of deliveryFee for delivered orders)
      const deliveredOrders = await prisma.order.findMany({
        where: {
          deliveryAgentId: Number(deliveryAgentId),
          orderStatus: "DELIVERED",
        },
        select: { deliveryFee: true },
      })
      stats.earnings = deliveredOrders.reduce((sum, o) => sum + (o.deliveryFee || 0), 0)
      // Rating: not implemented, set to null or fetch if available
      stats.rating = null
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
    });

    return NextResponse.json({
      availableOrders: availableOrders.map(mapOrder),
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

    const order = await prisma.order.update({
      where: { id: Number(orderId) },
      data: updateData,
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("[API] Error updating delivery order:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 