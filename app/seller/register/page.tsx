"use client"

import type React from "react"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES, getSubcategoriesByCategory } from "@/utils/category-data";
import { indianStates, indianStateCityMap } from "@/utils/indian-location-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SellerSignupForm from "@/components/SellerSignupForm";

export default function SellerRegister() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-2">
      <SellerSignupForm />
    </div>
  );
} 