"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Package, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getCookie } from "@/lib/utils"

export default function SellerOrderHistory() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userInfoCookie = getCookie("userInfo")
    if (!userInfoCookie) {
      router.push("/auth/login")
      return
    }
    const user = JSON.parse(userInfoCookie)
    const fetchOrders = async () => {
      const res = await fetch("/api/order/place")
      const data = await res.json()
      // Filter orders where any item has this seller's ID
      const sellerOrders = (data.orders || []).filter((order: any) =>
        order.items.some((item: any) => item.product && item.product.sellerId === user.id)
      )
      setOrders(sellerOrders)
      setLoading(false)
    }
    fetchOrders()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16">
          <Link href="/seller/dashboard" className="text-blue-600 flex items-center mr-4">
            <ArrowLeft className="h-5 w-5 mr-1" /> Dashboard
          </Link>
          <h1 className="text-xl font-bold">Order History</h1>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No orders found.</p>
            <p className="text-sm">You haven't received any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Order #{order.id}
                    <Badge>{order.orderStatus}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>Total: <span className="font-semibold text-green-700">₹{order.totalAmount}</span></span>
                    <span>Placed: {new Date(order.createdAt).toLocaleString()}</span>
                    <span>Payment: {order.paymentMethod}</span>
                  </div>
                  <div className="mt-2">
                    <span className="font-medium">Items for your products:</span>
                    <ul className="list-disc ml-6 mt-1">
                      {order.items
                        .filter((item: any) => item.product && item.product.sellerId === JSON.parse(getCookie("userInfo")!).id)
                        .map((item: any) => (
                          <li key={item.id}>
                            {item.name} x {item.quantity} (₹{item.price * item.quantity})
                          </li>
                        ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 