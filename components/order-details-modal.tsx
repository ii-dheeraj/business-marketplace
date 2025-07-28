"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { 
  X, 
  Package, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Hash,
  Loader2,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Copy,
  Truck,
  Clock
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface OrderDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  order: any
  onOrderUpdate?: () => void
  isLoading?: boolean
}

export default function OrderDetailsModal({ 
  isOpen, 
  onClose, 
  order, 
  onOrderUpdate,
  isLoading = false
}: OrderDetailsModalProps) {
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [showOtp, setShowOtp] = useState(false)
  const { toast } = useToast()

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit OTP")
      return
    }

    setIsVerifying(true)
    setVerificationStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/order/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.orderId,
          deliveryAgentId: order.deliveryAgentId || 1,
          otp: otp.trim(),
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setVerificationStatus("success")
        toast({
          title: "OTP Verified Successfully!",
          description: "Parcel has been picked up and order status updated.",
        })
        
        setTimeout(() => {
          setOtp("")
          setVerificationStatus("idle")
          setErrorMessage("")
          onOrderUpdate?.()
          onClose()
        }, 2000)
      } else {
        setVerificationStatus("error")
        setErrorMessage(data.error || "OTP verification failed")
        toast({
          title: "OTP Verification Failed",
          description: data.error || "Please check the OTP and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setVerificationStatus("error")
      setErrorMessage("Network error. Please try again.")
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleClose = () => {
    setOtp("")
    setVerificationStatus("idle")
    setErrorMessage("")
    setShowOtp(false)
    onClose()
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "delivered":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="relative pb-4 border-b">
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Package className="h-6 w-6 text-blue-600" />
            Order Details
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-8 w-8 p-0 hover:bg-gray-100"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-lg font-medium text-gray-700">Loading order data...</p>
            <p className="text-sm text-gray-500 mt-2">Please wait while we fetch the information</p>
          </div>
        ) : (
          !order ? (
            <div className="flex flex-col items-center justify-center py-12">
              <XCircle className="h-12 w-12 text-red-400 mb-4" />
              <p className="text-lg font-medium text-gray-700">Failed to load order details.</p>
              <p className="text-sm text-gray-500 mt-2">Please try again or contact support.</p>
            </div>
          ) : (
            <div className="space-y-6 py-4">
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Hash className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">#{order.orderId || order.id}</h3>
                  <p className="text-sm text-gray-600">Order placed on {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
              <Badge className={`px-4 py-2 text-sm font-medium border ${getStatusColor(order.status)}`}>
                {order.status?.toUpperCase() || 'PENDING'}
              </Badge>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Column - Order Information */}
              <div className="space-y-6">
                {/* Product Details */}
                <Card className="border-0 shadow-lg bg-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                      <Package className="h-5 w-5 text-blue-600" />
                      Products Ordered
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Array.isArray(order.items) && order.items.length > 0 ? (
                      order.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                              src={item.image || item.productImage || "/placeholder.svg"}
                              alt={item.productName || "Product"}
                              fill
                              className="object-cover rounded-lg"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/placeholder.svg";
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">{item.productName}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            {item.description && (
                              <p className="text-xs text-gray-500 truncate">{item.description}</p>
                            )}
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-bold text-gray-900">₹{item.totalPrice?.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">₹{item.price || 0} each</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <Package className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                        <p>No product details available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Order Summary */}
                <Card className="border-0 shadow-lg bg-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-gray-900">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">₹{order.subtotal?.toLocaleString() || '0'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Commission:</span>
                        <span className="font-medium">₹{order.commission?.toLocaleString() || '0'}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-gray-900">Net Amount:</span>
                        <span className="text-green-600">₹{order.netAmount?.toLocaleString() || '0'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Customer & Delivery */}
              <div className="space-y-6">
                {/* Customer Information */}
                <Card className="border-0 shadow-lg bg-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                      <User className="h-5 w-5 text-green-600" />
                      Customer Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <User className="h-4 w-4 text-gray-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{order.customerName || 'N/A'}</p>
                          <p className="text-xs text-gray-500">Customer Name</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{order.customerPhone || 'N/A'}</p>
                          <p className="text-xs text-gray-500">Phone Number</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(order.customerPhone || '')}
                          className="h-8 w-8 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      {order.customerEmail && (
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{order.customerEmail}</p>
                            <p className="text-xs text-gray-500">Email Address</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Address */}
                <Card className="border-0 shadow-lg bg-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                      <MapPin className="h-5 w-5 text-orange-600" />
                      Delivery Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-sm text-gray-900 font-medium">{order.customerName || 'N/A'}</p>
                      <p className="text-sm text-gray-700 mt-1">{order.customerAddress || 'N/A'}</p>
                      <p className="text-sm text-gray-700">
                        {order.customerCity && `${order.customerCity}, `}
                        {order.customerArea && `${order.customerArea}`}
                        {order.customerLocality && `, ${order.customerLocality}`}
                      </p>
                      {order.deliveryInstructions && (
                        <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-100">
                          <p className="text-xs text-blue-800">
                            <strong>Instructions:</strong> {order.deliveryInstructions}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* OTP Verification Section */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                  <Truck className="h-5 w-5 text-purple-600" />
                  Delivery Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-700 mb-4">
                    Verify the OTP provided by the delivery agent to confirm parcel pickup
                  </p>
                  
                  <div className="max-w-xs mx-auto space-y-3">
                    <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
                      Enter 6-digit OTP
                    </Label>
                    <div className="relative">
                      <Input
                        id="otp"
                        type={showOtp ? "text" : "password"}
                        placeholder="000000"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        maxLength={6}
                        className="text-center text-xl tracking-widest font-mono bg-white border-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl h-12"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setShowOtp(!showOtp)}
                      >
                        {showOtp ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg max-w-xs mx-auto">
                      <XCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                      <span className="text-sm text-red-700">{errorMessage}</span>
                    </div>
                  )}

                  {verificationStatus === "success" && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg max-w-xs mx-auto">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-green-700">OTP verified successfully!</span>
                    </div>
                  )}

                  <Button
                    onClick={handleVerifyOTP}
                    className="w-full max-w-xs bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                    disabled={isVerifying || !otp || otp.length !== 6}
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Verify OTP
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 mt-2">
                    This OTP is required to confirm parcel pickup
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          )
        )}
      </DialogContent>
    </Dialog>
  )
} 