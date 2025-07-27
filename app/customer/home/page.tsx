"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  MapPin,
  Star,
  Clock,
  Truck,
  Shield,
  Users,
  TrendingUp,
  ChevronDown,
  Plus,
  Loader2,
  LogOut,
  User,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { CartDrawer } from "@/components/cart-drawer"
import { useCart } from "@/hooks/useCart"
import { useLocation } from "@/hooks/useLocation"
import { Footer } from "@/components/ui/footer"
import { getCookie, deleteCookie } from "@/lib/utils"

// Location data
const locationData = {
  Bangalore: {
    areas: {
      Koramangala: ["1st Block", "2nd Block", "3rd Block", "4th Block", "5th Block", "6th Block", "7th Block"],
      "HSR Layout": ["Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5", "Sector 6", "Sector 7"],
      Indiranagar: ["100 Feet Road", "CMH Road", "Old Airport Road", "New BEL Road"],
      Whitefield: ["EPIP Zone", "Kadugodi", "Mahadevapura", "Varthur"],
      "JP Nagar": ["1st Phase", "2nd Phase", "3rd Phase", "4th Phase", "5th Phase", "6th Phase"],
    },
  },
  Mumbai: {
    areas: {
      Bandra: ["Bandra West", "Bandra East", "Linking Road", "Hill Road"],
      Andheri: ["Andheri West", "Andheri East", "Versova", "Lokhandwala"],
      "Lower Parel": ["Phoenix Mills", "Kamala Mills", "Senapati Bapat Marg"],
      Powai: ["Hiranandani", "IIT Area", "Chandivali"],
      Malad: ["Malad West", "Malad East", "Goregaon Link Road"],
    },
  },
  Delhi: {
    areas: {
      "Connaught Place": ["Inner Circle", "Middle Circle", "Outer Circle", "Rajiv Chowk"],
      Gurgaon: ["Cyber City", "DLF Phase 1", "DLF Phase 2", "MG Road"],
      Noida: ["Sector 18", "Sector 62", "Sector 63", "Greater Noida"],
      "Lajpat Nagar": ["Central Market", "Ring Road", "Amar Colony"],
      Karol: ["Karol Bagh Market", "Ajmal Khan Road", "Pusa Road"],
    },
  },
  Chennai: {
    areas: {
      "T Nagar": ["Pondy Bazaar", "Ranganathan Street", "Usman Road"],
      Adyar: ["Besant Nagar", "Thiruvanmiyur", "Indira Nagar"],
      "Anna Nagar": ["2nd Avenue", "3rd Avenue", "4th Avenue"],
      Velachery: ["Phoenix MarketCity", "Vijayanagar", "Taramani"],
      Tambaram: ["East Tambaram", "West Tambaram", "Selaiyur"],
    },
  },
  Hyderabad: {
    areas: {
      Hitech: ["Madhapur", "Gachibowli", "Kondapur", "Jubilee Hills"],
      Secunderabad: ["SP Road", "MG Road", "Trimulgherry"],
      Banjara: ["Banjara Hills", "Jubilee Hills", "Film Nagar"],
      Kukatpally: ["KPHB Colony", "Moosapet", "Balanagar"],
      Dilsukhnagar: ["Gaddiannaram", "Saidabad", "Malakpet"],
    },
  },
}



