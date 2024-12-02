'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MapView } from "@/components/map-view"
import { Sidebar } from "@/components/sidebar"
import { LoadingScreen } from "@/components/loading-screen"
import { StudySpace } from "@/types/study-space"
import { RotateCcw, Menu, Crosshair } from 'lucide-react'

// Sample data - in a real app this would come from an API
const SAMPLE_SPACES: StudySpace[] = [
  {
    id: "1",
    name: "Main Library",
    image: "/images/main-library.jpg",
    rating: 4.5,
    nearestStation: "Oxford Road Station",
    distance: 0.5,
    coordinates: [-2.2353, 53.4645],
    openingHours: {
      "Monday": { open: "00:00", close: "23:59" },
      "Tuesday": { open: "00:00", close: "23:59" },
      "Wednesday": { open: "00:00", close: "23:59" },
      "Thursday": { open: "00:00", close: "23:59" },
      "Friday": { open: "00:00", close: "23:59" },
      "Saturday": { open: "00:00", close: "23:59" },
      "Sunday": { open: "00:00", close: "23:59" }
    }
  },
  {
    id: "2",
    name: "Alan Gilbert Learning Commons",
    image: "/images/learning-commons.jpg",
    rating: 4.4,
    nearestStation: "Oxford Road Station",
    distance: 0.3,
    coordinates: [-2.23319, 53.465052],
    openingHours: {
      "Monday": { open: "00:00", close: "23:59" },
      "Tuesday": { open: "00:00", close: "23:59" },
      "Wednesday": { open: "00:00", close: "23:59" },
      "Thursday": { open: "00:00", close: "23:59" },
      "Friday": { open: "00:00", close: "23:59" },
      "Saturday": { open: "00:00", close: "23:59" },
      "Sunday": { open: "00:00", close: "23:59" }
    }
  },
  {
    id: "3",
    name: "AMBS",
    image: "/images/ambs.jpg",
    rating: 4.2,
    nearestStation: "Oxford Road Station",
    distance: 0.4,
    coordinates: [-2.237411, 53.467210],
    openingHours: {
      "Monday": { open: "08:00", close: "22:00" },
      "Tuesday": { open: "08:00", close: "22:00" },
      "Wednesday": { open: "08:00", close: "22:00" },
      "Thursday": { open: "08:00", close: "22:00" },
      "Friday": { open: "08:00", close: "22:00" },
      "Saturday": { open: "10:00", close: "18:00" },
      "Sunday": { open: "10:00", close: "18:00" }
    }
  },
  {
    id: "4",
    name: "John Rylands Library",
    image: "/images/john-rylands.jpg",
    rating: 4.7,
    nearestStation: "Deansgate Station",
    distance: 1.2,
    coordinates: [-2.2486, 53.4808],
    openingHours: {
      "Monday": { open: "10:00", close: "17:00" },
      "Tuesday": { open: "10:00", close: "17:00" },
      "Wednesday": { open: "10:00", close: "17:00" },
      "Thursday": { open: "10:00", close: "17:00" },
      "Friday": { open: "10:00", close: "17:00" },
      "Saturday": { open: "10:00", close: "17:00" },
      "Sunday": { open: "12:00", close: "17:00" }
    }
  },
  {
    id: "5",
    name: "Students' Union",
    image: "/images/students-union.jpg",
    rating: 4.0,
    nearestStation: "Oxford Road Station",
    distance: 0.2,
    coordinates: [-2.232018, 53.464437],
    openingHours: {
      "Monday": { open: "08:00", close: "23:00" },
      "Tuesday": { open: "08:00", close: "23:00" },
      "Wednesday": { open: "08:00", close: "23:00" },
      "Thursday": { open: "08:00", close: "23:00" },
      "Friday": { open: "08:00", close: "23:00" },
      "Saturday": { open: "10:00", close: "20:00" },
      "Sunday": { open: "10:00", close: "20:00" }
    }
  },
  {
    id: "6",
    name: "Central Library",
    image: "/images/central-library.jpeg",
    rating: 4.6,
    nearestStation: "St Peter's Square Station",
    distance: 1.0,
    coordinates: [-2.244521, 53.477839],
    openingHours: {
      "Monday": { open: "09:00", close: "20:00" },
      "Tuesday": { open: "09:00", close: "20:00" },
      "Wednesday": { open: "09:00", close: "20:00" },
      "Thursday": { open: "09:00", close: "20:00" },
      "Friday": { open: "09:00", close: "17:00" },
      "Saturday": { open: "09:00", close: "17:00" },
      "Sunday": { open: "00:00", close: "00:00" }
    }
  },
  {
    id: "7",
    name: "Joule Library",
    image: "/images/joule-library.jpg",
    rating: 4.1,
    nearestStation: "Oxford Road Station",
    distance: 0.6,
    coordinates: [-2.233876, 53.467433],
    openingHours: {
      "Monday": { open: "09:00", close: "21:00" },
      "Tuesday": { open: "09:00", close: "21:00" },
      "Wednesday": { open: "09:00", close: "21:00" },
      "Thursday": { open: "09:00", close: "21:00" },
      "Friday": { open: "09:00", close: "17:00" },
      "Saturday": { open: "10:00", close: "17:00" },
      "Sunday": { open: "10:00", close: "17:00" }
    }
  },
  {
    id: "8",
    name: "Art and Archaeology Library",
    image: "/images/art-library.jpg",
    rating: 4.3,
    nearestStation: "Oxford Road Station",
    distance: 0.4,
    coordinates: [-2.233876, 53.465433],
    openingHours: {
      "Monday": { open: "09:00", close: "17:00" },
      "Tuesday": { open: "09:00", close: "17:00" },
      "Wednesday": { open: "09:00", close: "17:00" },
      "Thursday": { open: "09:00", close: "17:00" },
      "Friday": { open: "09:00", close: "17:00" },
      "Saturday": { open: "00:00", close: "00:00" },
      "Sunday": { open: "00:00", close: "00:00" }
    }
  },
  {
    id: "9",
    name: "Samuel Alexander Building",
    image: "/images/samuel-alexander.jpeg",
    rating: 4.2,
    nearestStation: "Oxford Road Station",
    distance: 0.3,
    coordinates: [-2.233876, 53.466433],
    openingHours: {
      "Monday": { open: "08:00", close: "22:00" },
      "Tuesday": { open: "08:00", close: "22:00" },
      "Wednesday": { open: "08:00", close: "22:00" },
      "Thursday": { open: "08:00", close: "22:00" },
      "Friday": { open: "08:00", close: "22:00" },
      "Saturday": { open: "10:00", close: "18:00" },
      "Sunday": { open: "10:00", close: "18:00" }
    }
  }
];
export default function StudySpacesPage() {
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mapKey, setMapKey] = useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
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
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true)
      } else {
        setIsSidebarOpen(false)
      }
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
  }

  const handleMapReload = () => {
    setMapKey((prevKey) => prevKey + 1)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const getUserLocation = () => {
    if (navigator.geolocation) {
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

