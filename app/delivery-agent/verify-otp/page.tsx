"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Package, 
  Search, 
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"
import DeliveryOTPVerification from "@/components/DeliveryOTPVerification"

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

export default function DeliveryAgentOTPPage() {
  const [orderId, setOrderId] = useState("")
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [deliveryAgentId, setDeliveryAgentId] = useState<number | null>(null)

  useEffect(() => {
    // Get delivery agent ID from localStorage or cookie
    const userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      try {
        const user = JSON.parse(userInfo)
        if (user.id && user.userType === "DELIVERY_AGENT") {
          setDeliveryAgentId(user.id)
        }
      } catch (e) {
        console.error("Error parsing user info:", e)
      }
    }
  }, [])

  const handleSearchOrder = async () => {
    if (!orderId.trim()) {
      setError("Please enter an order ID")
      return
    }

    setIsLoading(true)
    setError("")
    setOrder(null)

    try {
      const response = await fetch(`/api/order/verify-otp?orderId=${orderId}`)
      const data = await response.json()

      if (response.ok && data.order) {
        // Check if order is assigned to this delivery agent
        if (deliveryAgentId && data.order.deliveryAgentId !== deliveryAgentId) {
          setError("This order is not assigned to you")
          return
        }

        // Check if order is ready for delivery
        if (data.order.orderStatus !== "OUT_FOR_DELIVERY") {
          setError("Order is not ready for delivery. Current status: " + data.order.orderStatus)
          return
        }

        setOrder(data.order)
      } else {
        setError(data.error || "Order not found")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerificationSuccess = () => {
    // Order has been successfully delivered
    setOrder(null)
    setOrderId("")
    setError("")
  }

  const handleVerificationError = (errorMsg: string) => {
    setError(errorMsg)
  }

  if (!deliveryAgentId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="text-center">
              <XCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
              <p className="text-gray-600 mb-4">
                You must be logged in as a delivery agent to access this page.
              </p>
              <Link href="/auth">
                <Button>Go to Login</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/delivery-agent">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Delivery OTP Verification</h1>
              <p className="text-gray-600">Verify customer OTP to complete delivery</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Search Order */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Order
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
                  Order ID
                </label>
                <Input
                  id="orderId"
                  type="text"
                  placeholder="Enter order ID"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearchOrder()}
                />
              </div>

              <Button 
                onClick={handleSearchOrder} 
                disabled={isLoading || !orderId.trim()}
                className="w-full"
              >
                {isLoading ? "Searching..." : "Search Order"}
              </Button>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* OTP Verification */}
          <div>
            {order ? (
              <DeliveryOTPVerification
                order={order}
                deliveryAgentId={deliveryAgentId}
                onVerificationSuccess={handleVerificationSuccess}
                onVerificationError={handleVerificationError}
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Order Verification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">
                      Search for an order to begin OTP verification
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              How to Use
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-blue-600">1</span>
                  </div>
                  <h3 className="font-medium text-gray-900">Search Order</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Enter the order ID to find the order you're delivering
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-blue-600">2</span>
                  </div>
                  <h3 className="font-medium text-gray-900">Get OTP</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Ask the customer for their 6-digit delivery OTP
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-blue-600">3</span>
                  </div>
                  <h3 className="font-medium text-gray-900">Verify & Deliver</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Enter the OTP to verify and complete the delivery
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 