import { TowingState, TowingAction } from './types'

export const towingReducer = (state: TowingState, action: TowingAction): TowingState => {
  switch (action.type) {
    case 'UPDATE_DISTANCE_AND_COSTS':
      return {
        ...state,
        totalDistance: action.payload.distance,
        paymentInfo: {
          ...state.paymentInfo,
          subtotal: action.payload.costs.subtotal,
          tax: action.payload.costs.tax,
          total: action.payload.costs.finalTotal,
        }
      }
    
    case 'UPDATE_TOLL_INFO':
      return {
        ...state,
        detectedTolls: action.payload.tolls,
        totalTollCost: action.payload.tollCost,
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
