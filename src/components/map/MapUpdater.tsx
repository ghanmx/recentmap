import { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import { LatLngBounds } from 'leaflet'
import { useToast } from '@/hooks/use-toast'
import { Location } from '@/types/location'

interface MapUpdaterProps {
  pickupLocation: Location | null
  dropLocation: Location | null
}

export const MapUpdater = ({
  pickupLocation,
  dropLocation,
}: MapUpdaterProps) => {
  const map = useMap()
  const { toast } = useToast()
  const lastToastTime = useRef(0)

  useEffect(() => {
    if (!map) return

    const now = Date.now()
    const locations = [pickupLocation, dropLocation].filter(
      Boolean,
    ) as Location[]

    if (locations.length === 0) return

    if (locations.length === 1) {
      map.setView([locations[0].lat, locations[0].lng], 15)
    } else {
      const bounds = new LatLngBounds(
        locations.map((loc) => [loc.lat, loc.lng]),
      )
      map.fitBounds(bounds, { padding: [50, 50] })
    }

    if (now - lastToastTime.current > 3000) {
      toast({
        title: 'Mapa actualizado',
        description:
          locations.length > 1
            ? 'Ruta completa visible'
            : 'Vista centrada en ubicación',
      })
      lastToastTime.current = now
    }
  }, [map, pickupLocation, dropLocation, toast])

  return null
}