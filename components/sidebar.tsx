import { useState } from "react"
import { Input } from "@/components/ui/input"
import { StudySpaceCard } from "@/components/study-space-card"
import { StudySpace } from "@/types/study-space"
import { isSpaceOpen } from "@/utils/timeUtils"
import { X, Map } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface SidebarProps {
  spaces: StudySpace[]
  onSpaceSelect: (spaceId: string) => void
  currentTime: Date
  isOpen: boolean
  onClose: () => void
  userLocation: [number, number] | null
  nearestSpace: StudySpace | null
}

export function Sidebar({ spaces, onSpaceSelect, currentTime, isOpen, onClose, userLocation, nearestSpace }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showOpenOnly, setShowOpenOnly] = useState(false)

  const formattedTime = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(currentTime)

  const handleSpaceClick = (spaceId: string) => {
    onSpaceSelect(spaceId)
    if (window.innerWidth < 768) {
      onClose()
    }
  }

  const calculateDistance = (coord1: [number, number], coord2: [number, number]): number => {
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

  const sortedSpaces = userLocation
    ? [...spaces].sort((a, b) => 
        calculateDistance(userLocation, a.coordinates) - calculateDistance(userLocation, b.coordinates)
      )
    : spaces

  const filteredSpaces = sortedSpaces
    .filter((space) =>
      space.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!showOpenOnly || isSpaceOpen(space, currentTime))
    )

  return (
    <div className={`fixed inset-y-4 left-0 z-50 w-[calc(95%-2rem)] max-w-[400px] sm:w-[420px] bg-gradient-to-b from-purple-900/10 to-purple-800/20 backdrop-blur-lg backdrop-filter border border-purple-500/10 shadow-2xl rounded-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-4' : '-translate-x-full'}`}>
      <div className="flex flex-col h-full bg-white/5 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-purple-500/10 space-y-4 bg-purple-900/20 backdrop-blur-md">
          <div className="flex justify-between items-center">
            <div>
              <a
                href="https://www.linkedin.com/in/phamtrankhoinguyen-noah/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-semibold text-2xl text-white hover:text-purple-200 transition-colors"
              >
                <div className="relative w-8 h-8 bg-gradient-to-br from-[#703295] to-[#8d46b8] rounded-lg shadow-lg overflow-hidden">
                  <div className="absolute inset-0.5 bg-gradient-to-br from-[#8d46b8] to-[#a154d3] rounded-md shadow-inner"></div>
                  <Map className="absolute inset-1 w-6 h-6 text-white drop-shadow-md" />
                </div>
                <h1 className="text-white">StudyMapper</h1>
              </a>
              <p className="text-sm text-purple-200 mt-1">by Noah Pham</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-purple-800/50 md:hidden"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
          <Input
            placeholder="Search spaces..."
            className="bg-white/50 border-purple-500/20 text-white placeholder-white/50 focus:bg-white/20 transition-all duration-300 rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="open-filter"
                checked={showOpenOnly}
                onCheckedChange={setShowOpenOnly}
              />
              <Label htmlFor="open-filter" className="text-sm text-white">Show open only</Label>
            </div>
            <span className="text-sm text-purple-100/80 font-bold">{formattedTime}</span>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4 sm:p-6 space-y-4 custom-scrollbar bg-purple-800/5 backdrop-blur-sm">
          {filteredSpaces.map((space) => (
            <StudySpaceCard
              key={space.id}
              space={space}
              onClick={() => handleSpaceClick(space.id)}
              isOpen={isSpaceOpen(space, currentTime)}
              currentTime={currentTime}
              distance={userLocation ? calculateDistance(userLocation, space.coordinates) : undefined}
              isNearest={space.id === nearestSpace?.id}
            />
          ))}
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 92, 246, 0.5) rgba(139, 92, 246, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(139, 92, 246, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(139, 92, 246, 0.5);
          border-radius: 3px;
          border: 2px solid rgba(139, 92, 246, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  )
}

