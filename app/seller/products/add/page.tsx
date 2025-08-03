"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AppointmentCalendar } from "@/components/ui/appointment-calendar"
import { AppointmentScheduleForm } from "@/components/ui/appointment-schedule-form"
import { ArrowLeft, Upload, X, Save, Eye, Plus, Tag, Image as ImageIcon, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getCookie } from "@/lib/utils"

interface ProductVariant {
  id: string
  size: string
  color: string
  stock: number
  price?: number
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
  originalPrice?: number
  stock: number
  images: ProductImage[]
  tags: string[]
  sellerId: string
  sellerName: string
  status: string
  createdAt: string
  productType: string
  variants?: ProductVariant[]
  downloadUrl?: string
  accessInstructions?: string
  serviceName?: string
  duration?: number
  calendlyLink?: string
  appointmentDate?: Date
  appointmentTime?: string
  appointmentConfig?: {
    timezone: string
    weeklyAvailability: {
      [key: string]: {
        enabled: boolean
        from: string
        to: string
      }
    }
    blockedDates: Array<{
      id: string
      from: string
      to: string
      label?: string
    }>
  }
  location?: string
  hours?: string
  instructions?: string
  contactEmail?: string
  contactPhone?: string
  keyword?: string
  slug?: string
  seoTags?: string[]
  seoDescription?: string
  features?: string[]
  seoScore?: number
  sku?: string
  unit?: string
  customUnit?: string
}

const PRODUCT_TYPES = [
  { id: 'physical', label: 'Physical Product', icon: '📦' },
  { id: 'digital', label: 'Digital Product', icon: '💾' },
  { id: 'appointment', label: 'Appointment', icon: '📅' },
  { id: 'walkin', label: 'Walk-in Service', icon: '🏪' },
  { id: 'enquiry', label: 'Enquiry Only', icon: '📞' },
  { id: 'onsite', label: 'Onsite Service', icon: '🔧' }
]

const UNITS = ['pcs', 'kg', 'g', 'l', 'ml', 'm', 'cm', 'custom']

