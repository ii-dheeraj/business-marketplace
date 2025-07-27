"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Package, 
  MapPin, 
  Phone, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Smartphone,
  Clock
} from "lucide-react"

interface OrderDetails {
  id: number
  orderNumber: string
  orderStatus: string
  customerName: string
  customerPhone: string
  customerAddress: string
  deliveryAgentId: number
  hasOTP: boolean
}

interface DeliveryOTPVerificationProps {
  order: OrderDetails
  deliveryAgentId: number
  onVerificationSuccess: () => void
  onVerificationError: (error: string) => void
}

export default function DeliveryOTPVerification({
  order,
  deliveryAgentId,
  onVerificationSuccess,
  onVerificationError
}: DeliveryOTPVerificationProps) {
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6) // Only allow 6 digits
    setOtp(value)
    if (verificationStatus !== "idle") {
      setVerificationStatus("idle")
      setErrorMessage("")
    }
  }

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setErrorMessage("Please enter a 6-digit OTP")
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
          orderId: order.id,
          otp: otp,
          deliveryAgentId: deliveryAgentId
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setVerificationStatus("success")
        onVerificationSuccess()
      } else {
        setVerificationStatus("error")
        setErrorMessage(data.error || "Failed to verify OTP")
        onVerificationError(data.error || "Failed to verify OTP")
      }
    } catch (error) {
      setVerificationStatus("error")
      const errorMsg = "Network error. Please try again."
      setErrorMessage(errorMsg)
      onVerificationError(errorMsg)
    } finally {
      setIsVerifying(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OUT_FOR_DELIVERY":
        return "bg-blue-100 text-blue-800"
      case "DELIVERED":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Delivery Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Order Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Order #{order.orderNumber}</p>
              <p className="text-sm text-gray-600">ID: {order.id}</p>
            </div>
            <Badge className={getStatusColor(order.orderStatus)}>
              {order.orderStatus}
            </Badge>
          </div>

          <Separator />

          {/* Customer Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-gray-900">{order.customerName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600">{order.customerPhone}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-red-600 mt-0.5" />
              <span className="text-sm text-gray-600">{order.customerAddress}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* OTP Verification */}
        <div className="space-y-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Smartphone className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Enter Delivery OTP</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Ask the customer for their 6-digit delivery OTP
            </p>
          </div>

          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={handleOTPChange}
              className="text-center text-lg font-mono tracking-widest"
              maxLength={6}
              disabled={isVerifying}
            />

            {errorMessage && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-700">{errorMessage}</span>
              </div>
            )}

            {verificationStatus === "success" && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700">OTP verified successfully!</span>
              </div>
            )}

            <Button
              onClick={handleVerifyOTP}
              disabled={otp.length !== 6 || isVerifying}
              className="w-full"
            >
              {isVerifying ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify OTP & Complete Delivery"
              )}
            </Button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-blue-800 text-sm">Instructions</p>
              <ul className="text-xs text-blue-700 mt-1 space-y-1">
                <li>• Ask customer for their delivery OTP</li>
                <li>• Enter the 6-digit code above</li>
                <li>• Verify and complete delivery</li>
                <li>• Order will be marked as delivered</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 