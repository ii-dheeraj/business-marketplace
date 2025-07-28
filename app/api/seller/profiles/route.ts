import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"
import { getCategoryById } from "@/utils/category-data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 10
    const featured = searchParams.get("featured") === "true"
    
    if (id) {
      // Get a single seller profile by id
      const { data: seller, error } = await supabase
        .from('sellers')
        .select('*, products(*)')
        .eq('id', Number(id))
        .single()
      
      if (error || !seller) {
        console.error("[DEBUG] Seller not found or error:", error)
        return NextResponse.json({ error: "Seller not found" }, { status: 404 })
      }

      // Get seller stats
      const { data: orderStats, error: orderError } = await supabase
        .from('seller_orders')
        .select('subtotal, netAmount')
        .eq('sellerId', Number(id))

      const totalOrders = orderStats?.length || 0
      const totalRevenue = orderStats?.reduce((sum, order) => sum + (order.subtotal || 0), 0) || 0
      const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0
      const totalProducts = Array.isArray(seller.products) ? seller.products.length : 0

      // Parse subcategories from JSON string
      let subcategories: any[] = []
      try {
        subcategories = seller.subcategories ? JSON.parse(seller.subcategories) : []
      } catch (e) {
        console.warn("[DEBUG] Failed to parse subcategories for seller", seller.id, e)
        subcategories = []
      }

      // Format seller data for frontend
      const formattedSeller = {
        id: seller.id,
        name: seller.name || '',
        businessName: seller.businessName || seller.name || '',
        email: seller.email || '',
        phone: seller.phone || '',
        category: seller.category || '',
        categoryName: getCategoryById(seller.category)?.name || seller.category || '',
        subcategories: subcategories,
        description: seller.businessDescription || '',
        image: seller.businessImage || '/placeholder.svg',
        city: seller.businessCity || '',
        area: seller.businessArea || '',
        locality: seller.businessLocality || '',
        state: seller.businessState || '',
        pincode: seller.businessPincode || '',
        address: seller.businessAddress || '',
        openingHours: seller.openingHours || '',
        rating: seller.rating ?? 0,
        reviews: seller.totalReviews ?? 0,
        deliveryTime: seller.deliveryTime || '30-45 min',
        isVerified: seller.isVerified ?? false,
        isPromoted: seller.isPromoted ?? false,
        isOpen: seller.isOpen ?? true,
        totalProducts,
        totalOrders,
        totalRevenue,
        averageOrderValue,
        products: Array.isArray(seller.products) ? seller.products.map((product: any) => ({
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

      console.debug("[DEBUG] Single seller profile formatted:", formattedSeller)
      return NextResponse.json({ seller: formattedSeller })
    }

    // Get multiple seller profiles - simplified query
    let query = supabase
      .from('sellers')
      .select('*')

    if (featured) {
      query = query.eq('isPromoted', true)
    }

    const { data: sellers, error } = await query.limit(limit)

    if (error) {
      console.error("[DEBUG] Failed to fetch sellers:", error)
      return NextResponse.json({ error: "Failed to fetch sellers" }, { status: 500 })
    }

    console.debug("[DEBUG] Raw sellers from Supabase:", sellers)

    // Map to seller profile format expected by the frontend
    const formatted = (sellers || []).map((s) => {
      let subcategories: any[] = []
      try {
        subcategories = s.subcategories ? JSON.parse(s.subcategories) : []
      } catch (e) {
        console.warn("[DEBUG] Failed to parse subcategories for seller", s.id, e)
        subcategories = []
      }

      return {
        id: s.id,
        name: s.name || '',
        businessName: s.businessName || s.name || '',
        email: s.email || '',
        phone: s.phone || '',
        category: s.category || '',
        categoryName: getCategoryById(s.category)?.name || s.category || '',
        subcategories: subcategories,
        description: s.businessDescription || '',
        image: s.businessImage || '/placeholder.svg',
        city: s.businessCity || '',
        area: s.businessArea || '',
        locality: s.businessLocality || '',
        state: s.businessState || '',
        pincode: s.businessPincode || '',
        address: s.businessAddress || '',
        openingHours: s.openingHours || '',
        rating: s.rating ?? 0,
        reviews: s.totalReviews ?? 0,
        deliveryTime: s.deliveryTime || "30-45 min",
        isVerified: s.isVerified ?? false,
        isPromoted: s.isPromoted ?? false,
        isOpen: s.isOpen ?? true,
        totalProducts: 0, // Will be calculated separately if needed
        totalOrders: 0, // Will be calculated separately if needed
        totalRevenue: 0, // Will be calculated separately if needed
        averageOrderValue: 0, // Will be calculated separately if needed
        products: [] // Will be fetched separately if needed
      }
    })

    console.debug("[DEBUG] Formatted seller profiles:", formatted)
    return NextResponse.json({ sellers: formatted })
  } catch (error) {
    console.error("Seller profiles API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 