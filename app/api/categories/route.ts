import { NextRequest, NextResponse } from "next/server"
import { CATEGORIES, getCategoryById, getSubcategoriesByCategory } from "@/utils/category-data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("categoryId")
    
    if (categoryId) {
      // Get subcategories for a specific category
      const subcategories = getSubcategoriesByCategory(categoryId)
      const category = getCategoryById(categoryId)
      
      if (!category) {
        return NextResponse.json({ error: "Category not found" }, { status: 404 })
      }
      
      return NextResponse.json({ 
        category,
        subcategories 
      })
    }
    
    // Get all categories
    return NextResponse.json({ 
      categories: CATEGORIES.map(cat => ({
        id: cat.id,
        name: cat.name,
        subcategories: cat.subcategories
      }))
    })
  } catch (error) {
    console.error("Categories API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 