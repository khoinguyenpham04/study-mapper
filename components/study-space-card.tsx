import Image from "next/image"
import { Clock, MapPin, Train, Ruler } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { StudySpace } from "@/types/study-space"
import { getOpenUntil } from "@/utils/timeUtils"
import { getCategoryIcon } from '@/utils/iconMap';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

interface StudySpaceCardProps {
  space: StudySpace;
  onClick: () => void;
  isOpen: boolean;
  currentTime: Date;
  distance?: number;
  isNearest?: boolean;
  id?: string; // Added id prop
  layoutType?: 'one-column' | 'two-columns';
}

export function StudySpaceCard({ space, onClick, isOpen, currentTime, distance, isNearest, id, layoutType = 'one-column' }: StudySpaceCardProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${space.coordinates[1]},${space.coordinates[0]}`
  const openUntil = getOpenUntil(space, currentTime)
  const IconComponent = getCategoryIcon(space.category); // Get the icon component

  return (
    <Card 
      id={id}
      className={`overflow-hidden cursor-pointer transition-all duration-300 bg-purple-800/30 backdrop-blur-md border-2 ${
        isNearest ? 'border-purple-500 shadow-lg shadow-purple-500/50' : 'border-purple-500/30'
      } hover:bg-purple-700/40 rounded-lg ${
        layoutType === 'two-columns' ? 'flex flex-col' : '' // Changed from layoutType !== 'one-column' for clarity
      }`}
      onClick={onClick}
    >
      <div className={`relative ${
        layoutType === 'one-column' ? 'h-40 w-full' : 'h-32 w-full' // Adjusted height for two-columns, content will scale
      }`}>
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
      <div className={`space-y-1 ${layoutType === 'one-column' ? 'p-4' : 'p-2 flex-1'}`}>
        <div className="flex items-center justify-between mb-1">
          <h3 className={`font-medium tracking-tight text-white ${
            layoutType === 'one-column' ? 'text-xl' : 'text-base' // Adjusted font size
          }`}>{space.name}</h3>
          <div className={`rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-1 transition-all hover:bg-white/15 ${
            layoutType === 'one-column' ? 'px-4 py-1.5' : 'px-2 py-0.5' // Adjusted padding
          }`}>
            <div className={`flex items-center text-white ${
              layoutType === 'one-column' ? 'text-sm' : 'text-xs' // Adjusted font size
            }`}>
              <IconComponent className={`mr-1 text-purple-200 ${
                layoutType === 'one-column' ? 'w-4 h-4' : 'w-3 h-3' // Adjusted icon size
              }`} />
              {space.category}
            </div>
          </div>
        </div>
        <div className={`space-y-0.5 ${layoutType === 'one-column' ? 'text-sm' : 'text-xs'} text-purple-200/90`}>
          <div className="flex items-center gap-2">
            <span className={`flex items-center gap-1 ${isOpen ? "text-green-400" : "text-red-400"}`}>
              <Clock className={layoutType === 'one-column' ? 'w-4 h-4' : 'w-3 h-3'} />
              {isOpen ? "Open" : "Closed"}
            </span>
            {isOpen && (
              <span className="flex items-center gap-1">
                until {openUntil}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Train className={layoutType === 'one-column' ? 'w-4 h-4' : 'w-3 h-3'} />
            {space.nearestStation}
          </div>
          <div className="flex items-center gap-1">
            <Ruler className={layoutType === 'one-column' ? 'w-4 h-4' : 'w-3 h-3'} />
            {distance !== undefined ? `${distance.toFixed(2)} km away` : `${space.distance} km away`}
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="opening-hours">
            <AccordionTrigger className={`${layoutType === 'one-column' ? 'text-sm' : 'text-xs'} text-purple-200/90 py-2`}>
              <span className="flex items-center gap-2">
                <Clock className={layoutType === 'one-column' ? 'w-4 h-4' : 'w-3 h-3'} />
                Opening Hours
              </span>
            </AccordionTrigger>
            <AccordionContent className={layoutType === 'one-column' ? 'text-sm' : 'text-xs'}>
              <div className="text-purple-200/90 space-y-0.5">
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
          className={`w-full text-purple-300 hover:text-purple-100 ${layoutType === 'one-column' ? 'py-2' : 'py-1 text-xs'}`}
          onClick={(e) => {
            e.stopPropagation();
            window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
          }}
        >
          <MapPin className={`mr-1 ${layoutType === 'one-column' ? 'w-4 h-4' : 'w-3 h-3'}`} />
          Open in Google Maps
        </Button>
      </div>
    </Card>
  )
}

