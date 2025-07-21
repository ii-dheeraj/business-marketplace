import { NextRequest, NextResponse } from "next/server"
import { realtimeManager } from "@/lib/realtime"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const customerId = searchParams.get("customerId")

  // Support both userId and customerId for different user types
  const targetId = userId || customerId

  if (!targetId) {
    return NextResponse.json({ error: "User ID or Customer ID is required" }, { status: 400 })
  }

  // Set up Server-Sent Events
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection message
      const data = `data: ${JSON.stringify({ type: 'connected', message: 'Connected to notifications' })}\n\n`
      controller.enqueue(encoder.encode(data))

      // Set up event listener for this user/customer
      const handleNotification = (notification: any) => {
        const data = `data: ${JSON.stringify(notification)}\n\n`
        controller.enqueue(encoder.encode(data))
      }

      realtimeManager.addEventListener(targetId, 'notification', handleNotification)

      // Keep connection alive with heartbeat
      const heartbeat = setInterval(() => {
        const data = `data: ${JSON.stringify({ type: 'heartbeat', timestamp: new Date().toISOString() })}\n\n`
        controller.enqueue(encoder.encode(data))
      }, 30000) // Every 30 seconds

      // Clean up on close
      request.signal.addEventListener('abort', () => {
        clearInterval(heartbeat)
        realtimeManager.removeEventListener(targetId, 'notification', handleNotification)
        controller.close()
      })
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control'
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, customerId, type, title, message, data } = body

    // Support both userId and customerId
    const targetId = userId || customerId

    if (!targetId || !type || !title || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const notification = {
      type,
      title,
      message,
      data,
      timestamp: new Date(),
      userId: targetId
    }

    await realtimeManager.sendNotification(targetId, notification)

    return NextResponse.json({ success: true, notification })
  } catch (error) {
    console.error("Error sending notification:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 