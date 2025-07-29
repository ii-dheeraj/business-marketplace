"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, MapPin, Phone, Clock, User, ShoppingBag, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface OrderDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  order: any
  sellerId?: number
  onOrderUpdate?: () => void
  isLoading?: boolean
}

export default function OrderDetailsModal({ 
  isOpen, 
  onClose, 
  order, 
  sellerId,
  onOrderUpdate,
  isLoading = false
}: OrderDetailsModalProps) {
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [otpVerified, setOtpVerified] = useState(order?.otp_verified || false)
  const { toast } = useToast()

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      toast({
        title: "Error",
        description: "Please enter the OTP",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)
    try {
      const response = await fetch("/api/order/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.orderId || order.id,
          otp: otp.trim(),
          sellerId: sellerId
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setOtpVerified(true)
        setOtp("")
        toast({
          title: "OTP Verified Successfully!",
          description: "Parcel is now ready for delivery. Delivery agent can pickup the parcel.",
        })
        
        // Call the update callback if provided
        if (onOrderUpdate) {
          onOrderUpdate()
        }
        
        // Close modal after successful verification
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        toast({
          title: "Verification Failed",
          description: data.error || "Invalid OTP. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", text: string }> = {
      'PENDING': { variant: 'outline', text: 'Pending' },
      'ACCEPTED_BY_AGENT': { variant: 'secondary', text: 'Accepted by Agent' },
      'OTP_GENERATED': { variant: 'secondary', text: 'OTP Generated' },
      'OTP_VERIFIED': { variant: 'default', text: 'Ready for Pickup' },
      'PARCEL_PICKED_UP': { variant: 'default', text: 'Picked Up' },
      'IN_TRANSIT': { variant: 'default', text: 'In Transit' },
      'DELIVERED': { variant: 'outline', text: 'Delivered' },
      'CANCELLED': { variant: 'destructive', text: 'Cancelled' }
    }

    const config = statusConfig[status] || { variant: 'outline' as const, text: status }
    return <Badge variant={config.variant}>{config.text}</Badge>
  }

  const canVerifyOTP = order?.orderStatus === 'OTP_GENERATED' && !otpVerified

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <ShoppingBag className="h-5 w-5 text-blue-600" />
            Order Details - #{order?.orderNumber || order?.id}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
              <p className="text-gray-600">Loading order details...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Order Status */}
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Order Status</p>
                {getStatusBadge(order?.orderStatus)}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700 mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-green-600">
                  ₹{order?.totalAmount?.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Customer Information */}
            <Card className="border">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <User className="h-4 w-4 text-gray-600" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Name</p>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">
                      {order?.customerName || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Phone</p>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">
                      {order?.customerPhone || 'N/A'}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-700 mb-1">Address</p>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">
                      {order?.customerAddress || 'N/A'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="border">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <Package className="h-4 w-4 text-gray-600" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {order?.order_items && order.order_items.length > 0 ? (
                  <div className="space-y-3">
                    {order.order_items.map((item: any, index: number) => {
                      // Try to get image from items field first (seller_orders), then from order_items
                      const itemWithImage = order.items?.find((i: any) => i.productId === item.productId) || item;
                      const imageSource = itemWithImage?.productImage || item?.productImage;
                      
                      return (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded border gap-4">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <img
                                src={imageSource || "/placeholder.svg"}
                                alt={item.productName}
                                className="w-12 h-12 object-cover rounded-md border border-gray-200 bg-gray-50"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/placeholder.svg";
                                  target.onerror = null; // Prevent infinite loop
                                }}
                              />
                              {!imageSource && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md">
                                  <Package className="h-5 w-5 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{item.productName}</p>
                              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">₹{item.unitPrice?.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">Total: ₹{item.totalPrice?.toLocaleString()}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Package className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No items found</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* OTP Verification Section - Simplified */}
            {order?.parcel_otp && (
              <Card className="border border-blue-200">
                <CardHeader className="bg-blue-50 border-b border-blue-200">
                  <CardTitle className="flex items-center gap-2 text-base font-semibold text-blue-800">
                    <Package className="h-4 w-4" />
                    Delivery OTP Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    
                    {!otpVerified ? (
                      <div className="space-y-4">
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <strong>Seller Verification:</strong> Enter the OTP provided by the delivery agent to confirm parcel pickup.
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="seller-otp" className="text-sm font-medium text-gray-700 block mb-2">
                              Enter OTP from Delivery Agent
                            </Label>
                            <Input
                              id="seller-otp"
                              type="text"
                              placeholder="Enter 6-digit OTP"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                              maxLength={6}
                              className="text-center text-lg font-mono tracking-widest border-2 border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 rounded-lg h-12"
                              style={{ letterSpacing: '0.3em' }}
                            />
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              onClick={handleVerifyOTP}
                              disabled={isVerifying || !otp.trim() || otp.length !== 6}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium h-10"
                            >
                              {isVerifying ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                  Verifying...
                                </>
                              ) : (
                                "Verify OTP"
                              )}
                            </Button>
                            
                            <Button
                              variant="outline"
                              onClick={() => setOtp("")}
                              disabled={isVerifying}
                              className="px-4 h-10"
                            >
                              Clear
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-green-800">
                            OTP verified successfully!
                          </p>
                          <p className="text-xs text-green-600">
                            Parcel is ready for pickup and delivery.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Order Timeline */}
            <Card className="border">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <Clock className="h-4 w-4 text-gray-600" />
                  Order Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Order Placed</p>
                      <p className="text-xs text-gray-500">
                        {new Date(order?.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  {order?.orderStatus !== 'PENDING' && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Order Accepted</p>
                        <p className="text-xs text-gray-500">Delivery agent accepted the order</p>
                      </div>
                    </div>
                  )}
                  
                  {order?.parcel_otp && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Delivery OTP Generated</p>
                        <p className="text-xs text-gray-500">OTP: {order.parcel_otp}</p>
                      </div>
                    </div>
                  )}
                  
                  {order?.orderStatus === 'OTP_GENERATED' && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Waiting for OTP Verification</p>
                        <p className="text-xs text-gray-500">Delivery agent is ready to pickup</p>
                      </div>
                    </div>
                  )}
                  
                  {otpVerified && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">OTP Verified</p>
                        <p className="text-xs text-gray-500">Parcel pickup confirmed</p>
                      </div>
                    </div>
                  )}
                  
                  {order?.orderStatus === 'PARCEL_PICKED_UP' && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Parcel Picked Up</p>
                        <p className="text-xs text-gray-500">On the way to customer</p>
                      </div>
                    </div>
                  )}
                  
                  {order?.orderStatus === 'IN_TRANSIT' && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">In Transit</p>
                        <p className="text-xs text-gray-500">Parcel is being delivered</p>
                      </div>
                    </div>
                  )}
                  
                  {order?.orderStatus === 'DELIVERED' && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Delivered</p>
                        <p className="text-xs text-gray-500">
                          {order.actualDeliveryTime 
                            ? new Date(order.actualDeliveryTime).toLocaleString()
                            : 'Order completed successfully'
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="px-4 py-2"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 