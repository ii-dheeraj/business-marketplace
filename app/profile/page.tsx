"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, Store, Truck, Edit, Save, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getCookie, removeCookie } from "@/lib/utils"

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<any>({})
  const router = useRouter()

  useEffect(() => {
    const userInfoCookie = getCookie("userInfo")
    if (userInfoCookie) {
      try {
        const user = JSON.parse(userInfoCookie)
        setUserInfo(user)
        setEditData(user)
      } catch {
        setUserInfo(null)
        setEditData({})
        router.push("/auth/login")
      }
    } else {
      setUserInfo(null)
      setEditData({})
      router.push("/auth/login")
    }
  }, [router])

  const handleSave = async () => {
    if (userInfo.userType === "seller") {
      const res = await fetch("/api/business", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userInfo.id,
          name: editData.name,
          email: editData.email,
          phone: editData.phone,
          category: editData.category,
          city: editData.city,
          area: editData.area,
          locality: editData.locality,
          address: editData.address,
          promoted: editData.promoted,
        }),
      })
      const data = await res.json()
      if (res.ok && data.business) {
        setUserInfo(data.business)
        setEditData(data.business)
        setIsEditing(false)
      } else {
        alert(data.error || "Failed to update profile")
      }
    } else {
      // For non-sellers, just update local state (or implement similar PATCH for customers/delivery)
      setUserInfo(editData)
      setIsEditing(false)
    }
  }

  const handleLogout = () => {
    removeCookie("userInfo")
    router.push("/")
  }

  const getUserIcon = () => {
    switch (userInfo?.userType) {
      case "seller":
        return <Store className="h-8 w-8 text-blue-600" />
      case "delivery":
        return <Truck className="h-8 w-8 text-purple-600" />
      default:
        return <User className="h-8 w-8 text-green-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  if (!userInfo) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              LocalMarket
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              {getUserIcon()}
            </div>
            <CardTitle className="text-2xl">{userInfo.name}</CardTitle>
            <CardDescription className="flex items-center justify-center gap-2">
              <Badge variant="outline" className="capitalize">
                {userInfo.userType}
              </Badge>
              <Badge variant="outline" className={`${getStatusColor(userInfo.status)} text-white`}>
                {userInfo.status}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? (
                    "Cancel"
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  {isEditing ? (
                    <Input value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                  ) : (
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>{userInfo.name}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{userInfo.email}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Phone</Label>
                  {isEditing ? (
                    <Input
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{userInfo.phone}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Member Since</Label>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <span>{new Date(userInfo.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Information (for sellers) */}
            {userInfo.userType === "seller" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Business Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Business Category</Label>
                    {isEditing ? (
                      <Input
                        value={editData.category || ""}
                        onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <span>{userInfo.category}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>City</Label>
                    {isEditing ? (
                      <Input
                        value={editData.city || ""}
                        onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <span>{userInfo.city}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Area</Label>
                    {isEditing ? (
                      <Input
                        value={editData.area || ""}
                        onChange={(e) => setEditData({ ...editData, area: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <span>{userInfo.area}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Locality</Label>
                    {isEditing ? (
                      <Input
                        value={editData.locality || ""}
                        onChange={(e) => setEditData({ ...editData, locality: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <span>{userInfo.locality}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Business Address</Label>
                    {isEditing ? (
                      <Input
                        value={editData.address || ""}
                        onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <span>{userInfo.address}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Promoted</Label>
                    {isEditing ? (
                      <input
                        type="checkbox"
                        checked={!!editData.promoted}
                        onChange={(e) => setEditData({ ...editData, promoted: e.target.checked })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <span>{userInfo.promoted ? "Yes" : "No"}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Information (for delivery partners) */}
            {userInfo.userType === "delivery" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Delivery Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Vehicle Type</Label>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <Truck className="h-4 w-4 text-gray-500" />
                      <span>{userInfo.vehicleType}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>License Number</Label>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span>{userInfo.licenseNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isEditing && (
              <div className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}

            {/* Account Status */}
            {userInfo.status === "pending" && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Account Pending:</strong> Your account is currently under review. You'll be notified once it's
                  approved.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
