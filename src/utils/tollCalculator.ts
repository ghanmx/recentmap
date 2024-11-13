import { TOLL_LOCATIONS } from '@/data/tollData'
import { calculateDistance } from './distanceUtils'
import { getRouteDetails } from '@/services/routeService'
import { COMPANY_LOCATION } from './priceCalculator'

interface Location {
  lat: number
  lng: number
}

const TOLL_DETECTION_RADIUS = 0.5 // Reduced from 1.0 to 0.5 km for more precision
const TOLL_BUFFER_DISTANCE = 0.1 // Reduced from 0.2 to 0.1 km for more accuracy

export const detectTollsOnRoute = async (
  pickupLocation: Location,
  dropLocation: Location,
) => {
  try {
    const routes = await getRouteSegments(pickupLocation, dropLocation)
    const routePoints = extractRoutePoints(routes)

    // Enhanced toll detection with direction-aware logic
    const outboundTolls = detectTollsForSegment(
      pickupLocation,
      dropLocation,
      routePoints,
      'outbound',
    )
    const returnTolls = detectTollsForSegment(
      dropLocation,
      COMPANY_LOCATION,
      routePoints,
      'return',
    )

    // Filter out duplicate tolls based on location proximity
    const allTolls = removeDuplicateTolls([...outboundTolls, ...returnTolls])
    const totalTollCost = calculateTotalTollCost(allTolls)

    return { tolls: allTolls, totalTollCost, routeDetails: routes }
  } catch (error) {
    console.warn('Error detecting tolls:', error)
    return { tolls: [], totalTollCost: 0, routeDetails: null }
  }
}

const getRouteSegments = async (
  pickupLocation: Location,
  dropLocation: Location,
) => {
  const companyToPickup = await getRouteDetails(
    COMPANY_LOCATION,
    pickupLocation,
  )
  const pickupToDrop = await getRouteDetails(pickupLocation, dropLocation)
  const dropToCompany = await getRouteDetails(dropLocation, COMPANY_LOCATION)

  return { outbound: pickupToDrop, return: dropToCompany }
}

const extractRoutePoints = (routes: any) => {
  const points: [number, number][] = []
  if (routes.outbound?.geometry)
    points.push(...decodePolyline(routes.outbound.geometry))
  if (routes.return?.geometry)
    points.push(...decodePolyline(routes.return.geometry))
  return points
}

const detectTollsForSegment = (
  start: Location,
  end: Location,
  routePoints: [number, number][],
  direction: 'outbound' | 'return',
) => {
  return TOLL_LOCATIONS.filter((toll) => {
    // Enhanced proximity detection
    const nearStart = calculateDistance(start, toll) <= TOLL_DETECTION_RADIUS
    const nearEnd = calculateDistance(end, toll) <= TOLL_DETECTION_RADIUS

    // Check if toll is near any point on the route
    const nearRoute = routePoints.some(
      (point) =>
        calculateDistance({ lat: point[0], lng: point[1] }, toll) <=
        TOLL_BUFFER_DISTANCE,
    )

    // Additional check for toll direction based on route angle
    const isInDirection = checkTollDirection(start, end, toll)

    return (nearStart || nearEnd || nearRoute) && isInDirection
  }).map((toll) => ({
    ...toll,
    direction,
    // Adjust cost based on direction and vehicle type
    cost: adjustTollCost(toll.cost, direction),
  }))
}

const checkTollDirection = (
  start: Location,
  end: Location,
  toll: Location,
): boolean => {
  const routeAngle = Math.atan2(end.lat - start.lat, end.lng - start.lng)
  const tollAngle = Math.atan2(toll.lat - start.lat, toll.lng - start.lng)
  const angleDiff = Math.abs(routeAngle - tollAngle)
  return angleDiff <= Math.PI / 4 // 45-degree tolerance
}

const adjustTollCost = (
  baseCost: number,
  direction: 'outbound' | 'return',
): number => {
  // Return trips might have different rates
  return direction === 'return' ? baseCost * 0.9 : baseCost
}

const removeDuplicateTolls = (tolls: any[]) => {
  return tolls.filter(
    (toll, index, self) =>
      index ===
      self.findIndex((t) => calculateDistance(toll, t) < TOLL_BUFFER_DISTANCE),
  )
}

const calculateTotalTollCost = (tolls: any[]): number => {
  return tolls.reduce((sum, toll) => sum + toll.cost, 0)
}

const decodePolyline = (str: string, precision = 5) => {
  let index = 0,
    lat = 0,
    lng = 0,
    coordinates: [number, number][] = []
  const factor = Math.pow(10, precision)

  while (index < str.length) {
    let result = 0,
      shift = 0,
      byte

    do {
      byte = str.charCodeAt(index++) - 63
      result |= (byte & 0x1f) << shift
      shift += 5
    } while (byte >= 0x20)

    const latitude_change = result & 1 ? ~(result >> 1) : result >> 1

    result = 0
    shift = 0

    do {
      byte = str.charCodeAt(index++) - 63
      result |= (byte & 0x1f) << shift
      shift += 5
    } while (byte >= 0x20)

    const longitude_change = result & 1 ? ~(result >> 1) : result >> 1

    lat += latitude_change
    lng += longitude_change

    coordinates.push([lat / factor, lng / factor])
  }

  return coordinates
}
