"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Phone,
  Mail,
  Calendar,
  LogOut,
  User,
  Settings,
  BarChart3,
  Store,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getCookie, removeCookie } from "@/lib/utils"

// Mock data for demonstration
const mockProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2999,
    stock: 25,
    category: "Electronics",
    status: "active",
    image: "/placeholder.svg?height=50&width=50",
    sales: 45,
  },
  {
    id: 2,
    name: "Smartphone Case",
    price: 599,
    stock: 100,
    category: "Accessories",
    status: "active",
    image: "/placeholder.svg?height=50&width=50",
    sales: 78,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 1999,
    stock: 0,
    category: "Electronics",
    status: "out_of_stock",
    image: "/placeholder.svg?height=50&width=50",
    sales: 23,
  },
  {
    id: 4,
    name: "Phone Charger",
    price: 899,
    stock: 50,
    category: "Accessories",
    status: "active",
    image: "/placeholder.svg?height=50&width=50",
    sales: 67,
  },
]

export default function SellerDashboard() {
  const [sellerInfo, setSellerInfo] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("products")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [editingProduct, setEditingProduct] = useState<any | null>(null)
  const [editForm, setEditForm] = useState<any>({})

  useEffect(() => {
    const userInfoCookie = getCookie("userInfo")
    if (userInfoCookie) {
      try {
        const user = JSON.parse(userInfoCookie)
        setSellerInfo(user)
        // Fetch products for this seller
        const fetchProducts = async () => {
          const res = await fetch(`/api/product?sellerId=${user.id}`)
          const data = await res.json()
          setProducts(data.products || [])
        }
        fetchProducts()
        // Fetch orders for this seller
        const fetchOrders = async () => {
          const res = await fetch("/api/order/place")
          const data = await res.json()
          const sellerOrders = (data.orders || []).filter((order: any) =>
            order.items.some((item: any) => item.product && item.product.sellerId === user.id)
          )
          setOrders(sellerOrders)
        }
        fetchOrders()
      } catch {
        setSellerInfo(null)
        router.push("/auth/login")
      }
    } else {
      setSellerInfo(null)
      router.push("/auth/login")
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    removeCookie("userInfo")
    router.push("/")
  }

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setEditForm({ ...product })
  }
  const handleEditFormChange = (field: string, value: any) => {
    setEditForm((prev: any) => ({ ...prev, [field]: value }))
  }
  const handleSaveEdit = async () => {
    if (!editingProduct) return
    const res = await fetch("/api/product", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingProduct.id,
        name: editForm.name,
        description: editForm.description,
        price: editForm.price,
        image: editForm.image,
        category: editForm.category,
      }),
    })
    const data = await res.json()
    if (res.ok && data.product) {
      setProducts((prev) => prev.map((p) => (p.id === data.product.id ? data.product : p)))
      setEditingProduct(null)
    } else {
      alert(data.error || "Failed to update product")
    }
  }
  const handleDeleteProduct = async (productId: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return
    const res = await fetch("/api/product", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: productId }),
    })
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== productId))
    } else {
      const data = await res.json()
      alert(data.error || "Failed to delete product")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "out_of_stock":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getOrderStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!sellerInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Authentication required</p>
          <Link href="/auth/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl sm:text-2xl font-bold text-blue-600">
              LocalMarket
            </Link>
            <span className="hidden sm:inline text-gray-500">Seller Dashboard</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/seller/orders">
              <Button variant="outline" size="sm">
                Order History
              </Button>
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <User className="h-4 w-4" />
              <span className="text-sm text-gray-600 hidden sm:inline">
                {sellerInfo.businessName || sellerInfo.name}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {sellerInfo.businessName || sellerInfo.name}!
          </h1>
          <p className="text-gray-600">Manage your store and track your performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-xl sm:text-2xl font-bold">{products.length}</p>
                </div>
                <Package className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-xl sm:text-2xl font-bold">{orders.length}</p>
                </div>
                <ShoppingCart className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-xl sm:text-2xl font-bold">
                    ₹{orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Growth</p>
                  <p className="text-xl sm:text-2xl font-bold">+12%</p>
                </div>
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="products" className="text-xs sm:text-sm">
              <Package className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Products</span>
              <span className="sm:hidden">Items</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="text-xs sm:text-sm">
              <ShoppingCart className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Orders</span>
              <span className="sm:hidden">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs sm:text-sm">
              <BarChart3 className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Analytics</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-xs sm:text-sm">
              <Store className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Profile</span>
              <span className="sm:hidden">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs sm:text-sm">
              <Settings className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Settings</span>
              <span className="sm:hidden">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-bold">Products</h2>
              <Link href="/seller/products/add">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </Link>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden sm:table-cell">Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="hidden md:table-cell">Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={50}
                              height={50}
                              className="rounded-md object-cover"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell className="hidden sm:table-cell">{product.category}</TableCell>
                          <TableCell>₹{product.price}</TableCell>
                          <TableCell className="hidden md:table-cell">-</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor("active")}>active</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteProduct(product.id)}>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold">Orders</h2>

            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">Order {order.id}</h3>
                          <Badge className={getStatusColor(order.status)}>
                            {getOrderStatusIcon(order.status)}
                            <span className="ml-1">{order.status}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">Customer: {order.customer}</p>
                        <p className="text-sm text-gray-600">Items: {order.items}</p>
                        <p className="text-sm text-gray-600 hidden sm:block">Address: {order.address}</p>
                        <p className="text-sm text-gray-600">Date: {order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">₹{order.total}</p>
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold">Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                  <CardDescription>Your sales performance this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Sales</span>
                      <span className="font-bold">
                        ₹{orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Orders</span>
                      <span className="font-bold">{orders.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Order Value</span>
                      <span className="font-bold">
                        ₹
                        {Math.round(
                          orders.reduce((sum, order) => sum + order.total, 0) / orders.length,
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                  <CardDescription>Best performing products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockProducts
                      .sort((a, b) => b.sales - a.sales)
                      .slice(0, 3)
                      .map((product) => (
                        <div key={product.id} className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="rounded-md"
                            />
                            <span className="font-medium">{product.name}</span>
                          </div>
                          <span className="text-sm text-gray-600">{product.sales} sold</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold">Business Profile</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>Manage your business details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>
                        {sellerInfo.businessName?.charAt(0) || sellerInfo.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{sellerInfo.businessName || sellerInfo.name}</h3>
                      <p className="text-gray-600">{sellerInfo.businessCategory || "General"}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{sellerInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{sellerInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{sellerInfo.businessAddress || "Address not provided"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Joined {new Date(sellerInfo.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                  <CardDescription>Set your operating hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <div key={day} className="flex justify-between items-center">
                        <span className="text-sm font-medium">{day}</span>
                        <span className="text-sm text-gray-600">9:00 AM - 6:00 PM</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    Update Hours
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold">Settings</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={sellerInfo.email} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={sellerInfo.phone} />
                  </div>
                  <Button>Update Account</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Configure your notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order Notifications</p>
                      <p className="text-sm text-gray-600">Get notified about new orders</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Updates</p>
                      <p className="text-sm text-gray-600">Receive email updates</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit Product</h3>
            <div className="space-y-3">
              <Input
                value={editForm.name}
                onChange={(e) => handleEditFormChange("name", e.target.value)}
                placeholder="Product Name"
              />
              <Input
                value={editForm.category}
                onChange={(e) => handleEditFormChange("category", e.target.value)}
                placeholder="Category"
              />
              <Input
                value={editForm.price}
                type="number"
                onChange={(e) => handleEditFormChange("price", e.target.value)}
                placeholder="Price"
              />
              <Input
                value={editForm.image}
                onChange={(e) => handleEditFormChange("image", e.target.value)}
                placeholder="Image URL"
              />
              <Input
                value={editForm.description}
                onChange={(e) => handleEditFormChange("description", e.target.value)}
                placeholder="Description"
              />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setEditingProduct(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
