"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  Shield,
  CheckCircle,
  Loader2,
  Banknote,
  QrCode,
  Copy,
  Check,
  Globe,
  CreditCardIcon as CardIcon,
  Clock,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

interface OrderDetails {
  id: number
  orderNumber: string
  items: any[]
  customerName: string
  customerPhone: string
  customerAddress: string
  customerCity: string
  customerArea: string
  customerLocality?: string
  subtotal: number
  deliveryFee: number
  totalAmount: number
  orderStatus: string
  paymentStatus: string
  paymentMethod: string
  createdAt: string
}

export default function PaymentPage() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // UPI States
  const [upiId, setUpiId] = useState("")
  const [utrNumber, setUtrNumber] = useState("")
  const [copiedUpiId, setCopiedUpiId] = useState(false)

  // Card States
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardHolderName, setCardHolderName] = useState("")

  // Net Banking States
  const [selectedBank, setSelectedBank] = useState("")
  const [netBankingUtr, setNetBankingUtr] = useState("")

  // Wallet States
  const [selectedWallet, setSelectedWallet] = useState("")
  const [walletUtr, setWalletUtr] = useState("")

  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const merchantUpiId = "merchant@paytm"

  useEffect(() => {
    if (!orderId) {
      router.push("/checkout")
      return
    }
    // Fetch order details from API
    const fetchOrder = async () => {
      const res = await fetch(`/api/order/place?orderId=${orderId}`)
      const data = await res.json()
      if (res.ok && data.order) {
        setOrderDetails(data.order)
      } else {
        router.push("/checkout")
      }
    }
    fetchOrder()
  }, [orderId, router])

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(merchantUpiId)
      setCopiedUpiId(true)
      setTimeout(() => setCopiedUpiId(false), 2000)
    } catch (err) {
      console.error("Failed to copy UPI ID:", err)
    }
  }

  const validatePaymentDetails = () => {
    if (selectedPaymentMethod === "upi_online") {
      return utrNumber.length >= 12
    }
    if (selectedPaymentMethod === "card") {
      return cardNumber.length === 16 && expiryDate.length === 5 && cvv.length === 3 && cardHolderName.length > 0
    }
    if (selectedPaymentMethod === "netbanking") {
      return selectedBank && netBankingUtr.length >= 12
    }
    if (selectedPaymentMethod === "wallet") {
      return selectedWallet && walletUtr.length >= 12
    }
    return true
  }

  const mapPaymentMethod = (method) => {
    switch (method) {
      case "upi_online":
      case "card":
      case "netbanking":
        return "ONLINE_PAYMENT"
      case "wallet":
        return "WALLET"
      case "cod":
      case "upi_on_delivery":
        return "CASH_ON_DELIVERY"
      default:
        return method
    }
  }

  const placeOrder = async () => {
    if (!selectedPaymentMethod || !orderDetails || !orderId) return
    if (["upi_online", "card", "netbanking", "wallet"].includes(selectedPaymentMethod) && !validatePaymentDetails()) {
      alert("Please fill in all required payment details")
      return
    }
    setIsProcessing(true)
    try {
      // Update order in DB with payment info
      const res = await fetch(`/api/order/place?orderId=${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethod: mapPaymentMethod(selectedPaymentMethod),
          paymentDetails: {
            upiId: selectedPaymentMethod === "upi_online" ? upiId : undefined,
            utrNumber:
              selectedPaymentMethod === "upi_online"
                ? utrNumber
                : selectedPaymentMethod === "netbanking"
                  ? netBankingUtr
                  : selectedPaymentMethod === "wallet"
                    ? walletUtr
                    : undefined,
            cardLast4: selectedPaymentMethod === "card" ? cardNumber.slice(-4) : undefined,
            bankName: selectedPaymentMethod === "netbanking" ? selectedBank : undefined,
            walletName: selectedPaymentMethod === "wallet" ? selectedWallet : undefined,
          },
          // Set orderStatus to CONFIRMED if payment is completed (for online payments)
          orderStatus: ["upi_online", "card", "netbanking", "wallet"].includes(selectedPaymentMethod) ? "CONFIRMED" : undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to place order")
      // Clear cart and redirect to success
      localStorage.removeItem("cart")
      router.push(`/order-success?orderId=${orderId}`)
    } catch (error) {
      console.error("Error placing order:", error)
      alert("Failed to place order. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const paymentMethods = [
    {
      id: "upi_online",
      name: "UPI Online",
      description: "Pay now using UPI (Google Pay, PhonePe, Paytm)",
      icon: <Smartphone className="h-5 w-5" />,
      popular: true,
      note: "Instant payment • Order confirmed immediately",
      color: "purple",
    },
    {
      id: "upi_on_delivery",
      name: "UPI On Delivery",
      description: "Pay using UPI when order arrives",
      icon: <Clock className="h-5 w-5" />,
      popular: true,
      note: "Pay at doorstep • No advance payment",
      color: "blue",
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      description: "Pay in cash when your order is delivered",
      icon: <Banknote className="h-5 w-5" />,
      popular: false,
      note: "Traditional payment • Keep exact change ready",
      color: "green",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, RuPay",
      icon: <CreditCard className="h-5 w-5" />,
      popular: false,
      note: "Secure payment • All major cards accepted",
      color: "blue",
    },
    {
      id: "netbanking",
      name: "Net Banking",
      description: "All major banks supported",
      icon: <Building2 className="h-5 w-5" />,
      popular: false,
      note: "Direct bank transfer • Highly secure",
      color: "orange",
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      description: "Paytm, Amazon Pay, PhonePe Wallet",
      icon: <Wallet className="h-5 w-5" />,
      popular: false,
      note: "Quick payment • Cashback offers",
      color: "pink",
    },
  ]

  const banks = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Canara Bank",
    "Union Bank of India",
    "Bank of India",
    "Central Bank of India",
    "Indian Overseas Bank",
    "UCO Bank",
    "IDBI Bank",
    "Indian Bank",
    "Yes Bank",
    "Federal Bank",
    "South Indian Bank",
  ]

  const wallets = [
    "Paytm Wallet",
    "Amazon Pay",
    "PhonePe Wallet",
    "Mobikwik",
    "Freecharge",
    "Airtel Money",
    "JioMoney",
    "HDFC PayZapp",
    "ICICI Pockets",
    "SBI Buddy",
  ]

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading payment details...</p>
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
            <span className="text-gray-500 text-lg font-medium">Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-600">SSL Secured</span>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Payment Method</CardTitle>
                <p className="text-sm text-gray-600">Choose your preferred payment option</p>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="relative">
                        <div
                          className={`flex items-start space-x-4 p-4 border-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-all ${
                            selectedPaymentMethod === method.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                          }`}
                        >
                          <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                          <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <div
                                  className={`p-2 rounded-lg ${
                                    method.color === "green"
                                      ? "bg-green-100 text-green-600"
                                      : method.color === "purple"
                                        ? "bg-purple-100 text-purple-600"
                                        : method.color === "blue"
                                          ? "bg-blue-100 text-blue-600"
                                          : method.color === "orange"
                                            ? "bg-orange-100 text-orange-600"
                                            : "bg-pink-100 text-pink-600"
                                  }`}
                                >
                                  {method.icon}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-gray-900">{method.name}</span>
                                    {method.popular && (
                                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                        Popular
                                      </Badge>
                                    )}
                                    {method.id === "upi_online" && (
                                      <Badge className="text-xs bg-purple-100 text-purple-700">
                                        <Zap className="h-3 w-3 mr-1" />
                                        Instant
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 mb-1">{method.description}</p>
                                  <p className="text-xs text-gray-500">{method.note}</p>
                                </div>
                              </div>
                              {(method.id === "cod" || method.id === "upi_on_delivery") && (
                                <div className="text-right">
                                  <Badge className="bg-green-100 text-green-800 text-xs">No Advance Payment</Badge>
                                </div>
                              )}
                            </div>
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                {/* UPI Online Payment Form */}
                {selectedPaymentMethod === "upi_online" && (
                  <div className="mt-6 p-6 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Smartphone className="h-5 w-5 text-purple-600" />
                      <h4 className="font-semibold text-purple-800">UPI Online Payment</h4>
                      <Badge className="bg-purple-100 text-purple-700 text-xs">
                        <Zap className="h-3 w-3 mr-1" />
                        Instant Confirmation
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* QR Code Section */}
                      <div className="text-center">
                        <div className="bg-white p-4 rounded-lg border-2 border-dashed border-purple-300 mb-4">
                          <QrCode className="h-32 w-32 mx-auto text-purple-600 mb-2" />
                          <p className="text-sm text-gray-600">Scan QR Code to Pay</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border">
                          <p className="text-sm text-gray-600 mb-2">UPI ID:</p>
                          <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span className="font-mono text-sm">{merchantUpiId}</span>
                            <Button size="sm" variant="ghost" onClick={copyUpiId} className="h-6 w-6 p-0">
                              {copiedUpiId ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3 p-3 bg-white rounded-lg border">
                          <p className="text-lg font-semibold text-purple-600">₹{orderDetails.totalAmount}</p>
                          <p className="text-xs text-gray-500">Amount to Pay</p>
                        </div>
                      </div>

                      {/* Payment Details Form */}
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="upi-id" className="text-sm font-medium">
                            Your UPI ID (Optional)
                          </Label>
                          <Input
                            id="upi-id"
                            type="text"
                            placeholder="yourname@paytm"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="utr-number" className="text-sm font-medium">
                            UTR/Transaction ID *
                          </Label>
                          <Input
                            id="utr-number"
                            type="text"
                            placeholder="Enter 12-digit UTR number"
                            value={utrNumber}
                            onChange={(e) => setUtrNumber(e.target.value)}
                            className="mt-1"
                            required
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Enter the UTR number from your payment app after completing the payment
                          </p>
                        </div>

                        <div className="bg-blue-50 p-3 rounded-lg">
                          <h5 className="font-medium text-blue-800 mb-2">Payment Steps:</h5>
                          <ol className="text-sm text-blue-700 space-y-1">
                            <li>1. Scan QR code or copy UPI ID</li>
                            <li>2. Pay ₹{orderDetails.totalAmount} using your UPI app</li>
                            <li>3. Copy the UTR number from payment confirmation</li>
                            <li>4. Enter UTR number above and place order</li>
                          </ol>
                        </div>

                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-green-800">Order Status: ON HOLD</p>
                              <p className="text-xs text-green-700">
                                Your order will be confirmed once payment is verified
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* UPI On Delivery Information */}
                {selectedPaymentMethod === "upi_on_delivery" && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">UPI On Delivery</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Pay using UPI when your order arrives</li>
                          <li>• No advance payment required</li>
                          <li>• Delivery agent will have QR code for payment</li>
                          <li>• Order will be prepared and dispatched immediately</li>
                          <li>• Payment status: Pending upon delivery</li>
                        </ul>
                        <div className="mt-3 p-2 bg-white rounded border">
                          <p className="text-xs text-gray-600">
                            <strong>Note:</strong> Your order will be confirmed and prepared for delivery. Payment will
                            be collected via UPI at your doorstep.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Card Payment Form */}
                {selectedPaymentMethod === "card" && (
                  <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold text-blue-800">Card Payment</h4>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Card Preview */}
                      <div>
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl text-white mb-4">
                          <div className="flex justify-between items-start mb-8">
                            <div className="w-12 h-8 bg-yellow-400 rounded"></div>
                            <div className="text-right">
                              <p className="text-xs opacity-75">Amount</p>
                              <p className="text-xl font-bold">₹{orderDetails.totalAmount}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="font-mono text-lg tracking-wider">
                              {cardNumber.replace(/(.{4})/g, "$1 ").trim() || "**** **** **** ****"}
                            </p>
                            <div className="flex justify-between">
                              <div>
                                <p className="text-xs opacity-75">Card Holder</p>
                                <p className="text-sm">{cardHolderName || "YOUR NAME"}</p>
                              </div>
                              <div>
                                <p className="text-xs opacity-75">Expires</p>
                                <p className="text-sm">{expiryDate || "MM/YY"}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Shield className="h-4 w-4" />
                          <span>Your card details are encrypted and secure</span>
                        </div>
                      </div>

                      {/* Card Form */}
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="card-number" className="text-sm font-medium">
                            Card Number *
                          </Label>
                          <Input
                            id="card-number"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "").slice(0, 16)
                              setCardNumber(value)
                            }}
                            className="mt-1"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="card-holder" className="text-sm font-medium">
                            Card Holder Name *
                          </Label>
                          <Input
                            id="card-holder"
                            type="text"
                            placeholder="John Doe"
                            value={cardHolderName}
                            onChange={(e) => setCardHolderName(e.target.value.toUpperCase())}
                            className="mt-1"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry" className="text-sm font-medium">
                              Expiry Date *
                            </Label>
                            <Input
                              id="expiry"
                              type="text"
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, "")
                                if (value.length >= 2) {
                                  value = value.slice(0, 2) + "/" + value.slice(2, 4)
                                }
                                setExpiryDate(value)
                              }}
                              className="mt-1"
                              maxLength={5}
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="cvv" className="text-sm font-medium">
                              CVV *
                            </Label>
                            <Input
                              id="cvv"
                              type="password"
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "").slice(0, 3)
                                setCvv(value)
                              }}
                              className="mt-1"
                              maxLength={3}
                              required
                            />
                          </div>
                        </div>

                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <strong>Note:</strong> This is a demo. Your card will not be charged. Use any valid format
                            for testing.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Net Banking Form */}
                {selectedPaymentMethod === "netbanking" && (
                  <div className="mt-6 p-6 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Building2 className="h-5 w-5 text-orange-600" />
                      <h4 className="font-semibold text-orange-800">Net Banking</h4>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Bank Selection & Amount */}
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border text-center">
                          <Globe className="h-16 w-16 mx-auto text-orange-600 mb-2" />
                          <p className="text-sm text-gray-600 mb-2">Secure Bank Transfer</p>
                          <div className="bg-orange-100 p-3 rounded">
                            <p className="text-lg font-semibold text-orange-600">₹{orderDetails.totalAmount}</p>
                            <p className="text-xs text-gray-500">Amount to Pay</p>
                          </div>
                        </div>

                        <div className="bg-blue-50 p-3 rounded-lg">
                          <h5 className="font-medium text-blue-800 mb-2">Payment Steps:</h5>
                          <ol className="text-sm text-blue-700 space-y-1">
                            <li>1. Select your bank from the dropdown</li>
                            <li>2. You'll be redirected to your bank's website</li>
                            <li>3. Login and complete the payment</li>
                            <li>4. Note down the UTR number from confirmation</li>
                            <li>5. Enter UTR number and proceed</li>
                          </ol>
                        </div>
                      </div>

                      {/* Bank Form */}
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="bank-select" className="text-sm font-medium">
                            Select Your Bank *
                          </Label>
                          <Select value={selectedBank} onValueChange={setSelectedBank}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Choose your bank" />
                            </SelectTrigger>
                            <SelectContent>
                              {banks.map((bank) => (
                                <SelectItem key={bank} value={bank}>
                                  {bank}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="netbanking-utr" className="text-sm font-medium">
                            UTR/Reference Number *
                          </Label>
                          <Input
                            id="netbanking-utr"
                            type="text"
                            placeholder="Enter 12-digit UTR number"
                            value={netBankingUtr}
                            onChange={(e) => setNetBankingUtr(e.target.value)}
                            className="mt-1"
                            required
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Enter the UTR/Reference number from your bank's payment confirmation
                          </p>
                        </div>

                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Shield className="h-4 w-4 text-green-600 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-green-800">Secure Banking</p>
                              <p className="text-xs text-green-700">
                                Your transaction is protected by your bank's security protocols
                              </p>
                            </div>
                          </div>
                        </div>

                        {selectedBank && (
                          <div className="bg-white p-3 rounded-lg border">
                            <p className="text-sm font-medium text-gray-800">Selected Bank:</p>
                            <p className="text-sm text-gray-600">{selectedBank}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              You will be redirected to {selectedBank}'s secure payment gateway
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Digital Wallet Form */}
                {selectedPaymentMethod === "wallet" && (
                  <div className="mt-6 p-6 bg-pink-50 border border-pink-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Wallet className="h-5 w-5 text-pink-600" />
                      <h4 className="font-semibold text-pink-800">Digital Wallet</h4>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Wallet Selection & Amount */}
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border text-center">
                          <CardIcon className="h-16 w-16 mx-auto text-pink-600 mb-2" />
                          <p className="text-sm text-gray-600 mb-2">Quick Wallet Payment</p>
                          <div className="bg-pink-100 p-3 rounded">
                            <p className="text-lg font-semibold text-pink-600">₹{orderDetails.totalAmount}</p>
                            <p className="text-xs text-gray-500">Amount to Pay</p>
                          </div>
                        </div>

                        <div className="bg-blue-50 p-3 rounded-lg">
                          <h5 className="font-medium text-blue-800 mb-2">Payment Steps:</h5>
                          <ol className="text-sm text-blue-700 space-y-1">
                            <li>1. Select your preferred wallet</li>
                            <li>2. You'll be redirected to wallet app/website</li>
                            <li>3. Login and complete the payment</li>
                            <li>4. Copy the transaction ID from confirmation</li>
                            <li>5. Enter transaction ID and proceed</li>
                          </ol>
                        </div>
                      </div>

                      {/* Wallet Form */}
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="wallet-select" className="text-sm font-medium">
                            Select Your Wallet *
                          </Label>
                          <Select value={selectedWallet} onValueChange={setSelectedWallet}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Choose your wallet" />
                            </SelectTrigger>
                            <SelectContent>
                              {wallets.map((wallet) => (
                                <SelectItem key={wallet} value={wallet}>
                                  {wallet}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="wallet-utr" className="text-sm font-medium">
                            Transaction ID *
                          </Label>
                          <Input
                            id="wallet-utr"
                            type="text"
                            placeholder="Enter transaction ID"
                            value={walletUtr}
                            onChange={(e) => setWalletUtr(e.target.value)}
                            className="mt-1"
                            required
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Enter the transaction ID from your wallet payment confirmation
                          </p>
                        </div>

                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Wallet className="h-4 w-4 text-yellow-600 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-yellow-800">Cashback Offers</p>
                              <p className="text-xs text-yellow-700">
                                Check your wallet app for available cashback offers on this transaction
                              </p>
                            </div>
                          </div>
                        </div>

                        {selectedWallet && (
                          <div className="bg-white p-3 rounded-lg border">
                            <p className="text-sm font-medium text-gray-800">Selected Wallet:</p>
                            <p className="text-sm text-gray-600">{selectedWallet}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              You will be redirected to {selectedWallet} for payment
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* COD Information */}
                {selectedPaymentMethod === "cod" && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Banknote className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800 mb-1">Cash on Delivery</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Pay in cash when your order arrives</li>
                          <li>• No online payment required</li>
                          <li>• Keep exact change ready for smooth delivery</li>
                          <li>• Available for orders up to ₹5,000</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {(orderDetails.items || []).map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <Image
                        src={item.productImage || "/placeholder.svg"}
                        alt={item.productName}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.productName}</h4>
                        <p className="text-xs text-gray-500 truncate">{item.productCategory || "General"}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                          <span className="text-sm font-semibold text-green-600">₹{item.totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({(orderDetails.items || []).reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>₹{orderDetails.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span className={orderDetails.deliveryFee === 0 ? "text-green-600" : ""}>
                      {orderDetails.deliveryFee === 0 ? "FREE" : `₹${orderDetails.deliveryFee}`}
                    </span>
                  </div>
                  {(selectedPaymentMethod === "cod" || selectedPaymentMethod === "upi_on_delivery") && (
                    <div className="flex justify-between text-sm">
                      <span>Payment Charges</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-green-600">₹{orderDetails.totalAmount}</span>
                  </div>
                  {(selectedPaymentMethod === "cod" || selectedPaymentMethod === "upi_on_delivery") && (
                    <p className="text-xs text-green-600 text-center">
                      Pay ₹{orderDetails.totalAmount} {selectedPaymentMethod === "cod" ? "in cash" : "via UPI"} on delivery
                    </p>
                  )}
                </div>

                {/* Delivery Address */}
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-sm mb-2">Delivery Address</h4>
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-900">{orderDetails.customerName}</p>
                    <p>{orderDetails.customerAddress}</p>
                    <p>
                      {orderDetails.customerCity}, {orderDetails.customerArea}{" "}
                      {orderDetails.customerLocality && orderDetails.customerLocality}
                    </p>
                    <p className="mt-1 text-blue-600">{orderDetails.customerPhone}</p>
                  </div>
                </div>

                {/* Payment Button */}
                <Button
                  className="w-full"
                  size="lg"
                  onClick={placeOrder}
                  disabled={!selectedPaymentMethod || isProcessing || !validatePaymentDetails()}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      {selectedPaymentMethod === "cod" ? (
                        <>
                          <Banknote className="h-4 w-4 mr-2" />
                          Place Order (COD)
                        </>
                      ) : selectedPaymentMethod === "upi_online" ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Place Order (UPI Online)
                        </>
                      ) : selectedPaymentMethod === "upi_on_delivery" ? (
                        <>
                          <Clock className="h-4 w-4 mr-2" />
                          Place Order (UPI on Delivery)
                        </>
                      ) : selectedPaymentMethod === "netbanking" ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Confirm Bank Payment
                        </>
                      ) : selectedPaymentMethod === "wallet" ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Confirm Wallet Payment
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Pay ₹{orderDetails.totalAmount}
                        </>
                      )}
                    </>
                  )}
                </Button>

                {selectedPaymentMethod === "cod" && (
                  <p className="text-xs text-center text-gray-500">
                    Your order will be confirmed and prepared for delivery
                  </p>
                )}

                {selectedPaymentMethod === "upi_on_delivery" && (
                  <p className="text-xs text-center text-gray-500">
                    Your order will be confirmed and prepared. Pay via UPI when delivered.
                  </p>
                )}

                {selectedPaymentMethod === "upi_online" && (
                  <p className="text-xs text-center text-gray-500">
                    Complete payment first, then enter the UTR number above
                  </p>
                )}

                {["netbanking", "wallet"].includes(selectedPaymentMethod) && (
                  <p className="text-xs text-center text-gray-500">
                    Complete payment first, then enter the transaction details above
                  </p>
                )}

                {selectedPaymentMethod === "card" && (
                  <p className="text-xs text-center text-gray-500">Your card details are processed securely</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
