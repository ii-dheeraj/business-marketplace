import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { realtimeManager } from "@/lib/realtime"

// Get chat messages between two users
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const senderId = searchParams.get("senderId")
  const receiverId = searchParams.get("receiverId")
  const orderId = searchParams.get("orderId")

  if (!senderId || !receiverId) {
    return NextResponse.json({ error: "Sender and receiver IDs are required" }, { status: 400 })
  }

  try {
    const messages = await prisma.chatMessage.findMany({
      where: {
        OR: [
          {
            senderId: senderId,
            receiverId: receiverId
          },
          {
            senderId: receiverId,
            receiverId: senderId
          }
        ],
        ...(orderId && { orderId: orderId })
      },
      orderBy: {
        createdAt: 'asc'
      },
      take: 50 // Limit to last 50 messages
    })

    return NextResponse.json({ messages })
  } catch (error) {
    console.error("Error fetching chat messages:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Send a new chat message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { senderId, senderType, receiverId, receiverType, message, orderId } = body

    if (!senderId || !senderType || !receiverId || !receiverType || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create chat message in database
    const chatMessage = await prisma.chatMessage.create({
      data: {
        senderId,
        senderType,
        receiverId,
        receiverType,
        message,
        orderId: orderId || null
      }
    })

    // Send real-time notification
    await realtimeManager.sendChatMessage(receiverId, {
      id: chatMessage.id,
      senderId,
      senderType,
      receiverId,
      receiverType,
      message,
      timestamp: chatMessage.createdAt,
      orderId: orderId || undefined
    })

    return NextResponse.json({ success: true, message: chatMessage })
  } catch (error) {
    console.error("Error sending chat message:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 