"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

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
  Save,
  Navigation,
  Users,
  X,
  Truck,
  CreditCard,
  Receipt,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getCookie, deleteCookie } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast";
import { indianStates, indianStateCityMap } from "@/utils/indian-location-data";




export default function SellerDashboard() {
  const [sellerInfo, setSellerInfo] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("products")
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [isLoadingOrders, setIsLoadingOrders] = useState(false)
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [editingProduct, setEditingProduct] = useState<any | null>(null)
  const [editForm, setEditForm] = useState<any>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const eventSourceRef = useRef<EventSource | null>(null);
  const { toast } = useToast();
  const [profileForm, setProfileForm] = useState<any>(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  
  // Order Details Modal State
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoadingOrderDetails, setIsLoadingOrderDetails] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [isSubmittingOtp, setIsSubmittingOtp] = useState(false);
  const [otpStatus, setOtpStatus] = useState<"idle" | "success" | "error">("idle");
  const [otpMessage, setOtpMessage] = useState("");




  useEffect(() => {
    if (sellerInfo) {
      console.log("[DEBUG] Setting profile form with seller info:", sellerInfo);
      setProfileForm({ ...sellerInfo });
    }
  }, [sellerInfo]);

  const handleProfileInputChange = (field: string, value: any) => {
    setProfileForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    if (!profileForm || !sellerInfo) {
      toast({ title: "Error", description: "Profile data not available", variant: "destructive" });
      return;
    }
    
    setIsSavingProfile(true);
    try {
      console.log("[DEBUG] Saving profile with data:", profileForm);
      const res = await fetch("/api/seller/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profileForm, id: sellerInfo.id }),
      });
      const data = await res.json();
      console.log("[DEBUG] Profile save response:", data);
      
      if (res.ok && data.seller) {
        setSellerInfo(data.seller);
        setProfileForm(data.seller);
        toast({ title: "Profile updated successfully!" });
      } else {
        toast({ title: "Failed to update profile", description: data.error || "Unknown error", variant: "destructive" });
      }
    } catch (error) {
      console.error("[DEBUG] Profile save error:", error);
      toast({ title: "Failed to update profile", description: String(error), variant: "destructive" });
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Order Details Modal Functions
  const handleViewOrderDetails = async (order: any) => {
    setSelectedOrder(order);
    setOrderDetails(null);
    setOtpInput("");
    setOtpStatus("idle");
    setOtpMessage("");
    setIsLoadingOrderDetails(true);
    
    try {
      const res = await fetch(`/api/seller/order-details?orderId=${order.orderId}&sellerId=${sellerInfo.id}`);
      const data = await res.json();
      
      if (res.ok && data.success) {
        setOrderDetails(data.orderDetails);
      } else {
        toast({ title: "Failed to load order details", description: data.error || "Unknown error", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast({ title: "Failed to load order details", description: String(error), variant: "destructive" });
    } finally {
      setIsLoadingOrderDetails(false);
    }
  };

  const handleSubmitOtp = async () => {
    if (!otpInput.trim() || !selectedOrder) return;
    
    setIsSubmittingOtp(true);
    setOtpStatus("idle");
    setOtpMessage("");
    
    try {
      const res = await fetch("/api/order/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: selectedOrder.orderId,
          otp: otpInput.trim()
        }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setOtpStatus("success");
        setOtpMessage("OTP verified successfully! Order status updated.");
        setOtpInput("");
        // Refresh order details
        if (orderDetails) {
          setOrderDetails({
            ...orderDetails,
            order: {
              ...orderDetails.order,
              orderStatus: "PICKED_UP"
            }
          });
        }
        // Refresh orders list
        fetchOrders(currentPage);
        toast({ title: "OTP verified successfully!" });
      } else {
        setOtpStatus("error");
        setOtpMessage(data.error || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpStatus("error");
      setOtpMessage("Failed to verify OTP. Please try again.");
    } finally {
      setIsSubmittingOtp(false);
    }
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
    setOrderDetails(null);
    setOtpInput("");
    setOtpStatus("idle");
    setOtpMessage("");
  };



  // Optimized data fetching with loading states
  const fetchProducts = async (page = 1) => {
    if (!sellerInfo) return
    setIsLoadingProducts(true)
    try {
      const apiUrl = `/api/product?sellerId=${sellerInfo.id}&page=${page}&limit=10`;
      console.log("[SellerDashboard] Fetching products for sellerId:", sellerInfo.id, "URL:", apiUrl);
      const res = await fetch(apiUrl)
      const data = await res.json()
      console.log("[SellerDashboard] Products fetched:", data.products)
      setProducts(data.products || [])
      setTotalPages(data.pagination?.totalPages || 1)
      setCurrentPage(page)
    } catch (error) {
      console.error("[SellerDashboard] Error fetching products:", error)
    } finally {
      setIsLoadingProducts(false)
    }
  }

  const fetchOrders = async (page = 1) => {
    if (!sellerInfo) return
    setIsLoadingOrders(true)
    try {
      const apiUrl = `/api/seller/orders?sellerId=${sellerInfo.id}&page=${page}&limit=10`;
      console.log("[SellerDashboard] Fetching orders for sellerId:", sellerInfo.id, "URL:", apiUrl);
      const res = await fetch(apiUrl)
      const data = await res.json()
      console.log("[SellerDashboard] Orders fetched:", data.orders)
      setOrders(data.orders || [])
    } catch (error) {
      console.error("[SellerDashboard] Error fetching orders:", error)
    } finally {
      setIsLoadingOrders(false)
    }
  }



  // No longer needed since we're using data URLs instead of blob URLs

  useEffect(() => {
    const checkAuth = async () => {
      const userInfoCookie = getCookie("userInfo")
      const userTypeCookie = getCookie("userType")
      
      console.log("[DEBUG] Auth check - userInfo:", userInfoCookie ? "exists" : "missing")
      console.log("[DEBUG] Auth check - userType:", userTypeCookie)
      console.log("[DEBUG] Raw userInfo cookie value:", userInfoCookie)
      console.log("[DEBUG] userInfo cookie length:", userInfoCookie?.length)
      console.log("[DEBUG] userInfo cookie type:", typeof userInfoCookie)
      
      if (userInfoCookie && userTypeCookie && userTypeCookie.toUpperCase() === "SELLER") {
        try {
          console.log("[DEBUG] Attempting to parse userInfo cookie...")
          
          // Try to decode the cookie if it's URL encoded
          let decodedCookie = userInfoCookie
          try {
            decodedCookie = decodeURIComponent(userInfoCookie)
            console.log("[DEBUG] Decoded cookie:", decodedCookie)
          } catch (decodeError) {
            console.log("[DEBUG] Cookie is not URL encoded, using as-is")
          }
          
          const user = JSON.parse(decodedCookie)
          console.log("[DEBUG] Parsed user object:", user)
          
          console.log("[DEBUG] Setting seller info from cookie:", user)
          setSellerInfo(user)
          
          // Fetch complete user data from API to get business image
          try {
            const res = await fetch(`/api/seller/profile?id=${user.id}`);
            if (res.ok) {
              const data = await res.json();
              if (data.seller) {
                console.log("[DEBUG] Fetched complete seller data:", data.seller);
                setSellerInfo(data.seller);
              }
            }
          } catch (error) {
            console.log("[DEBUG] Failed to fetch complete seller data:", error);
            // Continue with cookie data if API fails
          }
          setIsLoading(false)
          return // Success - don't redirect
        } catch (error) {
          console.log("[DEBUG] Failed to parse userInfo cookie:", error)
          console.log("[DEBUG] Cookie value that failed to parse:", userInfoCookie)
          
          // Clear the corrupted cookie
          deleteCookie("userInfo")
          deleteCookie("userType")
          deleteCookie("userId")
          
          console.log("[DEBUG] Cleared corrupted cookies and redirecting to login")
          setSellerInfo(null)
          router.push("/auth/login")
        }
      } else {
        console.log("[DEBUG] Missing auth - userInfo:", !!userInfoCookie, "userType:", userTypeCookie)
        setSellerInfo(null)
        if (userTypeCookie && userTypeCookie !== "SELLER") {
          // User is logged in but not a seller
          router.push("/")
        } else {
          // User is not logged in
          router.push("/auth/login")
        }
      }
      setIsLoading(false)
    }
    
    // Add a small delay to ensure cookies are set after registration
    setTimeout(checkAuth, 500)
  }, [router])

  // Fetch data when sellerInfo is available
  useEffect(() => {
    if (sellerInfo && sellerInfo.id) {
      fetchProducts(1)
      fetchOrders(1)
      // Set up SSE for real-time product and order updates
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      const eventSource = new EventSource(`/api/realtime/notifications?userId=${sellerInfo.id}`);
      eventSourceRef.current = eventSource;
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'notification' && data.title) {
            if (data.title.toLowerCase().includes('product')) {
              fetchProducts(currentPage);
            } else if (data.title.toLowerCase().includes('order')) {
              fetchOrders(currentPage);
            }
          }
        } catch (e) {
          // Ignore parse errors
        }
      };
      eventSource.onerror = (error) => {
        eventSource.close();
      };
      return () => {
        eventSource.close();
      };
    }
  }, [sellerInfo, currentPage]);

  // Handle tab changes with optimized data loading
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === "products" && products.length === 0) {
      fetchProducts(1)
    } else if (tab === "orders" && orders.length === 0) {
      fetchOrders(1)
    }
  }



  const handleEditProduct = (product: any) => {
    console.log("Editing product:", product) // Debug log
    const formData = {
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      stock: product.stock || 0,
      image: product.image || "",
      category: product.category || ""
    }
    console.log("Setting edit form data:", formData) // Debug log
    setEditingProduct(product)
    setEditForm(formData)
  }
  const handleEditFormChange = (field: string, value: any) => {
    setEditForm((prev: any) => ({ ...prev, [field]: value }))
  }
  const handleSaveEdit = async () => {
    if (!editingProduct) return

    const updateData = {
      id: editingProduct.id,
      name: editForm.name,
      description: editForm.description,
      price: editForm.price,
      stock: editForm.stock,
      image: editForm.image,
      category: editForm.category,
    }

    console.log("Saving product with data:", updateData) // Debug log

    try {
      const res = await fetch("/api/product", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })
      const data = await res.json()
      if (res.ok && data.product) {
        console.log("Product updated successfully:", data.product) // Debug log
        setProducts((prev) => prev.map((p) => (p.id === data.product.id ? data.product : p)))
        setEditingProduct(null)
        toast({ title: "Product updated successfully!" })
      } else {
        console.error("Failed to update product:", data) // Debug log
        toast({ title: "Failed to update product", description: data.error || "Unknown error", variant: "destructive" })
      }
    } catch (error) {
      console.error("Error updating product:", error)
      toast({ title: "Failed to update product", description: String(error), variant: "destructive" })
    }
  }
  const handleDeleteProduct = async (productId: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return
    
    try {
      const res = await fetch("/api/product", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: productId }),
      })
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== productId))
        toast({ title: "Product deleted successfully!" })
      } else {
        const data = await res.json()
        toast({ title: "Failed to delete product", description: data.error || "Unknown error", variant: "destructive" })
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({ title: "Failed to delete product", description: String(error), variant: "destructive" })
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
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
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
                      {isLoadingProducts ? (
                        // Loading skeleton
                        Array.from({ length: 5 }).map((_, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="w-[50px] h-[50px] bg-gray-200 rounded-md animate-pulse"></div>
                            </TableCell>
                            <TableCell>
                              <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                            </TableCell>
                            <TableCell>
                              <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
                            </TableCell>
                            <TableCell>
                              <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="h-8 bg-gray-200 rounded animate-pulse w-8 ml-auto"></div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : products.length === 0 && !isLoadingProducts ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                            No products found for this seller. Please check if your products have the correct sellerId in the database.
                          </TableCell>
                        </TableRow>
                      ) : (
                        products.map((product) => (
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
                            <TableCell className="hidden md:table-cell">{product.stock || 0}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(product.stock > 0 ? "active" : "out_of_stock")}>
                                {product.stock > 0 ? "active" : "out of stock"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => {
                                    console.log("Edit clicked for product:", product);
                                    handleEditProduct(product);
                                  }}>
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
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Pagination */}
            {!isLoadingProducts && totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchProducts(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="flex items-center px-3 text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchProducts(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}

            {/* Edit Product Modal */}
            <Dialog open={!!editingProduct} onOpenChange={(open) => !open && setEditingProduct(null)}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Product - {editingProduct?.name}</DialogTitle>
                  <DialogDescription>
                    Update the product details below. Click Save Changes when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-name">Product Name</Label>
                      <Input
                        id="edit-name"
                        value={editForm.name || ""}
                        onChange={(e) => handleEditFormChange("name", e.target.value)}
                        placeholder="Product name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-category">Category</Label>
                      <Input
                        id="edit-category"
                        value={editForm.category || ""}
                        onChange={(e) => handleEditFormChange("category", e.target.value)}
                        placeholder="Category"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-price">Price (₹)</Label>
                      <Input
                        id="edit-price"
                        type="number"
                        value={editForm.price || ""}
                        onChange={(e) => handleEditFormChange("price", e.target.value)}
                        placeholder="Price"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-stock">Stock Quantity</Label>
                      <Input
                        id="edit-stock"
                        type="number"
                        min="0"
                        value={editForm.stock !== undefined ? editForm.stock : ""}
                        onChange={(e) => handleEditFormChange("stock", parseInt(e.target.value) || 0)}
                        placeholder="Stock quantity"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Current stock: {editForm.stock || 0} units
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="edit-description">Description</Label>
                    <Input
                      id="edit-description"
                      value={editForm.description || ""}
                      onChange={(e) => handleEditFormChange("description", e.target.value)}
                      placeholder="Product description"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-image">Image URL</Label>
                    <Input
                      id="edit-image"
                      value={editForm.image || ""}
                      onChange={(e) => handleEditFormChange("image", e.target.value)}
                      placeholder="Image URL"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setEditingProduct(null)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveEdit}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold">Orders</h2>

            <div className="space-y-4">
              {isLoadingOrders ? (
                // Loading skeleton for orders
                Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
                            <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
                          </div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-36"></div>
                        </div>
                        <div className="text-right">
                          <div className="h-6 bg-gray-200 rounded animate-pulse w-20 mb-2"></div>
                          <div className="h-8 bg-gray-200 rounded animate-pulse w-24"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : orders.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-gray-500">
                    No orders found yet. Orders will appear here when customers place them.
                  </CardContent>
                </Card>
              ) : (
                orders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">Order #{order.orderId}</h3>
                            <Badge className={getStatusColor(order.status)}>
                              {getOrderStatusIcon(order.status)}
                              <span className="ml-1">{order.status}</span>
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">Items: {Array.isArray(order.items) ? order.items.length : 0} products</p>
                          {Array.isArray(order.items) && order.items.length > 0 && (
                            <ul className="text-xs text-gray-500 list-disc ml-4">
                              {order.items.map((item: any, idx: number) => (
                                <li key={idx}>{item.productName} x {item.quantity}</li>
                              ))}
                            </ul>
                          )}
                          <p className="text-sm text-gray-600">
                            Date: {order.created_at ? new Date(order.created_at).toLocaleDateString() : ''}
                          </p>
                          <div className="text-xs text-gray-500">
                            <p>Subtotal: ₹{order.subtotal?.toLocaleString()}</p>
                            <p>Commission: ₹{order.commission?.toLocaleString()}</p>
                            <p className="font-medium">Net Amount: ₹{order.netAmount?.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">Order ID: {order.id}</p>
                          <p className="text-sm text-gray-600 mb-2">Seller Order</p>
                          <div className="flex flex-col gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="bg-transparent"
                              onClick={() => handleViewOrderDetails(order)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
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
                        ₹{orders.reduce((sum, order) => sum + (order.sellerSubtotal || 0), 0).toLocaleString()}
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
                        {orders.length > 0
                          ? Math.round(orders.reduce((sum, order) => sum + (order.sellerSubtotal || 0), 0) / orders.length).toLocaleString()
                          : '0'
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Net Earnings</span>
                      <span className="font-bold text-green-600">
                        ₹{orders.reduce((sum, order) => sum + (order.netAmount || 0), 0).toLocaleString()}
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
                    {products
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
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Edit Profile</h2>
            {profileForm && (
              <Card>
                <CardContent className="py-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="profile-businessState">State <span className="text-red-500">*</span></Label>
                      <select id="profile-businessState" value={profileForm.businessState || ""} onChange={e => {
                        handleProfileInputChange("businessState", e.target.value);
                        handleProfileInputChange("businessCity", ""); // Reset city when state changes
                      }} required className="w-full border rounded px-2 py-2">
                        <option value="">Select State</option>
                        {indianStates.map(state => <option key={state} value={state}>{state}</option>)}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="profile-businessCity">City <span className="text-red-500">*</span></Label>
                      <select id="profile-businessCity" value={profileForm.businessCity || ""} onChange={e => handleProfileInputChange("businessCity", e.target.value)} required className="w-full border rounded px-2 py-2" disabled={!profileForm.businessState}>
                        <option value="">{profileForm.businessState ? "Select City" : "Select State first"}</option>
                        {profileForm.businessState && indianStateCityMap[profileForm.businessState]?.map((city: string) => <option key={city} value={city}>{city}</option>)}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="profile-name">Name <span className="text-red-500">*</span></Label>
                      <Input id="profile-name" value={profileForm.name || ""} onChange={e => handleProfileInputChange("name", e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="profile-businessName">Business Name <span className="text-red-500">*</span></Label>
                      <Input id="profile-businessName" value={profileForm.businessName || ""} onChange={e => handleProfileInputChange("businessName", e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="profile-email">Email <span className="text-red-500">*</span></Label>
                      <Input id="profile-email" value={profileForm.email || ""} onChange={e => handleProfileInputChange("email", e.target.value)} type="email" required />
                    </div>
                    <div>
                      <Label htmlFor="profile-phone">Phone</Label>
                      <Input id="profile-phone" value={profileForm.phone || ""} onChange={e => handleProfileInputChange("phone", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="profile-website">Website</Label>
                      <Input id="profile-website" value={profileForm.website || ""} onChange={e => handleProfileInputChange("website", e.target.value)} placeholder="https://yourstore.com" />
                    </div>
                    <div>
                      <Label htmlFor="profile-businessPincode">Pincode <span className="text-red-500">*</span></Label>
                      <Input id="profile-businessPincode" value={profileForm.businessPincode || ""} onChange={e => handleProfileInputChange("businessPincode", e.target.value.replace(/[^0-9]/g, '').slice(0, 6))} maxLength={6} required pattern="^[0-9]{6}$" placeholder="6-digit pincode" />
                    </div>
                    <div>
                      <Label htmlFor="profile-businessAddress">Business Address</Label>
                      <Input id="profile-businessAddress" value={profileForm.businessAddress || ""} onChange={e => handleProfileInputChange("businessAddress", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="profile-businessArea">Business Area</Label>
                      <Input id="profile-businessArea" value={profileForm.businessArea || ""} onChange={e => handleProfileInputChange("businessArea", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="profile-businessLocality">Business Locality</Label>
                      <Input id="profile-businessLocality" value={profileForm.businessLocality || ""} onChange={e => handleProfileInputChange("businessLocality", e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="profile-businessDescription">Business Description</Label>
                      <textarea id="profile-businessDescription" value={profileForm.businessDescription || ""} onChange={e => handleProfileInputChange("businessDescription", e.target.value)} rows={4} className="w-full border rounded px-2 py-2" placeholder="Describe your business..." />
                    </div>
                    <div>
                      <Label htmlFor="profile-businessImage">Business Image</Label>
                      <Input id="profile-businessImage" type="file" accept="image/*" onChange={async e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Validate file type
                          if (!file.type.startsWith("image/")) {
                            alert("Please select only image files");
                            return;
                          }
                          // Validate file size (max 5MB)
                          if (file.size > 5 * 1024 * 1024) {
                            alert("Image size should be less than 5MB");
                            return;
                          }
                          // Use FileReader to create data URL instead of blob URL
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            if (event.target?.result) {
                              handleProfileInputChange("businessImage", event.target.result as string);
                            }
                          };
                          reader.onerror = () => {
                            alert("Error reading file. Please try again.");
                          };
                          reader.readAsDataURL(file);
                        }
                      }} />
                      {profileForm.businessImage && (
                        <img src={profileForm.businessImage} alt="Business" className="mt-2 rounded w-32 h-32 object-cover" />
                      )}
                    </div>
                                         <div>
                       <Label htmlFor="profile-openingHours">Opening Hours</Label>
                       <Input id="profile-openingHours" value={profileForm.openingHours || ""} onChange={e => handleProfileInputChange("openingHours", e.target.value)} placeholder="e.g. 9:00 AM - 9:00 PM" />
                     </div>
                  </div>
                  <div className="flex gap-2 justify-end mt-4">
                    <Button 
                      onClick={handleSaveProfile} 
                      disabled={isSavingProfile || !profileForm}
                    >
                      {isSavingProfile ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
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

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && closeOrderModal()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto sm:max-w-2xl md:max-w-3xl lg:max-w-4xl p-0">
          <DialogHeader className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-bold text-gray-900">
                  Order Details
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Complete order information and OTP verification
                </DialogDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeOrderModal}
                className="h-8 w-8 p-0 hover:bg-gray-200 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {isLoadingOrderDetails ? (
            <div className="flex items-center justify-center py-12 px-6">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading order details...</p>
              </div>
            </div>
          ) : orderDetails ? (
            <div className="space-y-6 px-6 py-4">

              {/* Order Header */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Order #{orderDetails.order.orderNumber || orderDetails.order.id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Placed on {new Date(orderDetails.order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={`text-sm px-3 py-1 ${
                      orderDetails.order.orderStatus === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                      orderDetails.order.orderStatus === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {orderDetails.order.orderStatus.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Customer Information */}
                <Card className="shadow-sm border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-600" />
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{orderDetails.order.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{orderDetails.order.customerPhone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium">Delivery Address:</p>
                        <p>{orderDetails.order.customerAddress}</p>
                        <p>{orderDetails.order.customerArea}, {orderDetails.order.customerLocality}</p>
                        <p>{orderDetails.order.customerCity}</p>
                      </div>
                    </div>
                    {orderDetails.order.deliveryInstructions && (
                      <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-sm font-medium text-yellow-800">Delivery Instructions:</p>
                        <p className="text-sm text-yellow-700">{orderDetails.order.deliveryInstructions}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Payment Information */}
                <Card className="shadow-sm border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-green-600" />
                      Payment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">₹{orderDetails.payment.subtotal?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee:</span>
                      <span className="font-medium">₹{orderDetails.payment.deliveryFee?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax:</span>
                      <span className="font-medium">₹{orderDetails.payment.taxAmount?.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount:</span>
                      <span className="text-green-600">₹{orderDetails.payment.totalAmount?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-medium">{orderDetails.payment.paymentMethod?.replace(/_/g, ' ')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Payment Status:</span>
                      <Badge className={
                        orderDetails.payment.paymentStatus === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                        orderDetails.payment.paymentStatus === 'FAILED' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }>
                        {orderDetails.payment.paymentStatus}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Items */}
              <Card className="shadow-sm border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Package className="h-5 w-5 text-purple-600" />
                    Order Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderDetails.items.map((item: any, index: number) => (
                      <div key={item.id || index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.productImage || item.product?.image || "/placeholder.svg"}
                            alt={item.productName}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{item.productName}</h4>
                          <p className="text-sm text-gray-600">{item.productCategory}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{item.unitPrice?.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">per unit</p>
                          <p className="font-bold text-lg">₹{item.totalPrice?.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Seller Order Summary */}
              <Card className="shadow-sm border-gray-200 bg-blue-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-blue-600" />
                    Your Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Your Subtotal:</span>
                    <span className="font-medium">₹{orderDetails.sellerOrder.subtotal?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform Commission:</span>
                    <span className="font-medium text-red-600">-₹{orderDetails.sellerOrder.commission?.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Your Net Amount:</span>
                    <span className="text-green-600">₹{orderDetails.sellerOrder.netAmount?.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* OTP Verification Section */}
              <Card className="shadow-lg border-2 border-orange-300 bg-gradient-to-r from-orange-50 to-yellow-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-orange-800">
                    <Truck className="h-5 w-5 text-orange-600" />
                    Delivery Agent Pickup Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white p-6 rounded-xl border-2 border-orange-200 shadow-md">
                    <p className="text-sm text-gray-700 mb-4 font-medium">
                      A delivery agent will arrive to pick up this order. Please verify their OTP to confirm pickup.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="otp-input" className="text-sm font-semibold text-gray-800 block mb-2">
                          Enter OTP to proceed
                        </Label>
                        <Input
                          id="otp-input"
                          type="text"
                          placeholder="Enter OTP to proceed"
                          value={otpInput}
                          onChange={(e) => setOtpInput(e.target.value)}
                          className="mt-1 h-12 text-lg font-mono text-center tracking-widest border-2 border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-lg"
                          maxLength={6}
                        />
                      </div>
                        
                        {otpStatus === "success" && (
                          <div className="p-3 bg-green-100 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-800 font-medium">{otpMessage}</p>
                          </div>
                        )}
                        
                        {otpStatus === "error" && (
                          <div className="p-3 bg-red-100 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-800 font-medium">{otpMessage}</p>
                          </div>
                        )}
                        
                        <div className="flex gap-3">
                          <Button
                            onClick={handleSubmitOtp}
                            disabled={!otpInput.trim() || isSubmittingOtp}
                            className="flex-1 h-12 text-lg font-semibold bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                          >
                            {isSubmittingOtp ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Verifying...
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Submit OTP
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              {/* Delivery Agent Information */}
              {orderDetails.deliveryAgent && (
                <Card className="shadow-sm border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Truck className="h-5 w-5 text-blue-600" />
                      Delivery Agent
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{orderDetails.deliveryAgent.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{orderDetails.deliveryAgent.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-gray-500" />
                      <span>{orderDetails.deliveryAgent.vehicleType} - {orderDetails.deliveryAgent.vehicleNumber}</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <div className="text-center py-12 px-6">
              <p className="text-gray-600">Failed to load order details</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  )
}
