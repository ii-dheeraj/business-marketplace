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
  sellerId: number
}

export default function OrderDetailsModal({ isOpen, onClose, order, sellerId }: OrderDetailsModalProps) {
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
          orderId: order.id,
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
    const statusConfig: { [key: string]: { variant: "default" | "secondary" | "destructive" | "outline", text: string } } = {
      'PENDING': { variant: 'outline', text: 'Pending' },
      'ACCEPTED_BY_AGENT': { variant: 'secondary', text: 'Accepted by Agent' },
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

  const canVerifyOTP = order?.orderStatus === 'OTP_GENERATED' && !otpVerified

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Order Details - #{order?.orderNumber || order?.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Status */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-700">Order Status</p>
              {getStatusBadge(order?.orderStatus)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Total Amount</p>
              <p className="text-2xl font-bold">₹{order?.totalAmount}</p>
            </div>
          </div>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Name</p>
                  <p className="text-sm">{order?.customerName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Phone</p>
                  <p className="text-sm flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {order?.customerPhone}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-700">Address</p>
                  <p className="text-sm flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {order?.customerAddress}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              {order?.order_items && order.order_items.length > 0 ? (
                <div className="space-y-3">
                  {order.order_items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{item.unitPrice}</p>
                        <p className="text-sm text-gray-600">Total: ₹{item.totalPrice}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No items found</p>
              )}
            </CardContent>
          </Card>

          {/* OTP Verification Section */}
          {order?.orderStatus === 'OTP_GENERATED' && (
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Package className="h-5 w-5" />
                  OTP Verification Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-orange-200">
                    <p className="text-sm text-orange-800 mb-3">
                      The delivery agent has generated an OTP for this order. Please verify the OTP to confirm parcel pickup.
                    </p>
                    
                    {!otpVerified ? (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
                            Enter OTP from Delivery Agent
                          </Label>
                          <Input
                            id="otp"
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength={6}
                            className="mt-1"
                          />
                        </div>
                        <Button
                          onClick={handleVerifyOTP}
                          disabled={isVerifying || !otp.trim()}
                          className="w-full bg-orange-600 hover:bg-orange-700"
                        >
                          {isVerifying ? "Verifying..." : "Verify OTP"}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-green-100 border border-green-200 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                          OTP verified successfully! Parcel is ready for pickup.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* OTP Already Verified */}
          {otpVerified && order?.orderStatus !== 'OTP_GENERATED' && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  OTP Verified
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 p-3 bg-green-100 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    OTP has been verified. Parcel is ready for delivery.
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Order Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Order Placed</p>
                    <p className="text-xs text-gray-500">
                      {new Date(order?.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                {order?.orderStatus !== 'PENDING' && (
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Order Accepted</p>
                      <p className="text-xs text-gray-500">Delivery agent accepted the order</p>
                    </div>
                  </div>
                )}
                {order?.orderStatus === 'OTP_GENERATED' && (
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">OTP Generated</p>
                      <p className="text-xs text-gray-500">Waiting for OTP verification</p>
                    </div>
                  </div>
                )}
                {otpVerified && (
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">OTP Verified</p>
                      <p className="text-xs text-gray-500">Ready for pickup</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 