import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { businessId, rating, review } = await request.json()

    if (!businessId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid rating data" }, { status: 400 })
    }

    // For now, we'll just return success since we don't have a ratings table
    // In a real implementation, you would:
    // 1. Insert the rating into a ratings table
    // 2. Update the business's average rating
    // 3. Increment the review count

    console.log(`Rating submitted for business ${businessId}: ${rating} stars${review ? ` with review: ${review}` : ''}`)

    return NextResponse.json({ 
      success: true, 
      message: "Rating submitted successfully" 
    })

  } catch (error) {
    console.error("Error submitting rating:", error)
    return NextResponse.json({ error: "Failed to submit rating" }, { status: 500 })
  }
} 