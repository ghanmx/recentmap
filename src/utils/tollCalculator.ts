import { TOLL_LOCATIONS } from '@/data/tollData'
import { calculateDistance } from './distanceUtils'
import { getRouteDetails } from '@/services/routeService'
import { COMPANY_LOCATION } from './priceCalculator'
import { TollLocation } from '@/types/toll'

interface Location {
  lat: number
  lng: number
}

const TOLL_DETECTION_RADIUS = 2.0 // Increased radius for better detection
const TOLL_BUFFER_DISTANCE = 0.5 // Increased buffer for more accurate toll detection

export const detectTollsOnRoute = async (
  pickupLocation: Location,
  dropLocation: Location,
) => {
  try {
    const routes = await getRouteSegments(pickupLocation, dropLocation)
    const routePoints = extractRoutePoints(routes)

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

    const allTolls = [...outboundTolls, ...returnTolls]
    const totalTollCost = calculateTotalTollCost(allTolls)

    return { 
      tolls: allTolls, 
      totalTollCost, 
      routeDetails: routes,
      outboundTollCost: calculateTotalTollCost(outboundTolls),
      returnTollCost: calculateTotalTollCost(returnTolls)
    }
  } catch (error) {
    console.warn('Error detecting tolls:', error)
    return { 
      tolls: [], 
      totalTollCost: 0, 
      routeDetails: null,
      outboundTollCost: 0,
      returnTollCost: 0
    }
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
    const nearStart = calculateDistance(start, toll) <= TOLL_DETECTION_RADIUS
    const nearEnd = calculateDistance(end, toll) <= TOLL_DETECTION_RADIUS
    const nearRoute = routePoints.some(
      (point) =>
        calculateDistance({ lat: point[0], lng: point[1] }, toll) <=
        TOLL_BUFFER_DISTANCE,
    )
    return nearStart || nearEnd || nearRoute
  }).map((toll) => ({
    ...toll,
    direction,
  }))
}

const calculateTotalTollCost = (tolls: TollLocation[]): number => {
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