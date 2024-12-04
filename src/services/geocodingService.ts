import {
  FALLBACK_GEOCODING_URL,
  GeocodingOptions,
  DEFAULT_COUNTRY_CODE,
  DEFAULT_SEARCH_LIMIT
} from './geocoding/proxyConfig'
import { tryFetchWithProxies } from './geocoding/proxyFetch'

export const searchAddresses = async (
  query: string,
  options: GeocodingOptions = {}
) => {
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

  return fuzzyMatch ? results : results.filter((r: any) => 
    r.display_name.toLowerCase().includes(query.toLowerCase())
  )
}

export const getAddressFromCoords = async (lat: number, lon: number) => {
  const params = new URLSearchParams({
    format: 'json',
    lat: lat.toString(),
    lon: lon.toString(),
    zoom: '18',
    addressdetails: '1',
  })

  const url = `${FALLBACK_GEOCODING_URL}/reverse?${params}`
  return tryFetchWithProxies(url)
}