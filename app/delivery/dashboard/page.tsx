"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, MapPin, Clock, DollarSign, Navigation, Phone, CheckCircle, User, Key, Map, Truck } from "lucide-react"
import { getCookie } from "@/lib/utils"
import DeliveryOTPVerification from "@/components/DeliveryOTPVerification"

// Mock data
const stats = {
  totalDeliveries: 156,
  todayDeliveries: 8,
  earnings: 12400,
  rating: 4.7,
}

export default function DeliveryDashboard() {
  const [activeTab, setActiveTab] = useState("available")
  const [locationStatus, setLocationStatus] = useState("")
  const [dataLoading, setDataLoading] = useState(false)
  const [availableOrders, setAvailableOrders] = useState<any[]>([])
  const [activeDeliveries, setActiveDeliveries] = useState<any[]>([])
  const [deliveryHistory, setDeliveryHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [agentName, setAgentName] = useState<string>("")
  const [agentId, setAgentId] = useState<number | null>(null)
  const [stats, setStats] = useState<any>({ totalDeliveries: 0, todayDeliveries: 0, earnings: 0, rating: null })
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null)
  const [isTracking, setIsTracking] = useState(false)

  useEffect(() => {
      // Get delivery agent name and id from userInfo cookie
      const userInfoCookie = getCookie("userInfo")
      let deliveryAgentId = null
    if (userInfoCookie) {
      try {
        const user = JSON.parse(userInfoCookie)
        setAgentName(user.name || "")
        setAgentId(user.id)
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
      const fetchHistory = async () => {
        if (!deliveryAgentId) return
        try {
          const res = await fetch(`/api/order/place?deliveryAgentId=${deliveryAgentId}&status=DELIVERED`)
          const data = await res.json()
          if (res.ok && data.orders) {
            setDeliveryHistory(data.orders)
          }
      } catch {}
      }
      fetchOrders()
      fetchHistory()
  }, [])

  const refreshOrders = async () => {
    if (!agentId) return
    setLoading(true)
    setError("")
    try {
      const url = `/api/delivery/orders?deliveryAgentId=${agentId}`
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
    
  const handleAcceptOrder = async (orderId: string) => {
    if (!agentId) return
    try {
      const res = await fetch("/api/delivery/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, deliveryAgentId: agentId, action: "accept" })
      })
      if (res.ok) {
        refreshOrders()
      }
    } catch {}
  }

  const handleCompleteDelivery = async (orderId: string) => {
    if (!agentId) return
    try {
      const res = await fetch("/api/delivery/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, deliveryAgentId: agentId, action: "delivered" })
      })
      if (res.ok) {
        refreshOrders()
      }
    } catch {}
  }

  const handlePickupParcel = async (orderId: string) => {
    if (!agentId) return
    try {
      const res = await fetch("/api/delivery/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, deliveryAgentId: agentId, action: "picked_up" })
      })
      if (res.ok) {
        refreshOrders()
      }
    } catch {}
  }

  const handleStartDelivery = async (orderId: string) => {
    if (!agentId) return
    try {
      const res = await fetch("/api/order/tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          orderId, 
          deliveryAgentId: agentId, 
          action: "start_delivery" 
        })
      })
      if (res.ok) {
        refreshOrders()
        // Start GPS tracking if not already active
        if (!isTracking) {
          startTracking()
        }
      }
    } catch (error) {
      console.error("Error starting delivery:", error)
    }
  }

  // Function to start GPS tracking
  const startTracking = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation not supported");
      return;
    }
    setIsTracking(true);
    setLocationStatus("Starting GPS tracking...");
    
    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const location = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCurrentLocation(location);
        setLocationStatus("GPS tracking active");
        
        // Update location for all active deliveries
        if (agentId && activeDeliveries.length) {
          for (const delivery of activeDeliveries) {
            try {
              await fetch("/api/order/tracking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  orderId: delivery.id,
                  deliveryAgentId: agentId,
                  action: "update_location",
                  location: location
                })
              });
            } catch (error) {
              console.error("Error updating location:", error);
            }
          }
        }
      },
      (error) => {
        setLocationStatus("GPS tracking failed");
        setIsTracking(false);
        console.error("GPS error:", error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
    
    // Store watch ID for cleanup
    return () => navigator.geolocation.clearWatch(watchId);
  };

  // Function to stop GPS tracking
  const stopTracking = () => {
    setIsTracking(false);
    setLocationStatus("GPS tracking stopped");
  };

  // Function to update GPS location for all active deliveries (legacy)
  const updateLocation = async () => {
    if (!agentId || !activeDeliveries.length) return;
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      setLocationStatus("Updating location...");
      for (const delivery of activeDeliveries) {
        await fetch("/api/delivery/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "update_location",
            orderId: delivery.id,
            deliveryAgentId: agentId,
            location: { lat: pos.coords.latitude, lng: pos.coords.longitude }
          })
        });
      }
      setLocationStatus("Location updated");
    }, () => setLocationStatus("Failed to get location"));
  };

  useEffect(() => {
    if (activeDeliveries.length) {
      updateLocation();
      const interval = setInterval(updateLocation, 10000); // update every 10s
      return () => clearInterval(interval);
    }
  }, [activeDeliveries, agentId]);

  const handleViewRoute = (pickup: string, delivery: string) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(delivery)}`
    window.open(url, "_blank")
  }

  const handleCallCustomer = (phone: string) => {
    window.open(`tel:${phone}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {agentName || "Delivery Agent"}!</h1>
              <p className="text-gray-600">Ready to deliver happiness to customers</p>
            </div>
            
            {/* GPS Tracking Controls */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Map className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">GPS Tracking</span>
              </div>
              <div className="flex gap-2">
                {!isTracking ? (
                  <Button 
                    onClick={startTracking} 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Map className="h-4 w-4 mr-1" />
                    Start Tracking
                  </Button>
                ) : (
                  <Button 
                    onClick={stopTracking} 
                    size="sm" 
                    variant="destructive"
                  >
                    <Map className="h-4 w-4 mr-1" />
                    Stop Tracking
                  </Button>
                )}
              </div>
              {locationStatus && (
                <p className="text-xs text-gray-500">{locationStatus}</p>
              )}
              {currentLocation && (
                <p className="text-xs text-gray-500">
                  Location: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
                </p>
              )}
            </div>
          </div>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="available">Available Orders</TabsTrigger>
            <TabsTrigger value="pickup">Ready for Pickup</TabsTrigger>
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
                        <Button variant="outline" onClick={() => handleViewRoute(order.pickup, order.delivery)}>
                          <Navigation className="h-4 w-4 mr-2" />
                          View Route
                        </Button>
                        <Button variant="outline" onClick={() => handleCallCustomer(order.customerPhone)}>
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

          <TabsContent value="pickup" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Ready for Pickup</h2>
              <Badge variant="default">{activeDeliveries.filter(d => d.status === "READY_FOR_DELIVERY").length} ready</Badge>
            </div>

            {loading ? (
              <div className="text-center py-8 text-gray-500">
                <p>Loading pickup orders...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                <p>{error}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeDeliveries.filter(delivery => delivery.status === "READY_FOR_DELIVERY").map((delivery) => (
                  <Card key={delivery.id} className="border-orange-200 bg-orange-50">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">Order #{delivery.id}</h3>
                          <p className="text-gray-600">Customer: {delivery.customer}</p>
                          <Badge variant="default" className="mt-1 bg-orange-500">
                            Ready for Pickup
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">₹{delivery.deliveryFee}</p>
                          <p className="text-sm text-gray-500">Delivery fee</p>
                        </div>
                      </div>

                      {/* Seller Information */}
                      <div className="mb-4 p-4 bg-white rounded-lg border">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <Package className="h-4 w-4 text-orange-600" />
                          Seller Information
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Seller Name:</p>
                            <p className="text-sm text-gray-600">{delivery.seller}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Seller Phone:</p>
                            <p className="text-sm text-gray-600">{delivery.sellerPhone}</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-700">Seller Address:</p>
                          <p className="text-sm text-gray-600">{delivery.sellerAddress}</p>
                        </div>
                      </div>

                      {/* Customer Information */}
                      <div className="mb-4 p-4 bg-white rounded-lg border">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <User className="h-4 w-4 text-green-600" />
                          Customer Information
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Customer Name:</p>
                            <p className="text-sm text-gray-600">{delivery.customer}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Customer Phone:</p>
                            <p className="text-sm text-gray-600">{delivery.customerPhone}</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-700">Delivery Address:</p>
                          <p className="text-sm text-gray-600">{delivery.delivery}</p>
                        </div>
                      </div>

                      {/* Product Information */}
                      <div className="mb-4 p-4 bg-white rounded-lg border">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <Package className="h-4 w-4 text-blue-600" />
                          Product Details
                        </h4>
                        {delivery.productDetails && delivery.productDetails.length > 0 ? (
                          <div className="space-y-2">
                            {delivery.productDetails.map((product: any, index: number) => (
                              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                <div>
                                  <p className="text-sm font-medium text-gray-700">{product.name}</p>
                                  <p className="text-xs text-gray-500">Quantity: {product.quantity}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-700">₹{product.price}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No product details available</p>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="h-4 w-4 text-orange-600" />
                            <span className="font-medium">Pickup Location</span>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">{delivery.pickup}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="h-4 w-4 text-green-600" />
                            <span className="font-medium">Delivery Location</span>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">{delivery.delivery}</p>
                          <p className="text-sm text-gray-500 ml-6">Customer: {delivery.customer}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                        <span>Total Amount: ₹{delivery.amount}</span>
                        <span>Distance: {delivery.distance}</span>
                        <span>Est. Time: {delivery.estimatedTime}</span>
                      </div>

                      <div className="flex flex-col gap-2 mt-4 p-4 bg-white rounded-lg border">
                        <DeliveryOTPVerification
                          orderId={delivery.id}
                          deliveryAgentId={agentId || 0}
                          onSuccess={refreshOrders}
                          trigger={
                            <Button className="mt-2 bg-orange-600 hover:bg-orange-700 w-full">
                              <Key className="h-4 w-4 mr-2" />
                              Pickup Parcel with OTP
                            </Button>
                          }
                        />
                        <p className="text-xs text-gray-500 text-center">Generate OTP and verify with seller to confirm pickup</p>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" onClick={() => handleViewRoute(delivery.pickup, delivery.delivery)}>
                          <Navigation className="h-4 w-4 mr-2" />
                          Navigate to Pickup
                        </Button>
                        <Button variant="outline" onClick={() => handleCallCustomer(delivery.customerPhone)}>
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
              <Badge variant="default">{activeDeliveries.filter(d => d.status === "PICKED_UP" || d.status === "IN_TRANSIT").length} active</Badge>
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
                {activeDeliveries.filter(delivery => delivery.status === "PICKED_UP" || delivery.status === "IN_TRANSIT").map((delivery) => (
                  <Card key={delivery.id} className="border-blue-200 bg-blue-50">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{delivery.id}</h3>
                          <p className="text-gray-600">{delivery.seller}</p>
                          <Badge variant="default" className="mt-1">
                            {delivery.status === "PICKED_UP" ? "Picked Up" : "In Transit"}
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
                          {delivery.status === "PICKED_UP" && (
                            <Button 
                              onClick={() => handleStartDelivery(delivery.id)} 
                              className="flex-1 bg-blue-600 hover:bg-blue-700"
                            >
                              <Truck className="h-4 w-4 mr-2" />
                              Start Delivery
                            </Button>
                          )}
                          {delivery.status === "IN_TRANSIT" && (
                            <Button onClick={() => handleCompleteDelivery(delivery.id)} className="flex-1">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Complete Delivery
                            </Button>
                          )}
                          <Button variant="outline" onClick={() => handleViewRoute(delivery.pickup, delivery.delivery)}>
                            <Navigation className="h-4 w-4 mr-2" />
                            Navigate
                          </Button>
                          <Button variant="outline" onClick={() => handleCallCustomer(delivery.customerPhone)}>
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
            {deliveryHistory.length === 0 ? (
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
            ) : (
              <div className="space-y-4">
                {deliveryHistory.map((order: any) => (
                  <Card key={order.id} className="border-green-200 bg-green-50">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{order.orderNumber || order.id}</h3>
                          <p className="text-gray-600">{order.customerName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">₹{order.deliveryFee}</p>
                          <p className="text-sm text-gray-500">Delivery fee</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-green-600" />
                          <span className="font-medium">Delivered to</span>
                        </div>
                        <p className="text-sm text-gray-600 ml-6">{order.customerAddress}</p>
                        <p className="text-sm text-gray-500 ml-6">Customer: {order.customerName}</p>
                      </div>
                      <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                        <span>Items: {order.items?.map((i: any) => i.productName).join(", ")}</span>
                        <span>Delivered At: {order.actualDeliveryTime ? new Date(order.actualDeliveryTime).toLocaleString() : "-"}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
