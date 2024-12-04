export const FALLBACK_GEOCODING_URL = 'https://nominatim.openstreetmap.org'

export const CORS_PROXIES = [
  'https://proxy.cors.sh/',
  'https://api.allorigins.win/raw?url=',
  'https://api.codetabs.com/v1/proxy?quest='
]

export interface GeocodingOptions {
  fuzzyMatch?: boolean
  limit?: number
  countryCode?: string
  proximity?: { lat: number; lng: number }
}

export const DEFAULT_TIMEOUT = 8000
export const DEFAULT_RETRY_COUNT = 3
export const DEFAULT_COUNTRY_CODE = 'MX'
export const DEFAULT_SEARCH_LIMIT = 5