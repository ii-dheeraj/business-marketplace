import { useState } from "react";
import { CATEGORIES_WITH_SUBCATEGORIES, getSubcategoriesByCategory } from "@/utils/category-data";
import { indianStates, indianStateCityMap } from "@/utils/indian-location-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputOTP } from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { PhoneInput } from "@/components/ui/phone-input";

export default function SellerSignupForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    category: "",
    subcategory: "",
    businessAddress: "",
    businessCity: "",
    businessState: "",
    businessPincode: "",
    businessArea: "",
    businessLocality: "",
    businessDescription: "",
    businessImage: "",
    email: "",
    phone: "",
    countryCode: "+91",
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
    if (field === "category") setForm((prev) => ({ ...prev, subcategory: "" }));
    if (field === "businessState") setForm((prev) => ({ ...prev, businessCity: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    if (!otpStep) {
      // Step 1: Request OTP
      console.log("[DEBUG] Form data before validation:", form);
      console.log("[DEBUG] Name field value:", form.name);
      console.log("[DEBUG] Name field trimmed:", form.name.trim());
      
      if (!form.name.trim()) return setError("Your Name is required");
      if (!form.businessName.trim()) return setError("Business Name is required");
      if (!form.category) return setError("Category is required");
      if (!form.subcategory) return setError("Subcategory is required");
      if (!form.businessState) return setError("State is required");
      if (!form.businessCity) return setError("City is required");
      if (!form.businessPincode || form.businessPincode.length !== 6) return setError("Pincode is required and must be 6 digits");
      if (!form.phone.trim()) return setError("Phone Number is required");
      if (!form.email.trim()) return setError("Email is required");
      setLoading(true);
      try {
        const payload = {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          countryCode: form.countryCode,
          businessName: form.businessName.trim(),
          category: form.category,
          subcategories: JSON.stringify([form.subcategory]),
          businessAddress: form.businessAddress || "",
          businessArea: form.businessArea || "",
          businessLocality: form.businessLocality || "",
          businessDescription: form.businessDescription || "",
          businessImage: form.businessImage || "",
          businessCity: form.businessCity,
          businessState: form.businessState,
          businessPincode: form.businessPincode,
          userType: "SELLER",
          step: "request_otp",
        };
        console.log("[DEBUG] Seller registration payload:", payload);
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
        
        console.log("[DEBUG] Registration successful, user data:", data.user);
        
        // Dispatch userLogin event to update header
        window.dispatchEvent(new CustomEvent('userLogin', { detail: data.user }));
        
        console.log("[DEBUG] Waiting 1 second before redirect...");
        
        // Add a small delay to ensure session is established and show success message
        setTimeout(() => {
          console.log("[DEBUG] Redirecting to seller dashboard...");
          router.refresh();
          router.push("/seller/dashboard");
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

  const subcategories = form.category ? getSubcategoriesByCategory(form.category) : [];
  const cities = form.businessState ? indianStateCityMap[form.businessState] || [] : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-center">Seller Signup</h1>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      {successMsg && <div className="text-green-600 text-sm mb-2">{successMsg}</div>}
      <div>
        <Label htmlFor="name">Your Name <span className="text-red-500">*</span></Label>
        <Input id="name" value={form.name} onChange={e => handleChange("name", e.target.value)} required placeholder="Enter your full name" />
      </div>
      <div>
        <Label htmlFor="businessName">Business Name <span className="text-red-500">*</span></Label>
        <Input id="businessName" value={form.businessName} onChange={e => handleChange("businessName", e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
        <select id="category" value={form.category} onChange={e => handleChange("category", e.target.value)} required className="w-full border rounded px-2 py-2">
          <option value="">Select Category</option>
          {CATEGORIES_WITH_SUBCATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
      </div>
      <div>
        <Label htmlFor="subcategory">Subcategory <span className="text-red-500">*</span></Label>
        <select id="subcategory" value={form.subcategory} onChange={e => handleChange("subcategory", e.target.value)} required className="w-full border rounded px-2 py-2" disabled={!form.category}>
          <option value="">{form.category ? "Select Subcategory" : "Select Category first"}</option>
          {subcategories.map((sub: string) => <option key={sub} value={sub}>{sub}</option>)}
        </select>
      </div>
      <div>
        <Label htmlFor="businessAddress">Business Address</Label>
        <Input id="businessAddress" value={form.businessAddress} onChange={e => handleChange("businessAddress", e.target.value)} placeholder="Shop/Office address" />
      </div>
      <div>
        <Label htmlFor="businessArea">Business Area</Label>
        <Input id="businessArea" value={form.businessArea} onChange={e => handleChange("businessArea", e.target.value)} placeholder="Area (optional)" />
      </div>
      <div>
        <Label htmlFor="businessLocality">Business Locality</Label>
        <Input id="businessLocality" value={form.businessLocality} onChange={e => handleChange("businessLocality", e.target.value)} placeholder="Locality (optional)" />
      </div>
      <div>
        <Label htmlFor="businessDescription">Business Description</Label>
        <Input id="businessDescription" value={form.businessDescription} onChange={e => handleChange("businessDescription", e.target.value)} placeholder="Description (optional)" />
      </div>
      <div>
        <Label htmlFor="businessImage">Business Image URL</Label>
        <Input id="businessImage" value={form.businessImage} onChange={e => handleChange("businessImage", e.target.value)} placeholder="Image URL (optional)" />
      </div>
      <div>
        <Label htmlFor="businessState">State <span className="text-red-500">*</span></Label>
        <select id="businessState" value={form.businessState} onChange={e => handleChange("businessState", e.target.value)} required className="w-full border rounded px-2 py-2">
          <option value="">Select State</option>
          {indianStates.map(state => <option key={state} value={state}>{state}</option>)}
        </select>
      </div>
      <div>
        <Label htmlFor="businessCity">City <span className="text-red-500">*</span></Label>
        <select id="businessCity" value={form.businessCity} onChange={e => handleChange("businessCity", e.target.value)} required className="w-full border rounded px-2 py-2" disabled={!form.businessState}>
          <option value="">{form.businessState ? "Select City" : "Select State first"}</option>
          {cities.map((city: string) => <option key={city} value={city}>{city}</option>)}
        </select>
      </div>
      <div>
        <Label htmlFor="businessPincode">Pincode <span className="text-red-500">*</span></Label>
        <Input id="businessPincode" value={form.businessPincode} onChange={e => handleChange("businessPincode", e.target.value.replace(/[^0-9]/g, "").slice(0, 6))} required maxLength={6} placeholder="6-digit pincode" />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
        <PhoneInput id="phone" value={form.phone} onChange={e => handleChange("phone", e.target.value)} required maxLength={10} placeholder="10-digit phone number" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={form.email} onChange={e => handleChange("email", e.target.value)} type="email" />
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