"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, MapPin, Clock, DollarSign, Navigation, Phone, CheckCircle } from "lucide-react"
import { getCookie } from "@/lib/utils"

// Mock data
const stats = {
  totalDeliveries: 156,
  todayDeliveries: 8,
  earnings: 12400,
  rating: 4.7,
}

export default function DeliveryDashboard() {
  const [activeTab, setActiveTab] = useState("available")
  const [availableOrders, setAvailableOrders] = useState<any[]>([])
  const [activeDeliveries, setActiveDeliveries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [agentName, setAgentName] = useState<string>("")
  const [stats, setStats] = useState<any>({ totalDeliveries: 0, todayDeliveries: 0, earnings: 0, rating: null })

  useEffect(() => {
    // Get delivery agent name and id from userInfo cookie
    const userInfoCookie = getCookie("userInfo")
    let deliveryAgentId = null
    if (userInfoCookie) {
      try {
        const user = JSON.parse(userInfoCookie)
        setAgentName(user.name || "")
        deliveryAgentId = user.id
      } catch {}
    }
    // Fetch orders and stats
    const fetchOrders = async () => {
      setLoading(true)
      setError("")
      try {
        const url = deliveryAgentId ? `/api/delivery/orders?deliveryAgentId=${deliveryAgentId}` : "/api/delivery/orders"
        const res = await fetch(url)
        const data = await res.json()
        if (res.ok) {
          setAvailableOrders(data.availableOrders || [])
          setActiveDeliveries(data.activeDeliveries || [])
          setStats(data.stats || { totalDeliveries: 0, todayDeliveries: 0, earnings: 0, rating: null })
        } else {
          setError(data.error || "Failed to fetch orders")
        }
      } catch (err) {
        setError("Failed to fetch orders")
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const handleAcceptOrder = (orderId: string) => {
    console.log("Accepting order:", orderId)
    // Handle order acceptance logic
  }

  const handleCompleteDelivery = (orderId: string) => {
    console.log("Completing delivery:", orderId)
    // Handle delivery completion logic
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {agentName || "Delivery Agent"}!</h1>
          <p className="text-gray-600">Ready to deliver happiness to customers</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDeliveries}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Deliveries</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayDeliveries}</div>
              <p className="text-xs text-muted-foreground">Completed today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.earnings?.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rating ? `${stats.rating}/5` : "-"}</div>
              <p className="text-xs text-muted-foreground">Customer rating</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available">Available Orders</TabsTrigger>
            <TabsTrigger value="active">Active Deliveries</TabsTrigger>
            <TabsTrigger value="history">Delivery History</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Available Orders</h2>
              <Badge variant="secondary">{availableOrders.length} orders available</Badge>
            </div>

            {loading ? (
              <div className="text-center py-8 text-gray-500">
                <p>Loading available orders...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                <p>{error}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {availableOrders.map((order) => (
                  <Card key={order.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{order.id}</h3>
                          <p className="text-gray-600">{order.seller}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">₹{order.deliveryFee}</p>
                          <p className="text-sm text-gray-500">Delivery fee</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">Pickup</span>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">{order.pickup}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="h-4 w-4 text-green-600" />
                            <span className="font-medium">Delivery</span>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">{order.delivery}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                        <span>Items: {order.items}</span>
                        <span>Distance: {order.distance}</span>
                        <span>Est. Time: {order.estimatedTime}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={() => handleAcceptOrder(order.id)} className="flex-1">
                          Accept Order
                        </Button>
                        <Button variant="outline">
                          <Navigation className="h-4 w-4 mr-2" />
                          View Route
                        </Button>
                        <Button variant="outline">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Customer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Active Deliveries</h2>
              <Badge variant="default">{activeDeliveries.length} active</Badge>
            </div>

            {loading ? (
              <div className="text-center py-8 text-gray-500">
                <p>Loading active deliveries...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                <p>{error}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeDeliveries.map((delivery) => (
                  <Card key={delivery.id} className="border-blue-200 bg-blue-50">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{delivery.id}</h3>
                          <p className="text-gray-600">{delivery.seller}</p>
                          <Badge variant="default" className="mt-1">
                            {delivery.status === "picked_up" ? "Picked Up" : "In Transit"}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">₹{delivery.deliveryFee}</p>
                          <p className="text-sm text-gray-500">Delivery fee</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-green-600" />
                          <span className="font-medium">Delivering to</span>
                        </div>
                        <p className="text-sm text-gray-600 ml-6">{delivery.delivery}</p>
                        <p className="text-sm text-gray-500 ml-6">Customer: {delivery.customer}</p>
                      </div>

                      <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                        <span>Items: {delivery.items}</span>
                        <span>ETA: {delivery.estimatedTime}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={() => handleCompleteDelivery(delivery.id)} className="flex-1">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Complete Delivery
                        </Button>
                        <Button variant="outline">
                          <Navigation className="h-4 w-4 mr-2" />
                          Navigate
                        </Button>
                        <Button variant="outline">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Customer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <h2 className="text-2xl font-bold">Delivery History</h2>

            <Card>
              <CardHeader>
                <CardTitle>Recent Deliveries</CardTitle>
                <CardDescription>Your completed deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No delivery history available</p>
                  <p className="text-sm">Complete your first delivery to see history</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
