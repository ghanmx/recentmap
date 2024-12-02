const OSRM_API_URLS = [
  'https://routing.openstreetmap.de/routed-car/route/v1',
  'https://router.project-osrm.org/route/v1',
  'http://router.project-osrm.org/route/v1',
].map((url) => url.replace(/\/+$/, '')) // Remove trailing slashes

const MIN_REQUEST_INTERVAL = 1100
const MAX_RETRIES = 3
const BACKOFF_FACTOR = 2
let lastRequestTime = 0
let requestQueue: Promise<any> = Promise.resolve()

interface Coordinates {
  lat: number
  lng: number
}

interface OSRMResponse {
  routes: {
    distance: number
    duration: number
    geometry: string
  }[]
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const calculateBackoffDelay = (attempt: number): number => {
  return Math.min(
    MIN_REQUEST_INTERVAL * Math.pow(BACKOFF_FACTOR, attempt),
    5000,
  )
}

const enforceRateLimit = async () => {
  const now = Date.now()
  const timeSinceLastRequest = now - lastRequestTime

  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await wait(MIN_REQUEST_INTERVAL - timeSinceLastRequest)
  }
  lastRequestTime = Date.now()
}

const calculateStraightLineDistance = (
  start: Coordinates,
  end: Coordinates,
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
  return R * c
}

async function tryFetchWithUrls(
  urls: string[],
  coordinates: string,
  options: RequestInit,
  attempt = 0,
): Promise<Response> {
  const errors: Error[] = []

  await enforceRateLimit()

  for (const baseUrl of urls) {
    try {
      const url = `${baseUrl}/driving/${coordinates}?overview=full&geometries=polyline`
      console.log('Attempting request to:', url)

      const response = await fetch(url, {
        ...options,
        mode: 'cors',
        credentials: 'omit',
        headers: {
          ...options.headers,
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        return response
      }

      console.log(`Request failed for ${url} with status:`, response.status)

      if (response.status === 429) {
        const backoffDelay = calculateBackoffDelay(attempt)
        await wait(backoffDelay)
        if (attempt < MAX_RETRIES) {
          return tryFetchWithUrls(urls, coordinates, options, attempt + 1)
        }
      }

      errors.push(
        new Error(`Failed response from ${baseUrl}: ${response.status}`),
      )
    } catch (error) {
      console.error('Error making request to', baseUrl, ':', error)
      errors.push(
        error instanceof Error
          ? error
          : new Error(`Unknown error from ${baseUrl}`),
      )
      continue
    }
  }

  throw new Error(
    'All routing services failed. Using fallback straight-line calculation.',
  )
}

export async function getRouteFromOSRM(
  start: Coordinates,
  end: Coordinates,
): Promise<{
  distance: number
  duration: number
  geometry: string
}> {
  const coordinates = `${start.lng},${start.lat};${end.lng},${end.lat}`

  try {
    const result = await new Promise((resolve, reject) => {
      requestQueue = requestQueue
        .then(() =>
          tryFetchWithUrls(OSRM_API_URLS, coordinates, {
            headers: {
              Accept: 'application/json',
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

    return {
      distance: data.routes[0].distance / 1000, // Convert to kilometers
      duration: data.routes[0].duration,
      geometry: data.routes[0].geometry,
    }
  } catch (error) {
    console.error(
      'OSRM routing failed, falling back to straight-line calculation:',
      error,
    )
    // Fallback to straight-line calculation
    const straightLineDistance = calculateStraightLineDistance(start, end)
    const estimatedDuration = straightLineDistance * 60 // Rough estimate: 1 km/minute

    return {
      distance: straightLineDistance,
      duration: estimatedDuration,
      geometry: '_p~iF~ps|U_ulLnnqC_mqNvxq`@', // Simple straight line encoding
    }
  }
}
