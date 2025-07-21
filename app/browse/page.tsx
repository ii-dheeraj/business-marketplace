"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Search,
  MapPin,
  ShoppingCart,
  MessageCircle,
  Filter,
  ChevronDown,
  Navigation,
  Target,
  Building,
  ChevronUp,
  Mic,
  MicOff,
  Camera,
  X,
  Clock,
  Star,
  DollarSign,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useCart } from "@/hooks/useCart"
import { useLocation } from "@/hooks/useLocation"
import { CartDrawer } from "@/components/cart-drawer"
import { CATEGORIES } from "@/utils/category-data";

// TypeScript declarations for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

// Enhanced business data with detailed location hierarchy


// Location hierarchy structure - Updated with multiple cities
const locationHierarchy = {
  Bangalore: {
    "MG Road": {
      localities: [
        { name: "Brigade Road Junction", count: 1 },
        { name: "Trinity Circle", count: 0 },
        { name: "Cubbon Park", count: 0 },
      ],
    },
    Koramangala: {
      localities: [
        { name: "5th Block", count: 1 },
        { name: "6th Block", count: 1 },
        { name: "7th Block", count: 0 },
        { name: "8th Block", count: 0 },
      ],
    },
    "Brigade Road": {
      localities: [
        { name: "Church Street", count: 1 },
        { name: "Residency Road", count: 0 },
        { name: "St. Marks Road", count: 0 },
      ],
    },
    Whitefield: {
      localities: [
        { name: "ITPL Main Road", count: 1 },
        { name: "Varthur Road", count: 0 },
        { name: "Brookefield", count: 0 },
      ],
    },
    "Commercial Street": {
      localities: [
        { name: "Shivaji Nagar", count: 1 },
        { name: "Chickpet", count: 0 },
        { name: "Avenue Road", count: 0 },
      ],
    },
    "Peenya Industrial Area": {
      localities: [
        { name: "4th Phase", count: 1 },
        { name: "1st Phase", count: 0 },
        { name: "2nd Phase", count: 0 },
      ],
    },
    Indiranagar: {
      localities: [
        { name: "100 Feet Road", count: 1 },
        { name: "12th Main Road", count: 1 },
        { name: "CMH Road", count: 0 },
      ],
    },
    "HSR Layout": {
      localities: [
        { name: "Sector 1", count: 1 },
        { name: "Sector 2", count: 0 },
        { name: "Sector 3", count: 0 },
      ],
    },
  },
  Mumbai: {
    Andheri: {
      localities: [
        { name: "Andheri East", count: 0 },
        { name: "Andheri West", count: 1 },
        { name: "Chakala", count: 0 },
      ],
    },
    Bandra: {
      localities: [
        { name: "Bandra East", count: 0 },
        { name: "Bandra West", count: 1 },
        { name: "Khar Road", count: 0 },
      ],
    },
    Powai: {
      localities: [
        { name: "Hiranandani", count: 0 },
        { name: "IIT Powai", count: 0 },
        { name: "Chandivali", count: 0 },
      ],
    },
  },
}

// Areas for each city - Updated with actual counts
const cityAreas = {
  Bangalore: [
    { name: "All Areas", count: 10 },
    { name: "MG Road", count: 1 },
    { name: "Koramangala", count: 2 },
    { name: "Brigade Road", count: 1 },
    { name: "Whitefield", count: 1 },
    { name: "Commercial Street", count: 1 },
    { name: "Peenya Industrial Area", count: 1 },
    { name: "Indiranagar", count: 2 },
    { name: "HSR Layout", count: 1 },
  ],
  Mumbai: [
    { name: "All Areas", count: 2 },
    { name: "Andheri", count: 1 },
    { name: "Bandra", count: 1 },
    { name: "Powai", count: 0 },
    { name: "Malad", count: 0 },
    { name: "Thane", count: 0 },
    { name: "Navi Mumbai", count: 0 },
  ],
  Delhi: [
    { name: "All Areas", count: 0 },
    { name: "Connaught Place", count: 0 },
    { name: "Karol Bagh", count: 0 },
    { name: "Lajpat Nagar", count: 0 },
    { name: "Saket", count: 0 },
    { name: "Dwarka", count: 0 },
    { name: "Gurgaon", count: 0 },
  ],
  Chennai: [
    { name: "All Areas", count: 0 },
    { name: "T. Nagar", count: 0 },
    { name: "Anna Nagar", count: 0 },
    { name: "Adyar", count: 0 },
    { name: "Velachery", count: 0 },
    { name: "OMR", count: 0 },
  ],
  Hyderabad: [
    { name: "All Areas", count: 0 },
    { name: "Banjara Hills", count: 0 },
    { name: "Jubilee Hills", count: 0 },
    { name: "Gachibowli", count: 0 },
    { name: "Secunderabad", count: 0 },
    { name: "Kukatpally", count: 0 },
  ],
}

