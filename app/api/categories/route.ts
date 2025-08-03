import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const active = searchParams.get("active") === "true"
    
    let query = supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true })
    
    if (active) {
      query = query.eq('is_active', true)
    }
    
    const { data: categories, error } = await query
    
    if (error) {
      console.error("[CATEGORIES API] Error fetching categories:", error)
      return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
    }
    
    // Add some common product types as categories if they don't exist
    const defaultCategories = [
      { id: 'physical', name: 'Physical Products', description: 'Physical goods and items', icon: '📦', sort_order: 1 },
      { id: 'digital', name: 'Digital Products', description: 'Software, ebooks, and digital content', icon: '💾', sort_order: 2 },
      { id: 'appointment', name: 'Appointment Services', description: 'Scheduled appointments and consultations', icon: '📅', sort_order: 3 },
      { id: 'walkin', name: 'Walk-in Services', description: 'Services available for walk-in customers', icon: '🏪', sort_order: 4 },
      { id: 'onsite', name: 'Onsite Services', description: 'Services provided at customer location', icon: '🔧', sort_order: 5 },
      { id: 'enquiry', name: 'Enquiry Only', description: 'Products requiring customer enquiry', icon: '📞', sort_order: 6 }
    ]
    
    // Merge database categories with default categories
    const allCategories = [...(categories || []), ...defaultCategories]
    
    // Remove duplicates based on id
    const uniqueCategories = allCategories.filter((category, index, self) => 
      index === self.findIndex(c => c.id === category.id)
    )
    
    return NextResponse.json({ 
      categories: uniqueCategories,
      count: uniqueCategories.length 
    })
    
  } catch (error) {
    console.error("[CATEGORIES API] Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, icon, sort_order = 0 } = body
    
    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 })
    }
    
    const { data: category, error } = await supabase
      .from('categories')
      .insert({
        name,
        description: description || '',
        icon: icon || '📦',
        sort_order,
        is_active: true
      })
      .select()
      .single()
    
    if (error) {
      console.error("[CATEGORIES API] Error creating category:", error)
      return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
    }
    
    return NextResponse.json({ category })
    
  } catch (error) {
    console.error("[CATEGORIES API] Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 