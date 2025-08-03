"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, MapPin, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ModernBusinessCardProps {
  business: {
    id: number
    name: string
    category: string
    image?: string
    rating?: number
    reviews?: number
    deliveryTime?: string
    locality?: string
    area?: string
    products?: Array<{
      id: number
      name: string
      price: number
      image?: string
    }>
  }
  onAddToCart?: (business: any, product: any) => void
  className?: string
}

export function ModernBusinessCard({ business, onAddToCart, className = "" }: ModernBusinessCardProps) {
  const location = [business.locality, business.area].filter(Boolean).join(", ")

  return (
    <Card className={`max-w-sm w-full bg-gradient-to-br from-gray-100 to-white rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden ${className}`}>
      {/* Top Section - Image */}
      <div className="relative">
        <Image
          src={business.image || "/placeholder.svg"}
          alt={business.name}
          width={320}
          height={160}
          className="w-full h-40 object-cover shadow-inner"
          onError={(e) => {
            console.log("[DEBUG] Image failed to load for business:", business.name, "image:", business.image)
            e.currentTarget.src = "/placeholder.svg"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Store Name and Category */}
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{business.name}</h3>
          <Badge className="bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1 ml-2 flex-shrink-0">
            {business.category}
          </Badge>
        </div>

        {/* Rating, Time, and Location */}
        <div className="space-y-2">
          {/* Rating */}
          <div className="flex items-center text-gray-600 text-sm">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="font-medium">{business.rating || 0}</span>
            <span className="ml-1">({business.reviews || 0} reviews)</span>
          </div>

          {/* Delivery Time */}
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="h-4 w-4 text-gray-500 mr-1" />
            <span>{business.deliveryTime || "30-45 min"}</span>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 text-pink-500 mr-1" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        {/* Quick Add Section */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Quick Add:</h4>
          {(business.products || []).slice(0, 1).map((product) => (
            <div key={product.id} className="flex items-center justify-between p-2 bg-white/60 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={32}
                  height={32}
                  className="rounded object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</p>
                  <p className="text-xs text-gray-600">₹{product.price}</p>
                </div>
              </div>
              {onAddToCart && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 w-6 p-0 border-gray-300 hover:bg-gray-100"
                  onClick={() => onAddToCart(business, product)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* View Store Button */}
        <Link href={`/business/${business.id}`} className="block">
          <Button 
            variant="outline" 
            className="w-full border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2"
          >
            View Store
          </Button>
        </Link>
      </div>
    </Card>
  )
} 