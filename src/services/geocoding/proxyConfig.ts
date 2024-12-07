export const FALLBACK_GEOCODING_URL = 'https://nominatim.openstreetmap.org'

// Updated CORS proxies list with more reliable options
export const CORS_PROXIES = [
  'https://corsproxy.io/?',
  'https://api.allorigins.win/raw?url=',
  'https://api.codetabs.com/v1/proxy?quest='
]

export const DEFAULT_TIMEOUT = 15000
export const DEFAULT_RETRY_COUNT = 2
export const DEFAULT_COUNTRY_CODE = 'MX'
export const DEFAULT_SEARCH_LIMIT = 5

export interface GeocodingOptions {
  fuzzyMatch?: boolean
  limit?: number
  countryCode?: string
  proximity?: { lat: number; lng: number }
}