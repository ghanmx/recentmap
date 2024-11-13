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
    const route = await getRouteFromOSRM(origin, destination)

    // Add traffic factor based on time of day
    const trafficFactor = calculateTrafficFactor()

    return {
      ...route,
      distance: route.distance * trafficFactor,
      duration: route.duration * trafficFactor,
    }
  } catch (error) {
    throw new Error('Failed to calculate route details')
  }
}

const calculateTrafficFactor = (): number => {
  const hour = new Date().getHours()

  // Rush hour adjustments
  if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
    return 1.3 // 30% longer during rush hours
  }

  // Night time adjustments
  if (hour >= 22 || hour <= 5) {
    return 0.9 // 10% shorter during night
  }

  return 1.0 // Normal traffic during other hours
}
