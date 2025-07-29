"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, MapPin, Phone, Clock, CheckCircle, Truck, User, ShoppingBag } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Order {
  id: string
  orderId: number
  seller: string
  customer: string
  phone: string
  address: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  totalAmount: number
  status: string
  otp_verified: boolean
  parcel_otp: string | null
  deliveryAgentId: number
  created_at: string
  updated_at: string
  isUnassigned?: boolean // Flag to identify unassigned orders
}

export default function DeliveryDashboard() {
  const [availableOrders, setAvailableOrders] = useState<Order[]>([])
  const [activeDeliveries, setActiveDeliveries] = useState<Order[]>([])
  const [completedDeliveries, setCompletedDeliveries] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [isTracking, setIsTracking] = useState(false)
  const [trackingInterval, setTrackingInterval] = useState<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  const agentId = 1 // This should come from authentication

  useEffect(() => {
    fetchOrders()
    getCurrentLocation()
  }, [])

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error getting location:", error)
          toast({
            title: "Location Error",
            description: "Unable to get your current location",
            variant: "destructive",
          })
        }
      )
    }
  }

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/delivery/orders?deliveryAgentId=${agentId}`)
      const data = await response.json()

      if (response.ok) {
        setAvailableOrders(data.availableOrders || [])
        setActiveDeliveries(data.activeDeliveries || [])
        setCompletedDeliveries(data.completedDeliveries || [])
      } else {
        console.error("Failed to fetch orders:", data)
        toast({
          title: "Error",
          description: "Failed to fetch orders",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptOrder = async (orderId: string) => {
    try {
      const order = availableOrders.find(o => o.id === orderId)
      const actualOrderId = order?.orderId || orderId

      const response = await fetch("/api/delivery/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          orderId: actualOrderId, 
          deliveryAgentId: agentId, 
          action: "accept" 
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Order accepted successfully",
        })
        fetchOrders()
      } else {
        console.error("Failed to accept order:", data)
        toast({
          title: "Error",
          description: data.error || "Failed to accept order",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error accepting order:", error)
      toast({
        title: "Error",
        description: "Failed to accept order",
        variant: "destructive",
      })
    }
  }

  const handleGenerateOTP = async (orderId: string) => {
    try {
      const order = activeDeliveries.find(o => o.id === orderId)
      const actualOrderId = order?.orderId || orderId

      const response = await fetch("/api/order/generate-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: actualOrderId,
          deliveryAgentId: agentId
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "OTP Generated",
          description: `OTP: ${data.otp}`,
        })
        fetchOrders()
      } else {
        console.error("Failed to generate OTP:", data)
        toast({
          title: "Error",
          description: data.error || "Failed to generate OTP",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error generating OTP:", error)
      toast({
        title: "Error",
        description: "Failed to generate OTP",
        variant: "destructive",
      })
    }
  }

  const handlePickupParcel = async (orderId: string) => {
    try {
      const order = activeDeliveries.find(o => o.id === orderId)
      const actualOrderId = order?.orderId || orderId

      const response = await fetch("/api/delivery/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          orderId: actualOrderId, 
          deliveryAgentId: agentId, 
          action: "pickup" 
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Parcel picked up successfully",
        })
        fetchOrders()
      } else {
        console.error("Failed to pickup parcel:", data)
        toast({
          title: "Error",
          description: data.error || "Failed to pickup parcel",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error picking up parcel:", error)
      toast({
        title: "Error",
        description: "Failed to pickup parcel",
        variant: "destructive",
      })
    }
  }

  const handleStartDelivery = async (orderId: string) => {
    try {
      const order = activeDeliveries.find(o => o.id === orderId)
      const actualOrderId = order?.orderId || orderId

      const response = await fetch("/api/delivery/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          orderId: actualOrderId, 
          deliveryAgentId: agentId, 
          action: "start_delivery" 
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Delivery started successfully",
        })
        startLocationTracking(actualOrderId)
        fetchOrders()
      } else {
        console.error("Failed to start delivery:", data)
        toast({
          title: "Error",
          description: data.error || "Failed to start delivery",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error starting delivery:", error)
      toast({
        title: "Error",
        description: "Failed to start delivery",
        variant: "destructive",
      })
    }
  }

  const handleCompleteDelivery = async (orderId: string) => {
    try {
      const order = activeDeliveries.find(o => o.id === orderId)
      const actualOrderId = order?.orderId || orderId

      const response = await fetch("/api/delivery/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          orderId: actualOrderId, 
          deliveryAgentId: agentId, 
          action: "complete" 
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Delivery completed successfully",
        })
        stopLocationTracking()
        fetchOrders()
      } else {
        console.error("Failed to complete delivery:", data)
        toast({
          title: "Error",
          description: data.error || "Failed to complete delivery",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error completing delivery:", error)
      toast({
        title: "Error",
        description: "Failed to complete delivery",
        variant: "destructive",
      })
    }
  }

  const startLocationTracking = (orderId: number) => {
    setIsTracking(true)
    const interval = setInterval(() => {
      if (location) {
        updateLocation(orderId, location)
      }
    }, 10000) // Update every 10 seconds
    setTrackingInterval(interval)
  }

  const stopLocationTracking = () => {
    setIsTracking(false)
    if (trackingInterval) {
      clearInterval(trackingInterval)
      setTrackingInterval(null)
    }
  }

  const updateLocation = async (orderId: number, location: { latitude: number; longitude: number }) => {
    try {
      const response = await fetch("/api/delivery/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderId,
          deliveryAgentId: agentId,
          action: "update_location",
          location: {
            latitude: location.latitude,
            longitude: location.longitude,
            accuracy: 10,
            speed: 0,
            heading: 0
          }
        }),
      })

      if (!response.ok) {
        console.error("Failed to update location")
      }
    } catch (error) {
      console.error("Error updating location:", error)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: { [key: string]: { variant: "default" | "secondary" | "destructive" | "outline", text: string } } = {
      'PENDING': { variant: 'outline', text: 'Pending' },
      'ACCEPTED_BY_AGENT': { variant: 'secondary', text: 'Accepted' },
      'OTP_GENERATED': { variant: 'secondary', text: 'OTP Generated' },
      'OTP_VERIFIED': { variant: 'default', text: 'Ready for Pickup' },
      'PARCEL_PICKED_UP': { variant: 'default', text: 'Picked Up' },
      'IN_TRANSIT': { variant: 'default', text: 'In Transit' },
      'DELIVERED': { variant: 'outline', text: 'Delivered' },
      'CANCELLED': { variant: 'destructive', text: 'Cancelled' }
    }

    const config = statusConfig[status] || { variant: 'outline', text: status }
    return <Badge variant={config.variant}>{config.text}</Badge>
  }

  const getActionButtons = (order: Order) => {
    const buttons = []

    switch (order.status) {
      case 'PENDING':
        buttons.push(
          <Button
            key="accept"
            onClick={() => handleAcceptOrder(order.id)}
            className="flex-1"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            {order.isUnassigned ? "Accept & Assign Order" : "Accept Order"}
          </Button>
        )
        break

      case 'ACCEPTED_BY_AGENT':
        buttons.push(
          <Button
            key="generate-otp"
            onClick={() => handleGenerateOTP(order.id)}
            className="flex-1"
          >
            <Package className="h-4 w-4 mr-2" />
            Generate OTP
          </Button>
        )
        break

      case 'OTP_GENERATED':
        buttons.push(
          <div key="otp-info" className="flex-1 text-center p-2 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">Waiting for seller to verify OTP</p>
          </div>
        )
        break

      case 'OTP_VERIFIED':
        buttons.push(
          <Button
            key="pickup"
            onClick={() => handlePickupParcel(order.id)}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <Package className="h-4 w-4 mr-2" />
            Pickup Parcel
          </Button>
        )
        break

      case 'PARCEL_PICKED_UP':
        buttons.push(
          <Button
            key="start-delivery"
            onClick={() => handleStartDelivery(order.id)}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <Truck className="h-4 w-4 mr-2" />
            Start Delivery
          </Button>
        )
        break

      case 'IN_TRANSIT':
        buttons.push(
          <Button
            key="complete"
            onClick={() => handleCompleteDelivery(order.id)}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Complete Delivery
          </Button>
        )
        break
    }

    return buttons
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2">Loading orders...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Delivery Dashboard</h1>
        <p className="text-gray-600">Manage your deliveries and track orders</p>
      </div>

      <Tabs defaultValue="available" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="available">Available Orders</TabsTrigger>
          <TabsTrigger value="active">Active Deliveries</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="tracking">GPS Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Available Orders</h2>
            <Badge variant="default">{availableOrders.length} available</Badge>
          </div>
          {availableOrders.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No available orders at the moment</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {availableOrders.map((order) => (
                <Card key={order.id} className={order.isUnassigned ? "border-2 border-blue-200 bg-blue-50" : ""}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <ShoppingBag className="h-5 w-5" />
                          Order #{order.id}
                          {order.isUnassigned && (
                            <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 border-blue-300">
                              Unassigned
                            </Badge>
                          )}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {new Date(order.created_at).toLocaleString()}
                        </p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Seller</p>
                          <p className="text-sm">{order.seller}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Customer</p>
                          <p className="text-sm">{order.customer}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Delivery Address</p>
                        <p className="text-sm flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {order.address}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Customer Phone</p>
                        <p className="text-sm flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {order.phone}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Items</p>
                        <p className="text-sm">
                          {order.items.map(item => `${item.name} (${item.quantity})`).join(", ")}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Total Amount</p>
                          <p className="text-lg font-bold">₹{order.totalAmount}</p>
                        </div>
                        <div className="flex gap-2">
                          {getActionButtons(order)}
                        </div>
                      </div>
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
          {activeDeliveries.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No active deliveries</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {activeDeliveries.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Truck className="h-5 w-5" />
                          Order #{order.id}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {new Date(order.created_at).toLocaleString()}
                        </p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Seller</p>
                          <p className="text-sm">{order.seller}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Customer</p>
                          <p className="text-sm">{order.customer}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Delivery Address</p>
                        <p className="text-sm flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {order.address}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Customer Phone</p>
                        <p className="text-sm flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {order.phone}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Total Amount</p>
                          <p className="text-lg font-bold">₹{order.totalAmount}</p>
                        </div>
                        <div className="flex gap-2">
                          {getActionButtons(order)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Completed Deliveries</h2>
            <Badge variant="outline">{completedDeliveries.length} completed</Badge>
          </div>
          {completedDeliveries.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No completed deliveries yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {completedDeliveries.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          Order #{order.id}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          Completed: {new Date(order.updated_at).toLocaleString()}
                        </p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Seller</p>
                          <p className="text-sm">{order.seller}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Customer</p>
                          <p className="text-sm">{order.customer}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Total Amount</p>
                        <p className="text-lg font-bold">₹{order.totalAmount}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">GPS Tracking</h2>
            <Badge variant={isTracking ? "default" : "outline"}>
              {isTracking ? "Tracking Active" : "Tracking Inactive"}
            </Badge>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Current Location</p>
                  {location ? (
                    <p className="text-sm">
                      Lat: {location.latitude.toFixed(6)}, Lng: {location.longitude.toFixed(6)}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">Location not available</p>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Tracking Status</p>
                  <p className="text-sm">
                    {isTracking ? "GPS tracking is active" : "GPS tracking is inactive"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={getCurrentLocation}
                    variant="outline"
                    className="flex-1"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Update Location
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
