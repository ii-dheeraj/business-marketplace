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
import { setCookie } from "@/lib/utils"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: "login" | "register"
}

export function AuthModal({ isOpen, onClose, defaultMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(defaultMode)
  const [userType, setUserType] = useState<"customer" | "seller" | "delivery" | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    businessName: "",
    businessAddress: "",
    businessCategory: "",
    businessCity: "",
    businessArea: "",
    businessLocality: "",
    promoted: false,
    vehicleNumber: "",
    licenseNumber: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
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
      businessAddress: "",
      businessCategory: "",
      businessCity: "",
      businessArea: "",
      businessLocality: "",
      promoted: false,
      vehicleNumber: "",
      licenseNumber: "",
    })
    setUserType(null)
    setShowPassword(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleUserTypeSelect = (type: "customer" | "seller" | "delivery") => {
    setUserType(type)
  }

  const handleBack = () => {
    setUserType(null)
    setErrorMsg("") // Clear error when going back
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted, mode:", mode) // Debug log
    setIsLoading(true)
    setErrorMsg("")

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
    if (mode === "register" && userType === "seller") {
      if (!formData.businessCategory || !formData.businessCity || !formData.businessAddress) {
        setErrorMsg("Please fill all required business fields.")
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
        console.log("Login response:", data) // Debug log
        if (!res.ok) {
          setErrorMsg(data.error || "Login failed")
          setIsLoading(false)
          return
        }
        // Store user info in cookie for session management
        setCookie("userInfo", JSON.stringify(data.user))
        console.log("User info stored:", data.user) // Debug log
        // Redirect based on userType
        if (data.user.userType === "customer") {
          router.push("/customer/home")
        } else if (data.user.userType === "seller") {
          router.push("/seller/dashboard")
        } else if (data.user.userType === "delivery") {
          router.push("/delivery/dashboard")
        }
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
            ...(userType === "seller"
              ? {
                  category: formData.businessCategory,
                  city: formData.businessCity,
                  area: formData.businessArea,
                  locality: formData.businessLocality,
                  address: formData.businessAddress,
                  promoted: formData.promoted,
                }
              : {}),
          }),
        })
        const data = await res.json()
        if (!res.ok) {
          setErrorMsg(data.error || "Registration failed")
          setIsLoading(false)
          return
        }
        // Redirect based on userType
        if (data.user.userType === "customer") {
          router.push("/customer/home")
        } else if (data.user.userType === "seller") {
          router.push("/seller/dashboard")
        } else if (data.user.userType === "delivery") {
          router.push("/delivery/dashboard")
        }
      }
      handleClose()
    } catch (error: any) {
      console.error("Auth error:", error)
      setErrorMsg(error.message || "An unexpected error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  const userTypes = [
    {
      id: "customer",
      title: "Customer",
      description: "Shop from local businesses",
      icon: User,
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    },
    {
      id: "seller",
      title: "Seller",
      description: "Sell your products online",
      icon: Store,
      color: "bg-green-50 border-green-200 hover:bg-green-100",
    },
    {
      id: "delivery",
      title: "Delivery Agent",
      description: "Deliver orders and earn",
      icon: Truck,
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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
                    onClick={() => handleUserTypeSelect(type.id as "customer" | "seller" | "delivery")}
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
              setErrorMsg("") // Clear error when switching modes
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
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
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
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Additional fields based on user type */}
                  {userType === "seller" && (
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
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Business Category</label>
                        <Input
                          name="businessCategory"
                          type="text"
                          placeholder="e.g., Electronics, Grocery, Fashion"
                          value={formData.businessCategory}
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
                        <label className="text-sm font-medium text-gray-700">Area (Optional)</label>
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
                        <label className="text-sm font-medium text-gray-700">Locality (Optional)</label>
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
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <input
                          type="checkbox"
                          id="promoted"
                          name="promoted"
                          checked={formData.promoted}
                          onChange={(e) => setFormData({ ...formData, promoted: e.target.checked })}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label htmlFor="promoted" className="text-sm font-medium text-gray-700">
                          Promote my business (featured listing)
                        </label>
                      </div>
                    </>
                  )}

                  {userType === "delivery" && (
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
                        <label className="text-sm font-medium text-gray-700">Driving License Number</label>
                        <Input
                          name="licenseNumber"
                          type="text"
                          placeholder="Enter your driving license number"
                          value={formData.licenseNumber}
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
