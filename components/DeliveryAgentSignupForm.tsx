import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputOTP } from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";

export default function DeliveryAgentSignupForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleNumber: "",
    vehicleType: "",
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
      console.log("[DEBUG] Delivery Agent form data before validation:", form);
      console.log("[DEBUG] Name field value:", form.name);
      console.log("[DEBUG] Name field trimmed:", form.name.trim());
      
      if (!form.name.trim()) return setError("Your Name is required");
      if (!form.email.trim()) return setError("Email is required");
      if (!form.phone.trim()) return setError("Phone Number is required");
      if (!form.vehicleNumber.trim()) return setError("Vehicle Number is required");
      if (!form.vehicleType.trim()) return setError("Vehicle Type is required");
      setLoading(true);
      try {
        const payload = {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          vehicleNumber: form.vehicleNumber.trim(),
          vehicleType: form.vehicleType.trim(),
          userType: "DELIVERY_AGENT",
          step: "request_otp",
        };
        console.log("[DEBUG] Delivery Agent registration payload:", payload);
        console.log("[DEBUG] Payload name field:", payload.name);
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
        setOtpStep("otp-requested");
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
          setOtpValue("");
          setOtpStep(null);
          setLoading(false);
          return;
        }
        setSuccessMsg(`Successfully registered as ${data.user.userType}! Redirecting to dashboard...`);
        if (onSuccess) onSuccess();
        setOtpValue("");
        setOtpStep(null);
        
        console.log("[DEBUG] Delivery Agent registration successful, user data:", data.user);
        
        // Dispatch userLogin event to update header
        window.dispatchEvent(new CustomEvent('userLogin', { detail: data.user }));
        
        console.log("[DEBUG] Waiting 1 second before redirect...");
        
        // Add a small delay to ensure session is established and show success message
        setTimeout(() => {
          console.log("[DEBUG] Redirecting to delivery dashboard...");
          router.refresh();
          router.push("/delivery/dashboard");
        }, 1000);
      } catch (err: any) {
        setError(err.message || "OTP verification failed");
        setOtpValue("");
        setOtpStep(null);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-center">Delivery Agent Signup</h1>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      {successMsg && <div className="text-green-600 text-sm mb-2">{successMsg}</div>}
      <div>
        <Label htmlFor="name">Your Name <span className="text-red-500">*</span></Label>
        <Input id="name" value={form.name} onChange={e => handleChange("name", e.target.value)} required placeholder="Enter your full name" />
      </div>
      <div>
        <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
        <Input id="email" value={form.email} onChange={e => handleChange("email", e.target.value)} type="email" required placeholder="Enter your email" />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
        <Input id="phone" value={form.phone} onChange={e => handleChange("phone", e.target.value.replace(/[^0-9]/g, "").slice(0, 10))} required maxLength={10} placeholder="10-digit phone number" />
      </div>
      <div>
        <Label htmlFor="vehicleNumber">Vehicle Number <span className="text-red-500">*</span></Label>
        <Input id="vehicleNumber" value={form.vehicleNumber} onChange={e => handleChange("vehicleNumber", e.target.value)} required placeholder="Enter vehicle registration number" />
      </div>
      <div>
        <Label htmlFor="vehicleType">Vehicle Type <span className="text-red-500">*</span></Label>
        <select id="vehicleType" value={form.vehicleType} onChange={e => handleChange("vehicleType", e.target.value)} required className="w-full border rounded px-2 py-2">
          <option value="">Select Vehicle Type</option>
          <option value="Bike">Bike</option>
          <option value="Scooter">Scooter</option>
          <option value="Car">Car</option>
          <option value="Van">Van</option>
          <option value="Truck">Truck</option>
        </select>
      </div>
      {/* OTP Step */}
      {otpStep === "otp-requested" && (
        <div>
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
        </div>
      )}
      <Button type="submit" className="w-full" disabled={loading}>{loading ? (otpStep ? "Verifying..." : "Sending OTP...") : (otpStep ? "Verify OTP & Create Account" : "Create Account")}</Button>
    </form>
  );
} 