import {
  FALLBACK_GEOCODING_URL,
  DEFAULT_SEARCH_LIMIT,
  DEFAULT_COUNTRY_CODE,
  GeocodingOptions,
} from './geocoding/proxyConfig'
import { tryFetchWithProxies } from './geocoding/proxyFetch'

export interface GeocodingResult {
  address: string
  lat: number
  lon: number
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

  const url = `${FALLBACK_GEOCODING_URL}/search?${params}`
  
  try {
    const results = await tryFetchWithProxies(url)
    
    if (!Array.isArray(results)) {
      console.error('Invalid response format:', results)
      return []
    }

    const mappedResults = results.map((result: any) => ({
      address: result.display_name,
      lat: parseFloat(result.lat),
      lon: parseFloat(result.lon),
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
    console.error('Error searching addresses:', error)
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
    const url = `${FALLBACK_GEOCODING_URL}/reverse?${params}`
    const result = await tryFetchWithProxies(url)
    return result?.display_name || 'Address not found'
  } catch (error) {
    console.error('Error getting address from coordinates:', error)
    return 'Error retrieving address'
  }
}