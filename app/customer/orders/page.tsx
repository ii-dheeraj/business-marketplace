"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Package, ArrowLeft, Bell, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getCookie } from "@/lib/utils"
import OrderTracking from "@/components/order-tracking"
import { useToast } from "@/hooks/use-toast"

// Extend Window interface for eventSource
declare global {
  interface Window {
    eventSource?: EventSource
  }
}

export default function CustomerOrderHistory() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [realTimeConnected, setRealTimeConnected] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const userInfoCookie = getCookie("userInfo")
    if (!userInfoCookie) {
      router.push("/auth/login")
      return
    }
    const user = JSON.parse(userInfoCookie)
    fetchOrders(user.id)
    setupRealTimeConnection(user.id)
    return () => {
      // Cleanup real-time connection
      if (typeof window !== 'undefined' && window.eventSource) {
        window.eventSource.close()
      }
    }
  }, [])

  const fetchOrders = async (customerId: string) => {
    try {
      const res = await fetch(`/api/order/place?customerId=${customerId}`)
      const data = await res.json()
      console.log('[DEBUG] Orders fetched from API:', data)
      setOrders(data.orders || [])
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast({
        title: "Error",
        description: "Failed to load orders. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const setupRealTimeConnection = (customerId: string) => {
    try {
      // Close existing connection if any
      if (typeof window !== 'undefined' && window.eventSource) {
        window.eventSource.close()
      }

      // Create new SSE connection for customer-specific notifications
      const eventSource = new EventSource(`/api/realtime/notifications?customerId=${customerId}`)
      if (typeof window !== 'undefined') {
        window.eventSource = eventSource
      }

      eventSource.onopen = () => {
        console.log("✅ Connected to real-time order updates")
        setRealTimeConnected(true)
      }

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data)
        
        if (data.type === 'order_update') {
          // Update orders list with new data
          setOrders(prevOrders => {
            const updatedOrders = prevOrders.map(order => 
              order.id === data.orderId ? { ...order, ...data.updates } : order
            )
            return updatedOrders
          })

          // Show notification
          toast({
            title: "Order Update",
            description: `Order #${data.orderId} status: ${data.status}`,
          })
        }

        if (data.type === 'order_status_change') {
          // Refresh orders to get latest status
          const userInfoCookie = getCookie("userInfo")
          if (userInfoCookie) {
            const user = JSON.parse(userInfoCookie)
            fetchOrders(user.id)
          }

          toast({
            title: "Order Status Changed",
            description: `Your order #${data.orderId} is now ${data.newStatus}`,
          })
        }

        if (data.type === 'delivery_update') {
          toast({
            title: "Delivery Update",
            description: data.message,
          })
        }
      }

      eventSource.onerror = (error) => {
        console.error("Real-time connection error:", error)
        setRealTimeConnected(false)
        
        // Attempt to reconnect after 5 seconds
        setTimeout(() => {
          const userInfoCookie = getCookie("userInfo")
          if (userInfoCookie) {
            const user = JSON.parse(userInfoCookie)
            setupRealTimeConnection(user.id)
          }
        }, 5000)
      }

    } catch (error) {
      console.error("Error setting up real-time connection:", error)
      setRealTimeConnected(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    const userInfoCookie = getCookie("userInfo")
    if (userInfoCookie) {
      const user = JSON.parse(userInfoCookie)
      fetchOrders(user.id)
    }
  }

  const getStatusBadgeColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'ORDER_PLACED': 'bg-blue-100 text-blue-800',
      'ORDER_CONFIRMED': 'bg-green-100 text-green-800',
      'PREPARING_ORDER': 'bg-orange-100 text-orange-800',
      'READY_FOR_PICKUP': 'bg-purple-100 text-purple-800',
      'PICKED_UP': 'bg-indigo-100 text-indigo-800',
      'IN_TRANSIT': 'bg-indigo-100 text-indigo-800',
      'OUT_FOR_DELIVERY': 'bg-indigo-100 text-indigo-800',
      'DELIVERED': 'bg-green-100 text-green-800',
      'CANCELLED': 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/customer/home" className="text-blue-600 flex items-center mr-4">
              <ArrowLeft className="h-5 w-5 mr-1" /> Home
            </Link>
            <h1 className="text-xl font-bold">My Orders</h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Real-time Status Indicator */}
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${realTimeConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={realTimeConnected ? 'text-green-600' : 'text-red-600'}>
                {realTimeConnected ? 'Live Updates' : 'Offline'}
              </span>
            </div>
            
            {/* Refresh Button */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
        {/* Real-time Notification Banner */}
        {realTimeConnected && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <Bell className="h-4 w-4 text-green-600" />
            <span className="text-green-800 text-sm">
              Real-time order updates are active. You'll be notified of any changes instantly.
            </span>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No orders found.</p>
            <p className="text-sm">Start shopping to place your first order!</p>
            <Link href="/customer/home">
              <Button className="mt-4">Browse Businesses</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      Order #{order.id}
                      <Badge className={getStatusBadgeColor(order.orderStatus)}>
                        {order.orderStatus.replace(/_/g, ' ')}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>Total: <span className="font-semibold text-green-700">₹{order.totalAmount}</span></span>
                    <span>Placed: {new Date(order.createdAt).toLocaleString()}</span>
                    <span>Payment: {order.paymentMethod}</span>
                    {order.estimatedDeliveryTime && (
                      <span>Est. Delivery: {new Date(order.estimatedDeliveryTime).toLocaleString()}</span>
                    )}
                  </div>
                  
                  <div className="mt-2">
                    <span className="font-medium">Items:</span>
                    <ul className="list-disc ml-6 mt-1">
                      {(order.order_items || []).map((item: any) => (
                        <li key={item.id}>
                          {item.productName} x {item.quantity} (₹{item.totalPrice})
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <OrderTracking
                      orderId={order.id}
                      orderNumber={order.orderNumber}
                      orderStatus={order.orderStatus}
                      totalAmount={order.totalAmount}
                      customerName={order.customerName}
                      customerPhone={order.customerPhone}
                      customerAddress={order.customerAddress}
                      createdAt={order.createdAt}
                      estimatedDeliveryTime={order.estimatedDeliveryTime}
                      actualDeliveryTime={order.actualDeliveryTime}
                      deliveryInstructions={order.deliveryInstructions}
                      items={order.order_items || []}
                      sellerOrders={order.sellerOrders || []}
                      deliveryAgent={order.deliveryAgent}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 