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
      subcategory,
      stock
    } = body
    
    if (!name || !price || !sellerId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    const { data: product, error: createError } = await supabase
      .from('products')
      .insert([{
        name,
        description,
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : null,
        image,
        sellerId: Number(sellerId),
        category,
        subcategory,
        stock: stock ? Number(stock) : 0,
        inStock: (stock ? Number(stock) : 0) > 0,
        isActive: true
      }])
      .select()
      .single()
    if (createError) {
      return NextResponse.json({ error: createError.message }, { status: 500 })
    }
    // Send real-time notification to seller
    try {
      await realtimeManager.sendNotification(String(sellerId), {
        type: 'notification',
        title: 'Product Added',
        message: `A new product (ID: ${product.id}) was added.`,
        data: product,
        timestamp: new Date(),
        userId: String(sellerId)
      })
    } catch (notifyErr) {
      console.error("[API] Failed to send real-time notification to seller:", sellerId, notifyErr)
    }
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
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "20")
  const from = (page - 1) * limit
  const to = from + limit - 1
  try {
    let query = supabase
      .from('products')
      .select('id, name, description, price, originalPrice, image, category, subcategory, stock, inStock, isActive, sellerId, created_at, updated_at', { count: 'exact' })
      .eq('isActive', true)
      .order('created_at', { ascending: false })
      .range(from, to)
    if (sellerId) {
      query = query.eq('sellerId', Number(sellerId))
    }
    const { data: products, error, count } = await query
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ 
      products,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })
  } catch (error) {
    console.error("[API] Error fetching products for sellerId:", sellerId, error)
    return NextResponse.json({ error: "Internal server error", details: error?.message }, { status: 500 })
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
      isActive
    } = await request.json()
    if (!id) {
      return NextResponse.json({ error: "Missing product id" }, { status: 400 })
    }
    // Get current product to compare stock
    const { data: currentProduct, error: findError } = await supabase
      .from('products')
      .select('stock, sellerId, name')
      .eq('id', Number(id))
      .single()
    if (findError || !currentProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
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
      ...(typeof isActive !== "undefined" && { isActive: isActive })
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