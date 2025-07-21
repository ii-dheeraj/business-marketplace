import { Server as SocketIOServer } from 'socket.io'
import { Server as HTTPServer } from 'http'

export interface SocketData {
  userId: string
  userType: 'customer' | 'seller' | 'admin'
  orderId?: string
}

export interface OrderUpdate {
  orderId: string
  status: string
  message: string
  timestamp: Date
}

export interface ChatMessage {
  id: string
  senderId: string
  senderType: 'customer' | 'seller'
  receiverId: string
  receiverType: 'customer' | 'seller'
  message: string
  timestamp: Date
  orderId?: string
}

export interface InventoryUpdate {
  productId: string
  sellerId: string
  newStock: number
  oldStock: number
  timestamp: Date
}

export interface NotificationData {
  type: 'order_update' | 'chat_message' | 'inventory_alert' | 'promotion'
  title: string
  message: string
  data?: any
  timestamp: Date
}

class SocketManager {
  private io: SocketIOServer | null = null
  private userSockets: Map<string, string> = new Map() // userId -> socketId

  initialize(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
      }
    })

    this.io.on('connection', (socket) => {
      console.log('Client connected:', socket.id)

      // Handle user authentication
      socket.on('authenticate', (data: SocketData) => {
        this.userSockets.set(data.userId, socket.id)
        socket.data = data
        
        // Join user-specific rooms
        socket.join(`user:${data.userId}`)
        socket.join(`type:${data.userType}`)
        
        if (data.orderId) {
          socket.join(`order:${data.orderId}`)
        }
        
        console.log(`User ${data.userId} (${data.userType}) authenticated`)
      })

      // Handle chat messages
      socket.on('send_message', (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
        const chatMessage: ChatMessage = {
          ...message,
          id: Date.now().toString(),
          timestamp: new Date()
        }
        
        // Send to receiver
        const receiverSocketId = this.userSockets.get(message.receiverId)
        if (receiverSocketId) {
          this.io?.to(receiverSocketId).emit('new_message', chatMessage)
        }
        
        // Send back to sender for confirmation
        socket.emit('message_sent', chatMessage)
        
        // Store message in database (you can implement this)
        this.storeChatMessage(chatMessage)
      })

      // Handle order status updates
      socket.on('update_order_status', (update: OrderUpdate) => {
        // Broadcast to all users involved in the order
        this.io?.to(`order:${update.orderId}`).emit('order_status_updated', update)
        
        // Store update in database
        this.storeOrderUpdate(update)
      })

      // Handle inventory updates
      socket.on('inventory_update', (update: InventoryUpdate) => {
        // Notify seller about inventory changes
        this.io?.to(`user:${update.sellerId}`).emit('inventory_updated', update)
        
        // Store update in database
        this.storeInventoryUpdate(update)
      })

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
        
        // Remove from user sockets map
        for (const [userId, socketId] of this.userSockets.entries()) {
          if (socketId === socket.id) {
            this.userSockets.delete(userId)
            break
          }
        }
      })
    })

    return this.io
  }

  // Public methods for sending notifications
  sendOrderUpdate(orderId: string, update: OrderUpdate) {
    this.io?.to(`order:${orderId}`).emit('order_status_updated', update)
  }

  sendNotification(userId: string, notification: NotificationData) {
    this.io?.to(`user:${userId}`).emit('notification', notification)
  }

  sendChatMessage(receiverId: string, message: ChatMessage) {
    const receiverSocketId = this.userSockets.get(receiverId)
    if (receiverSocketId) {
      this.io?.to(receiverSocketId).emit('new_message', message)
    }
  }

  sendInventoryAlert(sellerId: string, update: InventoryUpdate) {
    this.io?.to(`user:${sellerId}`).emit('inventory_alert', update)
  }

  broadcastToType(userType: 'customer' | 'seller' | 'admin', event: string, data: any) {
    this.io?.to(`type:${userType}`).emit(event, data)
  }

  // Private methods for storing data (implement as needed)
  private async storeChatMessage(message: ChatMessage) {
    // TODO: Store chat message in database
    console.log('Storing chat message:', message)
  }

  private async storeOrderUpdate(update: OrderUpdate) {
    // TODO: Store order update in database
    console.log('Storing order update:', update)
  }

  private async storeInventoryUpdate(update: InventoryUpdate) {
    // TODO: Store inventory update in database
    console.log('Storing inventory update:', update)
  }

  getIO() {
    return this.io
  }
}

export const socketManager = new SocketManager() 