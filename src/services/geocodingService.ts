const FALLBACK_GEOCODING_URL = 'https://nominatim.openstreetmap.org'

// Updated list of CORS proxies with more reliable options
const CORS_PROXIES = [
  'https://proxy.cors.sh/',
  'https://api.allorigins.win/raw?url=',
  'https://api.codetabs.com/v1/proxy?quest='
]

interface GeocodingOptions {
  fuzzyMatch?: boolean
  limit?: number
  countryCode?: string
  proximity?: { lat: number; lng: number }
}

const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 8000) => {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        ...options.headers,
        'Accept': 'application/json',
        'User-Agent': 'TowingServiceApplication/1.0',
        'origin': window.location.origin,
        'x-requested-with': 'XMLHttpRequest'
      },
    })
    clearTimeout(id)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    clearTimeout(id)
    throw error
  }
}

const tryFetchWithProxies = async (url: string, retryCount = 3) => {
  let lastError

  for (const proxyUrl of CORS_PROXIES) {
    for (let attempt = 0; attempt < retryCount; attempt++) {
      try {
        console.log(`Attempting request with proxy ${proxyUrl} (attempt ${attempt + 1}/${retryCount})`)
        const finalUrl = `${proxyUrl}${encodeURIComponent(url)}`
        const data = await fetchWithTimeout(finalUrl)
        console.log('Successfully fetched data with proxy:', proxyUrl)
        return data
      } catch (error) {
        lastError = error
        console.warn(`Failed attempt ${attempt + 1} with proxy ${proxyUrl}:`, error)
        
        if (attempt < retryCount - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)))
        }
      }
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
    limit = 5,
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