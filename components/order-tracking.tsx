"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Loader2, Package, Truck, CheckCircle, Clock, MapPin, Phone, User } from "lucide-react"

interface OrderTrackingProps {
  orderId: number
  orderNumber: string
  orderStatus: string
  totalAmount: number
  customerName: string
  customerPhone: string
  customerAddress: string
  createdAt: string
  estimatedDeliveryTime?: string
  actualDeliveryTime?: string
  deliveryInstructions?: string
  items: Array<{
    id: number
    productName: string
    quantity: number
    unitPrice: number
    totalPrice: number
    productImage?: string
  }>
  sellerOrders: Array<{
    id: number
    sellerName: string
    sellerAddress: string
    status: string
    items: any[]
    subtotal: number
  }>
  deliveryAgent?: {
    id: number
    name: string
    phone: string
    vehicleNumber: string
    vehicleType: string
  } | null
}

interface TrackingUpdate {
  id: number
  status: string
  description: string
  location?: string
  createdAt: string
}

export default function OrderTracking({ 
  orderId, 
  orderNumber, 
  orderStatus, 
  totalAmount,
  customerName,
  customerPhone,
  customerAddress,
  createdAt,
  estimatedDeliveryTime,
  actualDeliveryTime,
  deliveryInstructions,
  items,
  sellerOrders,
  deliveryAgent
}: OrderTrackingProps) {
  const [trackingData, setTrackingData] = useState<TrackingUpdate[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchTrackingData()
  }, [orderId])

  const fetchTrackingData = async () => {
    try {
      const response = await fetch(`/api/order/tracking?orderId=${orderId}`)
      const data = await response.json()
      if (data.success && data.order.tracking) {
        setTrackingData(data.order.tracking)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching tracking data:", error)
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    const statusIcons: { [key: string]: React.ReactNode } = {
      ORDER_PLACED: <Package className="h-5 w-5" />,
      ORDER_CONFIRMED: <CheckCircle className="h-5 w-5" />,
      PREPARING_ORDER: <Clock className="h-5 w-5" />,
      READY_FOR_PICKUP: <Package className="h-5 w-5" />,
      PICKED_UP: <Truck className="h-5 w-5" />,
      IN_TRANSIT: <Truck className="h-5 w-5" />,
      OUT_FOR_DELIVERY: <Truck className="h-5 w-5" />,
      DELIVERED: <CheckCircle className="h-5 w-5" />
    }
    return statusIcons[status] || <Clock className="h-5 w-5" />
  }

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      ORDER_PLACED: "text-blue-600",
      ORDER_CONFIRMED: "text-green-600",
      PREPARING_ORDER: "text-orange-600",
      READY_FOR_PICKUP: "text-purple-600",
      PICKED_UP: "text-indigo-600",
      IN_TRANSIT: "text-indigo-600",
      OUT_FOR_DELIVERY: "text-indigo-600",
      DELIVERED: "text-green-700"
    }
    return statusColors[status] || "text-gray-600"
  }

  const getStatusText = (status: string) => {
    const statusTexts: { [key: string]: string } = {
      ORDER_PLACED: "Order Placed",
      ORDER_CONFIRMED: "Order Confirmed",
      PREPARING_ORDER: "Preparing Order",
      READY_FOR_PICKUP: "Ready for Pickup",
      PICKED_UP: "Picked Up",
      IN_TRANSIT: "In Transit",
      OUT_FOR_DELIVERY: "Out for Delivery",
      DELIVERED: "Delivered"
    }
    return statusTexts[status] || status
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Truck className="h-4 w-4 mr-2" />
          Track Order
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order Tracking - #{orderNumber}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-semibold">#{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold text-green-700">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span>{new Date(createdAt).toLocaleDateString()}</span>
              </div>
              {estimatedDeliveryTime && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Delivery:</span>
                  <span>{new Date(estimatedDeliveryTime).toLocaleString()}</span>
                </div>
              )}
              {actualDeliveryTime && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivered:</span>
                  <span>{new Date(actualDeliveryTime).toLocaleString()}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Customer Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Delivery Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 mt-1 text-gray-500" />
                <div>
                  <p className="font-medium">{customerName}</p>
                  <p className="text-sm text-gray-600">{customerPhone}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-gray-500" />
                <div>
                  <p className="text-sm">{customerAddress}</p>
                </div>
              </div>
              {deliveryInstructions && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Delivery Instructions:</p>
                  <p className="text-sm text-gray-600">{deliveryInstructions}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Delivery Agent */}
          {deliveryAgent && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery Agent
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{deliveryAgent.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{deliveryAgent.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{deliveryAgent.vehicleType} - {deliveryAgent.vehicleNumber}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tracking Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              {trackingData.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  <p>No tracking updates available yet.</p>
                  <p className="text-sm">Your order is being processed.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {trackingData.map((update, index) => (
                    <div key={update.id} className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(update.status)} bg-gray-100`}>
                        {getStatusIcon(update.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{getStatusText(update.status)}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {new Date(update.createdAt).toLocaleDateString()}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{update.description}</p>
                        {update.location && (
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {update.location}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(update.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    {item.productImage && (
                      <img 
                        src={item.productImage} 
                        alt={item.productName}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity} × ₹{item.unitPrice}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{item.totalPrice}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
} 