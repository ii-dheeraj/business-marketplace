"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User, Store, Truck, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { setCookie, getUserInfo } from "@/lib/utils"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: "login" | "register"
}

export function AuthModal({ isOpen, onClose, defaultMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(defaultMode)
  const [userType, setUserType] = useState<"CUSTOMER" | "SELLER" | "DELIVERY_AGENT" | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    businessName: "",
    category: "",
    subcategories: [] as string[],
    businessAddress: "",
    businessCity: "",
    businessArea: "",
    businessLocality: "",
    businessDescription: "",
    businessImage: "",
    vehicleNumber: "",
    vehicleType: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const router = useRouter()

  useEffect(() => {
    setMode(defaultMode)
  }, [defaultMode])

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      businessName: "",
      category: "",
      subcategories: [],
      businessAddress: "",
      businessCity: "",
      businessArea: "",
      businessLocality: "",
      businessDescription: "",
      businessImage: "",
      vehicleNumber: "",
      vehicleType: "",
    })
    setUserType(null)
    setShowPassword(false)
    setErrorMsg("")
    setSuccessMsg("")
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleUserTypeSelect = (type: "CUSTOMER" | "SELLER" | "DELIVERY_AGENT") => {
    setUserType(type)
    setErrorMsg("")
    setSuccessMsg("")
  }

  const handleBack = () => {
    setUserType(null)
    setErrorMsg("")
    setSuccessMsg("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[DEBUG] Form submitted, mode:", mode, "userType:", userType)
    console.log("[DEBUG] Form data:", formData)
    setIsLoading(true)
    setErrorMsg("")
    setSuccessMsg("")

    // Validate required fields
    if (mode === "login") {
      if (!formData.email || !formData.password) {
        setErrorMsg("Please fill all required fields.")
        setIsLoading(false)
        return
      }
    } else {
      if (!formData.name || !formData.email || !formData.password || !userType) {
        setErrorMsg("Please fill all required fields.")
        setIsLoading(false)
        return
      }
    }
    
    // Validate seller-specific fields
    if (mode === "register" && userType === "SELLER") {
      if (!formData.category || !formData.businessCity || !formData.businessAddress) {
        setErrorMsg("Please fill all required business fields.")
        setIsLoading(false)
        return
      }
    }

    // Validate delivery agent-specific fields
    if (mode === "register" && userType === "DELIVERY_AGENT") {
      if (!formData.vehicleNumber || !formData.vehicleType) {
        setErrorMsg("Please fill all required delivery agent fields.")
        setIsLoading(false)
        return
      }
    }

    try {
      if (mode === "login") {
        // Call login API
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        })
        const data = await res.json()
        console.log("[DEBUG] Login API response:", data)
        
        if (!res.ok) {
          setErrorMsg(data.error || "Login failed")
          setIsLoading(false)
          return
        }

        setSuccessMsg(`Successfully logged in as ${data.user.userType}!`)
        
        // Store user info in cookie for session management
        setCookie("userInfo", JSON.stringify(data.user))
        console.log("[DEBUG] userInfo cookie set:", JSON.stringify(data.user))
        
        // Dispatch custom event to notify header about login
        window.dispatchEvent(new CustomEvent('userLogin', { detail: data.user }))
        
        // Redirect based on userType immediately
        if (data.user.userType === "CUSTOMER") {
          console.log("[DEBUG] Redirecting to /customer/home")
          router.push("/customer/home")
        } else if (data.user.userType === "SELLER") {
          console.log("[DEBUG] Redirecting to /seller/dashboard")
          router.push("/seller/dashboard")
        } else if (data.user.userType === "DELIVERY_AGENT") {
          console.log("[DEBUG] Redirecting to /delivery/dashboard")
          router.push("/delivery/dashboard")
        }
        handleClose()
        
      } else {
        // Call register API
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            userType,
            ...(userType === "SELLER"
              ? {
                  businessName: formData.businessName || formData.name,
                  category: formData.category,
                  subcategories: formData.subcategories || [],
                  businessAddress: formData.businessAddress,
                  businessCity: formData.businessCity,
                  businessArea: formData.businessArea,
                  businessLocality: formData.businessLocality,
                  businessDescription: formData.businessDescription,
                  businessImage: formData.businessImage,
                }
              : {}),
            ...(userType === "DELIVERY_AGENT"
              ? {
                  vehicleNumber: formData.vehicleNumber,
                  vehicleType: formData.vehicleType,
                }
              : {}),
          }),
        })
        const data = await res.json()
        console.log("Register response:", data)
        
        if (!res.ok) {
          setErrorMsg(data.error || "Registration failed")
          setIsLoading(false)
          return
        }

        setSuccessMsg(`Successfully registered as ${data.user.userType}!`)
        
        // Store user info in cookie for session management
        setCookie("userInfo", JSON.stringify(data.user))
        
        // Dispatch custom event to notify header about registration
        window.dispatchEvent(new CustomEvent('userLogin', { detail: data.user }))
        
        // Redirect based on userType immediately
        if (data.user.userType === "CUSTOMER") {
          router.push("/customer/home")
        } else if (data.user.userType === "SELLER") {
          router.push("/seller/dashboard")
        } else if (data.user.userType === "DELIVERY_AGENT") {
          router.push("/delivery/dashboard")
        }
        handleClose()
      }
    } catch (error: any) {
      console.error("Auth error:", error)
      setErrorMsg(error.message || "An unexpected error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  const userTypes = [
    {
      id: "CUSTOMER",
      title: "Customer",
      description: "Shop from local businesses",
      icon: User,
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    },
    {
      id: "SELLER",
      title: "Seller",
      description: "Sell your products online",
      icon: Store,
      color: "bg-green-50 border-green-200 hover:bg-green-100",
    },
    {
      id: "DELIVERY_AGENT",
      title: "Delivery Agent",
      description: "Deliver orders and earn",
      icon: Truck,
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        handleClose()
      }
    }}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {!userType ? "Choose Your Role" : `${mode === "login" ? "Sign In" : "Sign Up"} as ${userType}`}
          </DialogTitle>
        </DialogHeader>
        
        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
            <p className="text-sm text-red-700 font-medium">{errorMsg}</p>
          </div>
        )}

        {successMsg && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
            <p className="text-sm text-green-700 font-medium">{successMsg}</p>
          </div>
        )}

        {!userType ? (
          <div className="space-y-6">
            <p className="text-sm text-gray-600 text-center">Select how you want to use LocalMarket</p>
            

            
            <div className="grid gap-4">
              {userTypes.map((type) => {
                const Icon = type.icon
                return (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${type.color} border-2 hover:border-opacity-100`}
                    onClick={() => handleUserTypeSelect(type.id as "CUSTOMER" | "SELLER" | "DELIVERY_AGENT")}
                  >
                    <CardContent className="flex items-center p-6">
                      <div className={`p-3 rounded-full ${type.color.replace('bg-', 'bg-').replace('border-', 'bg-')} mr-4`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{type.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Tabs value={mode} onValueChange={(value) => {
              setMode(value as "login" | "register")
              setErrorMsg("")
              setSuccessMsg("")
            }}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-12 text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="h-12 text-base pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <Input
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="h-12 text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-12 text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="h-12 text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="h-12 text-base pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {userType === "SELLER" && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Business Name</label>
                        <Input
                          name="businessName"
                          type="text"
                          placeholder="Enter your business name"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          className="h-12 text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Business Category</label>
                        <Input
                          name="category"
                          type="text"
                          placeholder="e.g., food-beverage, electronics-appliances"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="h-12 text-base"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Business Address</label>
                        <Input
                          name="businessAddress"
                          type="text"
                          placeholder="Enter your business address"
                          value={formData.businessAddress}
                          onChange={handleInputChange}
                          className="h-12 text-base"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">City</label>
                        <Input
                          name="businessCity"
                          type="text"
                          placeholder="Enter your city"
                          value={formData.businessCity}
                          onChange={handleInputChange}
                          className="h-12 text-base"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Area</label>
                        <Input
                          name="businessArea"
                          type="text"
                          placeholder="Enter your area"
                          value={formData.businessArea}
                          onChange={handleInputChange}
                          className="h-12 text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Locality</label>
                        <Input
                          name="businessLocality"
                          type="text"
                          placeholder="Enter your locality"
                          value={formData.businessLocality}
                          onChange={handleInputChange}
                          className="h-12 text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Business Description</label>
                        <Input
                          name="businessDescription"
                          type="text"
                          placeholder="Brief description of your business"
                          value={formData.businessDescription}
                          onChange={handleInputChange}
                          className="h-12 text-base"
                        />
                      </div>
                    </>
                  )}

                  {userType === "DELIVERY_AGENT" && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Vehicle Number</label>
                        <Input
                          name="vehicleNumber"
                          type="text"
                          placeholder="Enter your vehicle number"
                          value={formData.vehicleNumber}
                          onChange={handleInputChange}
                          className="h-12 text-base"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Vehicle Type</label>
                        <Input
                          name="vehicleType"
                          type="text"
                          placeholder="e.g., Motorcycle, Car, Bicycle"
                          value={formData.vehicleType}
                          onChange={handleInputChange}
                          className="h-12 text-base"
                          required
                        />
                      </div>
                    </>
                  )}

                  <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <Button variant="ghost" onClick={handleBack} className="w-full text-gray-600 hover:text-gray-800">
              ← Back to Role Selection
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
