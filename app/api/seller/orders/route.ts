import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sellerId = searchParams.get("sellerId")
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "10")
  const skip = (page - 1) * limit

  if (!sellerId) {
    return NextResponse.json({ error: "Seller ID is required" }, { status: 400 })
  }

  try {
    // Get orders that contain products from this seller
    const [orders, totalCount] = await Promise.all([
      prisma.order.findMany({
        where: {
          items: {
            some: {
              product: {
                sellerId: Number(sellerId)
              }
            }
          }
        },
        select: {
          id: true,
          orderNumber: true,
          orderStatus: true,
          customerName: true,
          customerPhone: true,
          customerAddress: true,
          customerCity: true,
          customerArea: true,
          totalAmount: true,
          paymentStatus: true,
          paymentMethod: true,
          createdAt: true,
          updatedAt: true,
          items: {
            where: {
              product: {
                sellerId: Number(sellerId)
              }
            },
            select: {
              id: true,
              productId: true,
              productName: true,
              quantity: true,
              unitPrice: true,
              totalPrice: true,
              productImage: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  sellerId: true
                }
              }
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
        where: {
          items: {
            some: {
              product: {
                sellerId: Number(sellerId)
              }
            }
          }
        }
      })
    ])

    // Calculate seller-specific totals for each order
    const ordersWithSellerTotals = orders.map(order => {
      const sellerItems = order.items
      const sellerSubtotal = sellerItems.reduce((sum, item) => sum + item.totalPrice, 0)
      const commission = sellerSubtotal * 0.05 // 5% commission
      const netAmount = sellerSubtotal - commission

      return {
        ...order,
        sellerSubtotal,
        commission,
        netAmount,
        itemsCount: sellerItems.length
      }
    })

    return NextResponse.json({
      orders: ordersWithSellerTotals,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    })
  } catch (error) {
    console.error("Error fetching seller orders:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 