"use client"

import { useState, useEffect, useCallback } from "react"

export interface LocationState {
  selectedCity: string
  selectedArea: string
  selectedLocality: string
}

// Global location state
let globalLocationState: LocationState = {
  selectedCity: "",
  selectedArea: "All Areas",
  selectedLocality: "",
}

// Location listeners
const locationListeners = new Set<() => void>()

const notifyLocationListeners = () => {
  locationListeners.forEach((listener) => listener())
}

export function useLocation() {
  const [location, setLocation] = useState<LocationState>(globalLocationState)

  // Subscribe to location updates
  useEffect(() => {
    const updateLocation = () => {
      setLocation({ ...globalLocationState })
    }

    locationListeners.add(updateLocation)

    return () => {
      locationListeners.delete(updateLocation)
    }
  }, [])

  // Load location from localStorage on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation")
    if (savedLocation) {
      try {
        const parsedLocation = JSON.parse(savedLocation)
        globalLocationState = {
          selectedCity: parsedLocation.selectedCity || "",
          selectedArea: parsedLocation.selectedArea || "All Areas",
          selectedLocality: parsedLocation.selectedLocality || "",
        }
        setLocation(globalLocationState)
      } catch (error) {
        console.error("Error parsing location from localStorage:", error)
      }
    }
  }, [])

  const updateGlobalLocation = (newLocation: LocationState) => {
    globalLocationState = newLocation
    localStorage.setItem("userLocation", JSON.stringify(newLocation))
    notifyLocationListeners()
  }

  const setCity = useCallback((city: string) => {
    const newLocation = {
      selectedCity: city,
      selectedArea: "All Areas",
      selectedLocality: "",
    }
    updateGlobalLocation(newLocation)
  }, [])

  const setArea = useCallback((area: string) => {
    const newLocation = {
      ...globalLocationState,
      selectedArea: area,
      selectedLocality: "",
    }
    updateGlobalLocation(newLocation)
  }, [])

  const setLocality = useCallback((locality: string) => {
    const newLocation = {
      ...globalLocationState,
      selectedLocality: locality,
    }
    updateGlobalLocation(newLocation)
  }, [])

  const clearLocation = useCallback(() => {
    const newLocation = {
      selectedCity: globalLocationState.selectedCity,
      selectedArea: "All Areas",
      selectedLocality: "",
    }
    updateGlobalLocation(newLocation)
  }, [])

  const getLocationDisplay = useCallback(() => {
    if (location.selectedLocality && location.selectedArea && location.selectedArea !== "All Areas") {
      return `${location.selectedLocality}, ${location.selectedArea}`
    }
    if (location.selectedArea && location.selectedArea !== "All Areas") {
      return `${location.selectedArea}, ${location.selectedCity}`
    }
    if (location.selectedCity) {
      return location.selectedCity
    }
    return "Select Location"
  }, [location])

  return {
    location,
    setCity,
    setArea,
    setLocality,
    clearLocation,
    getLocationDisplay,
  }
}
