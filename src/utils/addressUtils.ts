import { getAddressFromCoords } from '@/services/geocodingService'

interface Location {
  lat: number
  lng: number
}

export const updateLocationAddresses = async (
  pickupLocation: Location | null,
  dropLocation: Location | null,
) => {
  const addresses = {
    pickup: '',
    drop: '',
  }

  if (pickupLocation) {
    addresses.pickup = await getAddressFromCoords(
      pickupLocation.lat,
      pickupLocation.lng,
    )
  }
  if (dropLocation) {
    addresses.drop = await getAddressFromCoords(
      dropLocation.lat,
      dropLocation.lng,
    )
  }

  return addresses
}