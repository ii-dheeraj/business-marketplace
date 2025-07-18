import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { buyerId, items, customerDetails, paymentMethod, totalAmount, subtotal, deliveryFee, paymentDetails } = body

    if (!buyerId || !items || !customerDetails || !paymentMethod || !totalAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    let paymentStatus = "COMPLETED"
    let transactionStatus = "SUCCESS"
    if (paymentMethod === "upi_online") {
      transactionStatus = "ON_HOLD"
      paymentStatus = "PENDING_VERIFICATION"
    } else if (paymentMethod === "upi_on_delivery" || paymentMethod === "cod") {
      paymentStatus = "PENDING_UPON_DELIVERY"
      transactionStatus = "PENDING"
    }

    // Create order and order items in DB
    const order = await prisma.order.create({
      data: {
        buyerId: Number(buyerId),
        customerDetails,
        paymentMethod,
        paymentStatus,
        transactionStatus,
        orderStatus: "PLACED",
        totalAmount,
        subtotal,
        deliveryFee,
        paymentDetails: paymentDetails || {},
        imageProof: [],
        items: {
          create: items.map((item: any) => ({
            productId: Number(item.itemId),
            quantity: item.quantity,
            price: item.price,
            name: item.name,
            image: item.image,
          })),
        },
      },
      include: { 
        items: {
          include: {
            product: {
              include: {
                seller: true
              }
            }
          }
        } 
      },
    })

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      order: {
        id: order.id,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        transactionStatus: order.transactionStatus,
        paymentMethod: order.paymentMethod,
        totalAmount: order.totalAmount,
        estimatedDelivery: "30-45 minutes",
      },
    })
  } catch (error) {
    console.error("Error placing order:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const buyerId = searchParams.get("buyerId")
  const orderId = searchParams.get("orderId")

  try {
    if (orderId) {
      const order = await prisma.order.findUnique({
        where: { id: Number(orderId) },
        include: { 
          items: {
            include: {
              product: {
                include: {
                  seller: true
                }
              }
            }
          } 
        },
      })
      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 })
      }
      return NextResponse.json({ order })
    }
    if (buyerId) {
      const orders = await prisma.order.findMany({
        where: { buyerId: Number(buyerId) },
        include: { 
          items: {
            include: {
              product: {
                include: {
                  seller: true
                }
              }
            }
          } 
        },
      })
      return NextResponse.json({ orders })
    }
    const orders = await prisma.order.findMany({ 
      include: { 
        items: {
          include: {
            product: {
              include: {
                seller: true
              }
            }
          }
        } 
      } 
    })
    return NextResponse.json({ orders })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get("orderId")
  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 })
  }
  try {
    const body = await request.json()
    const { paymentMethod, paymentDetails } = body
    const order = await prisma.order.update({
      where: { id: Number(orderId) },
      data: {
        paymentMethod,
        paymentDetails,
        paymentStatus: paymentMethod === "upi_online" ? "PENDING_VERIFICATION" : paymentMethod === "cod" || paymentMethod === "upi_on_delivery" ? "PENDING_UPON_DELIVERY" : "COMPLETED",
        transactionStatus: paymentMethod === "upi_online" ? "ON_HOLD" : paymentMethod === "cod" || paymentMethod === "upi_on_delivery" ? "PENDING" : "SUCCESS",
      },
    })
    return NextResponse.json({ success: true, order })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
