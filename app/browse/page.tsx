"use client"

import { CATEGORIES_WITH_SUBCATEGORIES } from "@/utils/category-data";
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BrowsePage() {
  const [businesses, setBusinesses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const router = useRouter();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/business")
        const data = await res.json()
        setBusinesses(data.businesses || [])
      } catch (error) {
        setBusinesses([])
      } finally {
        setLoading(false)
      }
    }
    fetchBusinesses()
  }, [])

  // Filter businesses by selected category
  const filteredBusinesses = selectedCategory
    ? businesses.filter((b) => b.category === selectedCategory)
    : businesses

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin mx-auto mb-4 border-4 border-blue-400 rounded-full border-t-transparent"></div>
          <p>Loading businesses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Category filter bar: make it touch-friendly and scrollable */}
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-4 mb-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <button
            className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap ${selectedCategory === "" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border-gray-300"}`}
            onClick={() => setSelectedCategory("")}
          >
            All
          </button>
          {CATEGORIES_WITH_SUBCATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap ${selectedCategory === cat.id ? "bg-blue-600 text-white" : "bg-white text-gray-700 border-gray-300"}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <Link href={`/business/${business.id}`} key={business.id}>
              <Card className="hover:shadow-md transition-shadow duration-200">
                <div className="relative">
                  <img
                    src={business.image || "/placeholder.svg"}
                    alt={business.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  {!business.isOpen && (
                    <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-75">
                      Closed
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{business.name}</h3>
                  <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{business.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    <span>{business.category}</span>
                    <span>•</span>
                    <span>{business.subcategory}</span>
                  </div>
                  {/* Show all products for this business */}
                  {/* Product cards: responsive row on mobile, wrap on desktop */}
                  <div className="mb-2">
                    <p className="text-xs text-green-600 font-medium mb-1">Products:</p>
                    <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:overflow-x-visible">
                      {business.products && business.products.slice(0, 3).map((product: any, index: any) => (
                        <Card key={index} className="min-w-[180px] max-w-[220px] flex-shrink-0 p-3 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-white sm:min-w-0 sm:max-w-full">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-24 object-cover rounded mb-2 bg-gray-100"
                          />
                          <div className="font-semibold text-sm mb-1 truncate">{product.name}</div>
                          <div className="text-xs text-gray-500 mb-1 line-clamp-2">{product.description}</div>
                          <div className="text-green-600 font-bold text-base">₹{product.price}</div>
                        </Card>
                      ))}
                      {business.products && business.products.length > 3 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/business/${business.id}`);
                          }}
                          className="min-w-[120px] flex items-center justify-center text-blue-600 font-medium hover:underline bg-white border border-blue-100 rounded-lg px-2 py-1 sm:min-w-0"
                          type="button"
                        >
                          View All
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {/* Show yellow stars for integer part of rating */}
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(business.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                        </svg>
                      ))}
                    </div>
                    <span className="font-semibold text-gray-800 text-sm ml-1">{business.rating.toFixed(1)}</span>
                    <span className="text-gray-500 text-xs">({business.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">{business.priceRange}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
