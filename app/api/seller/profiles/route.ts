import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"

// Helper function to get category name by ID
function getCategoryById(categoryId: string) {
  const categories = {
    'electronics': { name: 'Electronics', icon: '📱' },
    'fashion': { name: 'Fashion', icon: '👕' },
    'home-garden': { name: 'Home & Garden', icon: '🏠' },
    'services': { name: 'Services', icon: '🔧' },
    'digital-products': { name: 'Digital Products', icon: '💻' },
    'food-beverages': { name: 'Food & Beverages', icon: '🍕' },
    'health-beauty': { name: 'Health & Beauty', icon: '💄' },
    'sports-outdoors': { name: 'Sports & Outdoors', icon: '⚽' },
    'books-media': { name: 'Books & Media', icon: '📚' },
    'automotive': { name: 'Automotive', icon: '🚗' }
  }
  return categories[categoryId as keyof typeof categories] || { name: categoryId, icon: '🏪' }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const featured = searchParams.get("featured") === "true"
    const limit = parseInt(searchParams.get("limit") || "10")

    console.log("[DEBUG] Seller profiles API called with params:", { id, featured, limit })

    if (id) {
      // Get single seller profile
      const { data: seller, error } = await supabase
        .from('sellers')
        .select(`
          *,
          products(
            id,
            title,
            description,
            type,
            category,
            subcategory,
            is_active,
            created_at,
            product_pricing(selling_price, original_price, quantity_available, is_in_stock),
            product_images(image_url, is_primary)
          )
        `)
        .eq('id', id)
        .single()

      console.debug("[DEBUG] Raw seller data from DB:", seller)

      if (error || !seller) {
        console.error("[DEBUG] Seller not found:", id, error)
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
        products: Array.isArray(seller.products) ? seller.products.map((product: any) => {
          const pricing = product.product_pricing?.[0] || {}
          const primaryImage = product.product_images?.find((img: any) => img.is_primary) || product.product_images?.[0]
          
          return {
            id: product.id,
            name: product.title || product.name || '',
            description: product.description || '',
            price: pricing.selling_price ?? 0,
            originalPrice: pricing.original_price ?? 0,
            image: primaryImage?.image_url || product.image || '/placeholder.svg',
            category: product.category || '',
            subcategory: product.subcategory || '',
            stock: pricing.quantity_available ?? 0,
            inStock: pricing.is_in_stock ?? true,
            type: product.type || 'physical'
          }
        }) : []
      }

      console.debug("[DEBUG] Single seller profile formatted:", formattedSeller)
      console.debug("[DEBUG] Raw business_description from DB:", seller.business_description)
      console.debug("[DEBUG] Mapped description field:", formattedSeller.description)
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
        rating: s.rating ?? 0,
        reviews: s.total_reviews ?? 0,
        deliveryTime: s.delivery_time || '30-45 min',
        isVerified: s.is_verified ?? false,
        isPromoted: s.is_promoted ?? false,
        isOpen: s.is_open ?? true
      }
    })

    console.debug("[DEBUG] Formatted sellers:", formatted)
    console.debug("[DEBUG] Sample seller business_description:", sellers?.[0]?.business_description)
    console.debug("[DEBUG] Sample mapped description:", formatted?.[0]?.description)
    return NextResponse.json({ sellers: formatted })

  } catch (error) {
    console.error("[DEBUG] Unexpected error in seller profiles API:", error)
    return NextResponse.json({ 
      error: "Internal server error", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 })
  }
} 