'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { StudySpace } from '@/types/study-space'
import { isSpaceOpen } from '@/utils/timeUtils'

interface MapViewProps {
  spaces: StudySpace[]
  onMarkerClick: (spaceId: string) => void
  selectedSpaceId: string | null
  currentTime: Date
  userLocation: [number, number] | null
  nearestSpace: StudySpace | null
}

export function MapView({ spaces, onMarkerClick, selectedSpaceId, currentTime, userLocation, nearestSpace }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({})
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    console.log('Mapbox Access Token:', process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN)
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/khonguyenpham/cm476m37000cp01r1aerh8dud', // Custom style
      center: [-2.2374, 53.4668], // Manchester coordinates
      zoom: 15,
      pitch: 45,
      bearing: 0,
      antialias: true
    })

    map.current.on('load', () => {
      const map3D = map.current!

      // Add markers
      spaces.forEach((space) => {
        const markerEl = document.createElement('div')
        markerEl.className = 'custom-marker'
        markerEl.style.width = '15px'
        markerEl.style.height = '15px'
        markerEl.style.borderRadius = '50%'
        markerEl.style.backgroundColor = isSpaceOpen(space, currentTime) ? '#22c55e' : '#ef4444'
        markerEl.style.border = '2px solid white'
        markerEl.style.cursor = 'pointer'
        markerEl.style.boxShadow = '0 0 0 2px rgba(0,0,0,0.25)'

        const marker = new mapboxgl.Marker({
          element: markerEl,
          anchor: 'center'
        })
          .setLngLat(space.coordinates)
          .addTo(map3D)

        marker.getElement().addEventListener('click', () => {
          onMarkerClick(space.id)
        })

        markersRef.current[space.id] = marker
      })
    })

    // Add navigation controls
    const nav = new mapboxgl.NavigationControl({
      visualizePitch: true
    })
    map.current.addControl(nav, 'bottom-right')

    return () => {
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
      }
      map.current?.remove()
    }
  }, [spaces, onMarkerClick, currentTime])

  useEffect(() => {
    if (selectedSpaceId && map.current) {
      const selectedSpace = spaces.find(space => space.id === selectedSpaceId)
      if (selectedSpace) {
        map.current.flyTo({
          center: selectedSpace.coordinates,
          zoom: 17,
          duration: 2000
        })
      }
    }
  }, [selectedSpaceId, spaces])

  // Update marker colors based on open/closed state
  useEffect(() => {
    spaces.forEach((space) => {
      const marker = markersRef.current[space.id]
      if (marker) {
        const markerEl = marker.getElement().querySelector('.custom-marker') as HTMLElement
        if (markerEl) {
          markerEl.style.backgroundColor = isSpaceOpen(space, currentTime) ? '#22c55e' : '#ef4444'
        }
      }
    })
  }, [spaces, currentTime])

  // Add or update user location marker
  useEffect(() => {
    if (userLocation && map.current) {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLngLat(userLocation);
      } else {
        const userMarkerEl = document.createElement('div');
        userMarkerEl.className = 'user-marker';
        userMarkerEl.style.width = '20px';
        userMarkerEl.style.height = '20px';
        userMarkerEl.style.borderRadius = '50%';
        userMarkerEl.style.backgroundColor = '#3b82f6';
        userMarkerEl.style.border = '3px solid white';
        userMarkerEl.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.5)';

        userMarkerRef.current = new mapboxgl.Marker({
          element: userMarkerEl,
          anchor: 'center'
        })
          .setLngLat(userLocation)
          .addTo(map.current);
      }

      map.current.flyTo({
        center: userLocation,
        zoom: 15,
        duration: 2000
      });
    }
  }, [userLocation]);

  // Highlight nearest space
  useEffect(() => {
    if (nearestSpace && markersRef.current[nearestSpace.id]) {
      const nearestMarkerEl = markersRef.current[nearestSpace.id].getElement().querySelector('.custom-marker') as HTMLElement
      if (nearestMarkerEl) {
        nearestMarkerEl.style.width = '20px'
        nearestMarkerEl.style.height = '20px'
        nearestMarkerEl.style.border = '3px solid #8b5cf6'
        nearestMarkerEl.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.5)'
      }
    }
  }, [nearestSpace])

  return (
    <div ref={mapContainer} className="w-full h-full absolute inset-0">
      <style jsx global>{`
        .mapboxgl-ctrl-group {
          background-color: #ffffff;
          border-radius: 4px;
          box-shadow: 0 0 10px 2px rgba(0,0,0,0.1);
        }
        .mapboxgl-ctrl button {
          color: #333333;
        }
        .mapboxgl-ctrl button:not(:disabled):hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  )
}

