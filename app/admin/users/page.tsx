"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  Users,
  Store,
  Truck,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Download,
  UserCheck,
  UserX,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [allUsers, setAllUsers] = useState<any[]>([])
  const [filteredUsers, setFilteredUsers] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    // Check admin authentication
    // (Keep as is, now handled by cookie in dashboard)
    // Load all registered users (TODO: Replace with DB query)
    setAllUsers([])
  }, [router])

  useEffect(() => {
    // Filter users based on active tab and search term
    let filtered = allUsers

    // Filter by user type
    if (activeTab !== "all") {
      filtered = filtered.filter((user) => user.userType === activeTab)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user.businessName && user.businessName.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredUsers(filtered)
  }, [allUsers, activeTab, searchTerm])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "suspended":
        return "bg-red-500"
      case "inactive":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getUserIcon = (userType: string) => {
    switch (userType) {
      case "seller":
        return <Store className="h-5 w-5 text-blue-600" />
      case "delivery":
        return <Truck className="h-5 w-5 text-purple-600" />
      default:
        return <Users className="h-5 w-5 text-green-600" />
    }
  }

  const handleApproveUser = (userId: number) => {
    const updatedUsers = allUsers.map((user) => (user.id === userId ? { ...user, status: "active" } : user))
    setAllUsers(updatedUsers)
    // localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers)) // Removed localStorage
  }

  const handleSuspendUser = (userId: number) => {
    const updatedUsers = allUsers.map((user) => (user.id === userId ? { ...user, status: "suspended" } : user))
    setAllUsers(updatedUsers)
    // localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers)) // Removed localStorage
  }

  const exportUserData = () => {
    const dataStr = JSON.stringify(filteredUsers, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `users_${activeTab}_${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const getUserStats = () => {
    const customers = allUsers.filter((u) => u.userType === "customer")
    const sellers = allUsers.filter((u) => u.userType === "seller")
    const delivery = allUsers.filter((u) => u.userType === "delivery")
    const pending = allUsers.filter((u) => u.status === "pending")

    return { customers: customers.length, sellers: sellers.length, delivery: delivery.length, pending: pending.length }
  }

  const stats = getUserStats()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-800 mr-4">
              ← Back to Dashboard
            </Link>
            <Shield className="h-6 w-6 text-blue-600 mr-2" />
            <h1 className="text-xl font-bold">User Management</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={exportUserData}>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">All Platform Users</h2>
          <p className="text-gray-600">Comprehensive view of all registered users</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.customers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Store className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Sellers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.sellers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Truck className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Delivery Partners</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.delivery}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <UserCheck className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users by name, email, or business..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
          <div className="text-sm text-gray-600">
            Showing {filteredUsers.length} of {allUsers.length} users
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              All Users ({allUsers.length})
            </TabsTrigger>
            <TabsTrigger value="customer" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Customers ({stats.customers})
            </TabsTrigger>
            <TabsTrigger value="seller" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              Sellers ({stats.sellers})
            </TabsTrigger>
            <TabsTrigger value="delivery" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Delivery ({stats.delivery})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredUsers.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-gray-500 text-lg">No users found</p>
                  <p className="text-gray-400">Try adjusting your search or filters</p>
                </CardContent>
              </Card>
            ) : (
              filteredUsers.map((user) => (
                <Card key={user.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          {getUserIcon(user.userType)}
                        </div>
                        <div className="space-y-2">
                          <div>
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              {user.name}
                              <Badge variant="outline" className="capitalize text-xs">
                                {user.userType}
                              </Badge>
                            </h3>
                            {user.businessName && <p className="text-sm text-gray-600">{user.businessName}</p>}
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span>{user.phone}</span>
                            </div>
                            {user.businessAddress && (
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span>{user.businessAddress}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>

                          {/* User Type Specific Info */}
                          {user.userType === "customer" && (
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>
                                Orders: <strong>{user.totalOrders || 0}</strong>
                              </span>
                              <span>
                                Spent: <strong>₹{(user.totalSpent || 0).toLocaleString()}</strong>
                              </span>
                              <span>
                                Last Login:{" "}
                                <strong>
                                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}
                                </strong>
                              </span>
                            </div>
                          )}

                          {user.userType === "seller" && (
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>
                                Products: <strong>{user.totalProducts || 0}</strong>
                              </span>
                              <span>
                                Revenue: <strong>₹{(user.totalRevenue || 0).toLocaleString()}</strong>
                              </span>
                              <span>
                                Rating: <strong>{user.rating || "N/A"}/5</strong>
                              </span>
                              <span>
                                Category: <strong>{user.businessCategory}</strong>
                              </span>
                            </div>
                          )}

                          {user.userType === "delivery" && (
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>
                                Deliveries: <strong>{user.totalDeliveries || 0}</strong>
                              </span>
                              <span>
                                Earnings: <strong>₹{(user.earnings || 0).toLocaleString()}</strong>
                              </span>
                              <span>
                                Rating: <strong>{user.rating || "N/A"}/5</strong>
                              </span>
                              <span>
                                Vehicle: <strong>{user.vehicleType}</strong>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="outline" className={`${getStatusColor(user.status)} text-white`}>
                          {user.status}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          {user.status === "pending" && (
                            <Button size="sm" onClick={() => handleApproveUser(user.id)}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                          )}
                          {user.status === "active" && (
                            <Button variant="outline" size="sm" onClick={() => handleSuspendUser(user.id)}>
                              <UserX className="h-4 w-4 mr-2" />
                              Suspend
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
