import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createOrder, createSellerOrder, createPayment } from "@/lib/database"
import { realtimeManager } from "@/lib/realtime"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      customerId, 
      items, 
      customerDetails, 
      paymentMethod, 
      totalAmount, 
      subtotal, 
      deliveryFee,
      taxAmount = 0,
      deliveryInstructions 
    } = body

    if (!customerId || !items || !customerDetails || !paymentMethod || !totalAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Group items by seller
    const itemsBySeller = new Map()
    
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: Number(item.productId) },
        include: { seller: true }
      })
      
      if (!product) {
        return NextResponse.json({ error: `Product ${item.productId} not found` }, { status: 404 })
      }
      
      const sellerId = product.sellerId
      if (!itemsBySeller.has(sellerId)) {
        itemsBySeller.set(sellerId, [])
      }
      
      itemsBySeller.get(sellerId).push({
        productId: product.id,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity,
        productName: product.name,
        productImage: product.image,
        productCategory: product.category
      })
    }

    // Create the main order
    const orderData = {
      customerId: Number(customerId),
      customerName: customerDetails.name,
      customerPhone: customerDetails.phone,
      customerAddress: customerDetails.address,
      customerCity: customerDetails.city,
      customerArea: customerDetails.area,
      customerLocality: customerDetails.locality,
      subtotal,
      deliveryFee,
      taxAmount,
      totalAmount,
      paymentMethod: paymentMethod.toUpperCase(),
      deliveryInstructions,
      items: items.map((item: any) => ({
        productId: Number(item.productId),
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity,
        productName: item.name,
        productImage: item.image,
        productCategory: item.category
      }))
    }

    const order = await createOrder(orderData)

    // Create seller orders for each seller
    const sellerOrders = []
    for (const [sellerId, sellerItems] of itemsBySeller) {
      const sellerSubtotal = sellerItems.reduce((sum: number, item: any) => sum + item.totalPrice, 0)
      const commission = sellerSubtotal * 0.05 // 5% commission
      const netAmount = sellerSubtotal - commission
      
      const sellerOrder = await createSellerOrder({
        orderId: order.id,
        sellerId,
        items: sellerItems,
        subtotal: sellerSubtotal,
        commission,
        netAmount
      })
      
      sellerOrders.push(sellerOrder)
    }

    // Create payment record
    const paymentStatus = paymentMethod.toUpperCase() === 'CASH_ON_DELIVERY' ? 'PENDING' : 'COMPLETED'
    
    const payment = await createPayment({
      orderId: order.id,
      customerId: Number(customerId),
      amount: totalAmount,
      paymentMethod: paymentMethod.toUpperCase() as 'CASH_ON_DELIVERY' | 'ONLINE_PAYMENT' | 'WALLET',
      transactionId: paymentMethod.toUpperCase() !== 'CASH_ON_DELIVERY' ? `TXN-${Date.now()}` : undefined,
      gateway: paymentMethod.toUpperCase() !== 'CASH_ON_DELIVERY' ? 'PAYMENT_GATEWAY' : undefined
    })

    // Update order payment status
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentStatus: paymentStatus as 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' }
    })

    // Create initial tracking entry
    await prisma.orderTracking.create({
      data: {
        orderId: order.id,
        status: 'ORDER_PLACED',
        description: 'Order has been placed successfully and is being processed.',
        location: 'Order Processing Center'
      }
    })

    // Send real-time notifications
    try {
      // Notify customer about order placement
      await realtimeManager.sendNotification(customerId.toString(), {
        type: 'order_update',
        title: 'Order Placed Successfully! 🎉',
        message: `Your order #${order.orderNumber} has been placed and is being processed.`,
        data: {
          orderId: order.id,
          orderNumber: order.orderNumber,
          totalAmount: order.totalAmount,
          estimatedDelivery: "30-45 minutes"
        },
        timestamp: new Date(),
        userId: customerId.toString()
      })

      // Notify all sellers involved
      for (const [sellerId, sellerItems] of itemsBySeller) {
        const sellerSubtotal = sellerItems.reduce((sum: number, item: any) => sum + item.totalPrice, 0)
        
        await realtimeManager.sendNotification(sellerId.toString(), {
          type: 'order_update',
          title: 'New Order Received! 📦',
          message: `You have received a new order #${order.orderNumber} worth ₹${sellerSubtotal.toFixed(2)}`,
          data: {
            orderId: order.id,
            orderNumber: order.orderNumber,
            items: sellerItems,
            subtotal: sellerSubtotal,
            customerName: customerDetails.name
          },
          timestamp: new Date(),
          userId: sellerId.toString()
        })
      }
    } catch (error) {
      console.error("Error sending real-time notifications:", error)
      // Don't fail the order if notifications fail
    }

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        totalAmount: order.totalAmount,
        estimatedDelivery: "30-45 minutes",
        sellerOrders: sellerOrders.length
      },
    })
  } catch (error) {
    console.error("Error placing order:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const customerId = searchParams.get("customerId")
  const orderId = searchParams.get("orderId")
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "10")
  const skip = (page - 1) * limit

  try {
    if (orderId) {
      const order = await prisma.order.findUnique({
        where: { id: Number(orderId) },
        include: { 
          items: true,
          customer: true,
          sellerOrders: {
            include: {
              seller: true
            }
          },
          payments: true
        },
      })
      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 })
      }
      return NextResponse.json({ order })
    }
    
    if (customerId) {
      const [orders, totalCount] = await Promise.all([
        prisma.order.findMany({
          where: { customerId: Number(customerId) },
          select: {
            id: true,
            orderNumber: true,
            orderStatus: true,
            customerName: true,
            customerPhone: true,
            totalAmount: true,
            paymentStatus: true,
            paymentMethod: true,
            createdAt: true,
            updatedAt: true,
            items: {
              select: {
                id: true,
                productName: true,
                quantity: true,
                unitPrice: true,
                totalPrice: true,
                productImage: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          skip,
          take: limit
        }),
        prisma.order.count({
          where: { customerId: Number(customerId) }
        })
      ])
      return NextResponse.json({ 
        orders,
        pagination: {
          page,
          limit,
          total: totalCount,
          totalPages: Math.ceil(totalCount / limit)
        }
      })
    }
    
    // For admin/seller dashboard - optimized with pagination
    const [orders, totalCount] = await Promise.all([
      prisma.order.findMany({ 
        select: {
          id: true,
          orderNumber: true,
          orderStatus: true,
          customerName: true,
          customerPhone: true,
          totalAmount: true,
          paymentStatus: true,
          paymentMethod: true,
          createdAt: true,
          updatedAt: true,
          items: {
            select: {
              id: true,
              productName: true,
              quantity: true,
              unitPrice: true,
              totalPrice: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.order.count()
    ])
    
    return NextResponse.json({ 
      orders,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
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
    const { 
      orderStatus, 
      paymentStatus, 
      deliveryAgentId,
      estimatedDeliveryTime,
      actualDeliveryTime
    } = body
    
    const updateData: any = {
      ...(orderStatus && { orderStatus }),
      ...(paymentStatus && { paymentStatus }),
      ...(deliveryAgentId && { deliveryAgentId: Number(deliveryAgentId) }),
      ...(estimatedDeliveryTime && { estimatedDeliveryTime: new Date(estimatedDeliveryTime) }),
      ...(actualDeliveryTime && { actualDeliveryTime: new Date(actualDeliveryTime) })
    }
    
    const order = await prisma.order.update({
      where: { id: Number(orderId) },
      data: updateData,
      include: {
        items: true,
        customer: true,
        sellerOrders: {
          include: {
            seller: true
          }
        },
        payments: true
      }
    })

    // Create tracking entry for status change
    if (orderStatus) {
      await prisma.orderTracking.create({
        data: {
          orderId: order.id,
          status: orderStatus,
          description: getStatusDescription(orderStatus),
          location: getStatusLocation(orderStatus)
        }
      })
    }

    // Send real-time notifications for order status changes
    if (orderStatus) {
      try {
        // Notify customer about order status change
        await realtimeManager.sendOrderStatusChange(
          order.customerId.toString(),
          order.id.toString(),
          order.orderNumber,
          orderStatus,
          order.orderStatus
        )

        // Notify sellers about order status change
        for (const sellerOrder of order.sellerOrders) {
          await realtimeManager.sendOrderStatusChange(
            sellerOrder.sellerId.toString(),
            order.id.toString(),
            order.orderNumber,
            orderStatus
          )
        }

        // Special notification for delivery updates
        if (orderStatus === 'OUT_FOR_DELIVERY' || orderStatus === 'IN_TRANSIT') {
          await realtimeManager.sendDeliveryUpdate(
            order.customerId.toString(),
            order.id.toString(),
            order.orderNumber,
            orderStatus,
            `Order #${order.orderNumber} is being delivered to you. Estimated delivery: 15-30 minutes.`
          )
        }

        if (orderStatus === 'DELIVERED') {
          await realtimeManager.sendDeliveryUpdate(
            order.customerId.toString(),
            order.id.toString(),
            order.orderNumber,
            orderStatus,
            `Your order #${order.orderNumber} has been successfully delivered. Enjoy your purchase!`
          )
        }

      } catch (error) {
        console.error("Error sending real-time notifications:", error)
        // Don't fail the update if notifications fail
      }
    }
    
    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Helper functions for status descriptions and locations
function getStatusDescription(status: string): string {
  const descriptions: { [key: string]: string } = {
    'ORDER_PLACED': 'Order has been placed successfully and is being processed.',
    'ORDER_CONFIRMED': 'Order has been confirmed by the seller and is being prepared.',
    'PREPARING_ORDER': 'Your order is being prepared by the seller.',
    'READY_FOR_PICKUP': 'Order is ready for pickup by delivery agent.',
    'PICKED_UP': 'Order has been picked up by delivery agent.',
    'IN_TRANSIT': 'Order is in transit to your location.',
    'OUT_FOR_DELIVERY': 'Order is out for delivery and will arrive soon.',
    'DELIVERED': 'Order has been successfully delivered to your address.',
    'CANCELLED': 'Order has been cancelled.'
  }
  return descriptions[status] || 'Order status has been updated.'
}

function getStatusLocation(status: string): string {
  const locations: { [key: string]: string } = {
    'ORDER_PLACED': 'Order Processing Center',
    'ORDER_CONFIRMED': 'Seller Location',
    'PREPARING_ORDER': 'Seller Kitchen/Store',
    'READY_FOR_PICKUP': 'Seller Location',
    'PICKED_UP': 'In Transit',
    'IN_TRANSIT': 'Delivery Route',
    'OUT_FOR_DELIVERY': 'Your Area',
    'DELIVERED': 'Your Address',
    'CANCELLED': 'Order Processing Center'
  }
  return locations[status] || 'Processing Center'
}
