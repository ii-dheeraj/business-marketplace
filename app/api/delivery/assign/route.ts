import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"

// Function to find the best available delivery agent
async function findAvailableDeliveryAgent() {
  try {
    // Find available delivery agents
    const { data: availableAgents, error } = await supabase
      .from('delivery_agents')
      .select('id, name, isAvailable, currentLocation')
      .eq('isAvailable', true)
      .order('created_at', { ascending: true }) // Simple round-robin assignment

    if (error) {
      console.error('[DELIVERY ASSIGN] Error fetching available agents:', error)
      return null
    }

    if (!availableAgents || availableAgents.length === 0) {
      console.log('[DELIVERY ASSIGN] No available delivery agents found')
      return null
    }

    // For now, use simple round-robin assignment
    // In a real system, you might want to consider:
    // - Agent's current location vs order location
    // - Agent's current workload
    // - Agent's rating/performance
    return availableAgents[0]
  } catch (error) {
    console.error('[DELIVERY ASSIGN] Error in findAvailableDeliveryAgent:', error)
    return null
  }
}

// Function to assign order to delivery agent
async function assignOrderToAgent(orderId: number, agentId: number) {
  try {
    const { data: updatedOrder, error } = await supabase
      .from('orders')
      .update({ 
        deliveryAgentId: agentId,
        updated_at: new Date()
      })
      .eq('id', orderId)
      .select()
      .single()

    if (error) {
      console.error('[DELIVERY ASSIGN] Error assigning order to agent:', error)
      return null
    }

    // Create tracking entry
    await supabase
      .from('order_tracking')
      .insert({
        orderId: orderId,
        status: 'ASSIGNED_TO_AGENT',
        description: `Order assigned to delivery agent ID: ${agentId}`,
        location: 'Order Assignment Center'
      })

    return updatedOrder
  } catch (error) {
    console.error('[DELIVERY ASSIGN] Error in assignOrderToAgent:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId } = body

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 })
    }

    console.log('[DELIVERY ASSIGN] Attempting to assign order:', orderId)

    // Check if order already has a delivery agent
    const { data: existingOrder, error: checkError } = await supabase
      .from('orders')
      .select('id, deliveryAgentId, orderStatus')
      .eq('id', Number(orderId))
      .maybeSingle()

    if (checkError) {
      console.error('[DELIVERY ASSIGN] Error checking order:', checkError)
      return NextResponse.json({ error: "Failed to check order" }, { status: 500 })
    }

    if (!existingOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    if (existingOrder.deliveryAgentId) {
      return NextResponse.json({ 
        message: "Order already assigned to delivery agent",
        deliveryAgentId: existingOrder.deliveryAgentId
      })
    }

    // Find available delivery agent
    const availableAgent = await findAvailableDeliveryAgent()
    
    if (!availableAgent) {
      return NextResponse.json({ 
        error: "No available delivery agents at the moment",
        message: "Order will be assigned when a delivery agent becomes available"
      }, { status: 503 })
    }

    // Assign order to agent
    const assignedOrder = await assignOrderToAgent(Number(orderId), availableAgent.id)

    if (!assignedOrder) {
      return NextResponse.json({ error: "Failed to assign order to delivery agent" }, { status: 500 })
    }

    console.log('[DELIVERY ASSIGN] Order successfully assigned:', {
      orderId,
      agentId: availableAgent.id,
      agentName: availableAgent.name
    })

    return NextResponse.json({
      success: true,
      message: "Order assigned to delivery agent successfully",
      order: assignedOrder,
      deliveryAgent: {
        id: availableAgent.id,
        name: availableAgent.name
      }
    })

  } catch (error) {
    console.error('[DELIVERY ASSIGN] Unexpected error:', error)
    return NextResponse.json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}

// GET endpoint to manually assign orders (for admin use)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get("orderId")

  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 })
  }

  try {
    // Check if order exists and is unassigned
    const { data: order, error } = await supabase
      .from('orders')
      .select('id, deliveryAgentId, orderStatus, customerName, totalAmount')
      .eq('id', Number(orderId))
      .maybeSingle()

    if (error) {
      console.error('[DELIVERY ASSIGN] Error fetching order:', error)
      return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
    }

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    if (order.deliveryAgentId) {
      return NextResponse.json({
        message: "Order is already assigned",
        order: order
      })
    }

    // Find available delivery agent
    const availableAgent = await findAvailableDeliveryAgent()
    
    if (!availableAgent) {
      return NextResponse.json({ 
        error: "No available delivery agents",
        message: "No delivery agents are currently available"
      }, { status: 503 })
    }

    // Assign order to agent
    const assignedOrder = await assignOrderToAgent(Number(orderId), availableAgent.id)

    if (!assignedOrder) {
      return NextResponse.json({ error: "Failed to assign order" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Order assigned successfully",
      order: assignedOrder,
      deliveryAgent: {
        id: availableAgent.id,
        name: availableAgent.name
      }
    })

  } catch (error) {
    console.error('[DELIVERY ASSIGN] Unexpected error:', error)
    return NextResponse.json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}