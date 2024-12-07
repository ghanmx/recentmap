export const FALLBACK_GEOCODING_URL = 'https://nominatim.openstreetmap.org'

// Updated CORS proxies list with more reliable options and better order
export const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://api.codetabs.com/v1/proxy?quest=',
  'https://corsproxy.io/?',
  'https://proxy.cors.sh/',
  'https://cors-anywhere.herokuapp.com/'
]

export const DEFAULT_TIMEOUT = 20000 // Increased timeout
export const DEFAULT_RETRY_COUNT = 3
export const DEFAULT_COUNTRY_CODE = 'MX'
export const DEFAULT_SEARCH_LIMIT = 5

export interface GeocodingOptions {
  fuzzyMatch?: boolean
  limit?: number
  countryCode?: string
  proximity?: { lat: number; lng: number }
}