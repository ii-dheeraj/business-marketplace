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
        .eq('id', id)
        .single()
      
      if (error || !seller) {
        console.error("[DEBUG] Seller not found or error:", error)
        return NextResponse.json({ error: "Seller not found" }, { status: 404 })
      }

      // Get seller stats
      const { data: orderStats, error: orderError } = await supabase
        .from('seller_orders')
        .select('subtotal, net_amount')
        .eq('seller_id', id)

      const totalOrders = orderStats?.length || 0
      const totalRevenue = orderStats?.reduce((sum, order) => sum + (order.subtotal || 0), 0) || 0
      const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0
      const totalProducts = Array.isArray(seller.products) ? seller.products.length : 0

      // Handle subcategories (now stored as PostgreSQL array, not JSON string)
      let subcategories: any[] = []
      if (seller.subcategories) {
        if (Array.isArray(seller.subcategories)) {
          subcategories = seller.subcategories
        } else if (typeof seller.subcategories === 'string') {
          try {
            subcategories = JSON.parse(seller.subcategories)
          } catch (e) {
            console.warn("[DEBUG] Failed to parse subcategories for seller", seller.id, e)
            subcategories = []
          }
        }
      }

      // Format seller data for frontend
      const formattedSeller = {
        id: seller.id,
        name: seller.name || '',
        businessName: seller.business_name || seller.name || '',
        email: seller.email || '',
        phone: seller.phone || '',
        category: seller.category || '',
        categoryName: getCategoryById(seller.category)?.name || seller.category || '',
        subcategories: subcategories,
        description: seller.business_description || '',
        image: seller.business_image || '/placeholder.svg',
        city: seller.business_city || '',
        area: seller.business_area || '',
        locality: seller.business_locality || '',
        state: seller.business_state || '',
        pincode: seller.business_pincode || '',
        address: seller.business_address || '',
        openingHours: seller.opening_hours || '',
        rating: seller.rating ?? 0,
        reviews: seller.total_reviews ?? 0,
        deliveryTime: seller.delivery_time || '30-45 min',
        isVerified: seller.is_verified ?? false,
        isPromoted: seller.is_promoted ?? false,
        isOpen: seller.is_open ?? true,
        totalProducts,
        totalOrders,
        totalRevenue,
        averageOrderValue,
                 products: Array.isArray(seller.products) ? seller.products.map((product: any) => ({
           id: product.id,
           name: product.title || product.name || '',
           description: product.description || '',
           price: product.selling_price ?? 0,
           originalPrice: product.original_price ?? 0,
           image: product.image_url || product.image || '/placeholder.svg',
           category: product.category || '',
           subcategory: product.subcategory || '',
           stock: product.quantity_available ?? 0,
           inStock: product.is_in_stock ?? true
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
      query = query.eq('is_promoted', true)
    }

    const { data: sellers, error } = await query.limit(limit)

    if (error) {
      console.error("[DEBUG] Failed to fetch sellers:", error)
      return NextResponse.json({ error: "Failed to fetch sellers" }, { status: 500 })
    }

    console.debug("[DEBUG] Raw sellers from Supabase:", sellers)

    // Map to seller profile format expected by the frontend
    const formatted = (sellers || []).map((s) => {
      // Handle subcategories (now stored as PostgreSQL array, not JSON string)
      let subcategories: any[] = []
      if (s.subcategories) {
        if (Array.isArray(s.subcategories)) {
          subcategories = s.subcategories
        } else if (typeof s.subcategories === 'string') {
          try {
            subcategories = JSON.parse(s.subcategories)
          } catch (e) {
            console.warn("[DEBUG] Failed to parse subcategories for seller", s.id, e)
            subcategories = []
          }
        }
      }

      return {
        id: s.id,
        name: s.name || '',
        businessName: s.business_name || s.name || '',
        email: s.email || '',
        phone: s.phone || '',
        category: s.category || '',
        categoryName: getCategoryById(s.category)?.name || s.category || '',
        subcategories: subcategories,
        description: s.business_description || '',
        image: s.business_image || '/placeholder.svg',
                 city: s.business_city || '',
         area: s.business_area || '',
         locality: s.business_locality || '',
         state: s.business_state || '',
         pincode: s.business_pincode || '',
         address: s.business_address || '',
         openingHours: s.opening_hours || '',
        rating: s.rating ?? 0,
                 reviews: s.total_reviews ?? 0,
         deliveryTime: s.delivery_time || "30-45 min",
         isVerified: s.is_verified ?? false,
         isPromoted: s.is_promoted ?? false,
         isOpen: s.is_open ?? true,
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