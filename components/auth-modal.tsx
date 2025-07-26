"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { User, Store, Truck, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { setCookie, getUserInfo } from "@/lib/utils"
import { CATEGORIES, getSubcategoriesByCategory } from "@/utils/category-data";
import { indianStates, indianStateCityMap } from "@/utils/indian-location-data";
import SellerSignupForm from "@/components/SellerSignupForm";
import { InputOTP } from "@/components/ui/input-otp";
import DeliveryAgentSignupForm from "@/components/DeliveryAgentSignupForm";

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
    subcategory: "",
    businessState: "",
    businessCity: "",
    businessAddress: "",
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
  const [otpStep, setOtpStep] = useState<null | 'otp-requested'>(null);
  const [otpValue, setOtpValue] = useState("");
  const [otpPhone, setOtpPhone] = useState("");

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
      subcategory: "",
      businessState: "",
      businessCity: "",
      businessAddress: "",
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
    setOtpStep(null)
    setOtpValue("")
    setOtpPhone("")
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
  e.preventDefault();
  console.log("[DEBUG] Form submitted, mode:", mode, "userType:", userType);
  console.log("[DEBUG] Form data:", formData);
  setIsLoading(true);
  setErrorMsg("");
  setSuccessMsg("");

    if (mode === "login") {
      if (!userType) {
        setErrorMsg("Please select your role (Customer, Seller, or Delivery Agent)");
        setIsLoading(false);
        return;
      }
      if (!otpStep) {
        // Step 1: Request OTP
        if (!formData.phone) {
          setErrorMsg("Please enter your phone number.");
          setIsLoading(false);
          return;
        }
        try {
          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phone: formData.phone,
              userType,
              step: "request_otp",
            }),
          });
          const data = await res.json();
          if (!res.ok) {
            if (data.error && data.error.toLowerCase().includes("user not found")) {
              setErrorMsg("Mobile number not registered.");
    } else {
              setErrorMsg(data.error || "Failed to send OTP");
            }
            setIsLoading(false);
            return;
          }
          setOtpStep("otp-requested");
          setOtpPhone(data.phone || formData.phone);
          setSuccessMsg("OTP sent! Please check your phone (or console in dev mode).");
        } catch (error: any) {
          setErrorMsg(error.message || "Failed to send OTP");
        } finally {
          setIsLoading(false);
        }
        return;
      } else {
        // Step 2: Verify OTP
        if (!otpValue || !otpPhone) {
          setErrorMsg("Please enter the OTP sent to your phone.");
          setIsLoading(false);
          return;
        }
        try {
          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phone: otpPhone,
              otp: otpValue,
              userType,
              step: "verify_otp",
            }),
          });
          const data = await res.json();
          if (!res.ok) {
            setErrorMsg(data.error || "OTP verification failed");
            setIsLoading(false);
            setOtpValue("");
            setOtpStep(null);
            router.refresh();
            return;
          }
          setSuccessMsg(`Successfully logged in as ${data.user.userType}!`);
          setCookie("userInfo", JSON.stringify(data.user));
          window.dispatchEvent(new CustomEvent('userLogin', { detail: data.user }));
          setOtpValue("");
          setOtpStep(null);
          router.refresh();
          if (data.user.userType === "CUSTOMER") {
            router.push("/customer/home");
          } else if (data.user.userType === "SELLER") {
            router.push("/seller/dashboard");
          } else if (data.user.userType === "DELIVERY_AGENT") {
            router.push("/delivery/dashboard");
          }
          handleClose();
        } catch (error: any) {
          setErrorMsg(error.message || "OTP verification failed");
          setOtpValue("");
          setOtpStep(null);
          router.refresh();
        } finally {
          setIsLoading(false);
        }
        return;
      }
      } else {
        // Call register API
        if (!otpStep) {
          // Step 1: Request OTP
          if (!formData.name || !formData.email || !formData.phone || !userType) {
            setErrorMsg("Please fill all required fields.");
            setIsLoading(false);
            return;
          }
          try {
            const res = await fetch("/api/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...formData,
                userType,
                step: "request_otp",
              }),
            });
            const data = await res.json();
            if (!res.ok) {
              setErrorMsg(data.error || "Failed to send OTP");
              setIsLoading(false);
              return;
            }
            setOtpStep("otp-requested");
            setOtpPhone(formData.phone);
            setSuccessMsg("OTP sent! Please check your phone (or console in dev mode).");
          } catch (error: any) {
            setErrorMsg(error.message || "Failed to send OTP");
          } finally {
            setIsLoading(false);
          }
          return;
        } else {
          // Step 2: Verify OTP and create account
          if (!otpValue || !otpPhone) {
            setErrorMsg("Please enter the OTP sent to your phone.");
            setIsLoading(false);
            return;
          }
          try {
            const res = await fetch("/api/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                phone: otpPhone,
                otp: otpValue,
                step: "verify_otp",
              }),
            });
            const data = await res.json();
            if (!res.ok) {
              setErrorMsg(data.error || "OTP verification failed");
              setIsLoading(false);
              setOtpValue("");
              setOtpStep(null);
              router.refresh();
              return;
            }
            setSuccessMsg(`Successfully registered as ${data.user.userType}!`);
            setCookie("userInfo", JSON.stringify(data.user));
            window.dispatchEvent(new CustomEvent('userLogin', { detail: data.user }));
            setOtpValue("");
            setOtpStep(null);
            
            // Close modal first
            handleClose();
            
            // Then redirect after a small delay
            setTimeout(() => {
              router.refresh();
              if (data.user.userType === "CUSTOMER") {
                router.push("/customer/home");
              } else if (data.user.userType === "SELLER") {
                router.push("/seller/dashboard");
              } else if (data.user.userType === "DELIVERY_AGENT") {
                router.push("/delivery/dashboard");
              }
            }, 500);
          } catch (error: any) {
            setErrorMsg(error.message || "OTP verification failed");
            setOtpValue("");
            setOtpStep(null);
            router.refresh();
          } finally {
            setIsLoading(false);
          }
          return;
        }
  }
};

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
          <DialogDescription className="text-sm text-gray-600">
            {userType ? (
              mode === "login" ? (
                "Enter your phone number to receive an OTP for login."
              ) : (
                "Enter your phone number to receive an OTP for registration."
              )
            ) : (
              "Select how you want to use LocalMarket."
            )}
          </DialogDescription>
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
                <form onSubmit={handleSubmit}>
                  {!otpStep ? (
                    <>
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mb-2"
                        required
                        maxLength={15}
                      />
                      <Button type="submit" disabled={isLoading} className="w-full mt-2">
                        {isLoading ? "Sending OTP..." : "Send OTP"}
                      </Button>
                      <div className="text-xs text-gray-500 mt-2">Or <span className="underline cursor-pointer" onClick={() => setOtpStep(null)}>login with password</span></div>
                    </>
                  ) : (
                    <>
                      <label htmlFor="otp-input" className="block mb-2 text-sm font-medium text-gray-700">
                        Enter the 6-digit OTP sent to your phone
                      </label>
                      <InputOTP
                        id="otp-input"
                        value={otpValue}
                        onChange={setOtpValue}
                        maxLength={6}
                        containerClassName="mb-2"
                        render={({ slots }) => (
                          <div className="flex gap-2">
                            {slots.map((slot, idx) => (
                              <div
                                key={idx}
                                className="relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md"
                              >
                                {slot.char}
                                {slot.hasFakeCaret && (
                                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                    <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
                                  </div>
                                )}
                    </div>
                            ))}
                  </div>
                        )}
                      />
                      <Button type="submit" disabled={isLoading} className="w-full mt-2">
                        {isLoading ? "Verifying..." : "Verify OTP & Login"}
                  </Button>
                      <div className="text-xs text-gray-500 mt-2">
                        Didn't get OTP? <span className="underline cursor-pointer" onClick={() => { setOtpStep(null); setOtpValue(""); }}>Resend</span>
                      </div>
                    </>
                  )}
                  {errorMsg && <div className="text-red-600 text-sm mt-2">{errorMsg}</div>}
                  {successMsg && <div className="text-green-600 text-sm mt-2">{successMsg}</div>}
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-6">
                {userType === "SELLER" && mode === "register" ? (
                  <SellerSignupForm onSuccess={handleClose} />
                ) : userType === "DELIVERY_AGENT" && mode === "register" ? (
                  <DeliveryAgentSignupForm onSuccess={handleClose} />
                ) : (
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
                        onChange={e => handleInputChange({ target: { name: "phone", value: e.target.value.replace(/[^0-9]/g, "").slice(0, 10) } } as any)}
                        className="h-12 text-base"
                        required
                        maxLength={10}
                      />
                    </div>
                    {/* OTP Step */}
                    {otpStep === "otp-requested" ? (
                      <>
                        <label htmlFor="signup-otp-input" className="block mb-2 text-sm font-medium text-gray-700">
                          Enter the 6-digit OTP sent to your phone
                        </label>
                        <InputOTP
                          id="signup-otp-input"
                          value={otpValue}
                          onChange={setOtpValue}
                          maxLength={6}
                          containerClassName="mb-2"
                          render={({ slots }) => (
                            <div className="flex gap-2">
                              {slots.map((slot, idx) => (
                                <div
                                  key={idx}
                                  className="relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md"
                                >
                                  {slot.char || <span className="text-gray-400">*</span>}
                                  {slot.hasFakeCaret && (
                                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                      <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        />
                        <Button type="submit" disabled={isLoading} className="w-full mt-2">
                          {isLoading ? "Verifying..." : "Verify OTP & Create Account"}
                        </Button>
                      </>
                    ) : (
                      <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
                        {isLoading ? "Sending OTP..." : "Create Account"}
                      </Button>
                    )}
                    {errorMsg && <div className="text-red-600 text-sm mt-2">{errorMsg}</div>}
                    {successMsg && <div className="text-green-600 text-sm mt-2">{successMsg}</div>}
                  </form>
                )}
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
