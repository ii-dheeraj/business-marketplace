"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Package, Truck, Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getCookie } from "@/lib/utils"

interface Order {
  id: number
  orderNumber: string
  orderStatus: string
  customerName: string
  customerPhone: string
  totalAmount: number
  paymentMethod: string
  paymentStatus: string
  createdAt: string
  items: Array<{
    id: number
    productName: string
    quantity: number
    totalPrice: number
  }>
  tracking: Array<{
    id: number
    status: string
    description: string
    location?: string
    createdAt: string
  }>
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isTrackingDialogOpen, setIsTrackingDialogOpen] = useState(false)
  const [trackingForm, setTrackingForm] = useState({
    status: "",
    description: "",
    location: ""
  })
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const adminInfoCookie = getCookie("adminInfo")
    if (!adminInfoCookie) {
      router.push("/admin/login")
      return
    }
    fetchOrders()
  }, [router])

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/order/place")
      const data = await res.json()
      setOrders(data.orders || [])
      setLoading(false)
    } catch (error) {
      console.error("Error fetching orders:", error)
      setLoading(false)
    }
  }

  const handleAddTracking = async () => {
    if (!selectedOrder || !trackingForm.status || !trackingForm.description) {
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch("/api/admin/tracking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          status: trackingForm.status,
          description: trackingForm.description,
          location: trackingForm.location
        })
      })

      if (res.ok) {
        setIsTrackingDialogOpen(false)
        setTrackingForm({ status: "", description: "", location: "" })
        fetchOrders() // Refresh orders to get updated tracking
      }
    } catch (error) {
      console.error("Error adding tracking:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      PENDING: "bg-yellow-100 text-yellow-800",
      CONFIRMED: "bg-blue-100 text-blue-800",
      PREPARING: "bg-orange-100 text-orange-800",
      READY_FOR_DELIVERY: "bg-purple-100 text-purple-800",
      OUT_FOR_DELIVERY: "bg-indigo-100 text-indigo-800",
      DELIVERED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800"
    }
    return statusColors[status] || "bg-gray-100 text-gray-800"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center mb-6">
          <Link href="/admin/dashboard" className="text-blue-600 flex items-center mr-4">
            <ArrowLeft className="h-5 w-5 mr-1" /> Dashboard
          </Link>
          <h1 className="text-xl font-bold">Order Management</h1>
        </div>
        <div className="grid gap-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    Order #{order.orderNumber}
                    <Badge className={getStatusColor(order.orderStatus)}>
                      {order.orderStatus}
                    </Badge>
                  </CardTitle>
                  <Dialog open={isTrackingDialogOpen && selectedOrder?.id === order.id} onOpenChange={(open) => {
                    setIsTrackingDialogOpen(open)
                    if (open) {
                      setSelectedOrder(order)
                    } else {
                      setSelectedOrder(null)
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Tracking
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Tracking Update - Order #{order.orderNumber}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="status">Status</Label>
                          <Select 
                            value={trackingForm.status} 
                            onValueChange={(value) => setTrackingForm(prev => ({ ...prev, status: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ORDER_PLACED">Order Placed</SelectItem>
                              <SelectItem value="ORDER_CONFIRMED">Order Confirmed</SelectItem>
                              <SelectItem value="PREPARING_ORDER">Preparing Order</SelectItem>
                              <SelectItem value="READY_FOR_PICKUP">Ready for Pickup</SelectItem>
                              <SelectItem value="PICKED_UP">Picked Up</SelectItem>
                              <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                              <SelectItem value="OUT_FOR_DELIVERY">Out for Delivery</SelectItem>
                              <SelectItem value="DELIVERED">Delivered</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Enter tracking description..."
                            value={trackingForm.description}
                            onChange={(e) => setTrackingForm(prev => ({ ...prev, description: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location (Optional)</Label>
                          <Input
                            id="location"
                            placeholder="Enter location..."
                            value={trackingForm.location}
                            onChange={(e) => setTrackingForm(prev => ({ ...prev, location: e.target.value }))}
                          />
                        </div>
                        <Button 
                          onClick={handleAddTracking} 
                          disabled={submitting || !trackingForm.status || !trackingForm.description}
                          className="w-full"
                        >
                          {submitting ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <Truck className="h-4 w-4 mr-2" />
                          )}
                          Add Tracking Update
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Customer:</span>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-gray-500">{order.customerPhone}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Amount:</span>
                    <p className="font-semibold text-green-700">₹{order.totalAmount}</p>
                    <p className="text-gray-500">{order.paymentMethod} - {order.paymentStatus}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Order Date:</span>
                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="text-gray-500">{new Date(order.createdAt).toLocaleTimeString()}</p>
                  </div>
                </div>
                
                <div>
                  <span className="font-medium">Items:</span>
                  <div className="mt-2 space-y-1">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.productName} x {item.quantity}</span>
                        <span>₹{item.totalPrice}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {order.tracking && order.tracking.length > 0 && (
                  <div>
                    <span className="font-medium">Recent Tracking Updates:</span>
                    <div className="mt-2 space-y-2">
                      {order.tracking.slice(0, 3).map((track) => (
                        <div key={track.id} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="text-xs">
                              {track.status.replace(/_/g, ' ')}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(track.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm">{track.description}</p>
                          {track.location && (
                            <p className="text-xs text-gray-500 mt-1">📍 {track.location}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 