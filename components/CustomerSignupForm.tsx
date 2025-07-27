import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputOTP } from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { setCookie } from "@/lib/utils";
import { PhoneInput } from "@/components/ui/phone-input";

export default function CustomerSignupForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpStep, setOtpStep] = useState<null | 'otp-requested'>(null);
  const [otpValue, setOtpValue] = useState("");
  const [otpPhone, setOtpPhone] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    
    if (!otpStep) {
      // Step 1: Request OTP
      console.log("[DEBUG] Customer form data before validation:", form);
      
      if (!form.name.trim()) return setError("Your Name is required");
      if (!form.email.trim()) return setError("Email is required");
      if (!form.phone.trim()) return setError("Phone Number is required");
      
      setLoading(true);
      try {
        const payload = {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          userType: "CUSTOMER",
          step: "request_otp",
        };
        console.log("[DEBUG] Customer registration payload:", payload);
        
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to send OTP");
          setLoading(false);
          return;
        }
        
        setOtpStep('otp-requested');
        setOtpPhone(form.phone);
        setSuccessMsg("OTP sent! Please check your phone (or console in dev mode).");
      } catch (err: any) {
        setError(err.message || "Failed to send OTP");
      } finally {
        setLoading(false);
      }
    } else {
      // Step 2: Verify OTP
      if (!otpValue || !otpPhone) {
        setError("Please enter the OTP sent to your phone.");
        setLoading(false);
        return;
      }
      setLoading(true);
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
          setError(data.error || "OTP verification failed");
          setLoading(false);
          return;
        }
        
        setSuccessMsg("Account created successfully! Redirecting to customer dashboard...");
        
        // Set user session cookies
        setCookie("userInfo", JSON.stringify(data.user));
        setCookie("userType", data.user.userType);
        
        // Small delay to ensure cookies are set before dispatching event
        setTimeout(() => {
          // Dispatch userLogin event to update header
          window.dispatchEvent(new CustomEvent('userLogin', { detail: data.user }));
          
          // Refresh the router to ensure header updates
          router.refresh();
        }, 100);
        
        setTimeout(() => {
          if (onSuccess) {
            onSuccess();
          } else {
            router.push("/customer/home");
          }
        }, 2000);
      } catch (err: any) {
        setError(err.message || "OTP verification failed");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="customer-name">Full Name <span className="text-red-500">*</span></Label>
        <Input
          id="customer-name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Enter your full name"
          required
          disabled={otpStep === 'otp-requested'}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="customer-email">Email <span className="text-red-500">*</span></Label>
        <Input
          id="customer-email"
          type="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="Enter your email"
          required
          disabled={otpStep === 'otp-requested'}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="customer-phone">Phone Number <span className="text-red-500">*</span></Label>
        <PhoneInput
          id="customer-phone"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="Enter your phone number"
          maxLength={10}
          required
          disabled={otpStep === 'otp-requested'}
        />
      </div>

      {otpStep === 'otp-requested' ? (
        <div className="space-y-2">
          <Label htmlFor="customer-otp">Enter OTP <span className="text-red-500">*</span></Label>
          <InputOTP
            id="customer-otp"
            value={otpValue}
            onChange={setOtpValue}
            maxLength={6}
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
          <p className="text-xs text-gray-500">
            OTP sent to {otpPhone}
          </p>
        </div>
      ) : null}

      <Button 
        type="submit" 
        className="w-full h-12 text-base font-semibold" 
        disabled={loading}
      >
        {loading 
          ? (otpStep === 'otp-requested' ? "Verifying..." : "Sending OTP...") 
          : (otpStep === 'otp-requested' ? "Verify OTP & Create Account" : "Create Customer Account")
        }
      </Button>

      {otpStep === 'otp-requested' && (
        <Button 
          type="button" 
          variant="outline" 
          className="w-full" 
          onClick={() => {
            setOtpStep(null);
            setOtpValue("");
            setError("");
          }}
        >
          Back to Form
        </Button>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      
      {successMsg && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">{successMsg}</p>
        </div>
      )}
    </form>
  );
} 