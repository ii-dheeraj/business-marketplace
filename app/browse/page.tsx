"use client"

import { useState, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
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
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useCart } from "@/hooks/useCart"
import { useLocation } from "@/hooks/useLocation"
import { CartDrawer } from "@/components/cart-drawer"

// Enhanced business data with detailed location hierarchy
const BUSINESSES = [
  {
    id: 1,
    name: "Sharma Electronics",
    category: "Electronics",
    subcategory: "Mobile & Accessories",
    location: "MG Road, Bangalore",
    city: "Bangalore",
    area: "MG Road",
    locality: "Brigade Road Junction",
    landmark: "Near Metro Station",
    pincode: "560001",
    coordinates: { lat: 12.9716, lng: 77.5946 },
    rating: 4.5,
    reviews: 128,
    image: "/placeholder.svg?height=200&width=300&text=Electronics+Store",
    isOpen: true,
    deliveryTime: "30-45 mins",
    priceRange: "₹₹",
    distance: "2.3 km",
    deliveryRadius: 5,
    products: [
      { name: "iPhone 15", price: 79999, image: "/placeholder.svg?height=100&width=100" },
      { name: "Samsung Galaxy", price: 65999, image: "/placeholder.svg?height=100&width=100" },
    ],
  },
  {
    id: 2,
    name: "Taste of India Restaurant",
    category: "Restaurant",
    subcategory: "North Indian",
    location: "Koramangala, Bangalore",
    city: "Bangalore",
    area: "Koramangala",
    locality: "5th Block",
    landmark: "Near Forum Mall",
    pincode: "560095",
    coordinates: { lat: 12.9352, lng: 77.6245 },
    rating: 4.8,
    reviews: 256,
    image: "/placeholder.svg?height=200&width=300&text=Indian+Restaurant",
    isOpen: true,
    deliveryTime: "25-35 mins",
    priceRange: "₹₹",
    distance: "1.8 km",
    deliveryRadius: 3,
    products: [
      { name: "Butter Chicken", price: 299, image: "/placeholder.svg?height=100&width=100" },
      { name: "Biryani", price: 249, image: "/placeholder.svg?height=100&width=100" },
    ],
  },
  {
    id: 3,
    name: "Pizza Corner",
    category: "Restaurant",
    subcategory: "Italian",
    location: "Brigade Road, Bangalore",
    city: "Bangalore",
    area: "Brigade Road",
    locality: "Church Street",
    landmark: "Opposite UB City Mall",
    pincode: "560025",
    coordinates: { lat: 12.9698, lng: 77.6205 },
    rating: 4.2,
    reviews: 189,
    image: "/placeholder.svg?height=200&width=300&text=Pizza+Restaurant",
    isOpen: true,
    deliveryTime: "20-30 mins",
    priceRange: "₹₹₹",
    distance: "3.1 km",
    deliveryRadius: 4,
    products: [
      { name: "Margherita Pizza", price: 399, image: "/placeholder.svg?height=100&width=100" },
      { name: "Pepperoni Pizza", price: 499, image: "/placeholder.svg?height=100&width=100" },
    ],
  },
  {
    id: 4,
    name: "Fresh Mart Grocery",
    category: "Grocery",
    subcategory: "Supermarket",
    location: "Whitefield, Bangalore",
    city: "Bangalore",
    area: "Whitefield",
    locality: "ITPL Main Road",
    landmark: "Near Phoenix MarketCity",
    pincode: "560066",
    coordinates: { lat: 12.9698, lng: 77.75 },
    rating: 4.3,
    reviews: 89,
    image: "/placeholder.svg?height=200&width=300&text=Grocery+Store",
    isOpen: false,
    deliveryTime: "45-60 mins",
    priceRange: "₹",
    distance: "5.2 km",
    deliveryRadius: 6,
    products: [
      { name: "Fresh Vegetables", price: 150, image: "/placeholder.svg?height=100&width=100" },
      { name: "Dairy Products", price: 200, image: "/placeholder.svg?height=100&width=100" },
    ],
  },
  {
    id: 5,
    name: "Fashion Hub",
    category: "Fashion",
    subcategory: "Clothing",
    location: "Commercial Street, Bangalore",
    city: "Bangalore",
    area: "Commercial Street",
    locality: "Shivaji Nagar",
    landmark: "Near Russell Market",
    pincode: "560001",
    coordinates: { lat: 12.9833, lng: 77.6167 },
    rating: 4.1,
    reviews: 67,
    image: "/placeholder.svg?height=200&width=300&text=Fashion+Store",
    isOpen: true,
    deliveryTime: "1-2 days",
    priceRange: "₹₹",
    distance: "2.7 km",
    deliveryRadius: 8,
    products: [
      { name: "T-Shirts", price: 599, image: "/placeholder.svg?height=100&width=100" },
      { name: "Jeans", price: 1299, image: "/placeholder.svg?height=100&width=100" },
    ],
  },
  {
    id: 6,
    name: "Heavy Equipment Solutions",
    category: "Construction Equipment",
    subcategory: "Excavators",
    location: "Industrial Area, Bangalore",
    city: "Bangalore",
    area: "Peenya Industrial Area",
    locality: "4th Phase",
    landmark: "Near Peenya Metro Station",
    pincode: "560058",
    coordinates: { lat: 13.0389, lng: 77.5194 },
    rating: 4.6,
    reviews: 45,
    image: "/placeholder.svg?height=200&width=300&text=Construction+Equipment",
    isOpen: true,
    deliveryTime: "Contact for delivery",
    priceRange: "₹₹₹₹",
    distance: "8.5 km",
    deliveryRadius: 15,
    products: [
      { name: "Caterpillar Excavator", price: 4500000, image: "/placeholder.svg?height=100&width=100" },
      { name: "Komatsu Excavator", price: 3800000, image: "/placeholder.svg?height=100&width=100" },
    ],
  },
  {
    id: 7,
    name: "Cafe Mocha",
    category: "Restaurant",
    subcategory: "Cafe",
    location: "Indiranagar, Bangalore",
    city: "Bangalore",
    area: "Indiranagar",
    locality: "100 Feet Road",
    landmark: "Near CMH Road Junction",
    pincode: "560038",
    coordinates: { lat: 12.9719, lng: 77.6412 },
    rating: 4.4,
    reviews: 134,
    image: "/placeholder.svg?height=200&width=300&text=Cafe",
    isOpen: true,
    deliveryTime: "15-25 mins",
    priceRange: "₹₹",
    distance: "1.2 km",
    deliveryRadius: 3,
    products: [
      { name: "Cappuccino", price: 149, image: "/placeholder.svg?height=100&width=100" },
      { name: "Sandwich", price: 199, image: "/placeholder.svg?height=100&width=100" },
    ],
  },
  {
    id: 8,
    name: "Tech Repair Hub",
    category: "Services",
    subcategory: "Electronics Repair",
    location: "HSR Layout, Bangalore",
    city: "Bangalore",
    area: "HSR Layout",
    locality: "Sector 1",
    landmark: "Near BDA Complex",
    pincode: "560102",
    coordinates: { lat: 12.9082, lng: 77.6476 },
    rating: 4.7,
    reviews: 92,
    image: "/placeholder.svg?height=200&width=300&text=Repair+Service",
    isOpen: true,
    deliveryTime: "Same day",
    priceRange: "₹₹",
    distance: "4.1 km",
    deliveryRadius: 5,
    products: [
      { name: "Phone Repair", price: 999, image: "/placeholder.svg?height=100&width=100" },
      { name: "Laptop Repair", price: 1999, image: "/placeholder.svg?height=100&width=100" },
    ],
  },
  {
    id: 9,
    name: "Spice Garden Restaurant",
    category: "Restaurant",
    subcategory: "South Indian",
    location: "Koramangala, Bangalore",
    city: "Bangalore",
    area: "Koramangala",
    locality: "6th Block",
    landmark: "Near Sony World Signal",
    pincode: "560095",
    coordinates: { lat: 12.9279, lng: 77.6271 },
    rating: 4.6,
    reviews: 203,
    image: "/placeholder.svg?height=200&width=300&text=South+Indian+Restaurant",
    isOpen: true,
    deliveryTime: "30-40 mins",
    priceRange: "₹₹",
    distance: "2.1 km",
    deliveryRadius: 4,
    products: [
      { name: "Masala Dosa", price: 120, image: "/placeholder.svg?height=100&width=100" },
      { name: "Filter Coffee", price: 40, image: "/placeholder.svg?height=100&width=100" },
    ],
  },
  {
    id: 10,
    name: "BookWorm Library Cafe",
    category: "Restaurant",
    subcategory: "Cafe",
    location: "Indiranagar, Bangalore",
    city: "Bangalore",
    area: "Indiranagar",
    locality: "12th Main Road",
    landmark: "Near Chinnaswamy Stadium",
    pincode: "560038",
    coordinates: { lat: 12.9698, lng: 77.6382 },
    rating: 4.3,
    reviews: 87,
    image: "/placeholder.svg?height=200&width=300&text=Library+Cafe",
    isOpen: true,
    deliveryTime: "20-30 mins",
    priceRange: "₹₹",
    distance: "1.5 km",
    deliveryRadius: 3,
    products: [
      { name: "Cold Brew", price: 180, image: "/placeholder.svg?height=100&width=100" },
      { name: "Cheesecake", price: 250, image: "/placeholder.svg?height=100&width=100" },
    ],
  },
  // Add Mumbai businesses
  {
    id: 11,
    name: "Mumbai Spice Kitchen",
    category: "Restaurant",
    subcategory: "Indian",
    location: "Andheri, Mumbai",
    city: "Mumbai",
    area: "Andheri",
    locality: "Andheri West",
    landmark: "Near Infinity Mall",
    pincode: "400053",
    coordinates: { lat: 19.1136, lng: 72.8697 },
    rating: 4.4,
    reviews: 178,
    image: "/placeholder.svg?height=200&width=300&text=Mumbai+Restaurant",
    isOpen: true,
    deliveryTime: "35-45 mins",
    priceRange: "₹₹",
    distance: "2.8 km",
    deliveryRadius: 5,
    products: [
      { name: "Vada Pav", price: 25, image: "/placeholder.svg?height=100&width=100" },
      { name: "Pav Bhaji", price: 120, image: "/placeholder.svg?height=100&width=100" },
    ],
  },
  {
    id: 12,
    name: "Bandra Electronics Hub",
    category: "Electronics",
    subcategory: "Mobile & Accessories",
    location: "Bandra, Mumbai",
    city: "Mumbai",
    area: "Bandra",
    locality: "Bandra West",
    landmark: "Near Linking Road",
    pincode: "400050",
    coordinates: { lat: 19.0596, lng: 72.8295 },
    rating: 4.2,
    reviews: 95,
    image: "/placeholder.svg?height=200&width=300&text=Mumbai+Electronics",
    isOpen: true,
    deliveryTime: "40-50 mins",
    priceRange: "₹₹",
    distance: "3.5 km",
    deliveryRadius: 6,
    products: [
      { name: "iPhone 15", price: 79999, image: "/placeholder.svg?height=100&width=100" },
      { name: "OnePlus 12", price: 64999, image: "/placeholder.svg?height=100&width=100" },
    ],
  },
]

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

