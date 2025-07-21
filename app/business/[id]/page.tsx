"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Clock,
  Star,
  Phone,
  Globe,
  Navigation,
  ShoppingCart,
  MessageCircle,
  Heart,
  Share2,
  Plus,
  Minus,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useCart } from "@/hooks/useCart"
import { CartDrawer } from "@/components/cart-drawer"

export default function BusinessPage() {
  const params = useParams()
  const router = useRouter()
  const businessId = Number.parseInt(params.id as string)
  const [business, setBusiness] = useState<any>(null)
  const { cart, addToCart, getItemQuantity, updateQuantity } = useCart()

  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    const fetchBusiness = async () => {
      if (!businessId) return
      const res = await fetch(`/api/business?id=${businessId}`)
      const data = await res.json()
      if (res.ok && data.business) {
        setBusiness(data.business)
      } else {
        setBusiness(null)
      }
    }
    fetchBusiness()
  }, [businessId])

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Business Not Found</h1>
          <p className="text-gray-600 mb-4">The business you're looking for doesn't exist.</p>
          <Link href="/browse">
            <Button>Browse Businesses</Button>
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
    // Clear existing cart and add this product
    localStorage.removeItem("cart")

    // Add product to cart
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      sellerId: business.id.toString(),
      sellerName: business.name,
    })

    // Navigate to checkout
    setTimeout(() => {
      router.push("/checkout")
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/browse" className="hover:text-blue-600">
            Browse
          </Link>
          <span>/</span>
          <span className="font-medium text-blue-600">{business.name}</span>
        </div>

        {/* Business Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3">
              <img
                src={business.image || "/placeholder.svg"}
                alt={business.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            <div className="lg:w-2/3">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{business.name}</h1>
                  <div className="flex items-center gap-4 mb-2">
                    <Badge variant="secondary">{business.category}</Badge>
                    <Badge variant="outline">{business.subcategory}</Badge>
                    <span className={`text-sm font-medium ${business.isOpen ? "text-green-600" : "text-red-600"}`}>
                      {business.isOpen ? "Open" : "Closed"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{business.rating}</span>
                      <span>({business.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{business.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Navigation className="h-4 w-4" />
                      <span>{business.distance}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{business.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{business.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{business.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <span>{business.website}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>Delivery in {business.deliveryTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Menu / Products</h2>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product: any) => {
              const quantity = getItemQuantity(product.id)

              return (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-medium">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>

                    {product.inStock ? (
                      <div className="space-y-2">
                        {quantity > 0 ? (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 bg-transparent"
                                onClick={() => updateQuantity(product.id, quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="font-medium">{quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 bg-transparent"
                                onClick={() => updateQuantity(product.id, quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <span className="text-sm text-green-600 font-medium">In Cart</span>
                          </div>
                        ) : (
                          <Button className="w-full" onClick={() => handleAddToCart(product)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        )}

                        {/* Buy Now Button */}
                        <Button
                          variant="outline"
                          className="w-full bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
                          onClick={() => handleBuyNow(product)}
                        >
                          <Zap className="h-4 w-4 mr-2" />
                          Buy Now
                        </Button>
                      </div>
                    ) : (
                      <Button className="w-full" disabled>
                        Out of Stock
                      </Button>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
