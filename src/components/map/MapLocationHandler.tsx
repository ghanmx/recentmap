import { useMapEvents } from 'react-leaflet'
import { getAddressFromCoordinates } from '@/services/geocodingService'
import { useToast } from '@/hooks/use-toast'
import { useCallback } from 'react'

interface MapLocationHandlerProps {
  selectingPickup: boolean
  selectingDrop: boolean
  handleLocationSelect: (location: { lat: number; lng: number }) => void
}

export const MapLocationHandler = ({
  selectingPickup,
  selectingDrop,
  handleLocationSelect,
}: MapLocationHandlerProps) => {
  const { toast } = useToast()

  const handleClick = useCallback(
    async (e: L.LeafletMouseEvent) => {
      if (selectingPickup || selectingDrop) {
        const location = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        }

        handleLocationSelect(location)
      }
    },
    [selectingPickup, selectingDrop, handleLocationSelect],
  )

  useMapEvents({
    click: handleClick,
  })

  return null
}