// Ensure categoryFilters is always CATEGORIES (array of objects)
const categoryFilters = CATEGORIES;

// Add a mapping for legacy/old category ids to new ones
const CATEGORY_ID_MAP: Record<string, string> = {
  grocery: 'retail-general-stores',
  groceries: 'retail-general-stores',
  restaurant: 'food-beverage',
  food: 'food-beverage',
  // add more mappings as needed
};

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "rating", label: "Rating: High to Low" },
  { value: "delivery", label: "Delivery Time" },
  { value: "distance", label: "Distance" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
]

const popularCities = ["Bangalore", "Mumbai", "Delhi", "Chennai", "Hyderabad"]

// Search suggestions and history
const searchSuggestionsData = [
  "Restaurant", "Electronics", "Grocery", "Fashion", "Pizza", "Coffee", "Biryani", "Mobile", "Laptop", "Vegetables",
  "North Indian", "South Indian", "Italian", "Chinese", "Fast Food", "Cafe", "Supermarket", "Clothing", "Shoes", "Accessories"
]

// Delivery time options
const deliveryTimeOptions = [
  { value: "", label: "Any Time" },
  { value: "15-30", label: "15-30 mins" },
  { value: "30-45", label: "30-45 mins" },
  { value: "45-60", label: "45-60 mins" },
  { value: "1-2", label: "1-2 hours" },
  { value: "same-day", label: "Same Day" },
  { value: "next-day", label: "Next Day" }
]

// Add interfaces for type safety
interface Product {
  name: string;
  price: number;
}
interface Business {
  id: string;
  name: string;
  image?: string;
  isOpen: boolean;
  location: string;
  city: string;
  area: string;
  locality: string;
  category: string;
  subcategory: string;
  rating: number;
  reviews: number;
  priceRange: string;
  deliveryTime: string;
  distance: string;
  products: Product[];
}
interface Locality {
  name: string;
  count: number;
}

