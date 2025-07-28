import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock, Phone, Mail, Store, Users, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface SellerProfileCardProps {
  seller: {
    id: number
    name: string
    businessName?: string
    email?: string
    phone?: string
    category?: string
    categoryName?: string
    description?: string
    image?: string
    city?: string
    area?: string
    locality?: string
    rating?: number
    reviews?: number
    deliveryTime?: string
    isVerified?: boolean
    isPromoted?: boolean
    isOpen?: boolean
    totalProducts?: number
    totalOrders?: number
    averageOrderValue?: number
  }
  showDetails?: boolean
  className?: string
}

export function SellerProfileCard({ seller, showDetails = false, className = "" }: SellerProfileCardProps) {
  const displayName = seller.businessName || seller.name
  const location = [seller.locality, seller.area, seller.city].filter(Boolean).join(", ")

  return (
    <Card className={`hover:shadow-lg transition-shadow ${className}`}>
      <div className="relative">
        <Image
          src={seller.image || "/placeholder.svg"}
          alt={displayName}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          {seller.isPromoted && (
            <Badge className="bg-yellow-500 text-yellow-900">Promoted</Badge>
          )}
          {seller.isVerified && (
            <Badge className="bg-green-500 text-white">Verified</Badge>
          )}
          {!seller.isOpen && (
            <Badge className="bg-red-500 text-white">Closed</Badge>
          )}
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{displayName}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Store className="h-4 w-4" />
              <span>{seller.categoryName || seller.category}</span>
            </div>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{seller.rating || 0}</span>
            <span>({seller.reviews || 0} reviews)</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{seller.deliveryTime || "30-45 min"}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>

        {/* Description */}
        {seller.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {seller.description}
          </p>
        )}

        {/* Contact Information */}
        {showDetails && (
          <div className="space-y-2 mb-4">
            {seller.phone && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{seller.phone}</span>
              </div>
            )}
            {seller.email && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{seller.email}</span>
              </div>
            )}
          </div>
        )}

        {/* Stats (if available) */}
        {showDetails && (seller.totalProducts || seller.totalOrders || seller.averageOrderValue) && (
          <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
            {seller.totalProducts !== undefined && (
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{seller.totalProducts}</div>
                <div className="text-xs text-gray-500">Products</div>
              </div>
            )}
            {seller.totalOrders !== undefined && (
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{seller.totalOrders}</div>
                <div className="text-xs text-gray-500">Orders</div>
              </div>
            )}
            {seller.averageOrderValue !== undefined && (
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">₹{seller.averageOrderValue}</div>
                <div className="text-xs text-gray-500">Avg Order</div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link href={`/business/${seller.id}`} className="flex-1">
            <Button className="w-full">
              View Store
            </Button>
          </Link>
          {showDetails && (
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Follow
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 