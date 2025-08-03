import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"
import { realtimeManager } from "@/lib/realtime"

// Add a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, 
      description, 
      price, 
      originalPrice,
      image, 
      sellerId, 
      category,
      stock,
      // New comprehensive product fields
      productType = 'physical',
      tags = [],
      images = [],
      discountPercent,
      sku,
      unit = 'piece',
      customUnit,
      downloadUrl,
      accessInstructions,
      serviceName,
      duration,
      calendlyLink,
      location,
      hours,
      instructions,
      contactEmail,
      contactPhone,
      keyword,
      slug,
      seoTags = [],
      seoDescription,
      features = [],
      seoScore = 0,
      isDeliveryEnabled = true,
      deliveryRadius = 10,
      deliveryFee = 0,
      minOrderAmount = 0,
      variants = []
    } = body
    
    // Only essential validations - name and sellerId are required
    if (!name || !sellerId) {
      return NextResponse.json({ error: "Product name and seller ID are required" }, { status: 400 })
    }

    // Optional validations with warnings only - no blocking errors
    if (price && price < 0) {
      return NextResponse.json({ error: "Price cannot be negative" }, { status: 400 })
    }

    // Delivery fields are only applicable for physical products
    const deliveryFields = productType === 'physical' ? {
      isDeliveryEnabled,
      deliveryRadius: Number(deliveryRadius),
      deliveryFee: Number(deliveryFee),
      minOrderAmount: Number(minOrderAmount)
    } : {
      isDeliveryEnabled: false,
      deliveryRadius: 0,
      deliveryFee: 0,
      minOrderAmount: 0
    }

    // Prepare product data for the new schema structure
    const productData = {
      seller_id: sellerId,
      title: name,
      description: description || "",
      type: productType,
      category: category || "",
      subcategory: "",
      slug: slug || "",
      tags: Array.isArray(tags) ? tags : [],
      keywords: Array.isArray(seoTags) ? seoTags : [],
      seo_description: seoDescription || "",
      is_active: true,
      is_featured: false,
      is_promoted: false
    }
    
    // Prepare pricing data
    const pricingData = {
      original_price: originalPrice ? Number(originalPrice) : null,
      selling_price: price ? Number(price) : 0,
      discount_percent: discountPercent ? Number(discountPercent) : null,
      unit_label: unit || 'piece',
      custom_unit: customUnit || "",
      sku: sku || "",
      quantity_available: productType === 'physical' ? (stock ? Number(stock) : 0) : 0,
      min_order_quantity: 1,
      max_order_quantity: null,
      is_in_stock: productType === 'physical' ? ((stock ? Number(stock) : 0) > 0) : true,
      low_stock_threshold: 5
    }
    
    // Prepare image data
    const imageUrls = Array.isArray(images) && images.length > 0 ? images : [image].filter(Boolean)
    const imageData = imageUrls.map((url, index) => ({
      image_url: url,
      alt_text: name,
      is_primary: index === 0,
      sort_order: index
    }))
    
    // Insert product first
    const { data: product, error: createError } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single()
      
    if (createError) {
      console.error("[PRODUCT API] Database error:", createError)
      return NextResponse.json({ error: createError.message }, { status: 500 })
    }
    
    // Insert pricing data
    if (product) {
      const { error: pricingError } = await supabase
        .from('product_pricing')
        .insert([{
          product_id: product.id,
          ...pricingData
        }])
      
      if (pricingError) {
        console.error("[PRODUCT API] Pricing insert error:", pricingError)
        // Continue anyway, pricing is optional
      }
      
      // Insert image data
      if (imageData.length > 0) {
        const { error: imageError } = await supabase
          .from('product_images')
          .insert(imageData.map(img => ({
            product_id: product.id,
            ...img
          })))
        
        if (imageError) {
          console.error("[PRODUCT API] Image insert error:", imageError)
          // Continue anyway, images are optional
        }
      }
    }
    
    // Send real-time notification to seller
    try {
      await realtimeManager.sendNotification(String(sellerId), {
        type: 'order_update',
        title: 'Product Added Successfully! 🎉',
        message: `Your ${productType.toLowerCase()} product "${name}" has been added successfully.`,
        data: product,
        timestamp: new Date(),
        userId: String(sellerId)
      })
    } catch (notifyErr) {
      console.error("[API] Failed to send real-time notification to seller:", sellerId, notifyErr)
      // Don't fail the product creation if notification fails
    }
    
    return NextResponse.json({ 
      success: true, 
      product
    })
  } catch (error) {
    console.error("[PRODUCT API] Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error", details: String(error) }, { status: 500 })
  }
}

