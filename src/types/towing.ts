export interface TollLocation {
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

export interface LocationInfo {
  pickup?: { lat: number; lng: number; address: string }
  drop?: { lat: number; lng: number; address: string }
}

export interface TollInfo {
  tolls: TollLocation[]
  totalTollCost: number
}

export interface PaymentInfo {
  subtotal: number
  tax: number
  total: number
  isPending: boolean
  isProcessing: boolean
}

export interface TowingContextType {
  totalDistance: number
  totalCost: number
  detectedTolls: TollLocation[]
  totalTollCost: number
  truckType: 'A' | 'B' | 'C' | 'D'
  requiresManeuver: boolean
  selectedVehicleModel: string
  tollInfo: TollInfo | null
  paymentInfo: PaymentInfo
  isLoadingLocations: boolean
  isProcessingPayment: boolean
  updateTowingInfo: (distance: number) => void
  updateTollInfo: (tolls: TollLocation[], tollCost: number) => void
  updateTruckType: (type: 'A' | 'B' | 'C' | 'D') => void
  updateManeuverRequired: (required: boolean) => void
  updateSelectedVehicleModel: (model: string) => void
  updateLocationInfo: (info: LocationInfo) => void
  processPayment: (amount: number) => Promise<boolean>
}