export default function BrowsePage() {
  const searchParams = useSearchParams()
  const { cart } = useCart()
  const { location, setCity, setArea, setLocality, getLocationDisplay } = useLocation()

  /* ---------------- STATE ---------------- */
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocalities, setSelectedLocalities] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [ratingFilter, setRatingFilter] = useState(0)
  const [distanceFilter, setDistanceFilter] = useState<number[]>([10])
  const [deliveryTimeFilter, setDeliveryTimeFilter] = useState<string>("")
  const [sortBy, setSortBy] = useState("relevance")
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)

  /* Advanced Search Features */
  const [isVoiceSearchActive, setIsVoiceSearchActive] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [imageSearchDialog, setImageSearchDialog] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  /* UI helpers */
  const [showFilters, setShowFilters] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["food-beverage"])
  const [expandedAreas, setExpandedAreas] = useState<string[]>([])
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)

  // Refs for voice search
  const searchInputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<any>(null)

  // Use location from global state
  const selectedCity = location.selectedCity
  const selectedArea = location.selectedArea || "All Areas"

  // Fetch businesses from API
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/business")
        const data = await res.json()
        setBusinesses(data.businesses || [])
      } catch (error) {
        console.error("Error fetching businesses:", error)
        setBusinesses([])
      } finally {
        setLoading(false)
      }
    }
    fetchBusinesses()
  }, [])

  // Place dynamicCategoryFilters here, with the other hooks
  const dynamicCategoryFilters = useMemo(() => {
    // Get unique categories from businesses
    const uniqueCategories = Array.from(new Set(businesses.map(b => b.category)));
    return uniqueCategories.map(catId => {
      // Try to get a friendly name from utils/category-data if possible
      const catObj = require("@/utils/category-data").getCategoryById(catId);
      return {
        id: catId,
        name: catObj ? catObj.name : catId,
        count: businesses.filter(b => b.category === catId).length,
        subcategories: [], // You can enhance this to pull subcategories if needed
      };
    });
  }, [businesses]);

  /* ------------------------------------------------------------------ */
  /* 2.  INITIALISE FROM URL – runs ONCE, avoids infinite loop          */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const q = searchParams.get("q") ?? searchParams.get("search") ?? ""
    const city = searchParams.get("city") ?? ""
    const area = searchParams.get("area") ?? ""
    const locality = searchParams.get("locality") ?? ""
    let category = searchParams.get("category") ?? ""

    // Map legacy category ids to new ones
    if (CATEGORY_ID_MAP[category]) {
      category = CATEGORY_ID_MAP[category];
    }

    console.log("[DEBUG] Browse page received search params:", { q, city, area, locality, category })

    /* only update when different to current state, so we don't loop */
    setSearchQuery((s) => (s !== q ? q : s))
    if (city && city !== selectedCity) setCity(city)
    if (area && area !== selectedArea) setArea(area)
    if (locality && !selectedLocalities.includes(locality)) setSelectedLocalities([locality])
    if (category && !selectedCategories.includes(category)) setSelectedCategories([category])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) //  <—  EMPTY dependency array prevents re-running

  /* ------------------------------------------------------------------ */
  /* 3.  FILTER + SORT (memoised)                                       */
  /* ------------------------------------------------------------------ */
  const filteredBusinesses = useMemo(() => {
    console.log("[DEBUG] Filtering businesses with search query:", searchQuery)
    const filtered = businesses.filter((b) => {
      // Search query matching
      const matchesSearch =
        !searchQuery ||
        (b.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.subcategory || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.locality || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.products.some((product: Product) =>
          (product.name || '').toLowerCase().includes(searchQuery.toLowerCase())
        )

      // Location matching
      const matchesCity = !selectedCity || b.city === selectedCity
      const matchesArea = selectedArea === "All Areas" || b.area === selectedArea
      const matchesLocality = selectedLocalities.length === 0 || selectedLocalities.includes(b.locality)

      // Category matching
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(b.category)
      const matchesSubcategory = selectedSubcategories.length === 0 || selectedSubcategories.includes(b.subcategory)

      // Other filters
      const matchesRating = b.rating >= ratingFilter
      const matchesDistance = Number.parseFloat(b.distance) <= distanceFilter[0]
      
      // Delivery time filter
      const matchesDeliveryTime = !deliveryTimeFilter || (() => {
        const deliveryTime = b.deliveryTime.toLowerCase()
        switch (deliveryTimeFilter) {
          case "15-30":
            return deliveryTime.includes("15") || deliveryTime.includes("20") || deliveryTime.includes("25") || deliveryTime.includes("30")
          case "30-45":
            return deliveryTime.includes("30") || deliveryTime.includes("35") || deliveryTime.includes("40") || deliveryTime.includes("45")
          case "45-60":
            return deliveryTime.includes("45") || deliveryTime.includes("50") || deliveryTime.includes("55") || deliveryTime.includes("60")
          case "1-2":
            return deliveryTime.includes("1-2") || deliveryTime.includes("2 hours")
          case "same-day":
            return deliveryTime.includes("same day") || deliveryTime.includes("today")
          case "next-day":
            return deliveryTime.includes("next day") || deliveryTime.includes("tomorrow")
          default:
            return true
        }
      })()

      return (
        matchesSearch &&
        matchesCity &&
        matchesArea &&
        matchesLocality &&
        matchesCategory &&
        matchesSubcategory &&
        matchesRating &&
        matchesDistance &&
        matchesDeliveryTime
      )
    })
    
    console.log("[DEBUG] Filtered businesses:", filtered);
    console.log("[DEBUG] Selected categories:", selectedCategories);
    return filtered
  }, [
    businesses,
    searchQuery,
    selectedCity,
    selectedArea,
    selectedLocalities,
    selectedCategories,
    selectedSubcategories,
    ratingFilter,
    distanceFilter,
    deliveryTimeFilter,
  ])

  const sortedBusinesses = useMemo(() => {
    const copy = [...filteredBusinesses]
    switch (sortBy) {
      case "rating":
        return copy.sort((a, b) => b.rating - a.rating)
      case "distance":
        return copy.sort((a, b) => Number.parseFloat(a.distance) - Number.parseFloat(b.distance))
      case "delivery":
        return copy.sort((a, b) => a.deliveryTime.localeCompare(b.deliveryTime))
      default:
        return copy
    }
  }, [filteredBusinesses, sortBy])

  /* ------------------------------------------------------------------ */
  /* 4.  RENDER – (no logic changed below this line)                    */
  /* ------------------------------------------------------------------ */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading businesses...</p>
        </div>
      </div>
    )
  }

  const toggleCategory = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter((c) => c !== categoryId))
    } else {
      setExpandedCategories([...expandedCategories, categoryId])
    }
  }

  const toggleArea = (area: string) => {
    if (expandedAreas.includes(area)) {
      setExpandedAreas(expandedAreas.filter((a) => a !== area))
    } else {
      setExpandedAreas([...expandedAreas, area])
    }
  }

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== categoryId))
      const categoryData = categoryFilters.find((c) => c.id === categoryId)
      if (categoryData) {
        const subcatsToRemove = categoryData.subcategories.map((s) => s.name)
        setSelectedSubcategories(selectedSubcategories.filter((s) => !subcatsToRemove.includes(s)))
      }
    }
  }

  const handleSubcategoryChange = (subcategory: string, checked: boolean) => {
    if (checked) {
      setSelectedSubcategories([...selectedSubcategories, subcategory])
    } else {
      setSelectedSubcategories(selectedSubcategories.filter((s) => s !== subcategory))
    }
  }

  const handleLocalityChange = (locality: string, checked: boolean) => {
    if (checked) {
      setSelectedLocalities([...selectedLocalities, locality])
    } else {
      setSelectedLocalities(selectedLocalities.filter((l) => l !== locality))
    }
  }

  const handleAreaChange = (area: string) => {
    setArea(area)
    // Clear locality filters when area changes
    setSelectedLocalities([])
    // Close expanded areas when switching
    setExpandedAreas([])
  }

  const handleCityChange = (city: string) => {
    setCity(city)
    setSelectedLocalities([])
    setShowLocationDropdown(false)
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedSubcategories([])
    setSelectedLocalities([])
    setPriceRange([0, 5000])
    setRatingFilter(0)
    setDistanceFilter([10])
    setDeliveryTimeFilter("")
    setSearchQuery("")
    setArea("All Areas")
  }

  // Advanced Search Functions
  const generateSearchSuggestions = (query: string) => {
    if (!query.trim()) {
      setSearchSuggestions([])
      return
    }
    
    const suggestions = searchSuggestionsData.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5)
    
    setSearchSuggestions(suggestions)
  }

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value)
    generateSearchSuggestions(value)
    setShowSuggestions(true)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
    // Add to search history
    if (!searchHistory.includes(suggestion)) {
      setSearchHistory(prev => [suggestion, ...prev.slice(0, 9)])
    }
  }

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported in your browser')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = false
    recognitionRef.current.interimResults = false
    recognitionRef.current.lang = 'en-US'

    recognitionRef.current.onstart = () => {
      setIsVoiceSearchActive(true)
    }

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setSearchQuery(transcript)
      setIsVoiceSearchActive(false)
      generateSearchSuggestions(transcript)
    }

    recognitionRef.current.onerror = () => {
      setIsVoiceSearchActive(false)
      alert('Voice search failed. Please try again.')
    }

    recognitionRef.current.onend = () => {
      setIsVoiceSearchActive(false)
    }

    recognitionRef.current.start()
  }

  const stopVoiceSearch = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsVoiceSearchActive(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        // Simulate image search - in real implementation, this would call an AI service
        setTimeout(() => {
          setSearchQuery("electronics mobile phone")
          setImageSearchDialog(false)
          setUploadedImage(null)
        }, 2000)
      }
      reader.readAsDataURL(file)
    }
  }

  // Use useMemo to prevent infinite re-renders
  const getAvailableAreas = () => {
    return cityAreas[selectedCity as keyof typeof cityAreas] || []
  }

  // Get available localities for selected city and area
  const getAvailableLocalities = () => {
    const cityData = locationHierarchy[selectedCity as keyof typeof locationHierarchy]
    if (!cityData) return []

    if (selectedArea === "All Areas") {
      // Return all localities from all areas with updated counts
      const allLocalities = Object.values(cityData)
        .flatMap((area: { localities: Locality[] }) => area.localities)
        .filter((locality: Locality, index: number, self: Locality[]) => self.findIndex((l) => l.name === locality.name) === index)

      // Update counts based on actual businesses
      return allLocalities.map((locality: Locality) => ({
        ...locality,
        count: businesses.filter((b) => b.city === selectedCity && b.locality === locality.name).length,
      }))
    }

    // Return localities for specific area with updated counts
    const areaData = cityData[selectedArea as keyof typeof cityData] as { localities: Locality[] } | undefined
    if (!areaData) return []

    return areaData.localities.map((locality: Locality) => ({
      ...locality,
      count: businesses.filter(
        (b) => b.city === selectedCity && b.area === selectedArea && b.locality === locality.name,
      ).length,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Location Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <span>{selectedCity}</span>
          {selectedArea !== "All Areas" && (
            <>
              <span>/</span>
              <span className="font-medium">{selectedArea}</span>
            </>
          )}
          {selectedLocalities.length === 1 && (
            <>
              <span>/</span>
              <span className="font-medium text-blue-600">{selectedLocalities[0]}</span>
            </>
          )}
        </div>

        {/* Advanced Search Bar */}
        <div className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                ref={searchInputRef}
                placeholder={`Search for businesses, products, or services in ${selectedCity}...`}
                value={searchQuery}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="pl-12 pr-24 h-12 text-lg"
              />
              
              {/* Voice Search Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-16 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={isVoiceSearchActive ? stopVoiceSearch : startVoiceSearch}
                disabled={!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)}
              >
                {isVoiceSearchActive ? (
                  <MicOff className="h-4 w-4 text-red-500" />
                ) : (
                  <Mic className="h-4 w-4 text-gray-500" />
                )}
              </Button>
              
              {/* Image Search Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-8 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setImageSearchDialog(true)}
              >
                <Camera className="h-4 w-4 text-gray-500" />
              </Button>
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && (searchSuggestions.length > 0 || searchHistory.length > 0) && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1">
                  {/* Search History */}
                  {searchHistory.length > 0 && !searchQuery && (
                    <div className="p-2 border-b">
                      <div className="text-xs text-gray-500 mb-2 px-2">Recent Searches</div>
                      {searchHistory.slice(0, 3).map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-2 py-2 hover:bg-gray-50 cursor-pointer rounded"
                          onClick={() => handleSuggestionClick(item)}
                        >
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Search Suggestions */}
                  {searchSuggestions.length > 0 && (
                    <div className="p-2">
                      <div className="text-xs text-gray-500 mb-2 px-2">Suggestions</div>
                      {searchSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-2 py-2 hover:bg-gray-50 cursor-pointer rounded"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <Search className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <Button
              variant="outline"
              className="lg:hidden h-12 bg-transparent"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters - Enhanced with City and Locality */}
          <div className={`w-80 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card className="p-6 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              </div>

              {/* Location/Area Filter with Localities */}
              <div className="space-y-4 mb-6">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location in {selectedCity}
                </h4>

                {/* Area Selection */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Areas</div>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {getAvailableAreas().map((area) => (
                      <div key={area.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={area.name}
                            checked={selectedArea === area.name}
                            onCheckedChange={() => handleAreaChange(area.name)}
                          />
                          <label htmlFor={area.name} className="text-sm cursor-pointer">
                            {area.name}
                          </label>
                        </div>
                        <span className="text-xs text-gray-500">({area.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Locality Selection */}
                {selectedArea !== "All Areas" && getAvailableLocalities().length > 0 && (
                  <div className="space-y-2 border-t pt-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        Localities in {selectedArea}
                      </div>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {getAvailableLocalities().map((locality) => (
                        <div key={locality.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={locality.name}
                              checked={selectedLocalities.includes(locality.name)}
                              onCheckedChange={(checked) => handleLocalityChange(locality.name, checked as boolean)}
                            />
                            <label htmlFor={locality.name} className="text-sm cursor-pointer">
                              {locality.name}
                            </label>
                          </div>
                          <span className="text-xs text-gray-500">({locality.count})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Distance Filter */}
              <div className="space-y-3 pb-4 border-b">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  Distance
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Within {distanceFilter[0]} km</span>
                    <span className="text-gray-500">from your location</span>
                  </div>
                  <Slider
                    value={distanceFilter}
                    onValueChange={setDistanceFilter}
                    max={20}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 km</span>
                    <span>20 km</span>
                  </div>
                </div>
              </div>

              {/* Delivery Time Filter */}
              <div className="space-y-3 pb-4 border-b">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Delivery Time
                </h4>
                <div className="space-y-2">
                  <select
                    value={deliveryTimeFilter}
                    onChange={(e) => setDeliveryTimeFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  >
                    {deliveryTimeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-3 pb-4 border-b">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Minimum Rating
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{ratingFilter}+ stars</span>
                  </div>
                  <Slider
                    value={[ratingFilter]}
                    onValueChange={(value) => setRatingFilter(value[0])}
                    max={5}
                    min={0}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0+</span>
                    <span>5+</span>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Categories</h4>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {categoryFilters.map((category) => (
                    <div key={category.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Checkbox
                          id={category.id}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                        />
                        <label htmlFor={category.id} className="text-sm font-medium cursor-pointer">
                          {category.name}
                        </label>
                        {/* No count available in CATEGORIES */}
                      </div>
                      {/* Remove subcategory toggle for now */}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content - Business Listings */}
          <div className="flex-1">
            {/* Search Results Header */}
            {searchQuery && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">
                      Search Results for "{searchQuery}"
                    </h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Found {filteredBusinesses.length} businesses and products matching your search
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSearchQuery("")}
                    className="text-blue-600 border-blue-300 hover:bg-blue-100"
                  >
                    Clear Search
                  </Button>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {filteredBusinesses.length} Results in {selectedArea}, {selectedCity}
                {selectedCategories.length > 0 && (
                  <span className="text-blue-600"> - {selectedCategories.join(", ")}</span>
                )}
              </h2>
              <div className="flex items-center space-x-2">
                <label htmlFor="sort" className="text-sm text-gray-700">
                  Sort by:
                </label>
                <select
                  id="sort"
                  className="border rounded px-3 py-2 text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedBusinesses.map((business) => (
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
                      
                      {/* Show matching products when searching */}
                      {searchQuery && business.products.some((product: Product) => 
                        product.name.toLowerCase().includes(searchQuery.toLowerCase())
                      ) && (
                        <div className="mb-2">
                          <p className="text-xs text-green-600 font-medium mb-1">Matching Products:</p>
                          <div className="space-y-1">
                            {business.products
                              .filter((product: Product) => 
                                product.name.toLowerCase().includes(searchQuery.toLowerCase())
                              )
                              .slice(0, 2)
                              .map((product: Product, index: number) => (
                                <div key={index} className="text-xs text-gray-600 flex items-center gap-1">
                                  <span>•</span>
                                  <span>{product.name}</span>
                                  <span className="text-green-600">₹{product.price}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500">
                            {Array(Math.floor(business.rating))
                              .fill(null)
                              .map((_, i) => (
                                <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                  <path d="M12,17.27L18.18,21L16.86,13.81L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.14,13.81L5.82,21L12,17.27Z" />
                                </svg>
                              ))}
                          </span>
                          <span className="text-gray-700">{business.rating}</span>
                          <span className="text-gray-500">({business.reviews})</span>
                        </div>
                        <span className="text-gray-700">{business.priceRange}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {sortedBusinesses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No businesses found</p>
                  <p className="text-sm">Try adjusting your filters or search terms</p>
                </div>
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Search Dialog */}
      <Dialog open={imageSearchDialog} onOpenChange={setImageSearchDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Search by Image
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Upload an image to find similar products or businesses
            </p>
            
            {uploadedImage ? (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                    onClick={() => setUploadedImage(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-sm text-gray-600 mt-2">Analyzing image...</p>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-4">
                  Click to upload an image or drag and drop
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
                >
                  Choose Image
                </label>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
