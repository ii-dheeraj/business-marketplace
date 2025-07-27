"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface OrderTrackingProps {
  orderId: number
  orderNumber: string
  onSuccess: () => void
  onCancel: () => void
}

export default function OrderTracking({ 
  orderId, 
  orderNumber, 
  onSuccess, 
  onCancel 
}: OrderTrackingProps) {
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const { toast } = useToast()

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit OTP")
      return
    }

    setIsVerifying(true)
    setVerificationStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/delivery/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "validate_otp",
          orderId,
          otp,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setVerificationStatus("success")
        toast({
          title: "OTP Verified Successfully!",
          description: "Order has been verified and is now in transit.",
        })
        
        // Call success callback after a short delay
        setTimeout(() => {
          onSuccess()
        }, 1500)
      } else {
        setVerificationStatus("error")
        setErrorMessage(data.error || "OTP verification failed")
        toast({
          title: "OTP Verification Failed",
          description: data.error || "Please check the OTP and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setVerificationStatus("error")
      setErrorMessage("Network error. Please try again.")
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
            <CardHeader>
        <CardTitle className="text-center">Verify Order OTP</CardTitle>
            </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center text-sm text-gray-600 mb-4">
          Enter the 6-digit OTP for order #{orderNumber}
              </div>

        <div className="space-y-2">
          <Label htmlFor="otp">OTP Code</Label>
          <Input
            id="otp"
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            maxLength={6}
            className="text-center text-lg tracking-widest"
          />
                </div>

        {errorMessage && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {verificationStatus === "success" && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>OTP verified successfully!</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1"
            disabled={isVerifying}
          >
            Cancel
          </Button>
          <Button
            onClick={handleVerifyOTP}
            className="flex-1"
            disabled={isVerifying || !otp || otp.length !== 6}
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </Button>
              </div>
            </CardContent>
          </Card>
  )
} 