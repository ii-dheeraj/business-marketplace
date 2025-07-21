"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  Package,
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Download,
  Share2,
  Smartphone,
  Banknote,
  CreditCard,
  Building2,
  Wallet,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

interface CompletedOrder {
  orderId: string
  orderStatus: string
  paymentStatus: string
  transactionStatus: string
  paymentMethod: string
  totalAmount: number
  estimatedDelivery: string
  items?: any[]
  customerDetails?: any
  paymentDetails?: any
}

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<CompletedOrder | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  useEffect(() => {
    if (!orderId) {
      router.push("/")
      return
    }
    // Fetch order details from API
    const fetchOrder = async () => {
      const res = await fetch(`/api/order/place?orderId=${orderId}`)
      const data = await res.json()
      if (res.ok && data.order) {
        setOrder(data.order)
      } else {
        router.push("/")
      }
    }
    fetchOrder()
  }, [orderId, router])

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "upi_online":
        return <Smartphone className="h-5 w-5 text-purple-600" />
      case "upi_on_delivery":
        return <Clock className="h-5 w-5 text-blue-600" />
      case "cod":
        return <Banknote className="h-5 w-5 text-green-600" />
      case "card":
        return <CreditCard className="h-5 w-5 text-blue-600" />
      case "netbanking":
        return <Building2 className="h-5 w-5 text-orange-600" />
      case "wallet":
        return <Wallet className="h-5 w-5 text-pink-600" />
      default:
        return <Package className="h-5 w-5 text-gray-600" />
    }
  }

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case "upi_online":
        return "UPI Online"
      case "upi_on_delivery":
        return "UPI On Delivery"
      case "cod":
        return "Cash on Delivery"
      case "card":
        return "Credit/Debit Card"
      case "netbanking":
        return "Net Banking"
      case "wallet":
        return "Digital Wallet"
      default:
        return method
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PLACED":
        return "bg-green-100 text-green-800"
      case "ON_HOLD":
        return "bg-yellow-100 text-yellow-800"
      case "PENDING_UPON_DELIVERY":
        return "bg-blue-100 text-blue-800"
      case "PENDING_VERIFICATION":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p>Loading order details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <span className="text-gray-500 text-lg font-medium">Order Confirmation</span>
          </div>
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600">
            Your order <span className="font-semibold text-blue-600">#{order.orderId}</span> has been confirmed
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Order ID</p>
                    <p className="text-sm text-gray-600">#{order.orderId}</p>
                  </div>
                  <Badge className={getStatusColor(order.orderStatus)}>{order.orderStatus}</Badge>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Payment Status</p>
                    <Badge className={getStatusColor(order.paymentStatus)}>{order.paymentStatus}</Badge>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Transaction Status</p>
                    <Badge className={getStatusColor(order.transactionStatus)}>{order.transactionStatus}</Badge>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  {getPaymentMethodIcon(order.paymentMethod)}
                  <div>
                    <p className="font-semibold text-gray-900">{getPaymentMethodName(order.paymentMethod)}</p>
                    <p className="text-sm text-gray-600">
                      {order.paymentMethod === "upi_online" && "Payment verification in progress"}
                      {order.paymentMethod === "upi_on_delivery" && "Pay via UPI when order arrives"}
                      {order.paymentMethod === "cod" && "Pay in cash when order arrives"}
                      {!["upi_online", "upi_on_delivery", "cod"].includes(order.paymentMethod) && "Payment completed"}
                    </p>
                  </div>
                </div>

                {order.paymentMethod === "upi_online" && (
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-800">Payment Verification</p>
                        <p className="text-sm text-yellow-700">
                          Your payment is being verified. Order will be processed once payment is confirmed.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {order.paymentMethod === "upi_on_delivery" && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                      <Smartphone className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-800">UPI Payment on Delivery</p>
                        <p className="text-sm text-blue-700">
                          Your order is being prepared. Pay via UPI when the delivery agent arrives.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Estimated Delivery</p>
                    <p className="text-sm text-gray-600">{order.estimatedDelivery}</p>
                  </div>
                </div>

                {order.customerDetails && (
                  <>
                    <Separator />
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Delivery Address</p>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-medium text-gray-900">{order.customerDetails.name}</p>
                        <p className="text-sm text-gray-600">{order.customerDetails.address}</p>
                        {order.customerDetails.address2 && (
                          <p className="text-sm text-gray-600">{order.customerDetails.address2}</p>
                        )}
                        <p className="text-sm text-gray-600">
                          {order.customerDetails.city}, {order.customerDetails.state} {order.customerDetails.pincode}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-blue-600">{order.customerDetails.phone}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-blue-600">{order.customerDetails.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.paymentMethod === "upi_online" ? (
                    <>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-yellow-600">1</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Payment Verification</p>
                          <p className="text-sm text-gray-600">We're verifying your UPI payment</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-gray-600">2</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Order Processing</p>
                          <p className="text-sm text-gray-600">
                            Seller will prepare your order once payment is confirmed
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-green-600">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Order Processing</p>
                        <p className="text-sm text-gray-600">Seller is preparing your order</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-gray-600">
                        {order.paymentMethod === "upi_online" ? "3" : "2"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Quality Check</p>
                      <p className="text-sm text-gray-600">Seller will upload item photos before packaging</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-gray-600">
                        {order.paymentMethod === "upi_online" ? "4" : "3"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Out for Delivery</p>
                      <p className="text-sm text-gray-600">Delivery agent will be assigned and dispatched</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-gray-600">
                        {order.paymentMethod === "upi_online" ? "5" : "4"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Delivery</p>
                      <p className="text-sm text-gray-600">
                        {order.paymentMethod === "upi_on_delivery"
                          ? "Pay via UPI and receive your order"
                          : order.paymentMethod === "cod"
                            ? "Pay in cash and receive your order"
                            : "Receive your order at your doorstep"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                {order.items && (
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.name}</h4>
                          <p className="text-xs text-gray-500 truncate">{item.sellerName}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                            <span className="text-sm font-semibold text-green-600">₹{item.price * item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <Separator />

                {/* Total */}
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Paid</span>
                  <span className="text-green-600">₹{order.totalAmount}</span>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-4">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Invoice
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Order
                  </Button>
                </div>

                {/* Support */}
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">Need help with your order?</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
