import Image from "next/image"
import { Tag, Clock, MapPin, Train, Ruler } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { StudySpace } from "@/types/study-space"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { getOpenUntil } from "@/utils/timeUtils"

interface StudySpaceCardProps {
  space: StudySpace
  onClick?: () => void
  isOpen: boolean
  currentTime: Date
  distance?: number
  isNearest?: boolean
}

export function StudySpaceCard({ space, onClick, isOpen, currentTime, distance, isNearest }: StudySpaceCardProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${space.coordinates[1]},${space.coordinates[0]}`
  const openUntil = getOpenUntil(space, currentTime)

  return (
    <Card 
      className={`overflow-hidden cursor-pointer transition-all duration-300 bg-purple-800/30 backdrop-blur-md border-2 ${
  isNearest ? 'border-purple-500 shadow-lg shadow-purple-500/50' : 'border-purple-500/30'
} hover:bg-purple-700/40 rounded-lg`}
      onClick={onClick}
    >
      <div className="relative h-40 w-full">
        <Image
          src={space.image}
          alt={space.name}
          fill
          className="object-cover"
        />
        {isNearest && (
          <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
            <MapPin className="w-3 h-3" />
            <span>Nearest</span>
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="font-medium text-xl tracking-tight text-white">{space.name}</h3>
          <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-1.5 transition-all hover:bg-white/15">
            <Tag className="w-3 h-3 text-purple-200" />
            <span className="text-xs font-medium text-purple-100">{space.category}</span>
          </div>
        </div>
        <div className="space-y-1 text-sm text-purple-200/90">
          <div className="flex items-center gap-2">
            <span className={`flex items-center gap-1 ${isOpen ? "text-green-400" : "text-red-400"}`}>
              <Clock className="w-4 h-4" />
              {isOpen ? "Open" : "Closed"}
            </span>
            {isOpen && (
              <span className="flex items-center gap-1">
                until {openUntil}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Train className="w-4 h-4" />
            {space.nearestStation}
          </div>
          <div className="flex items-center gap-1">
            <Ruler className="w-4 h-4" />
            {distance !== undefined ? `${distance.toFixed(2)} km away` : `${space.distance} km away`}
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="opening-hours">
            <AccordionTrigger className="text-sm text-purple-200/90">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Opening Hours
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="text-sm text-purple-200/90 space-y-1">
                {Object.entries(space.openingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span>{day}</span>
                    <span>{hours.open} - {hours.close}</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button 
          variant="link" 
          className="w-full text-purple-300 hover:text-purple-100"
          onClick={(e) => {
            e.stopPropagation();
            window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
          }}
        >
          <MapPin className="w-4 h-4 mr-2" />
          Open in Google Maps
        </Button>
      </div>
    </Card>
  )
}

