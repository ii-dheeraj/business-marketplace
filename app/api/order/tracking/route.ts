import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get("orderId")
  const orderNumber = searchParams.get("orderNumber")

  try {
    if (!orderId && !orderNumber) {
      return NextResponse.json({ error: "Order ID or Order Number is required" }, { status: 400 })
    }

    const whereClause = orderId 
      ? { id: Number(orderId) }
      : { orderNumber: orderNumber! }

    const order = await prisma.order.findUnique({
      where: whereClause,
      include: {
        items: {
          include: {
            product: true
          }
        },
        customer: true,
        sellerOrders: {
          include: {
            seller: true
          }
        },
        tracking: {
          orderBy: {
            createdAt: 'desc'
          }
        },
        deliveryAgent: true,
        payments: true
      }
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Get the latest tracking status
    const latestTracking = order.tracking[0] || null

    // Map order status to tracking status for display
    const getStatusDisplay = (status: string) => {
      const statusMap: { [key: string]: { text: string; color: string; icon: string } } = {
        PENDING: { text: "Order Placed", color: "text-blue-600", icon: "📋" },
        CONFIRMED: { text: "Order Confirmed", color: "text-green-600", icon: "✅" },
        PREPARING: { text: "Preparing Order", color: "text-orange-600", icon: "👨‍🍳" },
        READY_FOR_DELIVERY: { text: "Ready for Pickup", color: "text-purple-600", icon: "📦" },
        OUT_FOR_DELIVERY: { text: "Out for Delivery", color: "text-indigo-600", icon: "🚚" },
        DELIVERED: { text: "Delivered", color: "text-green-700", icon: "🎉" },
        CANCELLED: { text: "Cancelled", color: "text-red-600", icon: "❌" }
      }
      return statusMap[status] || { text: status, color: "text-gray-600", icon: "❓" }
    }

    const statusDisplay = getStatusDisplay(order.orderStatus)

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        orderStatus: order.orderStatus,
        statusDisplay,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerAddress: order.customerAddress,
        totalAmount: order.totalAmount,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        createdAt: order.createdAt,
        estimatedDeliveryTime: order.estimatedDeliveryTime,
        actualDeliveryTime: order.actualDeliveryTime,
        deliveryInstructions: order.deliveryInstructions,
        items: order.items.map(item => ({
          id: item.id,
          productName: item.productName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
          productImage: item.productImage
        })),
        sellerOrders: order.sellerOrders.map(so => ({
          id: so.id,
          sellerName: so.seller.businessName,
          sellerAddress: so.seller.businessAddress,
          status: so.status,
          items: so.items,
          subtotal: so.subtotal
        })),
        tracking: order.tracking.map(track => ({
          id: track.id,
          status: track.status,
          description: track.description,
          location: track.location,
          createdAt: track.createdAt
        })),
        deliveryAgent: order.deliveryAgent ? {
          id: order.deliveryAgent.id,
          name: order.deliveryAgent.name,
          phone: order.deliveryAgent.phone,
          vehicleNumber: order.deliveryAgent.vehicleNumber,
          vehicleType: order.deliveryAgent.vehicleType
        } : null,
        latestTracking: latestTracking ? {
          status: latestTracking.status,
          description: latestTracking.description,
          location: latestTracking.location,
          createdAt: latestTracking.createdAt
        } : null
      }
    })
  } catch (error) {
    console.error("Error fetching order tracking:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, status, description, location } = body

    if (!orderId || !status || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
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