import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"

// Helper function to map order data for delivery agent dashboard
function mapOrder(order: any) {
  // Extract seller address components
  const sellerAddress = order.sellerInfo ? [
    order.sellerInfo.businessAddress,
    order.sellerInfo.businessCity,
    order.sellerInfo.businessState,
    order.sellerInfo.businessPincode
  ].filter(Boolean).join(', ') : '-'

  return {
    id: order.orderNumber || order.id,
    orderId: order.id, // Add the actual database ID for API calls
    seller: order.sellerInfo?.businessName || order.sellerInfo?.name || "-",
    sellerAddress: sellerAddress,
    customer: order.customerName || "-",
    phone: order.customerPhone || "-",
    address: order.customerAddress || "-",
    items: order.order_items?.map((item: any) => ({
      name: item.productName || "Unknown Product",
      quantity: item.quantity,
      price: item.unitPrice || item.totalPrice / item.quantity
    })) || [],
    totalAmount: order.totalAmount,
    status: order.orderStatus,
    otp_verified: order.otp_verified || false,
    parcel_otp: order.parcel_otp,
    deliveryAgentId: order.deliveryAgentId,
    created_at: order.created_at,
    updated_at: order.updated_at
  }
}

// Helper function to map old statuses to new ones for display
function mapStatusForDisplay(status: string): string {
  const statusMap: { [key: string]: string } = {
    'PENDING': 'PENDING',
    'CONFIRMED': 'ACCEPTED_BY_AGENT', // Map CONFIRMED to ACCEPTED_BY_AGENT for display
    'PREPARING': 'ACCEPTED_BY_AGENT',
    'READY_FOR_PICKUP': 'OTP_GENERATED', // Map READY_FOR_PICKUP to OTP_GENERATED for display
    'READY_FOR_DELIVERY': 'OTP_VERIFIED', // Map READY_FOR_DELIVERY to OTP_VERIFIED for display
    'PICKED_UP': 'PARCEL_PICKED_UP',
    'IN_TRANSIT': 'IN_TRANSIT',
    'OUT_FOR_DELIVERY': 'IN_TRANSIT',
    'DELIVERED': 'DELIVERED',
    'CANCELLED': 'CANCELLED'
  }
  return statusMap[status] || status
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const deliveryAgentId = searchParams.get("deliveryAgentId")

  if (!deliveryAgentId) {
    return NextResponse.json({ error: "Missing deliveryAgentId" }, { status: 400 })
  }

  try {
    console.log('[DELIVERY ORDERS API] Fetching orders for agent:', deliveryAgentId)

    // Fetch orders assigned to this delivery agent
    const { data: assignedOrders, error: assignedError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(id, productName, quantity, unitPrice, totalPrice),
        seller_orders!inner(
          sellerId,
          sellers!inner(id, name, businessName, businessAddress, businessCity, businessState, businessPincode)
        )
      `)
      .eq('deliveryAgentId', Number(deliveryAgentId))
      .order('created_at', { ascending: false })

    if (assignedError) {
      console.error('[DELIVERY ORDERS API] Error fetching assigned orders:', assignedError)
      return NextResponse.json({ error: "Failed to fetch assigned orders" }, { status: 500 })
    }

    // Fetch unassigned orders that delivery agents can accept
    const { data: unassignedOrders, error: unassignedError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(id, productName, quantity, unitPrice, totalPrice),
        seller_orders!inner(
          sellerId,
          sellers!inner(id, name, businessName, businessAddress, businessCity, businessState, businessPincode)
        )
      `)
      .is('deliveryAgentId', null)
      .in('orderStatus', ['PENDING', 'CONFIRMED']) // Use current DB schema statuses
      .order('created_at', { ascending: false })

    if (unassignedError) {
      console.error('[DELIVERY ORDERS API] Error fetching unassigned orders:', unassignedError)
      return NextResponse.json({ error: "Failed to fetch unassigned orders" }, { status: 500 })
    }

    // Process assigned orders to include seller info
    const processedAssignedOrders = assignedOrders?.map(order => {
      const sellerInfo = order.seller_orders?.[0]?.sellers
      return {
        ...order,
        sellerInfo,
        // Map status for display
        orderStatus: mapStatusForDisplay(order.orderStatus)
      }
    }) || []

    // Process unassigned orders to include seller info
    const processedUnassignedOrders = unassignedOrders?.map(order => {
      const sellerInfo = order.seller_orders?.[0]?.sellers
      return {
        ...order,
        sellerInfo,
        // Map status for display
        orderStatus: mapStatusForDisplay(order.orderStatus)
      }
    }) || []

    // Separate assigned orders by status (using mapped statuses)
    const availableOrders = processedAssignedOrders.filter(order => order.orderStatus === 'PENDING')
    const activeDeliveries = processedAssignedOrders.filter(order => 
      ['ACCEPTED_BY_AGENT', 'OTP_GENERATED', 'OTP_VERIFIED', 'PARCEL_PICKED_UP', 'IN_TRANSIT'].includes(order.orderStatus)
    )
    const completedDeliveries = processedAssignedOrders.filter(order => order.orderStatus === 'DELIVERED')

    // Add unassigned orders to available orders
    const allAvailableOrders = [
      ...availableOrders,
      ...processedUnassignedOrders.map(order => ({
        ...order,
        isUnassigned: true // Flag to identify unassigned orders
      }))
    ]

    console.log('[DELIVERY ORDERS API] Orders fetched successfully:', {
      available: allAvailableOrders.length,
      active: activeDeliveries.length,
      completed: completedDeliveries.length,
      unassigned: processedUnassignedOrders.length
    })

    return NextResponse.json({
      availableOrders: allAvailableOrders.map(mapOrder),
      activeDeliveries: activeDeliveries.map(mapOrder),
      completedDeliveries: completedDeliveries.map(mapOrder)
    })

  } catch (error) {
    console.error('[DELIVERY ORDERS API] Unexpected error:', error)
    return NextResponse.json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, deliveryAgentId, action } = body

    if (!orderId || !deliveryAgentId || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log('[DELIVERY ORDERS API] PATCH request:', { orderId, deliveryAgentId, action })

    // Check if order exists before updating
    const { data: existingOrder, error: checkError } = await supabase
      .from("orders")
      .select("id, orderStatus, deliveryAgentId")
      .eq("id", Number(orderId))
      .maybeSingle()

    if (checkError) {
      console.error('[DELIVERY ORDERS API] Error checking order existence:', checkError)
      return NextResponse.json({ error: "Failed to verify order" }, { status: 500 })
    }

    if (!existingOrder) {
      console.error('[DELIVERY ORDERS API] Order not found:', orderId)
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    let updateData: any = { updated_at: new Date() }
    let trackingStatus = ''
    let trackingDescription = ''

    // Map actions to old statuses for now
    switch (action) {
      case "accept":
        // Handle both assigned and unassigned orders
        if (existingOrder.deliveryAgentId === null) {
          // Order is unassigned - assign it to this delivery agent
          updateData.deliveryAgentId = Number(deliveryAgentId)
          updateData.orderStatus = 'CONFIRMED'
          trackingStatus = 'CONFIRMED'
          trackingDescription = 'Order accepted and assigned to delivery agent'
        } else if (existingOrder.deliveryAgentId === Number(deliveryAgentId)) {
          // Order is already assigned to this agent
          if (existingOrder.orderStatus !== 'PENDING') {
            return NextResponse.json({ error: "Order must be in PENDING status to accept" }, { status: 400 })
          }
          updateData.orderStatus = 'CONFIRMED'
          trackingStatus = 'CONFIRMED'
          trackingDescription = 'Order accepted by delivery agent'
        } else {
          // Order is assigned to a different agent
          return NextResponse.json({ error: "Order is already assigned to another delivery agent" }, { status: 403 })
        }
        break

      case "pickup":
        // Verify delivery agent is assigned to this order
        if (existingOrder.deliveryAgentId !== Number(deliveryAgentId)) {
          console.error('[DELIVERY ORDERS API] Delivery agent mismatch:', existingOrder.deliveryAgentId, deliveryAgentId)
          return NextResponse.json({ error: "Delivery agent not assigned to this order" }, { status: 403 })
        }
        // Check if order is in a status that allows pickup
        if (!['READY_FOR_DELIVERY'].includes(existingOrder.orderStatus)) {
          return NextResponse.json({ error: "Order must be ready for pickup" }, { status: 400 })
        }
        updateData.orderStatus = 'PICKED_UP' // Use existing status from current schema
        trackingStatus = 'PICKED_UP'
        trackingDescription = 'Parcel picked up by delivery agent'
        break

      case "start_delivery":
        // Verify delivery agent is assigned to this order
        if (existingOrder.deliveryAgentId !== Number(deliveryAgentId)) {
          console.error('[DELIVERY ORDERS API] Delivery agent mismatch:', existingOrder.deliveryAgentId, deliveryAgentId)
          return NextResponse.json({ error: "Delivery agent not assigned to this order" }, { status: 403 })
        }
        if (existingOrder.orderStatus !== 'PICKED_UP') {
          return NextResponse.json({ error: "Order must be picked up to start delivery" }, { status: 400 })
        }
        updateData.orderStatus = 'OUT_FOR_DELIVERY' // Use old status for now
        trackingStatus = 'OUT_FOR_DELIVERY'
        trackingDescription = 'Delivery started - parcel in transit'
        break

      case "complete":
        // Verify delivery agent is assigned to this order
        if (existingOrder.deliveryAgentId !== Number(deliveryAgentId)) {
          console.error('[DELIVERY ORDERS API] Delivery agent mismatch:', existingOrder.deliveryAgentId, deliveryAgentId)
          return NextResponse.json({ error: "Delivery agent not assigned to this order" }, { status: 403 })
        }
        if (!['OUT_FOR_DELIVERY', 'IN_TRANSIT'].includes(existingOrder.orderStatus)) {
          return NextResponse.json({ error: "Order must be out for delivery to complete" }, { status: 400 })
        }
        updateData.orderStatus = 'DELIVERED'
        updateData.actualDeliveryTime = new Date()
        trackingStatus = 'DELIVERED'
        trackingDescription = 'Order delivered successfully'
        break

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    console.log('[DELIVERY ORDERS API] Updating order:', { orderId, updateData })

    // Update order
    const { data: updatedOrder, error: updateError } = await supabase
      .from("orders")
      .update(updateData)
      .eq("id", Number(orderId))
      .select()
      .single()

    if (updateError || !updatedOrder) {
      console.error('[DELIVERY ORDERS API] Failed to update order:', updateError)
      return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
    }

    // Create tracking entry
    if (trackingStatus) {
      const { error: trackingError } = await supabase
        .from("order_tracking")
        .insert({
          orderId: Number(orderId),
          status: trackingStatus,
          description: trackingDescription,
          location: "Delivery Agent Location"
        })

      if (trackingError) {
        console.error('[DELIVERY ORDERS API] Failed to create tracking entry:', trackingError)
        // Don't fail the request if tracking fails
      }
    }

    console.log('[DELIVERY ORDERS API] Order updated successfully:', orderId)

    return NextResponse.json({
      success: true,
      message: `Order ${action} successful`,
      order: updatedOrder
    })

  } catch (error) {
    console.error('[DELIVERY ORDERS API] Unexpected error:', error)
    return NextResponse.json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, deliveryAgentId, action, location } = body

    if (!orderId || !deliveryAgentId || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log('[DELIVERY ORDERS API] POST request:', { orderId, deliveryAgentId, action })

    // Check if order exists before updating
    const { data: existingOrder, error: checkError } = await supabase
      .from("orders")
      .select("id, orderStatus, deliveryAgentId")
      .eq("id", Number(orderId))
      .maybeSingle()

    if (checkError) {
      console.error('[DELIVERY ORDERS API] Error checking order existence:', checkError)
      return NextResponse.json({ error: "Failed to verify order" }, { status: 500 })
    }

    if (!existingOrder) {
      console.error('[DELIVERY ORDERS API] Order not found:', orderId)
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Verify delivery agent is assigned to this order
    if (existingOrder.deliveryAgentId !== Number(deliveryAgentId)) {
      console.error('[DELIVERY ORDERS API] Delivery agent mismatch:', existingOrder.deliveryAgentId, deliveryAgentId)
      return NextResponse.json({ error: "Delivery agent not assigned to this order" }, { status: 403 })
    }

    switch (action) {
      case "update_location":
        if (!location) {
          return NextResponse.json({ error: "Location data required" }, { status: 400 })
        }

        // Update delivery agent location in orders table
        const { error: locationError } = await supabase
          .from("orders")
          .update({
            delivery_agent_location: location,
            updated_at: new Date()
          })
          .eq("id", Number(orderId))

        if (locationError) {
          console.error('[DELIVERY ORDERS API] Failed to update location:', locationError)
          return NextResponse.json({ error: "Failed to update location" }, { status: 500 })
        }

        // Store GPS tracking data in dedicated table (if it exists)
        try {
          const { error: gpsError } = await supabase
            .from("order_gps_tracking")
            .insert({
              orderId: Number(orderId),
              deliveryAgentId: Number(deliveryAgentId),
              latitude: location.latitude,
              longitude: location.longitude,
              accuracy: location.accuracy,
              speed: location.speed,
              heading: location.heading,
              tracked_at: new Date()
            })

          if (gpsError) {
            console.error('[DELIVERY ORDERS API] Failed to store GPS data:', gpsError)
            // Don't fail the request if GPS tracking fails
          }
        } catch (gpsTableError) {
          console.error('[DELIVERY ORDERS API] GPS tracking table not available:', gpsTableError)
          // GPS table might not exist yet, continue without it
        }

        console.log('[DELIVERY ORDERS API] Location updated successfully for order:', orderId)
        return NextResponse.json({ success: true, message: "Location updated" })

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

  } catch (error) {
    console.error('[DELIVERY ORDERS API] Unexpected error:', error)
    return NextResponse.json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
} 