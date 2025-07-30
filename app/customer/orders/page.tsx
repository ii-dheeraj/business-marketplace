"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  Loader2, 
  Package, 
  ArrowLeft, 
  Bell, 
  RefreshCw, 
  MapPin, 
  Phone, 
  Calendar,
  Clock,
  CheckCircle,
  Truck,
  FileText,
  XCircle,
  Eye,
  CreditCard,
  ShoppingBag,
  CalendarDays,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getCookie } from "@/lib/utils"
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
  const [trackingModalOpen, setTrackingModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())
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
    
    // Try to set up real-time connection, but don't fail if it doesn't work
    try {
      setupRealTimeConnection(user.id)
    } catch (error) {
      console.warn("Real-time connection failed, continuing without it:", error)
      setRealTimeConnected(false)
    }
    
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
        try {
          const data = JSON.parse(event.data)
          
          // Handle heartbeat messages
          if (data.type === 'heartbeat') {
            return
          }
          
          // Handle connection confirmation
          if (data.type === 'connected') {
            console.log("✅ Real-time connection confirmed")
            return
          }
          
          // Handle order updates
          if (data.type === 'order_update') {
            console.log("📦 Order update received:", data)
            toast({
              title: "Order Update",
              description: `Your order #${data.orderId} status has been updated to ${data.status}`,
            })
            
            // Refresh orders to get latest data
            const userInfoCookie = getCookie("userInfo")
            if (userInfoCookie) {
              const user = JSON.parse(userInfoCookie)
              fetchOrders(user.id)
            }
          }
          
        } catch (error) {
          console.error("Error parsing real-time message:", error)
        }
      }

      eventSource.onerror = (error) => {
        console.error("Real-time connection error:", error)
        setRealTimeConnected(false)
        
        // Only attempt to reconnect if the connection was actually closed
        if (eventSource.readyState === EventSource.CLOSED) {
          console.log("🔄 Attempting to reconnect in 5 seconds...")
          setTimeout(() => {
            const userInfoCookie = getCookie("userInfo")
            if (userInfoCookie) {
              const user = JSON.parse(userInfoCookie)
              setupRealTimeConnection(user.id)
            }
          }, 5000)
        }
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
      'ORDER_PLACED': 'bg-blue-100 text-blue-800 border-blue-200',
      'ORDER_CONFIRMED': 'bg-green-100 text-green-800 border-green-200',
      'PREPARING_ORDER': 'bg-orange-100 text-orange-800 border-orange-200',
      'READY_FOR_PICKUP': 'bg-purple-100 text-purple-800 border-purple-200',
      'PICKED_UP': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'IN_TRANSIT': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'OUT_FOR_DELIVERY': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'DELIVERED': 'bg-green-100 text-green-800 border-green-200',
      'CANCELLED': 'bg-red-100 text-red-800 border-red-200'
    }
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getStatusDisplayName = (status: string) => {
    const displayNames: { [key: string]: string } = {
      'ORDER_PLACED': 'Ordered',
      'ORDER_CONFIRMED': 'Confirmed',
      'PREPARING_ORDER': 'Preparing',
      'READY_FOR_PICKUP': 'Ready for Pickup',
      'PICKED_UP': 'Picked Up',
      'IN_TRANSIT': 'In Transit',
      'OUT_FOR_DELIVERY': 'Out for Delivery',
      'DELIVERED': 'Delivered',
      'CANCELLED': 'Cancelled'
    }
    return displayNames[status] || status.replace(/_/g, ' ')
  }

  const handleTrackOrder = (order: any) => {
    setSelectedOrder(order)
    setTrackingModalOpen(true)
  }

  const toggleCardExpansion = (orderId: string) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId)
    } else {
      newExpanded.add(orderId)
    }
    setExpandedCards(newExpanded)
  }

  const getTrackingSteps = (order: any) => {
    const steps = [
      {
        id: 'ordered',
        title: 'Ordered',
        description: 'Your order has been placed successfully',
        completed: true,
        timestamp: order.createdAt || order.created_at,
        icon: CheckCircle
      },
      {
        id: 'confirmed',
        title: 'Confirmed',
        description: 'Seller has confirmed your order',
        completed: ['ORDER_CONFIRMED', 'PREPARING_ORDER', 'READY_FOR_PICKUP', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(order.orderStatus),
        timestamp: order.orderStatus !== 'ORDER_PLACED' ? new Date(Date.now() - 2 * 60 * 60 * 1000) : null,
        icon: CheckCircle
      },
      {
        id: 'packed',
        title: 'Packed',
        description: 'Your order is being packed',
        completed: ['PREPARING_ORDER', 'READY_FOR_PICKUP', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(order.orderStatus),
        timestamp: ['PREPARING_ORDER', 'READY_FOR_PICKUP', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(order.orderStatus) ? new Date(Date.now() - 1.5 * 60 * 60 * 1000) : null,
        icon: Package
      },
      {
        id: 'shipped',
        title: 'Shipped',
        description: 'Your order is on its way',
        completed: ['PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(order.orderStatus),
        timestamp: ['PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(order.orderStatus) ? new Date(Date.now() - 1 * 60 * 60 * 1000) : null,
        icon: Truck
      },
      {
        id: 'out_for_delivery',
        title: 'Out for Delivery',
        description: 'Delivery agent is on the way',
        completed: ['OUT_FOR_DELIVERY', 'DELIVERED'].includes(order.orderStatus),
        timestamp: ['OUT_FOR_DELIVERY', 'DELIVERED'].includes(order.orderStatus) ? new Date(Date.now() - 0.5 * 60 * 60 * 1000) : null,
        icon: Truck
      },
      {
        id: 'delivered',
        title: 'Delivered',
        description: 'Your order has been delivered',
        completed: order.orderStatus === 'DELIVERED',
        timestamp: order.orderStatus === 'DELIVERED' ? new Date(Date.now()) : null,
        icon: CheckCircle
      }
    ]
    return steps
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/customer/home" className="text-blue-600 hover:text-blue-700 flex items-center mr-6 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" /> 
              <span className="font-medium">Back to Home</span>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600 mt-1">Track and manage your orders</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Real-time Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-sm border">
              <div className={`w-2 h-2 rounded-full ${realTimeConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-sm font-medium ${realTimeConnected ? 'text-green-600' : 'text-red-600'}`}>
                {realTimeConnected ? 'Live Updates' : 'Offline'}
              </span>
            </div>
            
            {/* Refresh Button */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={refreshing}
              className="shadow-sm"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Real-time Notification Banner */}
        {realTimeConnected && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Bell className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-green-800 font-medium">Live Updates Active</p>
              <p className="text-green-700 text-sm">You'll be notified of any order changes instantly</p>
            </div>
          </div>
        )}
        
        {/* Fallback message if real-time is not available */}
        {!realTimeConnected && (
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Bell className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-blue-800 font-medium">Manual Updates</p>
              <p className="text-blue-700 text-sm">Use the refresh button to check for updates</p>
            </div>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-6">Start shopping to place your first order!</p>
            <Link href="/customer/home">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Browse Businesses
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const isExpanded = expandedCards.has(order.id)
              return (
                <Card key={order.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden">
                  <CardContent className="p-0">
                    {/* Order Header */}
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <ShoppingBag className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">#{order.id}</h3>
                            <div className="flex items-center gap-3 mt-1">
                              <Badge className={`${getStatusBadgeColor(order.orderStatus)} border font-medium px-3 py-1`}>
                                {getStatusDisplayName(order.orderStatus)}
                              </Badge>
                              <div className="flex items-center gap-1 text-gray-500">
                                <CalendarDays className="h-4 w-4" />
                                <span className="text-sm">
                                  {new Date(order.createdAt || order.created_at).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-600">₹{order.totalAmount}</p>
                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                              <CreditCard className="h-3 w-3" />
                              <span>{order.paymentMethod || 'COD'}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleCardExpansion(order.id)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Collapsible Content */}
                    {isExpanded && (
                      <div className="p-6 space-y-6">
                        {/* Item Summary */}
                        <div className="bg-gray-50 rounded-xl p-4">
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Package className="h-4 w-4 text-blue-600" />
                            Order Items
                          </h4>
                          <div className="space-y-3">
                            {(order.order_items || []).map((item: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                                <div className="flex items-center gap-3">
                                  {item.productImage && (
                                    <img 
                                      src={item.productImage} 
                                      alt={item.productName}
                                      className="w-12 h-12 object-cover rounded-lg border"
                                      onError={(e) => {
                                        e.currentTarget.src = '/placeholder.jpg'
                                      }}
                                    />
                                  )}
                                  <div>
                                    <p className="font-medium text-gray-900">{item.productName}</p>
                                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-green-600">₹{item.totalPrice}</p>
                                  <p className="text-sm text-gray-500">₹{item.unitPrice} each</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Delivery OTP */}
                        {order.parcel_otp && order.orderStatus !== 'DELIVERED' && (
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="h-8 w-8 text-blue-600" />
                              </div>
                              <h4 className="text-lg font-semibold text-blue-900 mb-2">
                                Delivery OTP
                              </h4>
                              <p className="text-blue-700 mb-4">
                                Share this OTP with the delivery agent when they arrive
                              </p>
                              <div className="bg-white p-6 rounded-xl border-2 border-blue-300 shadow-lg inline-block">
                                <span className="text-4xl font-bold text-blue-600 tracking-widest font-mono">
                                  {order.parcel_otp}
                                </span>
                              </div>
                              <p className="text-sm text-blue-600 mt-3">
                                Valid until delivery is completed
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Delivery Address */}
                        <div className="bg-gray-50 rounded-xl p-4">
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-purple-600" />
                            Delivery Address
                          </h4>
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-gray-700 mb-2">{order.customerAddress}</p>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone className="h-4 w-4" />
                              <span>{order.customerPhone}</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                          <Button 
                            onClick={() => handleTrackOrder(order)}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Track Order
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1 border-gray-300 hover:bg-gray-50"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            View Invoice
                          </Button>
                          {order.orderStatus === 'ORDER_PLACED' && (
                            <Button 
                              variant="outline" 
                              className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Cancel Order
                            </Button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Quick Actions (when collapsed) */}
                    {!isExpanded && (
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">
                              {(order.order_items || []).length} item{(order.order_items || []).length !== 1 ? 's' : ''}
                            </span>
                            {order.parcel_otp && order.orderStatus !== 'DELIVERED' && (
                              <div className="flex items-center gap-2 text-blue-600">
                                <Package className="h-4 w-4" />
                                <span className="text-sm font-medium">OTP: {order.parcel_otp}</span>
                              </div>
                            )}
                          </div>
                          <Button 
                            onClick={() => handleTrackOrder(order)}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Track
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Enhanced Tracking Modal */}
      <Dialog open={trackingModalOpen} onOpenChange={setTrackingModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <Truck className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-bold">Track Order #{selectedOrder?.id}</div>
                <div className="text-sm font-normal text-gray-600">
                  {selectedOrder && getStatusDisplayName(selectedOrder.orderStatus)}
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Summary Card */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Order Summary</h3>
                  <Badge className={getStatusBadgeColor(selectedOrder.orderStatus)}>
                    {getStatusDisplayName(selectedOrder.orderStatus)}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Total Amount</p>
                    <p className="font-bold text-green-600 text-lg">₹{selectedOrder.totalAmount}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Payment Method</p>
                    <p className="font-medium text-gray-900">{selectedOrder.paymentMethod || 'COD'}</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Tracking Steps */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 text-lg">Order Timeline</h3>
                <div className="relative">
                  {getTrackingSteps(selectedOrder).map((step, index) => {
                    const IconComponent = step.icon
                    const isLast = index === getTrackingSteps(selectedOrder).length - 1
                    
                    return (
                      <div key={step.id} className="flex items-start relative">
                        {/* Step Icon */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                          step.completed 
                            ? 'bg-gradient-to-br from-green-500 to-green-600 text-white' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        
                        {/* Step Content */}
                        <div className="ml-6 flex-1 pb-8">
                          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className={`font-semibold text-lg ${
                                step.completed ? 'text-gray-900' : 'text-gray-500'
                              }`}>
                                {step.title}
                              </h4>
                              {step.timestamp && (
                                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                  {new Date(step.timestamp).toLocaleDateString('en-IN', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              )}
                            </div>
                            <p className={`text-sm ${
                              step.completed ? 'text-gray-700' : 'text-gray-500'
                            }`}>
                              {step.description}
                            </p>
                          </div>
                        </div>
                        
                        {/* Vertical Line */}
                        {!isLast && (
                          <div className={`absolute left-6 top-12 w-0.5 h-16 ${
                            step.completed ? 'bg-gradient-to-b from-green-400 to-green-200' : 'bg-gray-200'
                          }`}></div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Estimated Delivery */}
              {selectedOrder.estimatedDeliveryTime && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="font-semibold text-blue-900">Estimated Delivery</span>
                  </div>
                  <p className="text-blue-700 font-medium">
                    {new Date(selectedOrder.estimatedDeliveryTime).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setTrackingModalOpen(false)}
                >
                  Close
                </Button>
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Invoice
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 