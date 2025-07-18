"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Phone, Mail, User, Home, Building, Navigation } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/useCart"
import Image from "next/image"
import { getCookie } from "@/lib/utils"

interface CustomerDetails {
  name: string
  phone: string
  email: string
  address: string
  address2: string
  landmark: string
  city: string
  state: string
  pincode: string
}

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const router = useRouter()
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    phone: "",
    email: "",
    address: "",
    address2: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  })
  const [isFormValid, setIsFormValid] = useState(false)

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.items.length === 0) {
      router.push("/")
    }
  }, [cart.items.length, router])

  // Load saved customer details
  useEffect(() => {
    const savedDetails = localStorage.getItem("customerDetails")
    if (savedDetails) {
      try {
        setCustomerDetails(JSON.parse(savedDetails))
      } catch (error) {
        console.error("Error loading customer details:", error)
      }
    }
  }, [])

  // Save customer details whenever they change
  useEffect(() => {
    localStorage.setItem("customerDetails", JSON.stringify(customerDetails))
  }, [customerDetails])

  // Validate form
  useEffect(() => {
    const requiredFields = ["name", "phone", "email", "address", "city", "state", "pincode"]
    const isValid = requiredFields.every((field) => customerDetails[field as keyof CustomerDetails].trim() !== "")
    setIsFormValid(isValid)
  }, [customerDetails])

  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    setCustomerDetails((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleProceedToPayment = async () => {
    if (isFormValid) {
      // Get buyerId from cookie
      const userInfoCookie = getCookie("userInfo")
      const buyerId = userInfoCookie ? JSON.parse(userInfoCookie).id : null
      if (!buyerId) {
        alert("You must be logged in to place an order.")
        return
      }
      // Prepare order data
      const orderData = {
        buyerId,
        items: cart.items.map((item) => ({
          itemId: item.id,
          sellerId: item.sellerId,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
          image: item.image,
        })),
        customerDetails,
        paymentMethod: "", // Will be set on payment page
        totalAmount: cart.totalPrice + (cart.totalPrice >= 500 ? 0 : 49),
        subtotal: cart.totalPrice,
        deliveryFee: cart.totalPrice >= 500 ? 0 : 49,
        paymentDetails: {},
      }
      // Create a temporary order in the DB (with paymentMethod empty)
      const res = await fetch("/api/order/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })
      const data = await res.json()
      if (res.ok && data.order && data.order.id) {
        router.push(`/payment?orderId=${data.order.id}`)
      } else {
        alert(data.error || "Failed to create order")
      }
    }
  }

  const deliveryFee = cart.totalPrice >= 500 ? 0 : 49
  const finalTotal = cart.totalPrice + deliveryFee

  if (cart.items.length === 0) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600 mr-6">
                LocalMarket
              </Link>
              <span className="text-gray-500">Checkout</span>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Customer Details Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Customer Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={customerDetails.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={customerDetails.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerDetails.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email address"
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Delivery Address */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Delivery Address</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address" className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        Address *
                      </Label>
                      <Input
                        id="address"
                        value={customerDetails.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="House/Flat No., Street Name"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="address2">Address Line 2</Label>
                      <Input
                        id="address2"
                        value={customerDetails.address2}
                        onChange={(e) => handleInputChange("address2", e.target.value)}
                        placeholder="Apartment, suite, etc. (optional)"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="landmark" className="flex items-center gap-2">
                        <Navigation className="h-4 w-4" />
                        Landmark
                      </Label>
                      <Input
                        id="landmark"
                        value={customerDetails.landmark}
                        onChange={(e) => handleInputChange("landmark", e.target.value)}
                        placeholder="Near famous place, building, etc."
                        className="mt-1"
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city" className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          City *
                        </Label>
                        <Input
                          id="city"
                          value={customerDetails.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          placeholder="Enter city"
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          State *
                        </Label>
                        <Input
                          id="state"
                          value={customerDetails.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          placeholder="Enter state"
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input
                          id="pincode"
                          value={customerDetails.pincode}
                          onChange={(e) => handleInputChange("pincode", e.target.value)}
                          placeholder="Enter pincode"
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
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
                <div className="space-y-3">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-gray-500 truncate">{item.sellerName}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm font-semibold text-green-600">₹{item.price}</span>
                          <Badge variant="outline" className="text-xs">
                            Qty: {item.quantity}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({cart.totalItems} items)</span>
                    <span>₹{cart.totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                  </div>
                  {cart.totalPrice < 500 && (
                    <p className="text-xs text-blue-600">Add ₹{500 - cart.totalPrice} more for free delivery!</p>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-green-600">₹{finalTotal}</span>
                  </div>
                </div>

                {/* Proceed Button */}
                <Button className="w-full" size="lg" onClick={handleProceedToPayment} disabled={!isFormValid}>
                  Proceed to Payment
                </Button>

                {!isFormValid && (
                  <p className="text-xs text-red-500 text-center">Please fill all required fields marked with *</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
