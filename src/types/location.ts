export interface Location {
  lat: number
  lng: number
  address: string
}

export interface TollLocation {
  id: string
  name: string
  location: {
    lat: number
    lng: number
  }
  cost: number
  operatingHours: string
  acceptedPayments: string[]
  vehicleTypes: string[]
  lastUpdated: string
  status: 'active' | 'inactive'
}