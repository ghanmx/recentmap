import { TollLocation } from '@/types/toll'

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

export interface TowingState {
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
}

export type TowingAction =
  | { type: 'UPDATE_DISTANCE'; payload: number }
  | { type: 'UPDATE_DISTANCE_AND_COSTS'; payload: { distance: number; costs: { subtotal: number; tax: number; finalTotal: number } } }
  | { type: 'UPDATE_TOLL_INFO'; payload: { tolls: TollLocation[]; tollCost: number } }
  | { type: 'UPDATE_TRUCK_TYPE'; payload: 'A' | 'B' | 'C' | 'D' }
  | { type: 'UPDATE_MANEUVER'; payload: boolean }
  | { type: 'UPDATE_VEHICLE_MODEL'; payload: string }
  | { type: 'SET_LOADING_LOCATIONS'; payload: boolean }
  | { type: 'SET_PROCESSING_PAYMENT'; payload: boolean }

export interface TowingContextType extends TowingState {
  updateTowingInfo: (distance: number) => void
  updateTollInfo: (tolls: TollLocation[], tollCost: number) => void
  updateTruckType: (type: 'A' | 'B' | 'C' | 'D') => void
  updateManeuverRequired: (required: boolean) => void
  updateSelectedVehicleModel: (model: string) => void
  updateLocationInfo: (info: LocationInfo) => void
  processPayment: (amount: number) => Promise<boolean>
  setLoadingLocations: (loading: boolean) => void
}