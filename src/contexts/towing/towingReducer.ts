import { TowingState } from './types'
import { calculateTotalCost } from '@/utils/costCalculator'

export type TowingAction =
  | { type: 'UPDATE_DISTANCE'; payload: number }
  | { type: 'UPDATE_TOLL_INFO'; payload: { tolls: any[]; tollCost: number } }
  | { type: 'UPDATE_TRUCK_TYPE'; payload: 'A' | 'B' | 'C' | 'D' }
  | { type: 'UPDATE_MANEUVER'; payload: boolean }
  | { type: 'UPDATE_VEHICLE_MODEL'; payload: string }
  | { type: 'SET_LOADING_LOCATIONS'; payload: boolean }
  | { type: 'SET_PROCESSING_PAYMENT'; payload: boolean }

export const towingReducer = (state: TowingState, action: TowingAction): TowingState => {
  switch (action.type) {
    case 'UPDATE_DISTANCE': {
      const costs = calculateTotalCost(
        action.payload,
        state.truckType,
        state.requiresManeuver,
        state.totalTollCost
      )
      return {
        ...state,
        totalDistance: action.payload,
        totalCost: costs.finalTotal,
        paymentInfo: {
          ...state.paymentInfo,
          subtotal: costs.subtotal,
          total: costs.finalTotal,
        },
      }
    }

    case 'UPDATE_TOLL_INFO':
      return {
        ...state,
        detectedTolls: action.payload.tolls,
        totalTollCost: action.payload.tollCost,
        tollInfo: {
          tolls: action.payload.tolls,
          totalTollCost: action.payload.tollCost,
        },
      }

    case 'UPDATE_TRUCK_TYPE':
      return {
        ...state,
        truckType: action.payload,
      }

    case 'UPDATE_MANEUVER':
      return {
        ...state,
        requiresManeuver: action.payload,
      }

    case 'UPDATE_VEHICLE_MODEL':
      return {
        ...state,
        selectedVehicleModel: action.payload,
      }

    case 'SET_LOADING_LOCATIONS':
      return {
        ...state,
        isLoadingLocations: action.payload,
      }

    case 'SET_PROCESSING_PAYMENT':
      return {
        ...state,
        isProcessingPayment: action.payload,
      }

    default:
      return state
  }
}