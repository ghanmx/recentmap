import { TollLocation } from './toll'

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
  fetchRequests: () => Promise<any[]>
  fetchRequestById: (id: string) => Promise<any>
  createRequest: (request: any) => Promise<any>
  updateRequest: (id: string, updates: any) => Promise<any>
  deleteRequest: (id: string) => Promise<void>
  fetchPayments: () => Promise<any[]>
  fetchMetrics: () => Promise<{ totalRequests: number; totalPayments: number }>
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

export interface LocationInfo {
  pickup?: { lat: number; lng: number; address: string }
  drop?: { lat: number; lng: number; address: string }
}
