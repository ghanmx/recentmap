import { useCallback, useEffect } from 'react'
import { useMapEvents, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import { getRouteFromOSRM } from '@/services/osrmService'
import { RoutePolyline } from './RoutePolyline'
import { useToast } from '@/hooks/use-toast'
import { Location } from '@/types/location'

interface MapMarkersProps {
  pickupLocation: Location | null
  dropLocation: Location | null
  selectingPickup: boolean
  selectingDrop: boolean
  onLocationSelect: (location: Location) => void
  setPickupLocation: (location: Location | null) => void
  setDropLocation: (location: Location | null) => void
  onRouteCalculated: (distance: number) => void
}

const pickupIcon = new Icon({
  iconUrl: '/marker-pickup.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const dropIcon = new Icon({
  iconUrl: '/marker-drop.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

export const MapMarkers = ({
  pickupLocation,
  dropLocation,
  selectingPickup,
  selectingDrop,
  onLocationSelect,
  setPickupLocation,
  setDropLocation,
  onRouteCalculated,
}: MapMarkersProps) => {
  const { toast } = useToast()

  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      if (selectingPickup || selectingDrop) {
        onLocationSelect({ lat, lng })
      }
    },
  })

  const calculateRoute = useCallback(async () => {
    if (pickupLocation && dropLocation) {
      try {
        const route = await getRouteFromOSRM(pickupLocation, dropLocation)
        onRouteCalculated(route.distance)
      } catch (error) {
        console.error('Error calculating route:', error)
        toast({
          title: 'Error al calcular la ruta',
          description: 'Por favor, intente nuevamente',
          variant: 'destructive',
        })
      }
    }
  }, [pickupLocation, dropLocation, onRouteCalculated, toast])

  useEffect(() => {
    calculateRoute()
  }, [calculateRoute])

  return (
    <>
      {pickupLocation && (
        <Marker
          position={[pickupLocation.lat, pickupLocation.lng]}
          icon={pickupIcon}
          eventHandlers={{
            click: () => {
              setPickupLocation(null)
            },
          }}
        >
          <Popup>Punto de recogida</Popup>
        </Marker>
      )}

      {dropLocation && (
        <Marker
          position={[dropLocation.lat, dropLocation.lng]}
          icon={dropIcon}
          eventHandlers={{
            click: () => {
              setDropLocation(null)
            },
          }}
        >
          <Popup>Punto de entrega</Popup>
        </Marker>
      )}

      {pickupLocation && dropLocation && (
        <RoutePolyline
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          onRouteCalculated={onRouteCalculated}
        />
      )}
    </>
  )
}