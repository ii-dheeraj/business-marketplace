"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, X, Save, Eye } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getCookie } from "@/lib/utils"

interface ProductVariant {
  id: string
  name: string
  price: number
  stock: number
}

interface ProductImage {
  id: string
  url: string
  alt: string
}

interface Product {
  id: string
  name: string
  description: string
  category: string
  price: number
  stock: number
  images: ProductImage[]
  tags: string[]
  sellerId: string
  sellerName: string
  status: string
  createdAt: string
}

export default function AddProduct() {
  const [sellerInfo, setSellerInfo] = useState<any>(null)
  const [addedProducts, setAddedProducts] = useState<Product[]>([])
  const router = useRouter()

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    tags: [] as string[],
  })

  const [images, setImages] = useState<ProductImage[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Books",
    "Sports",
    "Beauty",
    "Grocery",
    "Restaurant",
    "Services",
    "Digital Products",
    "Construction Equipment",
    "Industrial Machinery",
    "Automotive",
    "Agriculture Equipment",
  ]

  const handleRemoveImage = (imageId: string) => {
    setImages((prev) => prev.filter((image) => image.id !== imageId))
  }

  useEffect(() => {
    // Check seller authentication
    const userInfoCookie = getCookie("userInfo")
    if (!userInfoCookie) {
      router.push("/seller/login")
    } else {
      setSellerInfo(JSON.parse(userInfoCookie))
    }
    // Load products from API
    const fetchProducts = async () => {
      if (!userInfoCookie) return
      const seller = JSON.parse(userInfoCookie)
      const res = await fetch(`/api/product?sellerId=${seller.id}`)
      const data = await res.json()
      setAddedProducts(data.products || [])
    }
    fetchProducts()
  }, [router])

  const handleInputChange = (field: string, value: any) => {
    setProductData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddTag = () => {
    if (currentTag.trim() && !productData.tags.includes(currentTag.trim())) {
      setProductData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setProductData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          alert("Please select only image files")
          return
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert("Image size should be less than 5MB")
          return
        }

        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.result) {
            const newImage: ProductImage = {
              id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
              url: event.target.result as string,
              alt: file.name,
            }
            setImages((prev) => [...prev, newImage])
          }
        }
        reader.onerror = () => {
          alert("Error reading file. Please try again.")
        }
        reader.readAsDataURL(file)
      })
    }

    // Reset the input value to allow selecting the same file again
    e.target.value = ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!sellerInfo) return
    const res = await fetch("/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        image: images[0]?.url || "",
        sellerId: sellerInfo.id,
      }),
    })
    const data = await res.json()
    if (res.ok) {
      setAddedProducts((prev) => [...prev, data.product])
      setProductData({ name: "", description: "", category: "", price: "", stock: "", tags: [] })
      setImages([])
      router.push("/seller/products/add/success")
    } else {
      alert(data.error || "Failed to add product")
    }
  }

  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = addedProducts.filter((product) => product.id !== productId)
    setAddedProducts(updatedProducts)
    // localStorage.setItem("sellerProducts", JSON.stringify(updatedProducts)) // Removed localStorage
  }

  if (!sellerInfo) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/seller/dashboard" className="flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
            <div className="ml-6">
              <h1 className="text-xl font-bold">Add New Product</h1>
              <p className="text-sm text-gray-600">Create a new product listing</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add Product Form */}
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>Fill in the essential product details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={productData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    value={productData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Detailed product description"
                    rows={4}
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={productData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price and Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Selling Price *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <Input
                        id="price"
                        type="number"
                        value={productData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        placeholder="0.00"
                        className="pl-8"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity *</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={productData.stock}
                      onChange={(e) => handleInputChange("stock", e.target.value)}
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                {/* Product Images */}
                <div className="space-y-4">
                  <Label>Product Images * (Max 5MB each)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600 mb-2">Click to upload product images</p>
                    <p className="text-xs text-gray-500 mb-3">Supports: JPG, PNG, GIF (Max 5MB each)</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      ref={fileInputRef}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="cursor-pointer bg-transparent"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Select Images
                    </Button>
                  </div>

                  {images.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">{images.length} image(s) selected</p>
                      <div className="grid grid-cols-3 gap-2">
                        {images.map((image) => (
                          <div key={image.id} className="relative group">
                            <img
                              src={image.url || "/placeholder.svg"}
                              alt={image.alt}
                              className="w-full h-20 object-cover rounded border"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                              onClick={() => handleRemoveImage(image.id)}
                              title="Remove image"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b opacity-0 group-hover:opacity-100 transition-opacity">
                              {image.alt}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Tags */}
                <div className="space-y-4">
                  <Label>Product Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      placeholder="Enter a tag"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                    />
                    <Button type="button" onClick={handleAddTag}>
                      Add
                    </Button>
                  </div>

                  {productData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {productData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Added Products Display */}
          <Card>
            <CardHeader>
              <CardTitle>Your Products ({addedProducts.length})</CardTitle>
              <CardDescription>Recently added products</CardDescription>
            </CardHeader>
            <CardContent>
              {addedProducts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No products added yet</p>
                  <p className="text-sm">Add your first product to see it here</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {addedProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <div className="flex gap-3">
                        {Array.isArray(product.images) && product.images[0] ? (
                          <img
                            src={product.images[0].url || "/placeholder.svg"}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                        ) : (
                          <img
                            src="/placeholder.svg"
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{product.name}</h4>
                          <p className="text-xs text-gray-600 mb-1">{product.category}</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-green-600 font-bold">₹{product.price}</span>
                              <span className="text-xs text-gray-500 ml-2">Stock: {product.stock}</span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-700 h-6 px-2"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          {Array.isArray(product.tags) && product.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {product.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                                  #{tag}
                                </Badge>
                              ))}
                              {product.tags.length > 3 && (
                                <span className="text-xs text-gray-500">+{product.tags.length - 3} more</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