// List all products (optionally filter by sellerId)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sellerId = searchParams.get("sellerId")
  const category = searchParams.get("category")
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "20")
  const from = (page - 1) * limit
  const to = from + limit - 1
  try {
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
        price: pricing.selling_price || 0,
        originalPrice: pricing.original_price || 0,
        stock: pricing.quantity_available || 0,
        inStock: pricing.is_in_stock || false,
        image: primaryImage?.image_url || '/placeholder.svg',
        sellerId: product.seller_id,
        productType: product.type,
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
    const { 
      id, 
      name, 
      description, 
      price, 
      originalPrice,
      image, 
      category,
      subcategory,
      stock,
      inStock,
      isActive,
      // New comprehensive product fields
      productType,
      tags,
      images,
      discountPercent,
      sku,
      unit,
      customUnit,
      downloadUrl,
      accessInstructions,
      serviceName,
      duration,
      calendlyLink,
      location,
      hours,
      instructions,
      contactEmail,
      contactPhone,
      keyword,
      slug,
      seoTags,
      seoDescription,
      features,
      seoScore,
      isDeliveryEnabled,
      deliveryRadius,
      deliveryFee,
      minOrderAmount,
      variants
    } = await request.json()
    
    if (!id) {
      return NextResponse.json({ error: "Missing product id" }, { status: 400 })
    }
    
    // Get current product to compare stock and validate product type
    const { data: currentProduct, error: findError } = await supabase
      .from('products')
      .select('stock, sellerId, name, productType')
      .eq('id', Number(id))
      .single()
      
    if (findError || !currentProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Validate product type specific fields if productType is being updated
    if (productType) {
      if (productType === 'DIGITAL' && !downloadUrl) {
        return NextResponse.json({ error: "Download URL is required for digital products" }, { status: 400 })
      }
      
      if (productType === 'APPOINTMENT' && (!serviceName || !duration || !calendlyLink)) {
        return NextResponse.json({ error: "Service name, duration, and Calendly link are required for appointment products" }, { status: 400 })
      }
      
      if (productType === 'WALK_IN' && (!location || !hours)) {
        return NextResponse.json({ error: "Location and hours are required for walk-in products" }, { status: 400 })
      }
      
      if (productType === 'ENQUIRY_ONLY' && (!contactEmail || !contactPhone)) {
        return NextResponse.json({ error: "Contact email and phone are required for enquiry only products" }, { status: 400 })
      }
      
      if (productType === 'ONSITE_SERVICE' && (!serviceName || !location)) {
        return NextResponse.json({ error: "Service name and location are required for onsite service products" }, { status: 400 })
      }
    }

    // Handle delivery fields based on product type
    const currentProductType = productType || currentProduct.productType
    const deliveryFields = currentProductType === 'PHYSICAL' ? {
      ...(typeof isDeliveryEnabled !== "undefined" && { isDeliveryEnabled }),
      ...(typeof deliveryRadius !== "undefined" && { deliveryRadius: Number(deliveryRadius) }),
      ...(typeof deliveryFee !== "undefined" && { deliveryFee: Number(deliveryFee) }),
      ...(typeof minOrderAmount !== "undefined" && { minOrderAmount: Number(minOrderAmount) })
    } : {
      isDeliveryEnabled: false,
      deliveryRadius: 0,
      deliveryFee: 0,
      minOrderAmount: 0
    }

    const updateData: any = {
      ...(name && { name }),
      ...(description && { description }),
      ...(typeof price !== "undefined" && { price: Number(price) }),
      ...(typeof originalPrice !== "undefined" && { originalPrice: originalPrice ? Number(originalPrice) : null }),
      ...(image && { image }),
      ...(category && { category }),
      ...(subcategory && { subcategory }),
      ...(typeof stock !== "undefined" && { stock: Number(stock) }),
      ...(typeof inStock !== "undefined" && { inStock: inStock }),
      ...(typeof isActive !== "undefined" && { isActive: isActive }),
      
      // New comprehensive fields
      ...(productType && { productType }),
      ...(tags && { tags: Array.isArray(tags) ? tags : [] }),
      ...(images && { images: Array.isArray(images) ? images : [] }),
      ...(typeof discountPercent !== "undefined" && { discountPercent: discountPercent ? Number(discountPercent) : null }),
      ...(sku && { sku }),
      ...(unit && { unit }),
      ...(customUnit && { customUnit }),
      ...(downloadUrl && { downloadUrl }),
      ...(accessInstructions && { accessInstructions }),
      ...(serviceName && { serviceName }),
      ...(typeof duration !== "undefined" && { duration: duration ? Number(duration) : null }),
      ...(calendlyLink && { calendlyLink }),
      ...(location && { location }),
      ...(hours && { hours }),
      ...(instructions && { instructions }),
      ...(contactEmail && { contactEmail }),
      ...(contactPhone && { contactPhone }),
      ...(keyword && { keyword }),
      ...(slug && { slug }),
      ...(seoTags && { seoTags: Array.isArray(seoTags) ? seoTags : [] }),
      ...(seoDescription && { seoDescription }),
      ...(features && { features: Array.isArray(features) ? features : [] }),
      ...(typeof seoScore !== "undefined" && { seoScore: Number(seoScore) }),
      ...(variants && { variants: Array.isArray(variants) ? variants : [] }),
      
      // Delivery fields
      ...deliveryFields
    }
    
    // Update inStock based on stock if stock is provided
    if (typeof stock !== "undefined") {
      updateData.inStock = Number(stock) > 0
    }
    const { data: updated, error: updateError } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', Number(id))
      .select()
      .single()
    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }
    // Send real-time inventory alert if stock changed
    if (typeof stock !== "undefined" && stock !== currentProduct.stock) {
      try {
        await realtimeManager.sendInventoryAlert(currentProduct.sellerId.toString(), {
          productId: id.toString(),
          sellerId: currentProduct.sellerId.toString(),
          newStock: Number(stock),
          oldStock: currentProduct.stock,
          timestamp: new Date()
        })
        // Send low stock alert if stock is below 10
        if (Number(stock) <= 10 && Number(stock) > 0) {
          await realtimeManager.sendNotification(currentProduct.sellerId.toString(), {
            type: 'inventory_alert',
            title: 'Low Stock Alert! ⚠️',
            message: `${currentProduct.name} is running low on stock (${stock} units remaining)`,
            data: {
              productId: id,
              productName: currentProduct.name,
              currentStock: Number(stock),
              threshold: 10
            },
            timestamp: new Date(),
            userId: currentProduct.sellerId.toString()
          })
        }
        // Send out of stock alert if stock is 0
        if (Number(stock) === 0) {
          await realtimeManager.sendNotification(currentProduct.sellerId.toString(), {
            type: 'inventory_alert',
            title: 'Out of Stock! 🚫',
            message: `${currentProduct.name} is now out of stock`,
            data: {
              productId: id,
              productName: currentProduct.name,
              currentStock: 0
            },
            timestamp: new Date(),
            userId: currentProduct.sellerId.toString()
          })
        }
      } catch (error) {
        console.error("Error sending inventory alerts:", error)
        // Don't fail the update if notifications fail
      }
    }
    return NextResponse.json({ success: true, product: updated })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({ error: "Missing product id" }, { status: 400 })
    }
    // Soft delete by setting isActive to false
    const { error: deleteError } = await supabase
      .from('products')
      .update({ isActive: false })
      .eq('id', Number(id))
    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 