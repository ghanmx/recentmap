import { getAddressFromCoordinates } from '@/services/geocodingService'

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
    addresses.pickup = await getAddressFromCoordinates(
      pickupLocation.lat,
      pickupLocation.lng,
    )
  }
  if (dropLocation) {
    addresses.drop = await getAddressFromCoordinates(
      dropLocation.lat,
      dropLocation.lng,
    )
  }

  return addresses
}
