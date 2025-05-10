'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MapView } from "@/components/map-view"
import { Sidebar } from "@/components/sidebar"
import { LoadingScreen } from "@/components/loading-screen"
import { StudySpace } from "@/types/study-space"
import { RotateCcw, Menu, Crosshair } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { SAMPLE_SPACES } from "@/data/study-spaces"



export default function StudySpacesPage() {
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mapKey, setMapKey] = useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [nearestSpace, setNearestSpace] = useState<StudySpace | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(true)
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Call once to set initial state

    // Simulate loading delay
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(loadingTimer)
    }
  }, [])

  useEffect(() => {
    if (userLocation) {
      const nearest = findNearestSpace(userLocation, SAMPLE_SPACES)
      setNearestSpace(nearest)
    }
  }, [userLocation])

  const handleSpaceSelect = (spaceId: string) => {
    setSelectedSpace(spaceId)
    
    // Track space selection
    trackEvent({
      action: 'select_space',
      category: 'Space Interaction',
      label: spaceId
    })
  }

  const handleMapReload = () => {
    setMapKey((prevKey) => prevKey + 1)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const getUserLocation = () => {
    if (navigator.geolocation) {
      // Track location request
      trackEvent({
        action: 'request_location',
        category: 'User Location'
      })
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.longitude, position.coords.latitude])
        },
        (error) => {
          console.error("Error getting user location:", error)
          alert("Unable to get your location. Please check your browser settings.")
        }
      )
    } else {
      alert("Geolocation is not supported by your browser.")
    }
  }

  return (
    <div className="relative h-screen w-full">
      {isLoading && <LoadingScreen />}
      <MapView
        key={mapKey}
        spaces={SAMPLE_SPACES}
        onMarkerClick={handleSpaceSelect}
        selectedSpaceId={selectedSpace}
        currentTime={currentTime}
        userLocation={userLocation}
        nearestSpace={nearestSpace}
      />
      <Sidebar
        spaces={SAMPLE_SPACES}
        onSpaceSelect={handleSpaceSelect}
        selectedSpaceId={selectedSpace} // Pass selectedSpace here
        currentTime={currentTime}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userLocation={userLocation}
        nearestSpace={nearestSpace}
      />
      <div className="absolute top-4 left-4 z-40 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="bg-purple-800/70 border-purple-700/50 text-white hover:bg-purple-700/70"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
      <div className="absolute top-4 right-4 z-40 flex flex-col gap-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-purple-800/70 border-purple-700/50 text-white hover:bg-purple-700/70 flex items-center gap-2 font-bold"
          onClick={getUserLocation}
        >
          <Crosshair className="h-4 w-4" />
          Get My Location
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-purple-800/70 border-purple-700/50 text-white hover:bg-purple-700/70 flex items-center gap-2 font-bold"
          onClick={handleMapReload}
        >
          <RotateCcw className="h-4 w-4" />
          Reload Map
        </Button>
      </div>
    </div>
  )
}

function findNearestSpace(userLocation: [number, number], spaces: StudySpace[]): StudySpace | null {
  if (spaces.length === 0) return null

  let nearestSpace = spaces[0]
  let shortestDistance = calculateDistance(userLocation, spaces[0].coordinates)

  for (let i = 1; i < spaces.length; i++) {
    const distance = calculateDistance(userLocation, spaces[i].coordinates)
    if (distance < shortestDistance) {
      shortestDistance = distance
      nearestSpace = spaces[i]
    }
  }

  return nearestSpace
}

function calculateDistance(coord1: [number, number], coord2: [number, number]): number {
  const R = 6371 // Radius of the Earth in kilometers
  const lat1 = coord1[1] * Math.PI / 180
  const lat2 = coord2[1] * Math.PI / 180
  const lon1 = coord1[0] * Math.PI / 180
  const lon2 = coord2[0] * Math.PI / 180

  const dLat = lat2 - lat1
  const dLon = lon2 - lon1

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  const distance = R * c

  return distance
}

