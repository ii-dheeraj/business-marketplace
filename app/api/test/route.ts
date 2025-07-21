import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Test database connection and performance
    const startTime = Date.now()
    
    const [orderCount, productCount, customerCount] = await Promise.all([
      prisma.order.count(),
      prisma.product.count(),
      prisma.customer.count()
    ])
    
    const endTime = Date.now()
    const queryTime = endTime - startTime
    
    // Test optimized product query
    const productStart = Date.now()
    const products = await prisma.product.findMany({
      take: 5,
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        seller: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    const productQueryTime = Date.now() - productStart
    
    return NextResponse.json({
      success: true,
      performance: {
        totalQueryTime: queryTime,
        productQueryTime: productQueryTime,
        queriesPerSecond: (1000 / queryTime).toFixed(2)
      },
      counts: {
        orders: orderCount,
        products: productCount,
        customers: customerCount
      },
      sampleProducts: products.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        stock: p.stock,
        sellerName: p.seller.name
      }))
    })
  } catch (error) {
    console.error("Database test error:", error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 })
  }
} 