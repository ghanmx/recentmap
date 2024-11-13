export interface Location {
  lat: number
  lng: number
}

export interface RouteResponse {
  geometry: string
  distance: number
  duration: number
}

export interface ServiceRequest {
  id: string
  status: 'pending' | 'completed'
  createdAt: Date
  username: string
  vehicleMake: string
  vehicleModel: string
  vehicleYear: number
  vehicleColor: string
  truckType: string
  issueDescription: string
  pickupLocation?: Location
  dropLocation?: Location
  serviceType: 'standard' | 'flatbed' | 'emergency'
  requiresManeuver: boolean
  tollFees: number
}
