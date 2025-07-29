import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    console.log('[DELIVERY AGENTS API] Fetching all delivery agents')

    const { data: agents, error } = await supabase
      .from('delivery_agents')
      .select('id, name, email, phone, isAvailable, vehicleNumber, vehicleType, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[DELIVERY AGENTS API] Error fetching agents:', error)
      return NextResponse.json({ error: "Failed to fetch delivery agents" }, { status: 500 })
    }

    console.log('[DELIVERY AGENTS API] Agents fetched successfully:', agents?.length || 0)

    return NextResponse.json({
      agents: agents || []
    })

  } catch (error) {
    console.error('[DELIVERY AGENTS API] Unexpected error:', error)
    return NextResponse.json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { agentId, isAvailable } = body

    if (!agentId || typeof isAvailable !== 'boolean') {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log('[DELIVERY AGENTS API] Updating agent availability:', { agentId, isAvailable })

    const { data: updatedAgent, error } = await supabase
      .from('delivery_agents')
      .update({ 
        isAvailable,
        updated_at: new Date()
      })
      .eq('id', Number(agentId))
      .select()
      .single()

    if (error) {
      console.error('[DELIVERY AGENTS API] Error updating agent:', error)
      return NextResponse.json({ error: "Failed to update delivery agent" }, { status: 500 })
    }

    console.log('[DELIVERY AGENTS API] Agent updated successfully:', agentId)

    return NextResponse.json({
      success: true,
      message: `Delivery agent ${isAvailable ? 'marked as available' : 'marked as unavailable'}`,
      agent: updatedAgent
    })

  } catch (error) {
    console.error('[DELIVERY AGENTS API] Unexpected error:', error)
    return NextResponse.json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}