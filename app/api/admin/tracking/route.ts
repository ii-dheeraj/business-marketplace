import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, status, description, location } = body

    if (!orderId || !status || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verify order exists
    const order = await prisma.order.findUnique({
      where: { id: Number(orderId) }
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Create tracking entry
    const tracking = await prisma.orderTracking.create({
      data: {
        orderId: Number(orderId),
        status: status.toUpperCase(),
        description,
        location
      }
    })

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
      await prisma.order.update({
        where: { id: Number(orderId) },
        data: { orderStatus: newOrderStatus }
      })
    }

    return NextResponse.json({
      success: true,
      tracking
    })
  } catch (error) {
    console.error("Error creating tracking entry:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get("orderId")

  try {
    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    const tracking = await prisma.orderTracking.findMany({
      where: { orderId: Number(orderId) },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      tracking
    })
  } catch (error) {
    console.error("Error fetching tracking data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 