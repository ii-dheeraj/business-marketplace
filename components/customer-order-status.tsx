"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Package, Truck, CheckCircle, MapPin, Calendar } from "lucide-react"

interface CustomerOrderStatusProps {
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
  items: any[]
  sellerOrders: any[]
  deliveryAgent?: any
  parcel_otp?: string
}

export default function CustomerOrderStatus({ 
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
  deliveryAgent,
  parcel_otp
}: CustomerOrderStatusProps) {
  const [tracking, setTracking] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTracking()
  }, [orderId])

  const fetchTracking = async () => {
    try {
      const res = await fetch(`/api/order/tracking?orderId=${orderId}`)
      const data = await res.json()
      if (res.ok && data.tracking) {
        setTracking(data.tracking)
      }
    } catch (error) {
      console.error("Error fetching tracking:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ORDER_PLACED':
        return <Package className="h-4 w-4 text-blue-600" />
      case 'ORDER_CONFIRMED':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'PREPARING_ORDER':
        return <Clock className="h-4 w-4 text-orange-600" />
      case 'READY_FOR_PICKUP':
        return <Package className="h-4 w-4 text-purple-600" />
      case 'PICKED_UP':
      case 'IN_TRANSIT':
      case 'OUT_FOR_DELIVERY':
        return <Truck className="h-4 w-4 text-indigo-600" />
      case 'DELIVERED':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <Package className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ORDER_PLACED':
        return 'bg-blue-100 text-blue-800'
      case 'ORDER_CONFIRMED':
        return 'bg-green-100 text-green-800'
      case 'PREPARING_ORDER':
        return 'bg-orange-100 text-orange-800'
      case 'READY_FOR_PICKUP':
        return 'bg-purple-100 text-purple-800'
      case 'PICKED_UP':
      case 'IN_TRANSIT':
      case 'OUT_FOR_DELIVERY':
        return 'bg-indigo-100 text-indigo-800'
      case 'DELIVERED':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not set'
    try {
      return new Date(dateString).toLocaleString()
    } catch {
      return 'Invalid date'
    }
  }

  return (
    <div className="space-y-4">
      {/* Delivery OTP - Show prominently if order is not delivered */}
      {parcel_otp && orderStatus !== 'DELIVERED' && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Package className="h-5 w-5" />
              Delivery OTP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-3">
              <p className="text-sm text-blue-700">
                Share this OTP with the delivery agent when they arrive
              </p>
              <div className="bg-white p-4 rounded-lg border-2 border-blue-300 inline-block">
                <span className="text-3xl font-bold text-blue-600 tracking-wider font-mono">
                  {parcel_otp}
                </span>
              </div>
              <p className="text-xs text-blue-600">
                This OTP is valid until delivery is completed
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Order Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 mb-4">
            {getStatusIcon(orderStatus)}
            <Badge className={getStatusColor(orderStatus)}>
              {orderStatus.replace(/_/g, ' ')}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>Ordered: {formatDate(createdAt)}</span>
            </div>
            {estimatedDeliveryTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>Est. Delivery: {formatDate(estimatedDeliveryTime)}</span>
              </div>
            )}
            {actualDeliveryTime && (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Delivered: {formatDate(actualDeliveryTime)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delivery Information */}
      {deliveryAgent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Delivery Agent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Name:</strong> {deliveryAgent.name}</p>
              <p><strong>Phone:</strong> {deliveryAgent.phone}</p>
              {deliveryAgent.vehicleNumber && (
                <p><strong>Vehicle:</strong> {deliveryAgent.vehicleNumber}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delivery Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Delivery Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>{customerName}</strong></p>
            <p>{customerAddress}</p>
            <p>Phone: {customerPhone}</p>
            {deliveryInstructions && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Delivery Instructions:</strong> {deliveryInstructions}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Order Tracking Timeline */}
      {tracking.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Order Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tracking.map((entry, index) => (
                <div key={entry.id} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(entry.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className={getStatusColor(entry.status)}>
                        {entry.status.replace(/_/g, ' ')}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {formatDate(entry.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{entry.description}</p>
                    {entry.location && (
                      <p className="text-xs text-gray-500 mt-1">
                        📍 {entry.location}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">₹{item.totalPrice}</p>
              </div>
            ))}
            <div className="pt-2 border-t border-gray-200">
              <div className="flex justify-between items-center font-semibold">
                <span>Total Amount:</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 