export default function AddProduct() {
  const [sellerInfo, setSellerInfo] = useState<any>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(false)
  const router = useRouter()

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    originalPrice: "",
    stock: "",
    tags: [] as string[],
    productType: "physical",
    variants: [] as ProductVariant[],
    downloadUrl: "",
    accessInstructions: "",
    serviceName: "",
    duration: 30,
    calendlyLink: "",
    appointmentDate: undefined as Date | undefined,
    appointmentTime: "",
    appointmentConfig: {
      timezone: "Asia/Singapore",
      weeklyAvailability: {
        Monday: { enabled: false, from: "09:00", to: "17:00" },
        Tuesday: { enabled: false, from: "09:00", to: "17:00" },
        Wednesday: { enabled: false, from: "09:00", to: "17:00" },
        Thursday: { enabled: false, from: "09:00", to: "17:00" },
        Friday: { enabled: false, from: "09:00", to: "17:00" },
        Saturday: { enabled: false, from: "09:00", to: "17:00" },
        Sunday: { enabled: false, from: "09:00", to: "17:00" }
      },
      blockedDates: []
    },
    location: "",
    hours: "",
    instructions: "",
    contactEmail: "",
    contactPhone: "",
    keyword: "",
    slug: "",
    seoTags: [] as string[],
    seoDescription: "",
    features: [] as string[],
    seoScore: 0,
    sku: "",
    unit: "pcs",
    customUnit: ""
  })

  const [images, setImages] = useState<ProductImage[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [newSeoTag, setNewSeoTag] = useState("")
  const [newFeature, setNewFeature] = useState("")
  const [variantItems, setVariantItems] = useState<string>('')
  const [variantOptions, setVariantOptions] = useState<string>('')
  const [isDraftSaved, setIsDraftSaved] = useState(false)
  const [showSeoPreview, setShowSeoPreview] = useState(false)
  const [error, setError] = useState("")


  const handleRemoveImage = (imageId: string) => {
    setImages((prev) => prev.filter((image) => image.id !== imageId))
  }

  const fetchCategories = async () => {
    setIsLoadingCategories(true)
    try {
      const res = await fetch('/api/categories?active=true')
      const data = await res.json()
      if (res.ok) {
        setCategories(data.categories || [])
      } else {
        console.error("[AddProduct] Failed to fetch categories:", data.error)
      }
    } catch (error) {
      console.error("[AddProduct] Error fetching categories:", error)
    } finally {
      setIsLoadingCategories(false)
    }
  }

  useEffect(() => {
    // Check seller authentication
    const userInfoCookie = getCookie("userInfo")
    if (!userInfoCookie) {
      router.push("/seller/login")
    } else {
      setSellerInfo(JSON.parse(userInfoCookie))
    }
    
    // Fetch categories
    fetchCategories()
  }, [router])

  // Auto-calculate discount percentage
  useEffect(() => {
    if (productData.originalPrice && productData.price) {
      const original = parseFloat(productData.originalPrice)
      const current = parseFloat(productData.price)
      if (original > 0 && current > 0) {
        const discount = ((original - current) / original) * 100
        // You can store this in state if needed
      }
    }
  }, [productData.price, productData.originalPrice])

  // Auto-generate slug from title or keyword
  useEffect(() => {
    const source = productData.keyword || productData.name
    if (source) {
      const slug = source
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      setProductData(prev => ({ ...prev, slug }))
    }
  }, [productData.keyword, productData.name])

  // Auto-generate SEO fields from product details
  useEffect(() => {
    if (productData.name || productData.description) {
      // Auto-generate keyword from product name
      if (productData.name && !productData.keyword) {
        const keyword = productData.name.toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .split(' ')
          .filter(word => word.length > 2)
          .slice(0, 3)
          .join(' ')
        setProductData(prev => ({ ...prev, keyword }))
      }

      // Auto-generate SEO tags from name and description
      if (productData.name || productData.description) {
        const text = `${productData.name} ${productData.description}`.toLowerCase()
        const words = text
          .replace(/[^a-z0-9\s]/g, '')
          .split(' ')
          .filter(word => word.length > 3)
          .filter((word, index, arr) => arr.indexOf(word) === index) // Remove duplicates
          .slice(0, 5)
        setProductData(prev => ({ ...prev, seoTags: words }))
      }

      // Auto-generate SEO description
      if (productData.description && !productData.seoDescription) {
        const seoDesc = productData.description.length > 160 
          ? productData.description.substring(0, 157) + '...'
          : productData.description
        setProductData(prev => ({ ...prev, seoDescription: seoDesc }))
      }
    }
  }, [productData.name, productData.description])

  // Calculate SEO score
  useEffect(() => {
    let score = 0
    
    if (productData.name.length > 10 && productData.name.length < 60) score += 20
    if (productData.description.length > 50) score += 15
    if (productData.keyword && productData.name.toLowerCase().includes(productData.keyword.toLowerCase())) score += 15
    if (productData.slug && productData.slug.length > 0) score += 10
    if (productData.seoDescription.length > 50) score += 10
    if (productData.seoTags.length > 0) score += 10
    if (productData.features.length > 0) score += 10
    if (images.length > 0) score += 10
    
    setProductData(prev => ({ ...prev, seoScore: Math.min(score, 100) }))
  }, [productData.name, productData.description, productData.keyword, productData.slug, productData.seoDescription, productData.seoTags, productData.features, images])

  // Generate variants matrix
  const generateVariantMatrix = () => {
    const items = variantItems.split(',').map(item => item.trim()).filter(item => item)
    const options = variantOptions.split(',').map(option => option.trim()).filter(option => option)
    
    if (items.length === 0 || options.length === 0) {
      alert('Please enter both items and variants')
      return
    }
    
    const variants: ProductVariant[] = []
    for (const item of items) {
      for (const option of options) {
        variants.push({
          id: `${item}-${option}`,
          size: item,
          color: option,
          stock: 0
        })
      }
    }
    setProductData(prev => ({ ...prev, variants }))
  }

  // Save draft to localStorage
  const saveDraft = () => {
    const draft = {
      productData,
      variantItems,
      variantOptions
    }
    localStorage.setItem('productFormDraft', JSON.stringify(draft))
    setIsDraftSaved(true)
    setTimeout(() => setIsDraftSaved(false), 2000)
  }

  // Load draft from localStorage
  const loadDraft = () => {
    const draft = localStorage.getItem('productFormDraft')
    if (draft) {
      const parsedDraft = JSON.parse(draft)
      if (parsedDraft.productData) {
        setProductData(parsedDraft.productData)
      }
      if (parsedDraft.variantItems) {
        setVariantItems(parsedDraft.variantItems)
      }
      if (parsedDraft.variantOptions) {
        setVariantOptions(parsedDraft.variantOptions)
      }
    }
  }

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        saveDraft()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [productData, variantItems, variantOptions])

  // Load draft on mount
  useEffect(() => {
    loadDraft()
  }, [])

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

  const addSeoTag = () => {
    if (newSeoTag.trim() && !productData.seoTags.includes(newSeoTag.trim())) {
      setProductData(prev => ({ ...prev, seoTags: [...prev.seoTags, newSeoTag.trim()] }))
      setNewSeoTag('')
    }
  }

  const removeSeoTag = (tagToRemove: string) => {
    setProductData(prev => ({ ...prev, seoTags: prev.seoTags.filter(tag => tag !== tagToRemove) }))
  }

  const addFeature = () => {
    if (newFeature.trim() && !productData.features.includes(newFeature.trim())) {
      setProductData(prev => ({ ...prev, features: [...prev.features, newFeature.trim()] }))
      setNewFeature('')
    }
  }

  const removeFeature = (featureToRemove: string) => {
    setProductData(prev => ({ ...prev, features: prev.features.filter(feature => feature !== featureToRemove) }))
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

  const updateVariantStock = (size: string, color: string, stock: number) => {
    setProductData(prev => ({
      ...prev,
      variants: prev.variants.map(v => 
        v.size === size && v.color === color ? { ...v, stock } : v
      )
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!sellerInfo) return;

    // Only essential validation - name is required
    if (!productData.name || !productData.name.trim()) {
      setError("Product/Service name is required");
      return;
    }

    // Optional validations with warnings only
    if (productData.price && Number(productData.price) < 0) {
      setError("Price cannot be negative");
      return;
    }

    const payload = {
      ...productData,
      images: images.map(img => img.url),
      sellerId: sellerInfo.id
    };

    console.log("[PRODUCT FORM] Submitting payload:", payload);

    const res = await fetch("/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    
    const data = await res.json();
    console.log("[PRODUCT FORM] API response:", data);
    
    if (res.ok) {
      // Reset form
      setProductData({
        name: "", description: "", category: "", price: "", originalPrice: "", stock: "", 
        tags: [], productType: "physical", variants: [], downloadUrl: "", accessInstructions: "", 
        serviceName: "", duration: 30, calendlyLink: "", appointmentDate: undefined, appointmentTime: "", 
        appointmentConfig: {
          timezone: "Asia/Singapore",
          weeklyAvailability: {
            Monday: { enabled: false, from: "09:00", to: "17:00" },
            Tuesday: { enabled: false, from: "09:00", to: "17:00" },
            Wednesday: { enabled: false, from: "09:00", to: "17:00" },
            Thursday: { enabled: false, from: "09:00", to: "17:00" },
            Friday: { enabled: false, from: "09:00", to: "17:00" },
            Saturday: { enabled: false, from: "09:00", to: "17:00" },
            Sunday: { enabled: false, from: "09:00", to: "17:00" }
          },
          blockedDates: []
        },
        location: "", hours: "", instructions: "", contactEmail: "", contactPhone: "", keyword: "", 
        slug: "", seoTags: [], seoDescription: "", features: [], seoScore: 0, sku: "", unit: "pcs", customUnit: ""
      });
      setImages([]);
      setVariantItems('');
      setVariantOptions('');
      router.push("/seller/products/add/success");
    } else {
      setError(data.error || "Failed to add product");
      console.error("Add product error:", data.error);
    }
  }

  const getSeoScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (!sellerInfo) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/seller/dashboard" className="flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
            <div className="ml-6">
              <h1 className="text-xl font-bold">Add New Product/Service</h1>
              <p className="text-sm text-gray-600">Create a new listing for your business</p>
            </div>
          </div>
          <Button onClick={saveDraft} variant="outline" className="flex items-center">
            <Save className="h-4 w-4 mr-2" />
            {isDraftSaved ? 'Saved!' : 'Save Draft'}
          </Button>
        </div>

        {/* Add Product Form - Full Page */}
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
            <CardDescription>Fill in the essential product details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="text-red-600 mb-2">{error}</div>}

              {/* Product Type Selection */}
              <div className="space-y-4">
                <Label>Product Type *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {PRODUCT_TYPES.map((type) => (
                    <label
                      key={type.id}
                      className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                        productData.productType === type.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="productType"
                        value={type.id}
                        checked={productData.productType === type.id}
                        onChange={(e) => handleInputChange("productType", e.target.value)}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="text-2xl mb-2">{type.icon}</div>
                        <div className="font-medium text-gray-900">{type.label}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Product/Service Name *</Label>
                <Input
                  id="name"
                  value={productData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter product or service name"
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
                  placeholder="Detailed product or service description"
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
                  disabled={isLoadingCategories}
                >
                  <option value="">— Select Category —</option>
                  {isLoadingCategories ? (
                    <option value="" disabled>Loading categories...</option>
                  ) : (
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Price and Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
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
                  <Label htmlFor="originalPrice">Original Price</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={productData.originalPrice}
                      onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                      placeholder="0.00"
                      className="pl-8"
                    />
                  </div>
                </div>
              </div>

              {/* Stock and Unit (for physical products) - Only show if no variants */}
              {productData.productType === 'physical' && productData.variants.length === 0 && (
                <div className="grid grid-cols-2 gap-4">
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
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <select
                      id="unit"
                      value={productData.unit}
                      onChange={(e) => handleInputChange("unit", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      {UNITS.map((unit) => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* SKU */}
              <div className="space-y-2">
                <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                <Input
                  id="sku"
                  value={productData.sku}
                  onChange={(e) => handleInputChange("sku", e.target.value)}
                  placeholder="Enter SKU"
                />
              </div>

              {/* Product Type Specific Fields */}
              {productData.productType === 'physical' && (
                <div className="space-y-4">
                  <Label>Physical Product - Variants</Label>
                  
                  {/* Items and Variants Input */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="variantItems">Items (comma-separated)</Label>
                      <Input
                        id="variantItems"
                        value={variantItems}
                        onChange={(e) => setVariantItems(e.target.value)}
                        placeholder="e.g., Iphone 12, Iphone 13"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="variantOptions">Variants (comma-separated)</Label>
                      <Input
                        id="variantOptions"
                        value={variantOptions}
                        onChange={(e) => setVariantOptions(e.target.value)}
                        placeholder="e.g., Red, Green, Blue"
                      />
                    </div>
                  </div>

                  {/* Generate Button */}
                  <Button 
                    type="button" 
                    onClick={generateVariantMatrix}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Generate Variant Stock Matrix
                  </Button>

                  {/* Instructions */}
                  <p className="text-sm text-gray-600 text-center">
                    Each combination will have its own stock. Price remains the same across variants.
                  </p>

                  {/* Variant Matrix Table */}
                  {productData.variants.length > 0 && (
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-r border-gray-200">
                              Size \ Color
                            </th>
                            {Array.from(new Set(productData.variants.map(v => v.color))).map(color => (
                              <th key={color} className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                {color}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from(new Set(productData.variants.map(v => v.size))).map(size => (
                            <tr key={size} className="border-t border-gray-200">
                              <td className="px-4 py-2 font-medium border-r border-gray-200">
                                {size}
                              </td>
                              {Array.from(new Set(productData.variants.map(v => v.color))).map(color => {
                                const variant = productData.variants.find(v => v.size === size && v.color === color)
                                return (
                                  <td key={`${size}-${color}`} className="px-4 py-2">
                                    <div className="space-y-1">
                                      <Label className="text-xs text-gray-500">Stock</Label>
                                      <Input
                                        type="number"
                                        value={variant?.stock || 0}
                                        onChange={(e) => updateVariantStock(size, color, parseInt(e.target.value) || 0)}
                                        className="w-20 px-2 py-1 text-sm"
                                        min="0"
                                      />
                                    </div>
                                  </td>
                                )
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {productData.productType === 'digital' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="downloadUrl">Download URL *</Label>
                    <Input
                      id="downloadUrl"
                      type="url"
                      value={productData.downloadUrl}
                      onChange={(e) => handleInputChange("downloadUrl", e.target.value)}
                      placeholder="https://example.com/download"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accessInstructions">Access Instructions</Label>
                    <Textarea
                      id="accessInstructions"
                      value={productData.accessInstructions}
                      onChange={(e) => handleInputChange("accessInstructions", e.target.value)}
                      placeholder="Instructions for customers on how to access the digital product"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {productData.productType === 'appointment' && (
                <div className="space-y-6">
                  {/* Service Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="serviceName">Service Name *</Label>
                      <Input
                        id="serviceName"
                        value={productData.serviceName}
                        onChange={(e) => handleInputChange("serviceName", e.target.value)}
                        placeholder="e.g., Haircut, Consultation"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (minutes) *</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={productData.duration}
                        onChange={(e) => handleInputChange("duration", parseInt(e.target.value) || 30)}
                        placeholder="30"
                        min="15"
                        step="15"
                        required
                      />
                    </div>
                  </div>

                  {/* Comprehensive Appointment Schedule Form */}
                  <AppointmentScheduleForm
                    value={productData.appointmentConfig}
                    onChange={(config) => handleInputChange("appointmentConfig", config)}
                    hasBookedAppointments={false}
                  />


                </div>
              )}

              {productData.productType === 'walkin' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={productData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Business address"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hours">Operating Hours *</Label>
                    <Input
                      id="hours"
                      value={productData.hours}
                      onChange={(e) => handleInputChange("hours", e.target.value)}
                      placeholder="e.g., Mon-Fri 9AM-6PM, Sat 10AM-4PM"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instructions">Instructions</Label>
                    <Textarea
                      id="instructions"
                      value={productData.instructions}
                      onChange={(e) => handleInputChange("instructions", e.target.value)}
                      placeholder="Instructions for customers visiting your location"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {(productData.productType === 'enquiry' || productData.productType === 'onsite') && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Contact Email *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={productData.contactEmail}
                        onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                        placeholder="contact@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Contact Phone *</Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        value={productData.contactPhone}
                        onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

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
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer bg-transparent"
                    onClick={() => document.getElementById('image-upload')?.click()}
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

              {/* SEO Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>SEO Optimization</Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">SEO Score:</span>
                      <span className={`text-lg font-bold ${getSeoScoreColor(productData.seoScore)}`}>
                        {productData.seoScore}/100
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSeoPreview(!showSeoPreview)}
                    >
                      {showSeoPreview ? <Eye className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                      {showSeoPreview ? 'Hide' : 'Show'} Preview
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="keyword">Primary Keyword</Label>
                    <Input
                      id="keyword"
                      value={productData.keyword}
                      onChange={(e) => handleInputChange("keyword", e.target.value)}
                      placeholder="Main keyword for SEO"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      value={productData.slug}
                      onChange={(e) => handleInputChange("slug", e.target.value)}
                      placeholder="url-slug"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seoDescription">SEO Description</Label>
                  <Textarea
                    id="seoDescription"
                    value={productData.seoDescription}
                    onChange={(e) => handleInputChange("seoDescription", e.target.value)}
                    placeholder="Meta description for search engines (150-160 characters)"
                    rows={3}
                    maxLength={160}
                  />
                  <div className="text-right text-sm text-gray-500">
                    {productData.seoDescription.length}/160
                  </div>
                </div>

                {/* SEO Tags */}
                <div className="space-y-2">
                  <Label>SEO Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newSeoTag}
                      onChange={(e) => setNewSeoTag(e.target.value)}
                      placeholder="Add SEO tag"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSeoTag())}
                    />
                    <Button type="button" onClick={addSeoTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {productData.seoTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {productData.seoTags.map((tag) => (
                        <Badge key={tag} variant="outline" className="flex items-center gap-1">
                          {tag}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeSeoTag(tag)} />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <Label>Key Features</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add a key feature"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                    />
                    <Button type="button" onClick={addFeature}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {productData.features.length > 0 && (
                    <div className="space-y-2">
                      {productData.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="text-green-600">✓</span>
                          <span className="flex-1">{feature}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFeature(feature)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* SEO Preview */}
                {showSeoPreview && (
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-3">Search Result Preview</h3>
                    <div className="space-y-2">
                      <div className="text-blue-600 text-sm">
                        {productData.slug ? `yoursite.com/products/${productData.slug}` : 'yoursite.com/products/your-slug'}
                      </div>
                      <div className="text-xl text-blue-800 font-medium">
                        {productData.name || 'Your Product Title'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {productData.seoDescription || 'Your meta description will appear here...'}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Add Product/Service
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>


    </div>
  )
}
