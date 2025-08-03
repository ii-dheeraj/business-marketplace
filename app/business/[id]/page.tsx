"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Star,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  Heart,
  Share2,
  Plus,
  Minus,
  ShoppingCart,
  Search,
  Filter,
  Building2,
  Mail,
  Users,
  TrendingUp,
  Package,
  User,
  CheckCircle,
  Calendar,
  Globe,
  Navigation,
  Award,
  Shield,
  ChevronRight,
  Home,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useCart } from "@/hooks/useCart"
import { CartDrawer } from "@/components/cart-drawer"
import Image from "next/image"

export default function BusinessPage() {
  const params = useParams()
  const router = useRouter()
  const businessId = params.id as string
  const [business, setBusiness] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { cart, addToCart, getItemQuantity, updateQuantity } = useCart()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState("")

  useEffect(() => {
    const fetchBusiness = async () => {
      if (!businessId) return
      setLoading(true)
      try {
      const res = await fetch(`/api/business?id=${businessId}`)
      const data = await res.json()
      if (res.ok && data.business) {
        setBusiness(data.business)
      } else {
        setBusiness(null)
        }
      } catch (error) {
        console.error("Error fetching business:", error)
        setBusiness(null)
      } finally {
        setLoading(false)
      }
    }
    fetchBusiness()
  }, [businessId])

  const handleRatingSubmit = async () => {
    if (userRating === 0) return
    
    try {
      const response = await fetch('/api/business/rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessId: businessId,
          rating: userRating,
          review: reviewText,
        }),
      })

      if (response.ok) {
        const res = await fetch(`/api/business?id=${businessId}`)
        const data = await res.json()
        if (res.ok && data.business) {
          setBusiness(data.business)
        }
        setUserRating(0)
        setReviewText("")
        alert("Thank you for your rating!")
      }
    } catch (error) {
      console.error('Error submitting rating:', error)
      alert("Failed to submit rating. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9fbfd] flex items-center justify-center">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e40af] mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-900">Loading store details...</h1>
        </div>
      </div>
    )
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-[#f9fbfd] flex items-center justify-center">
        <div className="text-center p-8">
          <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Store Not Found</h1>
          <p className="text-gray-600 mb-6">The store you're looking for doesn't exist or has been removed.</p>
          <Link href="/browse">
            <Button>Browse All Stores</Button>
          </Link>
        </div>
      </div>
    )
  }

  const categories = ["All", ...Array.from(new Set((business.products || []).map((p: any) => p.category || "General")))] as string[]
  const filteredProducts =
    selectedCategory === "All"
      ? business.products || []
      : (business.products || []).filter((p: any) => p.category === selectedCategory)

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      sellerId: business.id.toString(),
      sellerName: business.name,
    })
  }

  const handleBuyNow = (product: any) => {
    localStorage.removeItem("cart")
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      sellerId: business.id.toString(),
      sellerName: business.name,
    })
    setTimeout(() => {
      router.push("/checkout")
    }, 100)
  }

  return (
    <div className="min-h-screen bg-[#f9fbfd]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-xl font-bold text-[#1e40af]">
                LocalMarket
              </Link>
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="sm" className="px-4 py-2 text-gray-600">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
                <Button variant="ghost" size="sm" className="px-4 py-2 text-gray-600">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                </Button>
                <Button variant="ghost" size="sm" className="px-4 py-2 text-gray-600">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Browse
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <CartDrawer />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pt-6 pb-10">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            Home
          </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
                <Link href="/browse" className="text-sm text-gray-500 hover:text-gray-700">
            Browse
          </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
                <span className="text-sm text-gray-500">{business.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Hero Image Section */}
        <div className="relative h-[200px] md:h-[250px] w-full bg-gray-100 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.1)] mb-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-purple-600/80"></div>
          
          {/* Centered Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              {/* Radiating circles */}
              <div className="absolute inset-0 w-16 h-16 border border-white/30 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-20 h-20 border border-white/20 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>

          {/* Business Name */}
          <div className="absolute bottom-4 left-4">
            <h1 className="text-2xl font-semibold text-white mb-1">{business.name}</h1>
            <div className="flex items-center gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{business.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current" />
                <span>{business.rating}</span>
              </div>
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/10 text-white border-white border px-3 py-1 rounded-full text-xs">
              {business.categoryName || business.category}
            </Badge>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Information */}
            <Card className="bg-white rounded-2xl shadow-[0px_4px_10px_rgba(0,0,0,0.05)] border border-gray-100">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Business Information</h2>
                    <p className="text-gray-500 text-sm">Store details and contact information</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="p-2">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="p-2">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#eef2ff] rounded-full p-2">
                        <User className="h-5 w-5 text-[#1e40af]" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Owner</p>
                        <p className="font-medium text-gray-800">{business.ownerName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-[#eef2ff] rounded-full p-2">
                        <Package className="h-5 w-5 text-[#1e40af]" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Products</p>
                        <p className="font-medium text-gray-800">{business.products?.length || 0} items</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-[#eef2ff] rounded-full p-2">
                        <Calendar className="h-5 w-5 text-[#1e40af]" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Member Since</p>
                        <p className="font-medium text-gray-800">2024</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#eef2ff] rounded-full p-2">
                        <MapPin className="h-5 w-5 text-[#1e40af]" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Location</p>
                        <p className="font-medium text-gray-800">{business.locality}, {business.area}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-[#eef2ff] rounded-full p-2">
                        <Phone className="h-5 w-5 text-[#1e40af]" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Phone</p>
                        <p className="font-medium text-gray-800">{business.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-[#eef2ff] rounded-full p-2">
                        <Mail className="h-5 w-5 text-[#1e40af]" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Email</p>
                        <p className="font-medium text-gray-800">{business.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {business.description && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
                    <p className="text-gray-600 leading-relaxed">{business.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Products Section */}
            <Card className="bg-white rounded-2xl shadow-[0px_4px_10px_rgba(0,0,0,0.05)] border border-gray-100">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Products & Services</h2>
                    <p className="text-gray-500 text-sm">Browse available items</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search products..."
                        className="pl-10 w-48 text-sm"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
        </div>

                {/* Category Filter */}
                <div className="flex items-center gap-2 mb-6">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category ? "bg-[#1e40af] text-white" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingCart className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products available</h3>
                    <p className="text-gray-500 mb-4">This store doesn't have any products in the selected category.</p>
                    <Button variant="outline" disabled className="text-gray-400">
                      Check Back Later
                    </Button>
          </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product: any) => {
              const quantity = getItemQuantity(product.id)
              return (
                        <Card key={product.id} className="group hover:shadow-lg transition-shadow border border-gray-100">
                          <div className="relative overflow-hidden">
                            <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                              width={300}
                              height={200}
                              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {!product.inStock && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <Badge className="bg-red-500 text-white">Out of Stock</Badge>
                      </div>
                    )}
                            {product.category && (
                              <Badge className="absolute top-2 left-2 text-xs">
                                {product.category}
                              </Badge>
                    )}
                  </div>
                          <CardContent className="p-3">
                            <h3 className="font-semibold text-gray-900 mb-1 text-sm group-hover:text-[#1e40af] transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                              {product.description}
                            </p>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-green-600">₹{product.price}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>
                      <div className="space-y-2">
                        {quantity > 0 ? (
                          <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1">
                              <Button
                                      size="sm"
                                variant="outline"
                                      className="h-6 w-6 p-0"
                                onClick={() => updateQuantity(product.id, quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                                    <span className="font-medium text-xs min-w-[20px] text-center">{quantity}</span>
                              <Button
                                      size="sm"
                                variant="outline"
                                      className="h-6 w-6 p-0"
                                onClick={() => updateQuantity(product.id, quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                        <Button
                                    size="sm"
                          onClick={() => handleBuyNow(product)}
                                    disabled={!product.inStock}
                                    className="text-xs"
                        >
                          Buy Now
                        </Button>
                      </div>
                    ) : (
                                <div className="flex gap-1">
                                  <Button
                                    size="sm"
                                    onClick={() => handleAddToCart(product)}
                                    disabled={!product.inStock}
                                    className="flex-1 text-xs"
                                  >
                                    <Plus className="h-3 w-3 mr-1" />
                                    Add
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleBuyNow(product)}
                                    disabled={!product.inStock}
                                    className="text-xs"
                                  >
                                    Buy
                      </Button>
                                </div>
                    )}
                  </div>
                          </CardContent>
                </Card>
              )
            })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Rating & Stats */}
            <Card className="bg-white rounded-2xl shadow-[0px_4px_10px_rgba(0,0,0,0.05)] border border-gray-100">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Rating & Reviews</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl">
                    <div className="bg-yellow-100 rounded-full p-2">
                      <Star className="h-5 w-5 text-yellow-600 fill-current" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{business.rating}</p>
                      <p className="text-gray-500 text-sm">{business.reviews} reviews</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-100 rounded-xl text-center">
                      <p className="font-semibold text-gray-800">{business.products?.length || 0}</p>
                      <p className="text-gray-500 text-xs">Products</p>
                    </div>
                    <div className="p-3 bg-slate-100 rounded-xl text-center">
                      <p className="font-semibold text-gray-800">{business.deliveryTime}</p>
                      <p className="text-gray-500 text-xs">Delivery</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status & Quick Actions */}
            <Card className="bg-white rounded-2xl shadow-[0px_4px_10px_rgba(0,0,0,0.05)] border border-gray-100">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Status & Actions</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">Status</span>
                    <Badge className={business.isOpen ? "bg-green-100 text-green-700 px-2 py-1 text-sm rounded-md font-medium" : "bg-red-100 text-red-700 px-2 py-1 text-sm rounded-md font-medium"}>
                      {business.isOpen ? "Open" : "Closed"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">Member Since</span>
                    <span className="font-medium text-gray-800">2024</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">Delivery Time</span>
                    <span className="font-medium text-gray-800">{business.deliveryTime}</span>
                  </div>

                  {business.isVerified && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">Verification</span>
                      <Badge className="bg-blue-100 text-blue-700 px-2 py-1 text-sm rounded-md font-medium">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <Button className="w-full bg-[#1e40af] text-white hover:bg-[#1e3a8a] rounded-lg shadow-sm px-4 py-2">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full border border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af] hover:text-white rounded-lg shadow-sm px-4 py-2">
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg shadow-sm px-4 py-2">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Store
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            {business.subcategories && business.subcategories.length > 0 && (
              <Card className="bg-white rounded-2xl shadow-[0px_4px_10px_rgba(0,0,0,0.05)] border border-gray-100">
                <CardContent className="p-4 md:p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-[#eef2ff] text-[#1e40af] border-[#1e40af]">
                      {business.categoryName || business.category}
                    </Badge>
                    {business.subcategories.map((sub: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {sub}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
