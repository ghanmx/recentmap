export interface Location {
  lat: number
  lng: number
  address?: string
}

export interface TollLocation {
  id?: string
  name: string
  location: string
  cost: number
  lat: number
  lng: number
  description: string
  type: string
  operatingHours: string
  acceptedPayments: string[]
  vehicleTypes: string[]
  lastUpdated: string
  status: 'active' | 'inactive'
  direction?: 'outbound' | 'return'
  kilometer?: string
  route?: string
  distance?: number
}