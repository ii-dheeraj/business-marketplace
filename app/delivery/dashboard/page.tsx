"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, MapPin, Clock, DollarSign, Navigation, Phone, CheckCircle, Users } from "lucide-react"
import { getCookie } from "@/lib/utils"
import CustomerSignupForm from "@/components/CustomerSignupForm"

// Mock data
const stats = {
  totalDeliveries: 156,
  todayDeliveries: 8,
  earnings: 12400,
  rating: 4.7,
}

export default function DeliveryDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("available")
  const [availableOrders, setAvailableOrders] = useState<any[]>([])
  const [activeDeliveries, setActiveDeliveries] = useState<any[]>([])
  const [deliveryHistory, setDeliveryHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [agentName, setAgentName] = useState<string>("")
  const [agentId, setAgentId] = useState<number | null>(null)
  const [stats, setStats] = useState<any>({ totalDeliveries: 0, todayDeliveries: 0, earnings: 0, rating: null })

  // Add OTP and GPS tracking logic inside DeliveryDashboard
  const [otpInput, setOtpInput] = useState("");
  const [otpStatus, setOtpStatus] = useState("");
  const [locationStatus, setLocationStatus] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      // Get delivery agent name and id from userInfo cookie
      const userInfoCookie = getCookie("userInfo")
      const userTypeCookie = getCookie("userType")
      
      console.log("[DEBUG] Delivery Auth check - userInfo:", userInfoCookie ? "exists" : "missing")
      console.log("[DEBUG] Delivery Auth check - userType:", userTypeCookie)
      console.log("[DEBUG] Raw userInfo cookie value:", userInfoCookie)
      console.log("[DEBUG] userInfo cookie length:", userInfoCookie?.length)
      console.log("[DEBUG] userInfo cookie type:", typeof userInfoCookie)

      // Check if user is authenticated and is a delivery agent
      if (!userInfoCookie || userTypeCookie !== "DELIVERY_AGENT") {
        console.log("[DEBUG] Missing delivery auth - userInfo:", !!userInfoCookie, "userType:", userTypeCookie)
        setLoading(false)
        if (userTypeCookie && userTypeCookie !== "DELIVERY_AGENT") {
          // User is logged in but not a delivery agent
          router.push("/")
        } else {
          // User is not logged in
          router.push("/auth/login")
        }
        return
      }

      let deliveryAgentId = null
      try {
        console.log("[DEBUG] Attempting to parse userInfo cookie...")
        
        // Try to decode the cookie if it's URL encoded
        let decodedCookie = userInfoCookie
        try {
          decodedCookie = decodeURIComponent(userInfoCookie)
          console.log("[DEBUG] Decoded cookie:", decodedCookie)
        } catch (decodeError) {
          console.log("[DEBUG] Cookie is not URL encoded, using as-is")
        }
        
        const user = JSON.parse(decodedCookie)
        console.log("[DEBUG] Parsed user object:", user)
        console.log("[DEBUG] Setting delivery agent info:", user)
        setAgentName(user.name || "")
        setAgentId(user.id)
        deliveryAgentId = user.id
      } catch (error) {
        console.log("[DEBUG] Failed to parse userInfo cookie:", error)
        console.log("[DEBUG] Cookie value that failed to parse:", userInfoCookie)
        console.log("[DEBUG] Cookie value (stringified):", JSON.stringify(userInfoCookie))
        
        // Try to fix the cookie by clearing it and redirecting to login
        console.log("[DEBUG] Clearing corrupted cookie and redirecting to login")
        setLoading(false)
        router.push("/auth/login")
        return
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
        } catch (err) {
          // ignore
        }
      }
      fetchOrders()
      fetchHistory()
    }
    
    // Add a small delay to ensure cookies are set after registration
    setTimeout(checkAuth, 500)
  }, [router])

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

  // Function to handle OTP submit for a given order
  const handleOtpSubmit = async (orderId: string) => {
    setOtpStatus("Validating...");
    const res = await fetch("/api/delivery/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "validate_otp", orderId, otp: otpInput })
    });
    const data = await res.json();
    if (data.success) {
      setOtpStatus("OTP Validated! Parcel picked.");
      setOtpInput("");
      refreshOrders();
    } else {
      setOtpStatus(data.error || "Invalid OTP");
    }
  };

  // Function to update GPS location for all active deliveries
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="available">Available Orders</TabsTrigger>
            <TabsTrigger value="active">Active Deliveries</TabsTrigger>
            <TabsTrigger value="history">Delivery History</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
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

                      {delivery.status === "READY_FOR_PICKUP" && (
                        <div className="flex flex-col gap-2 mt-2">
                          <label htmlFor={`otp-${delivery.id}`}>Enter OTP from Seller:</label>
                          <input
                            id={`otp-${delivery.id}`}
                            type="text"
                            value={otpInput}
                            onChange={e => setOtpInput(e.target.value)}
                            className="border rounded px-2 py-1"
                            maxLength={6}
                          />
                          <Button onClick={() => handleOtpSubmit(delivery.id)}>
                            Confirm Parcel Pickup
                          </Button>
                          {otpStatus && <span className="text-xs text-blue-600">{otpStatus}</span>}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button onClick={() => handleCompleteDelivery(delivery.id)} className="flex-1">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Complete Delivery
                        </Button>
                        <Button variant="outline" onClick={() => handleViewRoute(delivery.pickup, delivery.delivery)}>
                          <Navigation className="h-4 w-4 mr-2" />
                          Navigate
                        </Button>
                        <Button variant="outline" onClick={() => handleCallCustomer(delivery.customerPhone)}>
                          <Phone className="h-4 w-4 mr-2" />
                          Call Customer
                        </Button>
                      </div>
                      {locationStatus && <div className="text-xs text-blue-600 mt-2">{locationStatus}</div>}
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

          <TabsContent value="customers" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold">Customer Registration</h2>
              <p className="text-sm text-gray-600">Help customers create accounts for delivery services</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Register New Customer</CardTitle>
                <CardDescription>
                  Create a customer account for someone who wants to use delivery services. 
                  This will redirect them to the customer dashboard after successful registration.
                </CardDescription>
              </CardHeader>
              <CardContent className="py-6">
                <CustomerSignupForm 
                  onSuccess={() => {
                    // Show success message
                    alert("Customer registered successfully! The customer has been redirected to their dashboard.");
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
