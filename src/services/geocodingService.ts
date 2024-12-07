import {
  FALLBACK_GEOCODING_URL,
  DEFAULT_SEARCH_LIMIT,
  DEFAULT_COUNTRY_CODE,
  GeocodingOptions
} from './geocoding/proxyConfig'
import { tryFetchWithProxies } from './geocoding/proxyFetch'

export interface GeocodingResult {
  address: string
  lat: string
  lon: string
  display_name: string
  importance?: number
  place_id?: string
}

export const searchAddresses = async (
  query: string,
  options: GeocodingOptions = {}
): Promise<GeocodingResult[]> => {
  const {
    fuzzyMatch = true,
    limit = DEFAULT_SEARCH_LIMIT,
    countryCode = DEFAULT_COUNTRY_CODE,
    proximity,
  } = options

  const params = new URLSearchParams({
    q: query,
    format: 'json',
    limit: limit.toString(),
    countrycodes: countryCode,
  })

  if (proximity) {
    params.append('lat', proximity.lat.toString())
    params.append('lon', proximity.lng.toString())
  }

  console.log('Geocoding search params:', Object.fromEntries(params.entries()))
  const url = `${FALLBACK_GEOCODING_URL}/search?${params}`
  
  try {
    const results = await tryFetchWithProxies(url)
    
    if (!Array.isArray(results)) {
      console.error('Invalid geocoding response:', results)
      return []
    }

    console.log('Geocoding results:', results)

    const mappedResults = results.map((result: any) => ({
      address: result.display_name,
      lat: result.lat,
      lon: result.lon,
      display_name: result.display_name,
      importance: result.importance,
      place_id: result.place_id
    }))

    return fuzzyMatch 
      ? mappedResults 
      : mappedResults.filter(r => 
          r.display_name.toLowerCase().includes(query.toLowerCase())
        )
  } catch (error) {
    console.error('Geocoding search failed:', error)
    return []
  }
}

export const getAddressFromCoords = async (lat: number, lon: number): Promise<string> => {
  const params = new URLSearchParams({
    format: 'json',
    lat: lat.toString(),
    lon: lon.toString(),
  })

  try {
    console.log('Reverse geocoding request:', { lat, lon })
    const url = `${FALLBACK_GEOCODING_URL}/reverse?${params}`
    const result = await tryFetchWithProxies(url)
    console.log('Reverse geocoding result:', result)
    return result?.display_name || 'Address not found'
  } catch (error) {
    console.error('Reverse geocoding failed:', error)
    return 'Error retrieving address'
  }
}