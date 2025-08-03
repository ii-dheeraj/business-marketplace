import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"
import { getCategoryById, getSubcategoriesByCategory } from "@/utils/category-data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    if (id) {
      // Get a single business (seller) by id with products
      const { data: business, error } = await supabase
        .from('sellers')
        .select('*, products(*)')
        .eq('id', id)
        .single()
      if (error || !business) {
        console.error("[DEBUG] Business not found or error:", error)
        return NextResponse.json({ error: "Business not found" }, { status: 404 })
      }
      // Handle subcategories (stored as PostgreSQL array)
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
        name: business.business_name || business.name || '',
        ownerName: business.name || '',
        email: business.email || '',
        phone: business.phone || '',
        category: business.category || '',
        subcategories: subcategories,
        subcategory: subcategories[0] || '',
        categoryName: getCategoryById(business.category)?.name || business.category || '',
        description: business.business_description || '',
        image: business.business_image || '/placeholder.svg',
        location: business.business_address || '',
        city: business.business_city || '',
        state: business.business_state || '',
        pincode: business.business_pincode || '',
        area: business.business_area || '',
        locality: business.business_locality || '',
        openingHours: business.opening_hours || '',
        rating: business.rating ?? 0,
        reviews: business.total_reviews ?? 0,
        deliveryTime: business.delivery_time || '30-45 min',
        distance: '2.5 km',
        isOpen: business.is_open ?? true,
        isVerified: business.is_verified ?? false,
        isPromoted: business.is_promoted ?? false,
        products: Array.isArray(business.products) ? business.products.map((product: any) => ({
          id: product.id,
          name: product.title || '',
          description: product.description || '',
          price: 0, // Will be fetched from product_pricing table later
          originalPrice: 0, // Will be fetched from product_pricing table later
          image: '/placeholder.svg', // Will be fetched from product_images table later
          category: product.category || '',
          subcategory: product.subcategory || '',
          stock: 0, // Will be fetched from product_pricing table later
          inStock: true // Will be fetched from product_pricing table later
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
      if (b.subcategories) {
        if (Array.isArray(b.subcategories)) {
          subcategories = b.subcategories
        } else if (typeof b.subcategories === 'string') {
          try {
            subcategories = JSON.parse(b.subcategories)
          } catch (e) {
            console.warn("[DEBUG] Failed to parse subcategories for business", b.id, e)
            subcategories = []
          }
        }
      }
      // Debug logging for business image
      console.log(`[DEBUG] Business ${b.business_name || b.name}: business_image = "${b.business_image}"`)
      
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
          name: product.title || '',
          description: product.description || '',
          price: 0, // Will be fetched from product_pricing table later
          originalPrice: 0, // Will be fetched from product_pricing table later
          image: '/placeholder.svg', // Will be fetched from product_images table later
          category: product.category || '',
          subcategory: product.subcategory || '',
          stock: 0, // Will be fetched from product_pricing table later
          inStock: true // Will be fetched from product_pricing table later
        })) : []
      }
    })
    console.debug("[DEBUG] Formatted businesses:", formatted)
    
    // If no businesses found, return sample data with proper images
    if (!formatted || formatted.length === 0) {
      console.log("[DEBUG] No businesses found in database, returning sample data")
      const sampleBusinesses = [
        {
          id: 1,
          name: "TechHub Electronics",
          category: "electronics",
          categoryName: "Electronics",
          rating: 4.5,
          reviews: 127,
          deliveryTime: "30-45 min",
          image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
          city: "Bangalore",
          area: "Koramangala",
          locality: "1st Block",
          promoted: true,
          isVerified: true,
          isOpen: true,
          products: [
            {
              id: 1,
              name: "Wireless Headphones",
              description: "Premium wireless headphones with noise cancellation",
              price: 2999,
              originalPrice: 3999,
              image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
              category: "electronics",
              subcategory: "audio",
              stock: 15,
              inStock: true
            }
          ]
        },
        {
          id: 2,
          name: "Fashion Forward Boutique",
          category: "fashion",
          categoryName: "Fashion",
          rating: 4.8,
          reviews: 89,
          deliveryTime: "45-60 min",
          image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
          city: "Bangalore",
          area: "Indiranagar",
          locality: "100 Feet Road",
          promoted: true,
          isVerified: true,
          isOpen: true,
          products: [
            {
              id: 2,
              name: "Designer Dress",
              description: "Elegant designer dress for special occasions",
              price: 2499,
              originalPrice: 3499,
              image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop",
              category: "fashion",
              subcategory: "women",
              stock: 8,
              inStock: true
            }
          ]
        },
        {
          id: 3,
          name: "Fresh Grocery Store",
          category: "grocery",
          categoryName: "Grocery",
          rating: 4.3,
          reviews: 156,
          deliveryTime: "20-30 min",
          image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
          city: "Bangalore",
          area: "HSR Layout",
          locality: "Sector 2",
          promoted: false,
          isVerified: true,
          isOpen: true,
          products: [
            {
              id: 3,
              name: "Organic Vegetables",
              description: "Fresh organic vegetables from local farms",
              price: 299,
              originalPrice: 399,
              image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&h=200&fit=crop",
              category: "grocery",
              subcategory: "vegetables",
              stock: 25,
              inStock: true
            }
          ]
        }
      ]
      return NextResponse.json({ businesses: sampleBusinesses })
    }
    
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
      ...(businessName && { business_name: businessName }),
      ...(email && { email }),
      ...(phone && { phone }),
      ...(category && { category }),
      ...(subcategories && { subcategories: JSON.stringify(subcategories) }),
      ...(businessCity && { business_city: businessCity }),
      ...(businessArea && { business_area: businessArea }),
      ...(businessLocality && { business_locality: businessLocality }),
      ...(businessAddress && { business_address: businessAddress }),
      ...(businessDescription && { business_description: businessDescription }),
      ...(typeof isPromoted === "boolean" ? { is_promoted: isPromoted } : {}),
      ...(typeof isOpen === "boolean" ? { is_open: isOpen } : {}),
      ...(deliveryTime && { delivery_time: deliveryTime }),
    }
    const { data: updated, error } = await supabase
      .from('sellers')
      .update(updateData)
      .eq('id', id)
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