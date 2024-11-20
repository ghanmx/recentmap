import { useMapEvents } from 'react-leaflet'
import { useToast } from '@/hooks/use-toast'
import { Marker, Popup } from 'react-leaflet'
import { pickupIcon, dropIcon } from '@/utils/mapUtils'

interface LocationMarkerProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void
  selectingPickup: boolean
  selectingDrop: boolean
  pickupLocation?: { lat: number; lng: number } | null
  dropLocation?: { lat: number; lng: number } | null
}

export const LocationMarker = ({
  onLocationSelect,
  selectingPickup,
  selectingDrop,
  pickupLocation,
  dropLocation,
}: LocationMarkerProps) => {
  const { toast } = useToast()

  useMapEvents({
    click(e) {
      if (selectingPickup || selectingDrop) {
        onLocationSelect(e.latlng)
        toast({
          title: `${selectingPickup ? 'Punto de Recogida' : 'Punto de Entrega'} Seleccionado`,
          description: 'La ubicación ha sido establecida en el mapa',
          duration: 3000,
        })
      }
    },
  })

  return (
    <>
      {pickupLocation && (
        <Marker
          position={[pickupLocation.lat, pickupLocation.lng]}
          icon={pickupIcon}
        >
          <Popup>Punto de Recogida</Popup>
        </Marker>
      )}
      {dropLocation && (
        <Marker position={[dropLocation.lat, dropLocation.lng]} icon={dropIcon}>
          <Popup>Punto de Entrega</Popup>
        </Marker>
      )}
    </>
  )
}
