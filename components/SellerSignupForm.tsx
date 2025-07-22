import { useState } from "react";
import { CATEGORIES, getSubcategoriesByCategory } from "@/utils/category-data";
import { indianStates, indianStateCityMap } from "@/utils/indian-location-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SellerSignupForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form, setForm] = useState({
    businessName: "",
    category: "",
    subcategory: "",
    businessState: "",
    businessCity: "",
    businessPincode: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "category") setForm((prev) => ({ ...prev, subcategory: "" }));
    if (field === "businessState") setForm((prev) => ({ ...prev, businessCity: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // Client-side validation
    if (!form.businessName.trim()) return setError("Business Name is required");
    if (!form.category) return setError("Category is required");
    if (!form.subcategory) return setError("Subcategory is required");
    if (!form.businessState) return setError("State is required");
    if (!form.businessCity) return setError("City is required");
    if (!form.businessPincode || form.businessPincode.length !== 6) return setError("Pincode is required and must be 6 digits");
    if (!form.phone.trim()) return setError("Phone Number is required");
    if (!form.password || form.password.length < 6) return setError("Password must be at least 6 characters");
    setLoading(true);
    try {
      const res = await fetch("/api/seller/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        if (onSuccess) onSuccess();
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const subcategories = form.category ? getSubcategoriesByCategory(form.category) : [];
  const cities = form.businessState ? indianStateCityMap[form.businessState] || [] : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-center">Seller Signup</h1>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <div>
        <Label htmlFor="businessName">Business Name <span className="text-red-500">*</span></Label>
        <Input id="businessName" value={form.businessName} onChange={e => handleChange("businessName", e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
        <select id="category" value={form.category} onChange={e => handleChange("category", e.target.value)} required className="w-full border rounded px-2 py-2">
          <option value="">Select Category</option>
          {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
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
        <Input id="phone" value={form.phone} onChange={e => handleChange("phone", e.target.value.replace(/[^0-9]/g, "").slice(0, 10))} required maxLength={10} placeholder="10-digit phone number" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={form.email} onChange={e => handleChange("email", e.target.value)} type="email" />
      </div>
      <div>
        <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
        <Input id="password" value={form.password} onChange={e => handleChange("password", e.target.value)} type="password" required minLength={6} placeholder="At least 6 characters" />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>{loading ? "Registering..." : "Register"}</Button>
    </form>
  );
} 