import { Location, RouteResponse } from '@/types/service'
import { getRouteFromOSRM } from './osrmService'

export const COMPANY_LOCATION: Location = {
  lat: 26.509672,
  lng: -100.0095504,
}

export const getRouteDetails = async (
  origin: Location,
  destination: Location,
): Promise<RouteResponse> => {
  try {
    console.log('Calculating route from:', origin, 'to:', destination)
    const response = await getRouteFromOSRM(origin, destination)
    console.log('Route calculation successful:', response)
    return response
  } catch (error) {
    console.error('Route calculation failed:', error)
    // Return a default response with straight-line calculation
    const straightLineDistance = calculateStraightLineDistance(
      origin,
      destination,
    )
    return {
      distance: straightLineDistance,
      duration: straightLineDistance * 60, // Rough estimate: 1 km/minute
      geometry: '_p~iF~ps|U_ulLnnqC_mqNvxq`@', // Simple straight line encoding
    }
  }
}

const calculateStraightLineDistance = (
  start: Location,
  end: Location,
): number => {
  const R = 6371 // Earth's radius in km
  const dLat = ((end.lat - start.lat) * Math.PI) / 180
  const dLon = ((end.lng - start.lng) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((start.lat * Math.PI) / 180) *
      Math.cos((end.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Number((R * c).toFixed(2))
}
