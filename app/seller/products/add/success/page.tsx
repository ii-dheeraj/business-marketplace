import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductAddSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Product added successfully!</h1>
      <p className="text-gray-600 mb-6">Your product has been added to your store.</p>
      <div className="flex gap-4">
        <Link href="/seller/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
        <Link href="/seller/products/add">
          <Button variant="outline">Add Another Product</Button>
        </Link>
      </div>
    </div>
  );
} 