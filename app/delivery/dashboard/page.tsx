"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Package, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle, 
  Truck, 
  User, 
  ShoppingBag, 
  Store, 
  Home, 
  CreditCard,
  Copy,
  Users,
  Building,
  Eye,
  Upload,
  AlertTriangle,
  ArrowLeft,
  X
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Order {
  id: string
  orderId: number
  seller: string
  sellerAddress: string
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
  isUnassigned?: boolean
}

interface ModalState {
  isOpen: boolean
  selectedOrder: Order | null
  buyerOtp: string
  isOtpValid: boolean
  showReturnForm: boolean
  showDisputeForm: boolean
  returnReason: string
  disputeReason: string
  evidenceFile: File | null
}

export default function DeliveryDashboard() {
  const [availableOrders, setAvailableOrders] = useState<Order[]>([])
  const [activeDeliveries, setActiveDeliveries] = useState<Order[]>([])
  const [completedDeliveries, setCompletedDeliveries] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [isTracking, setIsTracking] = useState(false)
  const [trackingInterval, setTrackingInterval] = useState<NodeJS.Timeout | null>(null)
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    selectedOrder: null,
    buyerOtp: '',
    isOtpValid: false,
    showReturnForm: false,
    showDisputeForm: false,
    returnReason: '',
    disputeReason: '',
    evidenceFile: null
  })
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
      const response = await fetch("/api/delivery/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderId,
          deliveryAgentId: agentId,
          action: "accept"
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Order accepted successfully!",
        })
        fetchOrders() // Refresh orders
      } else {
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
      const response = await fetch("/api/order/generate-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderId,
          deliveryAgentId: agentId
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "OTP generated successfully! Share this with the seller.",
        })
        fetchOrders() // Refresh orders
      } else {
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
      const response = await fetch("/api/delivery/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderId,
          deliveryAgentId: agentId,
          action: "pickup"
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Parcel picked up successfully!",
        })
        fetchOrders() // Refresh orders
      } else {
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
      const response = await fetch("/api/delivery/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderId,
          deliveryAgentId: agentId,
          action: "start_delivery"
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Delivery started!",
        })
        fetchOrders() // Refresh orders
        startLocationTracking(Number(orderId))
      } else {
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
      const response = await fetch("/api/delivery/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderId,
          deliveryAgentId: agentId,
          action: "complete"
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Delivery completed successfully!",
        })
        stopLocationTracking()
        fetchOrders() // Refresh orders
        closeModal()
      } else {
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
      updateLocation(orderId, location!)
    }, 30000) // Update every 30 seconds
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
      await fetch("/api/delivery/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderId,
          deliveryAgentId: agentId,
          action: "update_location",
          location: location
        })
      })
    } catch (error) {
      console.error("Error updating location:", error)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'PENDING': { variant: 'secondary', text: 'Pending', icon: Clock },
      'ACCEPTED_BY_AGENT': { variant: 'default', text: 'Accepted', icon: CheckCircle },
      'OTP_GENERATED': { variant: 'secondary', text: 'OTP Generated', icon: Package },
      'OTP_VERIFIED': { variant: 'default', text: 'Ready for Pickup', icon: Package },
      'PARCEL_PICKED_UP': { variant: 'default', text: 'Picked Up', icon: Truck },
      'IN_TRANSIT': { variant: 'default', text: 'In Transit', icon: Truck },
      'DELIVERED': { variant: 'default', text: 'Delivered', icon: CheckCircle }
    }

    const config = statusConfig[status as keyof typeof statusConfig] || { variant: 'outline', text: status, icon: Clock }
    const IconComponent = config.icon

    return (
      <Badge variant={config.variant as any} className="flex items-center gap-1">
        <IconComponent className="h-3 w-3" />
        {config.text}
      </Badge>
    )
  }

  const getActionButtons = (order: Order) => {
    const buttons = []

    switch (order.status) {
      case 'PENDING':
        buttons.push(
          <Button
            key="accept"
            onClick={() => handleAcceptOrder(order.id)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Package className="h-4 w-4 mr-2" />
            Generate OTP
          </Button>
        )
        break

      case 'OTP_GENERATED':
        buttons.push(
          <div key="otp-info" className="flex-1 text-center p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">Waiting for seller to verify OTP</p>
          </div>
        )
        break

      case 'OTP_VERIFIED':
        buttons.push(
          <Button
            key="pickup"
            onClick={() => handlePickupParcel(order.id)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Truck className="h-4 w-4 mr-2" />
            Start Delivery
          </Button>
        )
        break

      case 'IN_TRANSIT':
        buttons.push(
          <Button
            key="view-details"
            onClick={() => openModal(order)}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        )
        break
    }

    return buttons
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "OTP copied to clipboard",
    })
  }

  const openModal = (order: Order) => {
    setModalState({
      ...modalState,
      isOpen: true,
      selectedOrder: order,
      buyerOtp: '',
      isOtpValid: false,
      showReturnForm: false,
      showDisputeForm: false,
      returnReason: '',
      disputeReason: '',
      evidenceFile: null
    })
  }

  const closeModal = () => {
    setModalState({
      ...modalState,
      isOpen: false,
      selectedOrder: null,
      buyerOtp: '',
      isOtpValid: false,
      showReturnForm: false,
      showDisputeForm: false,
      returnReason: '',
      disputeReason: '',
      evidenceFile: null
    })
  }

  const validateBuyerOtp = (otp: string) => {
    // In a real app, this would validate against the actual buyer OTP
    // For demo purposes, we'll use a simple validation
    const isValid = otp.length === 6 && /^\d{6}$/.test(otp)
    setModalState(prev => ({
      ...prev,
      buyerOtp: otp,
      isOtpValid: isValid
    }))
  }

  const handleReturn = () => {
    setModalState(prev => ({
      ...prev,
      showReturnForm: true,
      showDisputeForm: false
    }))
  }

  const handleDispute = () => {
    setModalState(prev => ({
      ...prev,
      showDisputeForm: true,
      showReturnForm: false
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setModalState(prev => ({
        ...prev,
        evidenceFile: file
      }))
    }
  }

  const submitReturn = () => {
    if (!modalState.returnReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for return",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Return Submitted",
      description: "Return request has been submitted successfully",
    })
    closeModal()
  }

  const submitDispute = () => {
    if (!modalState.disputeReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for dispute",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Dispute Submitted",
      description: "Dispute has been submitted successfully",
    })
    closeModal()
  }

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading orders...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Delivery Dashboard</h1>
        <p className="text-gray-600">Manage your deliveries and track orders</p>
      </div>

      <Tabs defaultValue="available" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="available" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Available
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Active
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Completed
          </TabsTrigger>
          <TabsTrigger value="tracking" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Tracking
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Available Orders</h2>
            <Badge variant="outline">{availableOrders.length} available</Badge>
          </div>
          {availableOrders.length === 0 ? (
            <Card className="bg-white shadow-md rounded-lg">
              <CardContent className="p-6 text-center">
                <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No available orders</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {availableOrders.map((order) => (
                <Card key={order.id} className={`bg-white shadow-md rounded-lg ${order.isUnassigned ? "border-2 border-blue-200 bg-blue-50" : ""}`}>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-700">
                          <ShoppingBag className="h-5 w-5" />
                          Order #{order.id}
                          {order.isUnassigned && (
                            <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 border-blue-300">
                              Unassigned
                            </Badge>
                          )}
                        </CardTitle>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(order.created_at).toLocaleString()}
                        </p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Seller & Customer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-slate-50 shadow-sm rounded-lg">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                            <Store className="h-5 w-5" />
                            Seller Info
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="font-medium text-gray-800">{order.seller}</p>
                          <p className="text-xs text-gray-600 mt-1">{order.sellerAddress}</p>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-50 shadow-sm rounded-lg">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                            <Users className="h-5 w-5" />
                            Customer Info
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="font-medium text-gray-800">{order.customer}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Delivery Address */}
                    <Card className="bg-slate-50 shadow-sm rounded-lg">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                          <Home className="h-5 w-5" />
                          Delivery Address
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm flex items-center gap-1 font-medium text-gray-800">
                          <MapPin className="h-4 w-4" />
                          {order.address}
                        </p>
                        <p className="text-sm flex items-center gap-1 text-gray-500 mt-1">
                          <Phone className="h-4 w-4" />
                          {order.phone}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Items Ordered */}
                    <Card className="bg-slate-50 shadow-sm rounded-lg">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                          <Package className="h-5 w-5" />
                          Items Ordered
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm font-medium text-gray-800">
                          {order.items.map(item => `${item.name} (${item.quantity})`).join(", ")}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Total Amount & Actions */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <Card className="bg-slate-50 shadow-sm rounded-lg flex-1">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                            <CreditCard className="h-5 w-5" />
                            Total Amount
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold text-gray-900">₹{order.totalAmount}</p>
                        </CardContent>
                      </Card>
                      
                      <div className="flex gap-2 w-full md:w-auto">
                        {getActionButtons(order)}
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
            <h2 className="text-2xl font-bold text-gray-900">Active Deliveries</h2>
            <Badge variant="default">{activeDeliveries.length} active</Badge>
          </div>
          {activeDeliveries.length === 0 ? (
            <Card className="bg-white shadow-md rounded-lg">
              <CardContent className="p-6 text-center">
                <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No active deliveries</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeDeliveries.map((order) => (
                <Card key={order.id} className="bg-white shadow-md rounded-xl p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 rounded-full px-2 py-1 text-xs">
                      {order.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Store className="h-4 w-4" />
                      <span>{order.seller}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{order.sellerAddress}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Home className="h-4 w-4" />
                      <span className="truncate">{order.address}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => openModal(order)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Completed Deliveries</h2>
            <Badge variant="outline">{completedDeliveries.length} completed</Badge>
          </div>
          {completedDeliveries.length === 0 ? (
            <Card className="bg-white shadow-md rounded-lg">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No completed deliveries yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {completedDeliveries.map((order) => (
                <Card key={order.id} className="bg-white shadow-md rounded-lg">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-700">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          Order #{order.id}
                        </CardTitle>
                        <p className="text-sm text-gray-500 mt-1">
                          Completed: {new Date(order.updated_at).toLocaleString()}
                        </p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-slate-50 shadow-sm rounded-lg">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                            <Store className="h-5 w-5" />
                            Seller
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="font-medium text-gray-800">{order.seller}</p>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-50 shadow-sm rounded-lg">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                            <Users className="h-5 w-5" />
                            Customer
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="font-medium text-gray-800">{order.customer}</p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="bg-slate-50 shadow-sm rounded-lg">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                          <CreditCard className="h-5 w-5" />
                          Total Amount
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-gray-900">₹{order.totalAmount}</p>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">GPS Tracking</h2>
            <Badge variant={isTracking ? "default" : "outline"}>
              {isTracking ? "Tracking Active" : "Tracking Inactive"}
            </Badge>
          </div>
          <Card className="bg-white shadow-md rounded-lg">
            <CardContent className="p-6">
              <div className="grid gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Current Location</p>
                  {location ? (
                    <p className="text-sm text-gray-600">
                      Lat: {location.latitude.toFixed(6)}, Lng: {location.longitude.toFixed(6)}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">Location not available</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => getCurrentLocation()}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Update Location
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Order Details Modal */}
      <Dialog open={modalState.isOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-xl w-full p-4 rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-3">
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Package className="h-4 w-4" />
              Order Details - #{modalState.selectedOrder?.id}
            </DialogTitle>
          </DialogHeader>

          {modalState.selectedOrder && (
            <div className="space-y-4">
              {/* Customer + Seller Info - Two Column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-600" />
                    <h3 className="text-sm font-semibold text-gray-700">Customer Info</h3>
                  </div>
                  <div className="pl-6 space-y-1">
                    <p className="text-sm font-medium text-gray-800">{modalState.selectedOrder.customer}</p>
                    <p className="text-xs flex items-center gap-1 text-gray-600">
                      <Phone className="h-3 w-3" />
                      {modalState.selectedOrder.phone}
                    </p>
                    <p className="text-xs flex items-center gap-1 text-gray-600">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{modalState.selectedOrder.address}</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-gray-600" />
                    <h3 className="text-sm font-semibold text-gray-700">Seller Info</h3>
                  </div>
                  <div className="pl-6">
                    <p className="text-sm font-medium text-gray-800">{modalState.selectedOrder.seller}</p>
                    <p className="text-xs text-gray-600 mt-1">{modalState.selectedOrder.sellerAddress}</p>
                  </div>
                </div>
              </div>

              {/* Order Details - Compact Table */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-gray-600" />
                  <h3 className="text-sm font-semibold text-gray-700">Order Details</h3>
                </div>
                <div className="pl-6">
                  <div className="space-y-2">
                    {modalState.selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="font-medium text-gray-800">
                          {item.name} (x{item.quantity})
                        </span>
                        <span className="text-gray-600">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">Total</span>
                        <span className="font-bold text-gray-900">₹{modalState.selectedOrder.totalAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pickup OTP & Buyer OTP Input - Horizontal Layout */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Pickup OTP */}
                {modalState.selectedOrder.parcel_otp && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-blue-600" />
                      <h3 className="text-sm font-semibold text-gray-700">Pickup OTP</h3>
                    </div>
                    <div className="bg-blue-100 text-blue-700 font-semibold px-3 py-2 rounded text-center">
                      <span className="text-sm tracking-wider font-mono">
                        {modalState.selectedOrder.parcel_otp}
                      </span>
                    </div>
                  </div>
                )}

                {/* Buyer OTP Input */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-600" />
                    <h3 className="text-sm font-semibold text-gray-700">Buyer OTP</h3>
                  </div>
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={modalState.buyerOtp}
                    onChange={(e) => validateBuyerOtp(e.target.value)}
                    className="px-2 py-1 text-sm border rounded"
                    maxLength={6}
                  />
                  {!modalState.isOtpValid && modalState.buyerOtp && (
                    <p className="text-xs text-red-600">Please enter a valid 6-digit OTP</p>
                  )}
                  {modalState.isOtpValid && (
                    <p className="text-xs text-green-600">✓ OTP verified! Actions enabled.</p>
                  )}
                </div>
              </div>

              {/* Action Buttons - Compact Layout */}
              <div className="flex gap-2 justify-center mt-4">
                <Button
                  onClick={() => handleCompleteDelivery(modalState.selectedOrder!.id)}
                  disabled={!modalState.isOtpValid}
                  className={`text-sm px-3 py-1.5 rounded-lg font-semibold shadow-sm transition-all duration-200 ${
                    modalState.isOtpValid 
                      ? 'bg-green-600 hover:bg-green-700 text-white focus:ring-2 focus:ring-green-500 focus:ring-offset-1' 
                      : 'bg-gray-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Delivered
                </Button>

                <Button
                  onClick={handleReturn}
                  disabled={!modalState.isOtpValid}
                  className={`text-sm px-3 py-1.5 rounded-lg font-semibold shadow-sm transition-all duration-200 ${
                    modalState.isOtpValid 
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-2 focus:ring-yellow-500 focus:ring-offset-1' 
                      : 'bg-gray-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  <ArrowLeft className="h-3 w-3 mr-1" />
                  Return
                </Button>

                <Button
                  onClick={handleDispute}
                  disabled={!modalState.isOtpValid}
                  className={`text-sm px-3 py-1.5 rounded-lg font-semibold shadow-sm transition-all duration-200 ${
                    modalState.isOtpValid 
                      ? 'bg-red-500 hover:bg-red-600 text-white focus:ring-2 focus:ring-red-500 focus:ring-offset-1' 
                      : 'bg-gray-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Dispute
                </Button>
              </div>

              {/* Return Form - Compact Layout */}
              {modalState.showReturnForm && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 space-y-3">
                  <div className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4 text-yellow-700" />
                    <h3 className="text-sm font-semibold text-yellow-700">Return Request</h3>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="evidence" className="text-xs font-medium text-gray-700">
                        Upload Evidence (Image)
                      </Label>
                      <Input
                        id="evidence"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="text-xs py-1 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="returnReason" className="text-xs font-medium text-gray-700">
                        Reason for Return
                      </Label>
                      <Textarea
                        id="returnReason"
                        value={modalState.returnReason}
                        onChange={(e) => setModalState(prev => ({ ...prev, returnReason: e.target.value }))}
                        placeholder="Please describe the reason for return..."
                        className="text-xs h-20 mt-1"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        onClick={submitReturn}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
                      >
                        Submit Return
                      </Button>
                      <Button
                        onClick={() => setModalState(prev => ({ ...prev, showReturnForm: false }))}
                        variant="outline"
                        className="text-xs px-3 py-1.5 rounded-lg"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Dispute Form - Compact Layout */}
              {modalState.showDisputeForm && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-700" />
                    <h3 className="text-sm font-semibold text-red-700">Dispute Report</h3>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="disputeEvidence" className="text-xs font-medium text-gray-700">
                        Upload Evidence (Image)
                      </Label>
                      <Input
                        id="disputeEvidence"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="text-xs py-1 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="disputeReason" className="text-xs font-medium text-gray-700">
                        Reason for Dispute
                      </Label>
                      <Textarea
                        id="disputeReason"
                        value={modalState.disputeReason}
                        onChange={(e) => setModalState(prev => ({ ...prev, disputeReason: e.target.value }))}
                        placeholder="Please describe the issue..."
                        className="text-xs h-20 mt-1"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        onClick={submitDispute}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
                      >
                        Submit Dispute
                      </Button>
                      <Button
                        onClick={() => setModalState(prev => ({ ...prev, showDisputeForm: false }))}
                        variant="outline"
                        className="text-xs px-3 py-1.5 rounded-lg"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
