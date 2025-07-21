"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bell, 
  MessageSquare, 
  Package, 
  ShoppingCart, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Send
} from "lucide-react"

interface Notification {
  type: string
  title: string
  message: string
  timestamp: Date
  data?: any
}

interface ChatMessage {
  id: string
  senderId: string
  senderType: string
  message: string
  timestamp: Date
}

interface OrderUpdate {
  orderId: string
  status: string
  message: string
  timestamp: Date
}

export default function TestRealtimePage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [orderUpdates, setOrderUpdates] = useState<OrderUpdate[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [userId, setUserId] = useState("test-user-1")

  // Connect to real-time notifications
  useEffect(() => {
    const connectToNotifications = async () => {
      try {
        const eventSource = new EventSource(`/api/realtime/notifications?userId=${userId}`)
        
        eventSource.onopen = () => {
          console.log("✅ Connected to real-time notifications")
          setIsConnected(true)
        }

        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data)
          console.log("📨 Received notification:", data)
          
          if (data.type === 'notification') {
            setNotifications(prev => [data, ...prev.slice(0, 9)]) // Keep last 10
          } else if (data.type === 'order_update') {
            setOrderUpdates(prev => [data.data.update, ...prev.slice(0, 9)])
          } else if (data.type === 'chat_message') {
            setChatMessages(prev => [data.data, ...prev.slice(0, 9)])
          }
        }

        eventSource.onerror = (error) => {
          console.error("❌ SSE Error:", error)
          setIsConnected(false)
        }

        return () => {
          eventSource.close()
        }
      } catch (error) {
        console.error("❌ Failed to connect:", error)
      }
    }

    connectToNotifications()
  }, [userId])

  // Test functions
  const testOrderUpdate = async () => {
    try {
      const response = await fetch("/api/realtime/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          type: "order_update",
          title: "Order Status Updated",
          message: "Your order #12345 has been confirmed and is being prepared!",
          data: {
            orderId: "12345",
            status: "CONFIRMED",
            estimatedDelivery: "30-45 minutes"
          }
        })
      })
      
      if (response.ok) {
        console.log("✅ Order update sent successfully")
      }
    } catch (error) {
      console.error("❌ Failed to send order update:", error)
    }
  }

  const testInventoryAlert = async () => {
    try {
      const response = await fetch("/api/realtime/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          type: "inventory_alert",
          title: "Low Stock Alert",
          message: "Product 'Nirma Soap' is running low on stock (5 units remaining)",
          data: {
            productId: "123",
            productName: "Nirma Soap",
            currentStock: 5,
            threshold: 10
          }
        })
      })
      
      if (response.ok) {
        console.log("✅ Inventory alert sent successfully")
      }
    } catch (error) {
      console.error("❌ Failed to send inventory alert:", error)
    }
  }

  const testChatMessage = async () => {
    if (!newMessage.trim()) return

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: userId,
          senderType: "customer",
          receiverId: "seller-1",
          receiverType: "seller",
          message: newMessage,
          orderId: "12345"
        })
      })
      
      if (response.ok) {
        console.log("✅ Chat message sent successfully")
        setNewMessage("")
      }
    } catch (error) {
      console.error("❌ Failed to send chat message:", error)
    }
  }

  const testPromotion = async () => {
    try {
      const response = await fetch("/api/realtime/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          type: "promotion",
          title: "Special Offer! 🎉",
          message: "Get 20% off on all products today! Use code: SPECIAL20",
          data: {
            discount: "20%",
            code: "SPECIAL20",
            validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
          }
        })
      })
      
      if (response.ok) {
        console.log("✅ Promotion sent successfully")
      }
    } catch (error) {
      console.error("❌ Failed to send promotion:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Real-Time Features Test</h1>
          <p className="text-gray-600">Test all real-time functionality in one place</p>
          
          <div className="flex items-center gap-4 mt-4">
            <Badge variant={isConnected ? "default" : "destructive"}>
              {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
            </Badge>
            <Input
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-48"
            />
          </div>
        </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="chat">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat System
            </TabsTrigger>
            <TabsTrigger value="orders">
              <Package className="h-4 w-4 mr-2" />
              Order Tracking
            </TabsTrigger>
            <TabsTrigger value="inventory">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Inventory
            </TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Test Notifications</CardTitle>
                  <CardDescription>Send different types of notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={testOrderUpdate} className="w-full">
                    <Package className="h-4 w-4 mr-2" />
                    Test Order Update
                  </Button>
                  <Button onClick={testInventoryAlert} className="w-full">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Test Inventory Alert
                  </Button>
                  <Button onClick={testPromotion} className="w-full">
                    <Bell className="h-4 w-4 mr-2" />
                    Test Promotion
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Received Notifications</CardTitle>
                  <CardDescription>Real-time notifications will appear here</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No notifications yet. Try sending one!</p>
                    ) : (
                      notifications.map((notification, index) => (
                        <div key={index} className="p-3 border rounded-lg bg-white">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{notification.title}</h4>
                            <Badge variant="outline">{notification.type}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(notification.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Send Chat Message</CardTitle>
                  <CardDescription>Test real-time chat functionality</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && testChatMessage()}
                  />
                  <Button onClick={testChatMessage} className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Chat Messages</CardTitle>
                  <CardDescription>Real-time chat messages will appear here</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {chatMessages.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No messages yet. Send one!</p>
                    ) : (
                      chatMessages.map((message, index) => (
                        <div key={index} className="p-3 border rounded-lg bg-white">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold">{message.senderType}</span>
                            <Badge variant="outline">{message.senderId}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{message.message}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Updates</CardTitle>
                <CardDescription>Real-time order status updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {orderUpdates.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No order updates yet. Try sending one!</p>
                  ) : (
                    orderUpdates.map((update, index) => (
                      <div key={index} className="p-3 border rounded-lg bg-white">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Order #{update.orderId}</h4>
                          <Badge variant="outline">{update.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{update.message}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(update.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Management</CardTitle>
                <CardDescription>Real-time stock updates and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg bg-white">
                      <h4 className="font-semibold mb-2">Nirma Soap</h4>
                      <p className="text-2xl font-bold text-green-600">25 units</p>
                      <p className="text-sm text-gray-500">In Stock</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-white">
                      <h4 className="font-semibold mb-2">Colgate Toothpaste</h4>
                      <p className="text-2xl font-bold text-yellow-600">5 units</p>
                      <p className="text-sm text-gray-500">Low Stock</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-white">
                      <h4 className="font-semibold mb-2">Dove Shampoo</h4>
                      <p className="text-2xl font-bold text-red-600">0 units</p>
                      <p className="text-sm text-gray-500">Out of Stock</p>
                    </div>
                  </div>
                  
                  <Button onClick={testInventoryAlert} className="w-full">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Simulate Low Stock Alert
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 