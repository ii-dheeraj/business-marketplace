import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCategoryById, getSubcategoriesByCategory } from "@/utils/category-data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    if (id) {
      // Get a single business (seller) by id
      const business = await prisma.seller.findUnique({
        where: { id: Number(id) },
        include: { 
          products: {
            where: {
              isActive: true
            }
          } 
        },
      })
      
      if (!business) {
        return NextResponse.json({ error: "Business not found" }, { status: 404 })
      }
      
      // Parse subcategories from JSON string
      const subcategories = business.subcategories ? JSON.parse(business.subcategories) : [];
      
      // Format business data for frontend
      const formattedBusiness = {
        id: business.id,
        name: business.businessName || business.name,
        ownerName: business.name || '',
        email: business.email || '',
        phone: business.phone || '',
        category: business.category,
        subcategories: subcategories,
        categoryName: getCategoryById(business.category)?.name || business.category,
        description: business.businessDescription || '',
        image: business.businessImage || '/placeholder.svg',
        location: business.businessAddress || '',
        city: business.businessCity || '',
        area: business.businessArea || '',
        locality: business.businessLocality || '',
        rating: business.rating,
        reviews: business.totalReviews,
        deliveryTime: business.deliveryTime || '30-45 min',
        distance: '2.5 km', // Placeholder - can be calculated based on location
        isOpen: business.isOpen,
        isVerified: business.isVerified,
        isPromoted: business.isPromoted,
        products: business.products.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          category: product.category,
          subcategory: product.subcategory,
          stock: product.stock,
          inStock: product.inStock
        }))
      }
      
      return NextResponse.json({ business: formattedBusiness })
    }
    
    // Get all sellers and their products
    const businesses = await prisma.seller.findMany({
      where: { isOpen: true },
      include: { 
        products: {
          where: {
            isActive: true
          }
        } 
      },
    })
    
    // Map to business format expected by the frontend
    const formatted = businesses.map((b) => {
      // Parse subcategories from JSON string
      const subcategories = b.subcategories ? JSON.parse(b.subcategories) : [];
      
      return {
        id: b.id,
        name: b.businessName,
        category: b.category,
        subcategories: subcategories,
        categoryName: getCategoryById(b.category)?.name || b.category,
        rating: b.rating,
        reviews: b.totalReviews,
        deliveryTime: b.deliveryTime || "30-45 min",
        image: b.businessImage || "/placeholder.svg",
        city: b.businessCity,
        area: b.businessArea,
        locality: b.businessLocality,
        promoted: b.isPromoted,
        isVerified: b.isVerified,
        isOpen: b.isOpen,
        products: b.products.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          category: product.category,
          subcategory: product.subcategory,
          stock: product.stock,
          inStock: product.inStock
        }))
      }
    })
    
    return NextResponse.json({ businesses: formatted })
  } catch (error) {
    console.error("Business API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      id, 
      businessName, 
      email, 
      phone, 
      category, 
      subcategories, 
      businessCity, 
      businessArea, 
      businessLocality, 
      businessAddress, 
      businessDescription,
      isPromoted,
      isOpen,
      deliveryTime
    } = body
    
    if (!id) {
      return NextResponse.json({ error: "Missing business id" }, { status: 400 })
    }
    
    const updated = await prisma.seller.update({
      where: { id: Number(id) },
      data: {
        ...(businessName && { businessName }),
        ...(email && { email }),
        ...(phone && { phone }),
        ...(category && { category }),
        ...(subcategories && { subcategories: JSON.stringify(subcategories) }),
        ...(businessCity && { businessCity }),
        ...(businessArea && { businessArea }),
        ...(businessLocality && { businessLocality }),
        ...(businessAddress && { businessAddress }),
        ...(businessDescription && { businessDescription }),
        ...(typeof isPromoted === "boolean" ? { isPromoted } : {}),
        ...(typeof isOpen === "boolean" ? { isOpen } : {}),
        ...(deliveryTime && { deliveryTime }),
      },
    })
    
    return NextResponse.json({ success: true, business: updated })
  } catch (error) {
    console.error("Business update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 