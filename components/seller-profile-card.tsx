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
  
  console.log("[DEBUG] SellerProfileCard rendering seller:", {
    id: seller.id,
    name: displayName,
    image: seller.image,
    businessImage: seller.businessImage
  })

  return (
    <Card className={`hover:shadow-lg transition-shadow ${className}`}>
      <div className="relative">
        <Image
          src={seller.image || "/placeholder.svg"}
          alt={displayName}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-t-lg"
          onError={(e) => {
            console.log("[DEBUG] Image failed to load for seller:", displayName, "image:", seller.image)
            e.currentTarget.src = "/placeholder.svg"
          }}
        />
        {seller.isPromoted && (
          <Badge className="absolute top-2 left-2 bg-yellow-500 text-yellow-900">Promoted</Badge>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{displayName}</h3>
          <Badge variant="outline">{seller.categoryName || seller.category}</Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{seller.rating || 0}</span>
            <span>({seller.reviews || 0})</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{seller.deliveryTime || "30-45 min"}</span>
          </div>
        </div>
        <div className="text-sm text-gray-500 mb-4">
          📍 {location}
        </div>
        <Link href={`/business/${seller.id}`}>
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            View Store
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
} 