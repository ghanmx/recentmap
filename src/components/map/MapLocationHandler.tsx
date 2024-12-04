import { useEffect } from 'react'
import { getAddressFromCoords } from '@/services/geocodingService'
import { useToast } from '@/hooks/use-toast'
import { Location } from '@/types/location'

interface MapLocationHandlerProps {
  location: Location | null
  onAddressFound: (address: string) => void
  selectingPickup: boolean
  selectingDrop: boolean
  handleLocationSelect: (location: Location) => void
}

export const MapLocationHandler = ({
  location,
  onAddressFound,
  selectingPickup,
  selectingDrop,
  handleLocationSelect,
}: MapLocationHandlerProps) => {
  const { toast } = useToast()

  useEffect(() => {
    const fetchAddress = async () => {
      if (!location) return

      try {
        const address = await getAddressFromCoords(location.lat, location.lng)
        onAddressFound(address)
      } catch (error) {
        console.error('Error fetching address:', error)
        toast({
          title: 'Error',
          description: 'No se pudo obtener la dirección',
          variant: 'destructive',
        })
      }
    }

    fetchAddress()
  }, [location, onAddressFound, toast])

  return null
}