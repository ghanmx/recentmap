const FALLBACK_GEOCODING_URL = 'https://nominatim.openstreetmap.org'
const CORS_PROXIES = [
  'https://api.allorigins.win/raw',
  'https://corsproxy.io/',
  'https://cors-anywhere.herokuapp.com/',
]

interface GeocodingOptions {
  fuzzyMatch?: boolean
  limit?: number
  countryCode?: string
  proximity?: { lat: number; lng: number }
}

const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 8000) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.warn('Request timed out:', url)
        throw new Error('Request timed out')
      }
      console.warn('Fetch error:', error.message)
    }
    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}

const tryFetchWithProxies = async (url: string) => {
  let lastError

  for (const proxyUrl of CORS_PROXIES) {
    try {
      console.log('Attempting request with proxy:', proxyUrl)
      const finalUrl = `${proxyUrl}?url=${encodeURIComponent(url)}`
      const data = await fetchWithTimeout(finalUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'TowingServiceApplication/1.0',
        },
      })
      console.log('Successfully fetched data with proxy:', proxyUrl)
      return data
    } catch (error) {
      lastError = error
      console.warn(`Failed to fetch with proxy ${proxyUrl}:`, error)
      continue // Try next proxy
    }
  }

  // If all proxies fail, return a default response
  console.warn('All proxies failed, returning fallback response')
  return {
    display_name: 'Dirección no disponible (error de conexión)',
    lat: 0,
    lon: 0,
  }
}

export const searchAddresses = async (
  query: string,
  options: GeocodingOptions = {},
) => {
  const {
    fuzzyMatch = true,
    limit = 10,
    countryCode = 'MX',
    proximity,
  } = options

  const searchParams = new URLSearchParams({
    q: query,
    format: 'json',
    limit: limit.toString(),
    countrycodes: countryCode,
  })

  if (proximity) {
    searchParams.append('lat', proximity.lat.toString())
    searchParams.append('lon', proximity.lng.toString())
  }

  try {
    const url = `${FALLBACK_GEOCODING_URL}/search?${searchParams}`
    const data = await tryFetchWithProxies(url)

    if (Array.isArray(data)) {
      return data.map((item: any) => ({
        address: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        importance: item.importance || 0,
      }))
    }
    return []
  } catch (error) {
    console.error('Error searching addresses:', error)
    return []
  }
}

export const getAddressFromCoordinates = async (
  lat: number,
  lng: number,
): Promise<string> => {
  try {
    const url = `${FALLBACK_GEOCODING_URL}/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    const data = await tryFetchWithProxies(url)
    return data.display_name || 'Dirección no encontrada'
  } catch (error) {
    console.error('Error getting address:', error)
    return 'Dirección no disponible'
  }
}