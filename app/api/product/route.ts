import { type NextRequest, NextResponse } from "next/server"
import { supabase, createProduct, getProductWithDetails } from "@/lib/database"
import { realtimeManager } from "@/lib/realtime"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[PRODUCT API] Received product data:", body)

    const {
      sellerId,
      title,
      description,
      type = 'physical',
      category,
      subcategory,
      slug,
      tags = [],
      keywords = [],
      seoDescription,
      originalPrice,
      sellingPrice,
      discountPercent,
      unitLabel = 'piece',
      customUnit,
      sku,
      quantityAvailable = 0,
      minOrderQuantity = 1,
      maxOrderQuantity,
      isInStock = true,
      lowStockThreshold = 5,
      images = [],
      isActive = true,
      isFeatured = false,
      isPromoted = false
    } = body

    // Validate required fields
    if (!sellerId || !title || !sellingPrice) {
      return NextResponse.json({ 
        error: "Missing required fields: sellerId, title, and sellingPrice are required" 
      }, { status: 400 })
    }

    // Validate product type
    const validTypes = ['physical', 'digital', 'appointment', 'walkin', 'enquire']
    if (!validTypes.includes(type)) {
      return NextResponse.json({ 
        error: `Invalid product type. Must be one of: ${validTypes.join(', ')}` 
      }, { status: 400 })
    }

    // Create product using the new schema
    const product = await createProduct({
      sellerId,
      title,
      description,
      type,
      category,
      subcategory,
      slug,
      tags,
      keywords,
      seoDescription,
      originalPrice,
      sellingPrice,
      discountPercent,
      unitLabel,
      customUnit,
      sku,
      quantityAvailable,
      minOrderQuantity,
      maxOrderQuantity,
      isInStock,
      lowStockThreshold,
      images,
      isActive,
      isFeatured,
      isPromoted
    })

    // Send real-time notification to seller
    try {
      await realtimeManager.sendNotification(sellerId, {
        type: 'product_update',
        title: 'Product Added Successfully! 🎉',
        message: `Your ${type} product "${title}" has been added successfully.`,
        data: product,
        timestamp: new Date(),
        userId: sellerId
      })
    } catch (notifyErr) {
      console.error("[API] Failed to send real-time notification to seller:", sellerId, notifyErr)
      // Don't fail the product creation if notification fails
    }

    return NextResponse.json({ 
      success: true, 
      product,
      message: "Product created successfully" 
    })

  } catch (error) {
    console.error("[PRODUCT API] Error creating product:", error)
    return NextResponse.json({ 
      error: "Failed to create product", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sellerId = searchParams.get("sellerId")
    const category = searchParams.get("category")
    const type = searchParams.get("type")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const from = (page - 1) * limit
    const to = from + limit - 1

    console.log("[PRODUCT API] GET request params:", { sellerId, category, type, page, limit })

    let query = supabase
      .from('products')
      .select(`
        id,
        seller_id,
        title,
        description,
        type,
        category,
        subcategory,
        slug,
        tags,
        keywords,
        seo_description,
        is_active,
        is_featured,
        is_promoted,
        created_at,
        updated_at,
        product_pricing(
          original_price,
          selling_price,
          discount_percent,
          unit_label,
          custom_unit,
          sku,
          quantity_available,
          min_order_quantity,
          max_order_quantity,
          is_in_stock,
          low_stock_threshold
        ),
        product_images(
          image_url,
          alt_text,
          is_primary,
          sort_order
        )
      `, { count: 'exact' })
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .range(from, to)

    if (sellerId) {
      query = query.eq('seller_id', sellerId)
    }
    if (category) {
      query = query.eq('category', category)
    }
    if (type) {
      query = query.eq('type', type)
    }

    const { data: products, error, count } = await query

    if (error) {
      console.error("[PRODUCT API] Error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Transform the data to match frontend expectations
    const transformedProducts = products?.map(product => {
      const pricing = product.product_pricing?.[0] || {}
      const primaryImage = product.product_images?.find(img => img.is_primary) || product.product_images?.[0]
      
      return {
        id: product.id,
        name: product.title,
        description: product.description,
        category: product.category,
        subcategory: product.subcategory,
        type: product.type,
        price: pricing.selling_price || 0,
        originalPrice: pricing.original_price || 0,
        stock: pricing.quantity_available || 0,
        inStock: pricing.is_in_stock || false,
        image: primaryImage?.image_url || '/placeholder.svg',
        sellerId: product.seller_id,
        sku: pricing.sku,
        unit: pricing.unit_label,
        customUnit: pricing.custom_unit,
        isActive: product.is_active,
        isFeatured: product.is_featured,
        isPromoted: product.is_promoted,
        slug: product.slug,
        tags: product.tags || [],
        keywords: product.keywords || [],
        seoDescription: product.seo_description,
        created_at: product.created_at,
        updated_at: product.updated_at
      }
    }) || []

    return NextResponse.json({ 
      products: transformedProducts,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })
  } catch (error) {
    console.error("[API] Error fetching products for sellerId:", sellerId, error)
    return NextResponse.json({ error: "Internal server error", details: String(error) }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    console.log("[PRODUCT API] Updating product:", id, updateData)

    // Update product
    const { data: product, error: productError } = await supabase
      .from('products')
      .update({
        title: updateData.title,
        description: updateData.description,
        type: updateData.type,
        category: updateData.category,
        subcategory: updateData.subcategory,
        slug: updateData.slug,
        tags: updateData.tags,
        keywords: updateData.keywords,
        seo_description: updateData.seoDescription,
        is_active: updateData.isActive,
        is_featured: updateData.isFeatured,
        is_promoted: updateData.isPromoted,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (productError) {
      console.error("[PRODUCT API] Product update error:", productError)
      return NextResponse.json({ error: productError.message }, { status: 500 })
    }

    // Update pricing if provided
    if (updateData.sellingPrice !== undefined) {
      const { error: pricingError } = await supabase
        .from('product_pricing')
        .update({
          original_price: updateData.originalPrice,
          selling_price: updateData.sellingPrice,
          discount_percent: updateData.discountPercent,
          unit_label: updateData.unitLabel,
          custom_unit: updateData.customUnit,
          sku: updateData.sku,
          quantity_available: updateData.quantityAvailable,
          min_order_quantity: updateData.minOrderQuantity,
          max_order_quantity: updateData.maxOrderQuantity,
          is_in_stock: updateData.isInStock,
          low_stock_threshold: updateData.lowStockThreshold,
          updated_at: new Date().toISOString()
        })
        .eq('product_id', id)

      if (pricingError) {
        console.error("[PRODUCT API] Pricing update error:", pricingError)
        // Continue anyway
      }
    }

    // Update images if provided
    if (updateData.images && updateData.images.length > 0) {
      // Delete existing images
      await supabase
        .from('product_images')
        .delete()
        .eq('product_id', id)

      // Insert new images
      const imageData = updateData.images.map((url: string, index: number) => ({
        product_id: id,
        image_url: url,
        alt_text: updateData.title || 'Product image',
        is_primary: index === 0,
        sort_order: index
      }))

      const { error: imageError } = await supabase
        .from('product_images')
        .insert(imageData)

      if (imageError) {
        console.error("[PRODUCT API] Image update error:", imageError)
        // Continue anyway
      }
    }

    return NextResponse.json({ 
      success: true, 
      product,
      message: "Product updated successfully" 
    })

  } catch (error) {
    console.error("[PRODUCT API] Error updating product:", error)
    return NextResponse.json({ 
      error: "Failed to update product", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    console.log("[PRODUCT API] Deleting product:", id)

    // Delete product (cascade will handle related records)
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      console.error("[PRODUCT API] Delete error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: "Product deleted successfully" 
    })

  } catch (error) {
    console.error("[PRODUCT API] Error deleting product:", error)
    return NextResponse.json({ 
      error: "Failed to delete product", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 })
  }
} 