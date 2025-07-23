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
      const res = await fetch(`/api/seller/orders?sellerId=${user.id}`)
      const data = await res.json()
      setOrders(data.orders || [])
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
                    Seller Order #{order.id}
                    <Badge>{order.status}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>Subtotal: <span className="font-semibold text-green-700">₹{order.subtotal}</span></span>
                    <span>Placed: {new Date(order.created_at).toLocaleString()}</span>
                  </div>
                  <div className="mt-2">
                    <span className="font-medium">Items for your products:</span>
                    <ul className="list-disc ml-6 mt-1">
                      {(order.items || []).map((item: any, idx: number) => (
                        <li key={idx}>
                          {item.productName} x {item.quantity} (₹{item.totalPrice})
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