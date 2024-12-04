import {
  FALLBACK_GEOCODING_URL,
  GeocodingOptions,
  DEFAULT_COUNTRY_CODE,
  DEFAULT_SEARCH_LIMIT
} from './geocoding/proxyConfig'
import { tryFetchWithProxies } from './geocoding/proxyFetch'

interface GeocodingResult {
  address: string
  lat: number
  lon: number
  display_name: string
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
  const results = await tryFetchWithProxies(url)

  return results.map((result: any) => ({
    address: result.display_name,
    lat: parseFloat(result.lat),
    lon: parseFloat(result.lon),
    display_name: result.display_name
  }))
}

export const getAddressFromCoords = async (lat: number, lon: number): Promise<string> => {
  const params = new URLSearchParams({
    format: 'json',
    lat: lat.toString(),
    lon: lon.toString(),
    zoom: '18',
    addressdetails: '1',
  })

  const url = `${FALLBACK_GEOCODING_URL}/reverse?${params}`
  const result = await tryFetchWithProxies(url)
  return result.display_name || 'Address not found'
}