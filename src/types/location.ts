// Interface representing a Location entity
export interface Location {
  id: string
  name: string
  address?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
  latitude?: number
  longitude?: number
  createdAt?: Date
  updatedAt?: Date
}

// Input structure for creating or updating a location
export interface LocationInput {
  name: string
  address?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
  latitude?: number
  longitude?: number
}

// Filter criteria for querying locations
export interface LocationFilter {
  id?: string
  name?: string
  city?: string
  state?: string
  country?: string
}

// Interface for representing a location search result with distance and formatted address
export interface LocationResult {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  lat: number
  lon: number
  distance: number
  formattedAddress: string
  onSelectingPickup?: (selecting: boolean) => void
}

// Interface representing the minimal search result for a location search
export interface LocationSearchResult {
  address: string
  lat: number
  lon: number
  distance: number
}

// Structure for API response regarding locations
export interface LocationResponse {
  success: boolean
  message?: string
  data?: Location
  error?: string
  results?: LocationResult[]
}