export default function CustomerHomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoadingContent, setIsLoadingContent] = useState(false)
  const [customerInfo, setCustomerInfo] = useState<any>(null)
  const [businesses, setBusinesses] = useState<any[]>([])
  const router = useRouter()
  const { addToCart, getItemQuantity } = useCart()
  const { location, setCity, setArea, setLocality, clearLocation, getLocationDisplay } = useLocation()

  // Fetch businesses and products from backend
  useEffect(() => {
    const fetchBusinesses = async () => {
      const res = await fetch("/api/business")
      const data = await res.json()
      setBusinesses(data.businesses || [])
    }
    fetchBusinesses()
  }, [])

  // Check customer authentication
  useEffect(() => {
    const userInfoCookie = getCookie("userInfo")
    if (userInfoCookie) {
      try {
        const user = JSON.parse(userInfoCookie)
        if (user.userType !== "CUSTOMER") {
          setCustomerInfo(null)
          router.push("/")
          return
        }
        setCustomerInfo(user)
      } catch {
        setCustomerInfo(null)
        router.push("/")
      }
    } else {
      setCustomerInfo(null)
      router.push("/")
    }
  }, [router])

  // Filter businesses based on selected location
  const filteredBusinesses = useMemo<any[]>(() => {
    let filtered: any[] = businesses || []
    if (location.selectedCity) {
      filtered = filtered.filter((business) => business.city === location.selectedCity)
    }
    if (location.selectedArea && location.selectedArea !== "All Areas") {
      filtered = filtered.filter((business) => business.area === location.selectedArea)
    }
    if (location.selectedLocality) {
      filtered = filtered.filter((business) => business.locality === location.selectedLocality)
    }
    if (!location.selectedCity) {
      return filtered.slice(0, 6)
    }
    return filtered.sort((a, b) => {
      if (a.promoted && !b.promoted) return -1
      if (!a.promoted && b.promoted) return 1
      return (b.rating || 0) - (a.rating || 0)
    })
  }, [businesses, location.selectedCity, location.selectedArea, location.selectedLocality])

  const handleCityChange = async (city: string) => {
    setIsLoadingContent(true)
    setCity(city)

    // Simulate loading time for better UX
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsLoadingContent(false)
  }

  const handleAreaChange = (area: string) => {
    setArea(area)
  }

  const handleLocalityChange = (locality: string) => {
    setLocality(locality)
  }

  const handleSearch = () => {
    console.log("[DEBUG] Search triggered with query:", searchQuery)
    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    if (location.selectedCity) params.set("city", location.selectedCity)
    if (location.selectedArea && location.selectedArea !== "All Areas") params.set("area", location.selectedArea)
    if (location.selectedLocality) params.set("locality", location.selectedLocality)

    const searchUrl = `/browse?${params.toString()}`
    console.log("[DEBUG] Navigating to:", searchUrl)
    router.push(searchUrl)
  }

  const handleAddToCart = (business: any, product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      sellerId: business.id.toString(),
      sellerName: business.name,
    })
  }

  const handleLogout = () => {
            deleteCookie("userInfo")
    router.push("/")
  }

  const categories = [
    { name: "Electronics", icon: "📱", count: "500+" },
    { name: "Grocery", icon: "🛒", count: "1200+" },
    { name: "Fashion", icon: "👕", count: "800+" },
    { name: "Food", icon: "🍕", count: "600+" },
    { name: "Books", icon: "📚", count: "300+" },
    { name: "Home", icon: "🏠", count: "400+" },
  ]

  if (!customerInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome Back,
            <span className="block text-yellow-300">{customerInfo.name}!</span>
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Discover amazing local businesses and get fast delivery to your doorstep
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-lg p-2 shadow-lg max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Location Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 text-gray-700 justify-between min-w-[200px] bg-transparent"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{getLocationDisplay()}</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  {!location.selectedCity ? (
                    <>
                      <div className="px-2 py-1 text-sm font-medium text-gray-500">Popular Cities</div>
                      {Object.keys(locationData).map((city) => (
                        <DropdownMenuItem key={city} onClick={() => handleCityChange(city)}>
                          {city}
                        </DropdownMenuItem>
                      ))}
                    </>
                  ) : !location.selectedArea || location.selectedArea === "All Areas" ? (
                    <>
                      <div className="px-2 py-1 text-sm font-medium text-gray-500 flex items-center justify-between">
                        Areas in {location.selectedCity}
                        <Button variant="ghost" size="sm" onClick={() => setCity("")}>
                          Change City
                        </Button>
                      </div>
                      <DropdownMenuItem onClick={() => handleAreaChange("All Areas")}>All Areas</DropdownMenuItem>
                      {Object.keys(locationData[location.selectedCity as keyof typeof locationData]?.areas || {}).map(
                        (area) => (
                          <DropdownMenuItem key={area} onClick={() => handleAreaChange(area)}>
                            {area}
                          </DropdownMenuItem>
                        ),
                      )}
                    </>
                  ) : (
                    <>
                      <div className="px-2 py-1 text-sm font-medium text-gray-500 flex items-center justify-between">
                        Localities in {location.selectedArea}
                        <Button variant="ghost" size="sm" onClick={clearLocation}>
                          Clear
                        </Button>
                      </div>
                      {(() => {
                        const cityData = locationData[location.selectedCity as keyof typeof locationData];
                        const areaData = cityData?.areas[location.selectedArea as keyof typeof cityData.areas];
                        const localities: string[] = areaData || [];
                        return localities.map((locality: string) => (
                          <DropdownMenuItem key={locality} onClick={() => handleLocalityChange(locality)}>
                            {locality}
                          </DropdownMenuItem>
                        ));
                      })()}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex-1 flex gap-2">
                <Input
                  placeholder="Search for businesses, products..."
                  value={searchQuery}
                  onChange={(e) => {
                    console.log("[DEBUG] Search input changed to:", e.target.value)
                    setSearchQuery(e.target.value)
                  }}
                  className="flex-1 text-gray-900 placeholder:text-gray-500 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button onClick={() => {
                  console.log("[DEBUG] Search button clicked")
                  handleSearch()
                }} className="px-6">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/browse?category=${category.name.toLowerCase()}${location.selectedCity ? `&city=${location.selectedCity}` : ""}${location.selectedArea && location.selectedArea !== "All Areas" ? `&area=${location.selectedArea}` : ""}${location.selectedLocality ? `&locality=${location.selectedLocality}` : ""}`}
                className="group"
              >
                <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold mb-1 group-hover:text-blue-600">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Featured Businesses
                {location.selectedCity && (
                  <span className="text-blue-600 ml-2">
                    {isLoadingContent && <Loader2 className="h-6 w-6 animate-spin inline ml-2" />}
                    {!isLoadingContent && `in ${getLocationDisplay()}`}
                  </span>
                )}
              </h2>
              <p className="text-gray-600">Discover top-rated local businesses</p>
            </div>
            <Link href="/browse">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          {isLoadingContent ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4 w-2/3"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredBusinesses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBusinesses.map((business) => (
                <Card key={business.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={business.image || "/placeholder.svg"}
                      alt={business.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {business.promoted && (
                      <Badge className="absolute top-2 left-2 bg-yellow-500 text-yellow-900">Promoted</Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{business.name}</h3>
                      <Badge variant="outline">{business.category}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{business.rating}</span>
                        <span>({business.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{business.deliveryTime}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                      📍 {business.locality}, {business.area}
                    </div>

                    {/* Quick Add Products */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Quick Add:</h4>
                      {(business.products || []).slice(0, 2).map((product: any) => (
                        <div key={product.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="rounded"
                            />
                            <div>
                              <p className="text-sm font-medium">{product.name}</p>
                              <p className="text-xs text-gray-600">₹{product.price}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getItemQuantity(product.id) > 0 && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {getItemQuantity(product.id)}
                              </span>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-6 w-6 p-0 bg-transparent"
                              onClick={() => handleAddToCart(business, product)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Link href={`/business/${business.id}`}>
                        <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                          View Store
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No businesses found in {getLocationDisplay()}</p>
              <Button variant="outline" onClick={() => setCity("")}>
                View All Cities
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose LocalMarket?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Get your orders delivered quickly from local businesses</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Trusted Sellers</h3>
              <p className="text-gray-600 text-sm">All businesses are verified and rated by the community</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Community Support</h3>
              <p className="text-gray-600 text-sm">Support local businesses and strengthen your community</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600 text-sm">Competitive prices with exclusive local deals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer variant="customer" />
    </div>
  )
}
