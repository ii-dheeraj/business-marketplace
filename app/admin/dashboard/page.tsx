"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  ShoppingCart,
  DollarSign,
  Shield,
  LogOut,
  Eye,
  BarChart3,
  FileText,
  Store,
  Truck,
  UserCheck,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getCookie, removeCookie } from "@/lib/utils"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [adminInfo, setAdminInfo] = useState<any>(null)
  const [allUsers, setAllUsers] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const adminInfoCookie = getCookie("adminInfo")
    if (adminInfoCookie) {
      setAdminInfo(JSON.parse(adminInfoCookie))
    } else {
      router.push("/admin/login")
    }
    // Load all users for dashboard stats (keep as is for now)
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
    setAllUsers(registeredUsers)
  }, [router])

  const handleLogout = () => {
    removeCookie("adminInfo")
    router.push("/admin/login")
  }

  const getDashboardStats = () => {
    const customers = allUsers.filter((u) => u.userType === "customer")
    const sellers = allUsers.filter((u) => u.userType === "seller")
    const delivery = allUsers.filter((u) => u.userType === "delivery")
    const pendingApprovals = allUsers.filter((u) => u.status === "pending")
    const activeUsers = allUsers.filter((u) => u.status === "active")

    const totalRevenue = sellers.reduce((sum, seller) => sum + (seller.totalRevenue || 0), 0)
    const totalOrders = customers.reduce((sum, customer) => sum + (customer.totalOrders || 0), 0)

    return {
      totalUsers: allUsers.length,
      customers: customers.length,
      sellers: sellers.length,
      delivery: delivery.length,
      pendingApprovals: pendingApprovals.length,
      activeUsers: activeUsers.length,
      totalRevenue,
      totalOrders,
    }
  }

  const getRecentUsers = () => {
    return allUsers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5)
  }

  const stats = getDashboardStats()
  const recentUsers = getRecentUsers()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "suspended":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getUserIcon = (userType: string) => {
    switch (userType) {
      case "seller":
        return <Store className="h-4 w-4 text-blue-600" />
      case "delivery":
        return <Truck className="h-4 w-4 text-purple-600" />
      default:
        return <Users className="h-4 w-4 text-green-600" />
    }
  }

  if (!adminInfo) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">LocalMarket Admin</h1>
                <p className="text-xs text-gray-500">Administration Panel</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium">{adminInfo.name}</p>
                <p className="text-xs text-gray-500">{adminInfo.role}</p>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Super Admin
              </Badge>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
          <p className="text-gray-600">Monitor and manage your marketplace platform</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">{stats.activeUsers} active users</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalOrders}</div>
                  <p className="text-xs text-muted-foreground">Platform orders</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{(stats.totalRevenue / 100000).toFixed(1)}L</div>
                  <p className="text-xs text-muted-foreground">Platform revenue</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
                  <p className="text-xs text-muted-foreground">Require attention</p>
                </CardContent>
              </Card>
            </div>

            {/* User Type Breakdown */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    Customers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{stats.customers}</div>
                  <p className="text-sm text-gray-600">Registered customers</p>
                  <Link href="/admin/users?tab=customer">
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      View All Customers
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Store className="h-5 w-5 text-blue-600" />
                    Sellers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{stats.sellers}</div>
                  <p className="text-sm text-gray-600">Active businesses</p>
                  <Link href="/admin/users?tab=seller">
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      View All Sellers
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Truck className="h-5 w-5 text-purple-600" />
                    Delivery Partners
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">{stats.delivery}</div>
                  <p className="text-sm text-gray-600">Active partners</p>
                  <Link href="/admin/users?tab=delivery">
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      View All Partners
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Recent User Registrations */}
            <Card>
              <CardHeader>
                <CardTitle>Recent User Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          {getUserIcon(user.userType)}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">
                            {user.userType} • {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`${getStatusColor(user.status)} text-white`}>
                          {user.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link href="/admin/users">
                    <Button variant="outline" className="bg-transparent">
                      View All Users
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">User Management</h3>
              <Link href="/admin/users">
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Manage All Users
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Registered Users</span>
                      <span className="font-bold">{stats.totalUsers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Users</span>
                      <span className="font-bold text-green-600">{stats.activeUsers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending Approvals</span>
                      <span className="font-bold text-yellow-600">{stats.pendingApprovals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>User Growth Rate</span>
                      <span className="font-bold text-blue-600">+12.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link href="/admin/users?status=pending">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <UserCheck className="h-4 w-4 mr-2" />
                        Review Pending Approvals ({stats.pendingApprovals})
                      </Button>
                    </Link>
                    <Link href="/admin/users?tab=seller">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Store className="h-4 w-4 mr-2" />
                        Manage Sellers ({stats.sellers})
                      </Button>
                    </Link>
                    <Link href="/admin/users?tab=delivery">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Truck className="h-4 w-4 mr-2" />
                        Manage Delivery Partners ({stats.delivery})
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h3 className="text-2xl font-bold">Platform Analytics</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>User Growth Rate</span>
                      <span className="font-bold text-green-600">+12.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue Growth Rate</span>
                      <span className="font-bold text-green-600">+15.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Order Growth Rate</span>
                      <span className="font-bold text-green-600">+18.3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>System Uptime</span>
                      <span className="font-bold text-green-600">99.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Response Time</span>
                      <span className="font-bold text-blue-600">1.2s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>User Satisfaction</span>
                      <span className="font-bold text-green-600">4.8/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Reports & Data Export</h3>
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Available Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      User Registration Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Revenue Analytics Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Users className="h-4 w-4 mr-2" />
                      User Activity Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Export</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link href="/admin/users">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Export All Users Data
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Export Transaction Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Export System Logs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h3 className="text-2xl font-bold">Admin Settings</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      User Registration Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Payment Gateway Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Notification Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Admin Access Control
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Security Audit Logs
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Backup & Recovery
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
