import { Location } from './location'

export interface LocationSearchProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void
  onSelectingLocation?: () => void
  currentAddress?: string
  currentLocation?: Location | null
  placeholder?: string
  type?: 'pickup' | 'drop'
  className?: string
  icon?: React.ReactNode
  requiresInvoice?: boolean
  onInvoiceChange?: (requires: boolean) => void
}

export interface Suggestion {
  address: string
  lat: number
  lon: number
  distance: number
}

export interface ProximityOptions {
  lat: string
  lng: string
}