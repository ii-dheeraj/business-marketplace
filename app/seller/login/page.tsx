"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Store, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { setCookie } from "@/lib/utils"

export default function SellerLogin() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Initialize demo seller account if it doesn't exist
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
    const demoSellerExists = registeredUsers.some((user: any) => user.email === "seller@example.com")

    if (!demoSellerExists) {
      const demoSeller = {
        id: 998,
        name: "Sharma Electronics",
        email: "seller@example.com",
        phone: "+91 98765 43211",
        userType: "seller",
        businessName: "Sharma Electronics",
        businessCategory: "Electronics",
        businessAddress: "MG Road, Bangalore",
        status: "active",
        createdAt: "2024-01-01T00:00:00.000Z",
      }
      registeredUsers.push(demoSeller)
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Call login API
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Login failed")
        setIsLoading(false)
        return
      }
      setCookie("userInfo", JSON.stringify(data.user))
      if (data.user.userType === "seller") {
        router.push("/seller/dashboard")
      } else {
        setError("Not a seller account")
      }
    } catch (error) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Store className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Seller Login</CardTitle>
          <CardDescription>Access your seller dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seller@example.com"
                value={credentials.email}
                onChange={(e) => setCredentials((prev) => ({ ...prev, email: e.target.value }))}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                  required
                  className="h-11 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full h-11" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              <strong>Demo Credentials:</strong>
              <br />
              Email: seller@example.com
              <br />
              Password: seller123
            </p>
          </div>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-blue-600 hover:underline">
                Register as Seller
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              Or use the{" "}
              <Link href="/auth/login" className="text-blue-600 hover:underline">
                Universal Login
              </Link>
            </p>
            <Link href="/" className="text-sm text-blue-600 hover:underline block">
              ← Back to Main Website
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