// Category structure with subcategories - Updated with actual counts
const categoryFilters = [
  {
    name: "Restaurant",
    count: 5,
    subcategories: [
      { name: "North Indian", count: 1 },
      { name: "South Indian", count: 1 },
      { name: "Italian", count: 1 },
      { name: "Cafe", count: 2 },
      { name: "Indian", count: 1 },
      { name: "Chinese", count: 0 },
      { name: "Fast Food", count: 0 },
    ],
  },
  {
    name: "Electronics",
    count: 2,
    subcategories: [
      { name: "Mobile & Accessories", count: 2 },
      { name: "Laptops", count: 0 },
      { name: "Audio", count: 0 },
    ],
  },
  {
    name: "Grocery",
    count: 1,
    subcategories: [
      { name: "Supermarket", count: 1 },
      { name: "Organic", count: 0 },
      { name: "Local Store", count: 0 },
    ],
  },
  {
    name: "Fashion",
    count: 1,
    subcategories: [
      { name: "Clothing", count: 1 },
      { name: "Shoes", count: 0 },
      { name: "Accessories", count: 0 },
    ],
  },
  {
    name: "Services",
    count: 1,
    subcategories: [
      { name: "Electronics Repair", count: 1 },
      { name: "Home Services", count: 0 },
      { name: "Beauty", count: 0 },
    ],
  },
  {
    name: "Construction Equipment",
    count: 1,
    subcategories: [
      { name: "Excavators", count: 1 },
      { name: "Cranes", count: 0 },
      { name: "Bulldozers", count: 0 },
    ],
  },
]

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "rating", label: "Rating: High to Low" },
  { value: "delivery", label: "Delivery Time" },
  { value: "distance", label: "Distance" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
]

