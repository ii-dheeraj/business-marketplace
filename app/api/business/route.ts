import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"
import { getCategoryById, getSubcategoriesByCategory } from "@/utils/category-data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    if (id) {
      // Get a single business (seller) by id
      const { data: business, error } = await supabase
        .from('sellers')
        .select('*, products(*)')
        .eq('id', id)
        .single()
      if (error || !business) {
        console.error("[DEBUG] Business not found or error:", error)
        return NextResponse.json({ error: "Business not found" }, { status: 404 })
      }
      // Handle subcategories (now stored as PostgreSQL array, not JSON string)
      let subcategories: any[] = []
      if (business.subcategories) {
        if (Array.isArray(business.subcategories)) {
          subcategories = business.subcategories
        } else if (typeof business.subcategories === 'string') {
          try {
            subcategories = JSON.parse(business.subcategories)
          } catch (e) {
            console.warn("[DEBUG] Failed to parse subcategories for business", business.id, e)
            subcategories = []
          }
        }
      }
      // Format business data for frontend
      const formattedBusiness = {
        id: business.id,
        name: business.businessName || business.name || '',
        ownerName: business.name || '',
        email: business.email || '',
        phone: business.phone || '',
        category: business.category || '',
        subcategories: subcategories,
        subcategory: subcategories[0] || '',
        categoryName: getCategoryById(business.category)?.name || business.category || '',
        description: business.businessDescription || '',
        image: business.businessImage || '/placeholder.svg',
        location: business.businessAddress || '',
        city: business.businessCity || '',
        state: business.businessState || '',
        pincode: business.businessPincode || '',
        area: business.businessArea || '',
        locality: business.businessLocality || '',
        openingHours: business.openingHours || '',
        rating: business.rating ?? 0,
        reviews: business.totalReviews ?? 0,
        deliveryTime: business.deliveryTime || '30-45 min',
        distance: '2.5 km',
        isOpen: business.isOpen ?? true,
        isVerified: business.isVerified ?? false,
        isPromoted: business.isPromoted ?? false,
        products: Array.isArray(business.products) ? business.products.map((product: any) => ({
          id: product.id,
          name: product.name || '',
          description: product.description || '',
          price: product.price ?? 0,
          originalPrice: product.originalPrice ?? 0,
          image: product.image || '/placeholder.svg',
          category: product.category || '',
          subcategory: product.subcategory || '',
          stock: product.stock ?? 0,
          inStock: product.inStock ?? true
        })) : []
      }
      console.debug("[DEBUG] Single business formatted:", formattedBusiness)
      return NextResponse.json({ business: formattedBusiness })
    }
    // Get all sellers and their products
    const { data: businesses, error } = await supabase
      .from('sellers')
      .select('*, products(*)')
      .eq('is_open', true)
    if (error) {
      console.error("[DEBUG] Failed to fetch businesses:", error)
      return NextResponse.json({ error: "Failed to fetch businesses" }, { status: 500 })
    }
    console.debug("[DEBUG] Raw businesses from Supabase:", businesses)
    // Map to business format expected by the frontend
    const formatted = (businesses || []).map((b) => {
      let subcategories: any[] = []
      try {
        subcategories = b.subcategories ? JSON.parse(b.subcategories) : []
      } catch (e) {
        console.warn("[DEBUG] Failed to parse subcategories for business", b.id, e)
        subcategories = []
      }
      return {
        id: b.id,
        name: b.business_name || b.name || '',
        category: b.category || '',
        subcategories: subcategories,
        categoryName: getCategoryById(b.category)?.name || b.category || '',
        rating: b.rating ?? 0,
        reviews: b.total_reviews ?? 0,
        deliveryTime: b.delivery_time || "30-45 min",
        image: b.business_image || "/placeholder.svg",
        city: b.business_city || '',
        area: b.business_area || '',
        locality: b.business_locality || '',
        promoted: b.is_promoted ?? false,
        isVerified: b.is_verified ?? false,
        isOpen: b.is_open ?? true,
        products: Array.isArray(b.products) ? b.products.map((product: any) => ({
          id: product.id,
          name: product.name || '',
          description: product.description || '',
          price: product.price ?? 0,
          originalPrice: product.originalPrice ?? 0,
          image: product.image || '/placeholder.svg',
          category: product.category || '',
          subcategory: product.subcategory || '',
          stock: product.stock ?? 0,
          inStock: product.inStock ?? true
        })) : []
      }
    })
    console.debug("[DEBUG] Formatted businesses:", formatted)
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
    const updateData: any = {
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
    }
    const { data: updated, error } = await supabase
      .from('sellers')
      .update(updateData)
      .eq('id', Number(id))
      .select()
      .single()
    if (error) {
      return NextResponse.json({ error: "Failed to update business" }, { status: 500 })
    }
    return NextResponse.json({ success: true, business: updated })
  } catch (error) {
    console.error("Business update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 