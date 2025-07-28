"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Package, Key, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DeliveryOTPVerificationProps {
  orderId: string
  deliveryAgentId: number
  onSuccess: () => void
  trigger: React.ReactNode
}

export default function DeliveryOTPVerification({ 
  orderId, 
  deliveryAgentId, 
  onSuccess, 
  trigger 
}: DeliveryOTPVerificationProps) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [otp, setOtp] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [generatedOtp, setGeneratedOtp] = useState("")

  const generateOTP = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/order/generate-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, deliveryAgentId })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setGeneratedOtp(data.otp)
        toast({
          title: "Success",
          description: "OTP generated successfully! Share this with the seller.",
        })
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to generate OTP",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error generating OTP:", error)
      toast({
        title: "Error",
        description: "Failed to generate OTP",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const verifyOTP = async () => {
    if (!otp.trim()) {
      toast({
        title: "Error",
        description: "Please enter the OTP",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)
    try {
      const response = await fetch("/api/order/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, deliveryAgentId, otp: otp.trim() })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        toast({
          title: "Success",
          description: "OTP verified successfully! Parcel picked up.",
        })
        setIsOpen(false)
        setOtp("")
        setGeneratedOtp("")
        onSuccess()
      } else {
        toast({
          title: "Error",
          description: data.error || "Invalid OTP",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      toast({
        title: "Error",
        description: "Failed to verify OTP",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setOtp("")
      setGeneratedOtp("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-orange-600" />
            Parcel Pickup Verification
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* OTP Generation Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Generate OTP for Seller</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={generateOTP}
                disabled={isGenerating}
                className="flex items-center gap-2"
              >
                {isGenerating ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Key className="h-4 w-4" />
                )}
                {isGenerating ? "Generating..." : "Generate OTP"}
              </Button>
            </div>

            {generatedOtp && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">OTP Generated</span>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 tracking-wider mb-2">
                    {generatedOtp}
                  </div>
                  <p className="text-xs text-green-700">
                    Share this OTP with the seller to verify parcel pickup
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* OTP Verification Section */}
          <div className="space-y-4">
            <Label htmlFor="otp" className="text-sm font-medium">
              Enter OTP from Seller
            </Label>
            <div className="flex gap-2">
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                maxLength={6}
                className="text-center text-lg font-mono tracking-wider"
              />
              <Button
                onClick={verifyOTP}
                disabled={isVerifying || !otp.trim()}
                className="flex items-center gap-2"
              >
                {isVerifying ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                {isVerifying ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-xs text-gray-600 space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <p>Click "Generate OTP" to create a verification code</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <p>Share the OTP with the seller when you arrive</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <p>Enter the OTP provided by the seller to confirm pickup</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 