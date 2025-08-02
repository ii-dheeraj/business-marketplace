"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { AppointmentCalendar } from "@/components/ui/appointment-calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import AppointmentDetailsSection from "@/components/appointment-details-section"
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Home, 
  Building, 
  Navigation,
  CalendarIcon,
  Clock,
  Store,
  FileText,

  Package,
  Monitor,
  Calendar as CalendarIcon2,
  Wrench,
  ShoppingBag,
  MessageSquare
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/useCart"
import Image from "next/image"
import { getCookie } from "@/lib/utils"
// import { format } from "date-fns"
import { cn } from "@/lib/utils"

type ProductType = "physical" | "digital" | "appointment" | "onsite" | "walkin" | "enquiry"

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

interface AppointmentDetails {
  date: Date | undefined
  timeSlot: string
  specialInstructions: string
}

interface StoreDetails {
  storeName: string
  storeAddress: string
  storeTimings: string
  visitDate: Date | undefined
  visitTime: string
}

interface EnquiryDetails {
  subject: string
  message: string
  preferredContact: string
}

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
  "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"
]

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
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails>({
    date: undefined,
    timeSlot: "",
    specialInstructions: ""
  })
  const [storeDetails, setStoreDetails] = useState<StoreDetails>({
    storeName: "",
    storeAddress: "",
    storeTimings: "",
    visitDate: undefined,
    visitTime: ""
  })
  const [enquiryDetails, setEnquiryDetails] = useState<EnquiryDetails>({
    subject: "",
    message: "",
    preferredContact: "phone"
  })

  const [isFormValid, setIsFormValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [autoFilledFields, setAutoFilledFields] = useState<Set<string>>(new Set())
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Determine product type from cart items
  const getProductType = (): ProductType => {
    // This would typically come from the product data
    // For now, we'll use a simple heuristic based on product name or category
    const firstItem = cart.items[0]
    if (!firstItem) return "physical"
    
    // You can extend this logic based on your product data structure
    const productName = firstItem.name.toLowerCase()
    const sellerName = firstItem.sellerName.toLowerCase()
    
    if (productName.includes("appointment") || productName.includes("booking")) return "appointment"
    if (productName.includes("onsite") || productName.includes("service")) return "onsite"
    if (productName.includes("walk") || productName.includes("visit")) return "walkin"
    if (productName.includes("enquiry") || productName.includes("inquiry")) return "enquiry"
    if (productName.includes("digital") || productName.includes("download")) return "digital"
    
    return "physical" // Default to physical product
  }

  const productType = getProductType()

  // Set client flag to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
    setIsLoading(false)
  }, [])

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.items.length === 0) {
      router.push("/")
    }
  }, [cart.items.length, router])

  // Load saved customer details and auto-fill from logged in user
  useEffect(() => {
    if (!isClient) return
    
    const autoFilled = new Set<string>()
    
    const userInfoCookie = getCookie("userInfo")
    
    if (userInfoCookie) {
      try {
        const userInfo = JSON.parse(userInfoCookie)
        
        if (userInfo && userInfo.userType === "CUSTOMER") {
          setCustomerDetails(prev => {
            const updated = { ...prev }
            if (userInfo.name) {
              updated.name = userInfo.name
              autoFilled.add("name")
            }
            if (userInfo.email) {
              updated.email = userInfo.email
              autoFilled.add("email")
            }
            if (userInfo.phone) {
              updated.phone = userInfo.phone
              autoFilled.add("phone")
            }
            return updated
          })
        }
      } catch (error) {
        console.error("Error parsing user info:", error)
      }
    }

    const savedDetails = localStorage.getItem("customerDetails")
    if (savedDetails) {
      try {
        const parsedDetails = JSON.parse(savedDetails)
        const nonEmptySavedDetails = Object.fromEntries(
          Object.entries(parsedDetails).filter(([key, value]) => value && value.toString().trim() !== "")
        )
        
        if (Object.keys(nonEmptySavedDetails).length > 0) {
          setCustomerDetails(prev => ({
            ...prev,
            ...nonEmptySavedDetails
          }))
          Object.keys(nonEmptySavedDetails).forEach(key => {
            autoFilled.delete(key)
          })
        }
      } catch (error) {
        console.error("Error loading customer details:", error)
      }
    }

    setAutoFilledFields(autoFilled)
  }, [isClient])

  // Save customer details whenever they change
  useEffect(() => {
    localStorage.setItem("customerDetails", JSON.stringify(customerDetails))
  }, [customerDetails])

  // Validate form based on product type
  useEffect(() => {
    let isValid = false
    
    switch (productType) {
      case "physical":
        const requiredPhysicalFields = ["name", "phone", "email", "address", "city", "state", "pincode"]
        isValid = requiredPhysicalFields.every((field) => customerDetails[field as keyof CustomerDetails].trim() !== "")
        break
      
      case "digital":
        const requiredDigitalFields = ["name", "phone", "email"]
        isValid = requiredDigitalFields.every((field) => customerDetails[field as keyof CustomerDetails].trim() !== "")
        break
      
      case "appointment":
      case "onsite":
        const requiredAppointmentFields = ["name", "phone", "email"]
        isValid = requiredAppointmentFields.every((field) => customerDetails[field as keyof CustomerDetails].trim() !== "") &&
                  !!appointmentDetails.date && !!appointmentDetails.timeSlot
        break
      
      case "walkin":
        const requiredWalkinFields = ["name", "phone", "email"]
        isValid = requiredWalkinFields.every((field) => customerDetails[field as keyof CustomerDetails].trim() !== "") &&
                  storeDetails.storeName.trim() !== "" && storeDetails.storeAddress.trim() !== ""
        break
      
      case "enquiry":
        const requiredEnquiryFields = ["name", "phone", "email"]
        isValid = requiredEnquiryFields.every((field) => customerDetails[field as keyof CustomerDetails].trim() !== "") &&
                  enquiryDetails.subject.trim() !== "" && enquiryDetails.message.trim() !== ""
        break
    }
    
    setIsFormValid(isValid)
  }, [customerDetails, appointmentDetails, storeDetails, enquiryDetails, productType])

  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    setCustomerDetails((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAppointmentChange = (field: keyof AppointmentDetails, value: Date | string | undefined) => {
    setAppointmentDetails(prev => ({ ...prev, [field]: value }))
  }

  const handleStoreChange = (field: keyof StoreDetails, value: Date | string | undefined) => {
    setStoreDetails(prev => ({ ...prev, [field]: value }))
  }

  const handleEnquiryChange = (field: keyof EnquiryDetails, value: string) => {
    setEnquiryDetails(prev => ({ ...prev, [field]: value }))
  }

  const handleProceedToPayment = async () => {
    if (loading) return
    
    if (isFormValid) {
      setLoading(true)
      
      const userInfoCookie = getCookie("userInfo")
      console.log("User info cookie:", userInfoCookie)
      
      let buyerId = null
      if (userInfoCookie) {
        try {
          const userInfo = JSON.parse(userInfoCookie)
          buyerId = userInfo.id
          console.log("Parsed user info:", userInfo)
          console.log("Buyer ID:", buyerId)
        } catch (parseError) {
          console.error("Error parsing user info cookie:", parseError)
        }
      }
      
      if (!buyerId) {
        alert("You must be logged in to place an order.")
        setLoading(false)
        return
      }

      // Log cart items for debugging
      console.log("Cart items:", cart.items)
      console.log("Cart total:", cart.totalPrice)
      console.log("Cart total items:", cart.totalItems)

      // Prepare order data based on product type
      const orderData = {
        customerId: buyerId,
        items: cart.items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
          image: item.image,
          sellerId: item.sellerId,
          sellerName: item.sellerName,
          category: "general", // Default category since it's not in cart items
        })),
        customerDetails: {
          name: customerDetails.name,
          phone: customerDetails.phone,
          email: customerDetails.email,
          address: customerDetails.address,
          city: customerDetails.city,
          area: customerDetails.state,
          locality: customerDetails.landmark || "",
        },
        productType: productType,
        appointmentDetails: productType === "appointment" || productType === "onsite" ? appointmentDetails : null,
        storeDetails: productType === "walkin" ? storeDetails : null,
        enquiryDetails: productType === "enquiry" ? enquiryDetails : null,
        paymentMethod: "ONLINE_PAYMENT", // Set as online payment since payment will be handled separately
        totalAmount: getTotalAmount(),
        subtotal: cart.totalPrice,
        deliveryFee: getDeliveryFee(),
        deliveryInstructions: ""
      }

      try {
        console.log("Sending order data:", orderData)
        const res = await fetch("/api/order/place", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        })
        
        let data
        try {
          data = await res.json()
        } catch (jsonError) {
          console.error("Failed to parse JSON response:", jsonError)
          const textResponse = await res.text()
          console.error("Raw response:", textResponse)
          throw new Error(`Invalid JSON response: ${textResponse}`)
        }
        console.log("Order placement response:", data)
        console.log("Response status:", res.status)
        console.log("Response headers:", Object.fromEntries(res.headers.entries()))
        
      if (res.ok && data.order && data.order.id) {
          if (productType === "walkin" || productType === "enquiry") {
            // For walk-in and enquiry, go directly to success page
            router.push(`/order-success?orderId=${data.order.id}`)
          } else {
            // For other types, go to payment page
            router.push(`/payment?orderId=${data.order.id}`)
          }
      } else {
        console.error("Order placement failed:", data)
        console.error("Response status:", res.status)
        console.error("Response status text:", res.statusText)
        alert(`Failed to create order: ${data.error || 'Unknown error'} (Status: ${res.status})`)
        }
      } catch (error) {
        console.error("Order placement error:", error)
        alert("An error occurred while placing the order")
      } finally {
        setLoading(false)
      }
    }
  }

  const getDeliveryFee = (): number => {
    if (productType === "physical") {
      return cart.totalPrice >= 500 ? 0 : 49
    }
    return 0 // No delivery fee for other product types
  }

  const getTotalAmount = (): number => {
    return cart.totalPrice + getDeliveryFee()
  }

  const renderProductTypeIcon = () => {
    switch (productType) {
      case "physical": return <Package className="h-5 w-5" />
      case "digital": return <Monitor className="h-5 w-5" />
      case "appointment": return <CalendarIcon2 className="h-5 w-5" />
      case "onsite": return <Wrench className="h-5 w-5" />
      case "walkin": return <ShoppingBag className="h-5 w-5" />
      case "enquiry": return <MessageSquare className="h-5 w-5" />
      default: return <Package className="h-5 w-5" />
    }
  }

  const renderProductTypeTitle = () => {
    switch (productType) {
      case "physical": return "Physical Product"
      case "digital": return "Digital Product"
      case "appointment": return "Appointment Booking"
      case "onsite": return "Onsite Service"
      case "walkin": return "Walk-in Service"
      case "enquiry": return "Enquiry"
      default: return "Product"
    }
  }

  const renderPhysicalProductForm = () => (
    <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Label htmlFor="name" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Full Name *
                        </Label>
              {autoFilledFields.has("name") && (
                <Badge variant="secondary" className="text-xs">Auto-filled</Badge>
                        )}
                      </div>
                      <Input
                        id="name"
                        value={customerDetails.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
              className={autoFilledFields.has("name") ? "bg-blue-50 border-blue-200" : ""}
                        required
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone Number *
                        </Label>
              {autoFilledFields.has("phone") && (
                <Badge variant="secondary" className="text-xs">Auto-filled</Badge>
                        )}
                      </div>
                      <Input
                        id="phone"
                        type="tel"
                        value={customerDetails.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
              className={autoFilledFields.has("phone") ? "bg-blue-50 border-blue-200" : ""}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address *
                        </Label>
              {autoFilledFields.has("email") && (
                <Badge variant="secondary" className="text-xs">Auto-filled</Badge>
                        )}
                      </div>
                      <Input
                        id="email"
                        type="email"
                        value={customerDetails.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email address"
              className={autoFilledFields.has("email") ? "bg-blue-50 border-blue-200" : ""}
                        required
                      />
                    </div>
                  </div>
                </div>

                <Separator />

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
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
    </div>
  )

  const renderDigitalProductForm = () => (
    <div className="space-y-6">
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
              required
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderAppointmentForm = () => (
    <div className="space-y-6">
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
              required
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Appointment Details Section */}
      <AppointmentDetailsSection
        selectedDate={appointmentDetails.date}
        onDateChange={(date) => handleAppointmentChange("date", date)}
        specialInstructions={appointmentDetails.specialInstructions}
        onSpecialInstructionsChange={(instructions) => handleAppointmentChange("specialInstructions", instructions)}
      />

      {/* Time Slot Selection */}
      <div>
        <h3 className="text-lg font-medium mb-4">Appointment Time</h3>
        <div>
          <Label htmlFor="timeSlot" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Select Time Slot *
          </Label>
          <Select value={appointmentDetails.timeSlot} onValueChange={(value) => handleAppointmentChange("timeSlot", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a time slot" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

    </div>
  )

  const renderWalkinForm = () => (
    <div className="space-y-6">
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
              required
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Store Details</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="storeName" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              Store Name *
            </Label>
            <Input
              id="storeName"
              value={storeDetails.storeName}
              onChange={(e) => handleStoreChange("storeName", e.target.value)}
              placeholder="Enter store name"
              required
            />
          </div>
          <div>
            <Label htmlFor="storeAddress" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Store Address *
            </Label>
            <Textarea
              id="storeAddress"
              value={storeDetails.storeAddress}
              onChange={(e) => handleStoreChange("storeAddress", e.target.value)}
              placeholder="Enter store address"
              rows={3}
              required
            />
          </div>
          <div>
            <Label htmlFor="storeTimings" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Store Timings
            </Label>
            <Input
              id="storeTimings"
              value={storeDetails.storeTimings}
              onChange={(e) => handleStoreChange("storeTimings", e.target.value)}
              placeholder="e.g., Mon-Sat: 9 AM - 6 PM"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Preferred Visit Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !storeDetails.visitDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {storeDetails.visitDate ? storeDetails.visitDate.toLocaleDateString('en-US', { 
                     weekday: 'long', 
                     year: 'numeric', 
                     month: 'long', 
                     day: 'numeric' 
                   }) : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                                     <Calendar
                     mode="single"
                     selected={storeDetails.visitDate}
                     onSelect={(date: Date | undefined) => handleStoreChange("visitDate", date)}
                     initialFocus
                   />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="visitTime">Preferred Visit Time</Label>
              <Select value={storeDetails.visitTime} onValueChange={(value) => handleStoreChange("visitTime", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderEnquiryForm = () => (
    <div className="space-y-6">
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
              required
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Enquiry Details</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="subject" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Subject *
            </Label>
            <Input
              id="subject"
              value={enquiryDetails.subject}
              onChange={(e) => handleEnquiryChange("subject", e.target.value)}
              placeholder="Enter enquiry subject"
              required
            />
          </div>
          <div>
            <Label htmlFor="message" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Message *
            </Label>
            <Textarea
              id="message"
              value={enquiryDetails.message}
              onChange={(e) => handleEnquiryChange("message", e.target.value)}
              placeholder="Describe your enquiry in detail..."
              rows={6}
              required
            />
          </div>
          <div>
            <Label htmlFor="preferredContact">Preferred Contact Method</Label>
            <Select value={enquiryDetails.preferredContact} onValueChange={(value) => handleEnquiryChange("preferredContact", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderFormContent = () => {
    switch (productType) {
      case "physical":
        return renderPhysicalProductForm()
      case "digital":
        return renderDigitalProductForm()
      case "appointment":
      case "onsite":
        return renderAppointmentForm()
      case "walkin":
        return renderWalkinForm()
      case "enquiry":
        return renderEnquiryForm()
      default:
        return renderPhysicalProductForm()
    }
  }

  const getActionButtonText = () => {
    switch (productType) {
      case "walkin":
        return "Confirm Walk-in"
      case "enquiry":
        return "Submit Enquiry"
      default:
        return "Proceed to Payment"
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p>Loading checkout...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            {renderProductTypeIcon()}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{renderProductTypeTitle()}</h1>
              <p className="text-gray-600">Complete your {productType === "enquiry" ? "enquiry" : "order"}</p>
            </div>
          </div>
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {renderProductTypeIcon()}
                  {renderProductTypeTitle()} Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {renderFormContent()}
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
                  {productType === "physical" && (
                    <>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                        <span>{getDeliveryFee() === 0 ? "FREE" : `₹${getDeliveryFee()}`}</span>
                  </div>
                  {cart.totalPrice < 500 && (
                    <p className="text-xs text-blue-600">Add ₹{500 - cart.totalPrice} more for free delivery!</p>
                      )}
                    </>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-green-600">₹{getTotalAmount()}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleProceedToPayment} 
                  disabled={!isFormValid || loading}
                >
                  {loading ? "Processing..." : getActionButtonText()}
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
