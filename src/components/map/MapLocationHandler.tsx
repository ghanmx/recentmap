import { useMapEvents } from 'react-leaflet'
import { useToast } from '@/hooks/use-toast'

interface MapLocationHandlerProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void
  selectingPickup: boolean
  selectingDrop: boolean
}

export const MapLocationHandler = ({
  onLocationSelect,
  selectingPickup,
  selectingDrop,
}: MapLocationHandlerProps) => {
  const { toast } = useToast()

  useMapEvents({
    click(e) {
      if (selectingPickup || selectingDrop) {
        onLocationSelect(e.latlng)
        toast({
          title: `${selectingPickup ? 'Punto de Recogida' : 'Punto de Entrega'} Seleccionado`,
          description: 'Puedes arrastrar el marcador para ajustar la ubicación',
        })
      }
    },
  })

  return null
}