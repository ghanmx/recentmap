import { useState } from 'react'
import { Location } from '@/types/location'
import { getAddressFromCoords } from '@/services/geocodingService'

export const useMapState = () => {
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null)
  const [dropLocation, setDropLocation] = useState<Location | null>(null)
  const [pickupAddress, setPickupAddress] = useState<string>('')
  const [dropAddress, setDropAddress] = useState<string>('')
  const [selectingPickup, setSelectingPickup] = useState<boolean>(false)
  const [selectingDrop, setSelectingDrop] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleLocationSelect = (location: Location, type: 'pickup' | 'drop') => {
    if (type === 'pickup') {
      setPickupLocation(location)
      setPickupAddress(location.address || '')
    } else {
      setDropLocation(location)
      setDropAddress(location.address || '')
    }
  }

  const resetLocations = () => {
    setPickupLocation(null)
    setDropLocation(null)
    setPickupAddress('')
    setDropAddress('')
    setSelectingPickup(false)
    setSelectingDrop(false)
  }

  return {
    pickupLocation,
    dropLocation,
    pickupAddress,
    dropAddress,
    selectingPickup,
    selectingDrop,
    isLoading,
    setSelectingPickup,
    setSelectingDrop,
    handleLocationSelect,
    resetLocations,
  }
}
