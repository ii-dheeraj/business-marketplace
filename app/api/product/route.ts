import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Add a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, image, sellerId, category } = body
    if (!name || !price || !sellerId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        image,
        sellerId: Number(sellerId),
        category,
      },
    })
    return NextResponse.json({ success: true, product })
  } catch (error) {
    console.error("Error adding product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// List all products (optionally filter by sellerId)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sellerId = searchParams.get("sellerId")
  try {
    const products = await prisma.product.findMany({
      where: sellerId ? { sellerId: Number(sellerId) } : undefined,
    })
    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, name, description, price, image, category } = await request.json()
    if (!id) return NextResponse.json({ error: "Missing product id" }, { status: 400 })
    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(typeof price !== "undefined" && { price: Number(price) }),
        ...(image && { image }),
        ...(category && { category }),
      },
    })
    return NextResponse.json({ success: true, product: updated })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    if (!id) return NextResponse.json({ error: "Missing product id" }, { status: 400 })
    await prisma.product.delete({ where: { id: Number(id) } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 