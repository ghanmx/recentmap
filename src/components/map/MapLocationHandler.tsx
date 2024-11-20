import { useMapEvents } from 'react-leaflet'
import { getAddressFromCoordinates } from '@/services/geocodingService'
import { useToast } from '@/hooks/use-toast'

interface MapLocationHandlerProps {
  selectingPickup: boolean
  selectingDrop: boolean
  handleLocationSelect: (location: {
    lat: number
    lng: number
    address: string
  }) => void
  currentPickupLocation?: { lat: number; lng: number } | null
}

export const MapLocationHandler = ({
  selectingPickup,
  selectingDrop,
  handleLocationSelect,
  currentPickupLocation,
}: MapLocationHandlerProps) => {
  const { toast } = useToast()

  const handleClick = async (e: L.LeafletMouseEvent) => {
    if (selectingPickup || selectingDrop) {
      try {
        const location = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          address: await getAddressFromCoordinates(e.latlng.lat, e.latlng.lng),
        }

        handleLocationSelect(location)

        toast({
          title: selectingPickup
            ? 'Punto de recogida marcado'
            : 'Punto de entrega marcado',
          description: location.address,
        })
      } catch (error) {
        toast({
          title: 'Error',
          description:
            'No se pudo obtener la dirección de la ubicación seleccionada',
          variant: 'destructive',
        })
      }
    }
  }

  useMapEvents({
    click: handleClick,
  })

  return null
}
