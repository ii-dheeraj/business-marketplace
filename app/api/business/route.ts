import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (id) {
      // Get a single business (seller) by id
      const business = await prisma.user.findUnique({
        where: { id: Number(id), userType: "seller" },
        include: { products: true },
      })
      if (!business) return NextResponse.json({ error: "Business not found" }, { status: 404 })
      return NextResponse.json({ business })
    }
    // Get all sellers (userType === 'seller') and their products
    const businesses = await prisma.user.findMany({
      where: { userType: "seller" },
      include: { products: true },
    })
    // Map to business format expected by the frontend
    const formatted = businesses.map((b) => ({
      id: b.id,
      name: b.name,
      category: b.products.length > 0 ? b.products[0].category || "General" : "General",
      rating: 4.5, // Placeholder, can be calculated from reviews if available
      reviews: 0, // Placeholder
      deliveryTime: "30-45 min", // Placeholder
      image: "/placeholder.svg?height=200&width=300",
      city: "", // Placeholder, add to User model if needed
      area: "", // Placeholder, add to User model if needed
      locality: "", // Placeholder, add to User model if needed
      promoted: false, // Placeholder, add to User model if needed
      products: b.products,
    }))
    return NextResponse.json({ businesses: formatted })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, email, phone, category, city, area, locality, address, promoted } = body
    if (!id) return NextResponse.json({ error: "Missing business id" }, { status: 400 })
    const updated = await prisma.user.update({
      where: { id: Number(id), userType: "seller" },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(phone && { phone }),
        ...(category && { category }),
        ...(city && { city }),
        ...(area && { area }),
        ...(locality && { locality }),
        ...(address && { address }),
        ...(typeof promoted === "boolean" ? { promoted } : {}),
      },
    })
    return NextResponse.json({ success: true, business: updated })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 