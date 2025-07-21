// Real-time event types
export interface OrderUpdate {
  orderId: string
  status: string
  message: string
  timestamp: Date
  userId?: string
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
  type: 'order_update' | 'order_status_change' | 'delivery_update' | 'chat_message' | 'inventory_alert' | 'promotion'
  title: string
  message: string
  data?: any
  timestamp: Date
  userId: string
}

// In-memory storage for real-time events (in production, use Redis)
class RealtimeManager {
  private notifications: Map<string, NotificationData[]> = new Map()
  private eventListeners: Map<string, Set<(data: any) => void>> = new Map()

  // Add event listener for a user
  addEventListener(userId: string, eventType: string, callback: (data: any) => void) {
    const key = `${userId}:${eventType}`
    if (!this.eventListeners.has(key)) {
      this.eventListeners.set(key, new Set())
    }
    this.eventListeners.get(key)!.add(callback)
  }

  // Remove event listener
  removeEventListener(userId: string, eventType: string, callback: (data: any) => void) {
    const key = `${userId}:${eventType}`
    const listeners = this.eventListeners.get(key)
    if (listeners) {
      listeners.delete(callback)
      if (listeners.size === 0) {
        this.eventListeners.delete(key)
      }
    }
  }

  // Emit event to specific user
  emitEvent(userId: string, eventType: string, data: any) {
    const key = `${userId}:${eventType}`
    const listeners = this.eventListeners.get(key)
    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(data)
        } catch (error) {
          console.error('Error in event listener:', error)
        }
      })
    }
  }

  // Send notification to specific user
  async sendNotification(userId: string, notification: NotificationData) {
    // Store notification
    if (!this.notifications.has(userId)) {
      this.notifications.set(userId, [])
    }
    this.notifications.get(userId)!.push(notification)

    // Emit notification event
    this.emitEvent(userId, 'notification', notification)
  }

  // Send order update to all users involved
  async sendOrderUpdate(orderId: string, update: OrderUpdate) {
    // Emit order update event
    this.emitEvent('*', 'order_update', { orderId, update })
  }

  // Send inventory alert to seller
  async sendInventoryAlert(sellerId: string, update: InventoryUpdate) {
    const notification: NotificationData = {
      type: 'inventory_alert',
      title: 'Inventory Alert',
      message: `Stock updated for product ${update.productId}: ${update.oldStock} → ${update.newStock}`,
      data: update,
      timestamp: new Date(),
      userId: sellerId
    }
    await this.sendNotification(sellerId, notification)
  }

  // Send chat message
  async sendChatMessage(receiverId: string, message: ChatMessage) {
    const notification: NotificationData = {
      type: 'chat_message',
      title: 'New Message',
      message: message.message,
      data: message,
      timestamp: new Date(),
      userId: receiverId
    }
    await this.sendNotification(receiverId, notification)
  }

  // Send order status change notification
  async sendOrderStatusChange(userId: string, orderId: string, orderNumber: string, newStatus: string, previousStatus?: string) {
    const notification: NotificationData = {
      type: 'order_status_change',
      title: 'Order Status Updated! 📦',
      message: `Order #${orderNumber} is now ${newStatus.replace(/_/g, ' ').toLowerCase()}`,
      data: {
        orderId,
        orderNumber,
        newStatus,
        previousStatus,
        timestamp: new Date()
      },
      timestamp: new Date(),
      userId
    }
    await this.sendNotification(userId, notification)
  }

  // Send delivery update notification
  async sendDeliveryUpdate(userId: string, orderId: string, orderNumber: string, status: string, message: string) {
    const notification: NotificationData = {
      type: 'delivery_update',
      title: 'Delivery Update! 🚚',
      message,
      data: {
        orderId,
        orderNumber,
        status,
        timestamp: new Date()
      },
      timestamp: new Date(),
      userId
    }
    await this.sendNotification(userId, notification)
  }

  // Get notifications for a user
  getNotifications(userId: string): NotificationData[] {
    return this.notifications.get(userId) || []
  }

  // Clear notifications for a user
  clearNotifications(userId: string) {
    this.notifications.set(userId, [])
  }
}

export const realtimeManager = new RealtimeManager() 