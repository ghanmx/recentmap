import { Coordinates, OSRMResponse } from './osrm/types'
import { OSRM_API_URLS } from './osrm/constants'
import { normalizeCoordinate, calculateStraightLineDistance } from './osrm/utils'
import { tryFetchWithUrls } from './osrm/fetchUtils'

let lastRequestTime = 0
let requestQueue: Promise<any> = Promise.resolve()

const validateAndNormalizeCoordinates = (coords: Coordinates): Coordinates => {
  const normalizedLng = normalizeCoordinate(coords.lng, true)
  const normalizedLat = normalizeCoordinate(coords.lat, false)

  console.log('Normalized coordinates:', {
    original: coords,
    normalized: { lat: normalizedLat, lng: normalizedLng }
  })

  return {
    lat: normalizedLat,
    lng: normalizedLng,
  }
}

export async function getRouteFromOSRM(
  start: Coordinates,
  end: Coordinates,
): Promise<{
  distance: number
  duration: number
  geometry: string
}> {
  const normalizedStart = validateAndNormalizeCoordinates(start)
  const normalizedEnd = validateAndNormalizeCoordinates(end)
  
  const coordinates = `${normalizedStart.lng},${normalizedStart.lat};${normalizedEnd.lng},${normalizedEnd.lat}`

  try {
    console.log('Starting route calculation:', { normalizedStart, normalizedEnd })
    const result = await new Promise((resolve, reject) => {
      requestQueue = requestQueue
        .then(() =>
          tryFetchWithUrls(OSRM_API_URLS, coordinates, {
            headers: {
              'Accept': 'application/json',
              'Origin': window.location.origin,
            },
          }),
        )
        .then((response) => response.json())
        .then(resolve)
        .catch(reject)
    })

    const data = result as OSRMResponse

    if (!data.routes || data.routes.length === 0) {
      throw new Error('No route found')
    }

    console.log('Route calculation successful:', data.routes[0])
    return {
      distance: data.routes[0].distance / 1000,
      duration: data.routes[0].duration,
      geometry: data.routes[0].geometry,
    }
  } catch (error) {
    console.error('OSRM routing failed, falling back to straight-line calculation:', error)
    const straightLineDistance = calculateStraightLineDistance(normalizedStart, normalizedEnd)
    const estimatedDuration = straightLineDistance * 60

    return {
      distance: straightLineDistance,
      duration: estimatedDuration,
      geometry: '_p~iF~ps|U_ulLnnqC_mqNvxq`@',
    }
  }
}