const popularCities = ["Bangalore", "Mumbai", "Delhi", "Chennai", "Hyderabad"]

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
  const [distanceFilter, setDistanceFilter] = useState<[number]>([10])
  const [sortBy, setSortBy] = useState("relevance")

  /* UI helpers */
  const [showFilters, setShowFilters] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Restaurant"])
  const [expandedAreas, setExpandedAreas] = useState<string[]>([])
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)

  // Use location from global state
  const selectedCity = location.selectedCity || "Bangalore"
  const selectedArea = location.selectedArea || "All Areas"

  /* ------------------------------------------------------------------ */
  /* 2.  INITIALISE FROM URL – runs ONCE, avoids infinite loop          */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const q = searchParams.get("search") ?? ""
    const city = searchParams.get("city") ?? ""
    const area = searchParams.get("area") ?? ""
    const locality = searchParams.get("locality") ?? ""
    const category = searchParams.get("category") ?? ""

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
    return BUSINESSES.filter((b) => {
      // Search query matching
      const matchesSearch =
        !searchQuery ||
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.locality.toLowerCase().includes(searchQuery.toLowerCase())

      // Location matching
      const matchesCity = !selectedCity || selectedCity === "Select Location" || b.city === selectedCity
      const matchesArea = selectedArea === "All Areas" || b.area === selectedArea
      const matchesLocality = selectedLocalities.length === 0 || selectedLocalities.includes(b.locality)

      // Category matching
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(b.category)
      const matchesSubcategory = selectedSubcategories.length === 0 || selectedSubcategories.includes(b.subcategory)

      // Other filters
      const matchesRating = b.rating >= ratingFilter
      const matchesDistance = Number.parseFloat(b.distance) <= distanceFilter[0]

      return (
        matchesSearch &&
        matchesCity &&
        matchesArea &&
        matchesLocality &&
        matchesCategory &&
        matchesSubcategory &&
        matchesRating &&
        matchesDistance
      )
    })
  }, [
    searchQuery,
    selectedCity,
    selectedArea,
    selectedLocalities,
    selectedCategories,
    selectedSubcategories,
    ratingFilter,
    distanceFilter,
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

  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter((c) => c !== category))
    } else {
      setExpandedCategories([...expandedCategories, category])
    }
  }

  const toggleArea = (area: string) => {
    if (expandedAreas.includes(area)) {
      setExpandedAreas(expandedAreas.filter((a) => a !== area))
    } else {
      setExpandedAreas([...expandedAreas, area])
    }
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
      const categoryData = categoryFilters.find((c) => c.name === category)
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
    setSearchQuery("")
    setArea("All Areas")
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
        .flatMap((area) => area.localities)
        .filter((locality, index, self) => self.findIndex((l) => l.name === locality.name) === index)

      // Update counts based on actual businesses
      return allLocalities.map((locality) => ({
        ...locality,
        count: BUSINESSES.filter((b) => b.city === selectedCity && b.locality === locality.name).length,
      }))
    }

    // Return localities for specific area with updated counts
    const areaData = cityData[selectedArea as keyof typeof cityData]
    if (!areaData) return []

    return areaData.localities.map((locality) => ({
      ...locality,
      count: BUSINESSES.filter(
        (b) => b.city === selectedCity && b.area === selectedArea && b.locality === locality.name,
      ).length,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Location */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600 mr-6">
                LocalMarket
              </Link>

              {/* Location Selector */}
              <div className="relative">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                >
                  <MapPin className="h-4 w-4 text-red-500" />
                  <span className="font-medium">{getLocationDisplay()}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>

                {showLocationDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border rounded-lg shadow-lg z-50">
                    <div className="p-3 border-b">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Target className="h-4 w-4" />
                        <span>Select your city</span>
                      </div>
                    </div>
                    <div className="p-2">
                      <div className="text-xs text-gray-500 mb-2">POPULAR CITIES</div>
                      {popularCities.map((city) => (
                        <button
                          key={city}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded ${
                            selectedCity === city ? "bg-blue-50 text-blue-600 font-medium" : ""
                          }`}
                          onClick={() => handleCityChange(city)}
                        >
                          📍 {city}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat
              </Button>
              <CartDrawer>
                <Button variant="outline" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart ({cart.totalItems})
                </Button>
              </CartDrawer>
            </div>
          </div>
        </div>
      </header>

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

        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder={`Search for businesses, products, or services in ${selectedCity}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
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

              {/* Categories */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Categories</h4>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {categoryFilters.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={category.name}
                            checked={selectedCategories.includes(category.name)}
                            onCheckedChange={(checked) => handleCategoryChange(category.name, checked as boolean)}
                          />
                          <label htmlFor={category.name} className="text-sm font-medium cursor-pointer">
                            {category.name}
                          </label>
                          <span className="text-xs text-gray-500">({category.count})</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => toggleCategory(category.name)}
                        >
                          {expandedCategories.includes(category.name) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {expandedCategories.includes(category.name) && (
                        <div className="space-y-2 pl-6">
                          {categoryFilters
                            .find((c) => c.name === category.name)
                            ?.subcategories.map((subcategory) => (
                              <div key={subcategory.name} className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id={subcategory.name}
                                    checked={selectedSubcategories.includes(subcategory.name)}
                                    onCheckedChange={(checked) =>
                                      handleSubcategoryChange(subcategory.name, checked as boolean)
                                    }
                                  />
                                  <label htmlFor={subcategory.name} className="text-sm cursor-pointer">
                                    {subcategory.name}
                                  </label>
                                </div>
                                <span className="text-xs text-gray-500">({subcategory.count})</span>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content - Business Listings */}
          <div className="flex-1">
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
    </div>
  )
}
