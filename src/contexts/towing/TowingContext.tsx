import { createContext, useContext, useReducer, ReactNode } from 'react'
import { TowingContextType, LocationInfo } from './types'
import { towingReducer } from './towingReducer'
import { useToast } from '@/hooks/use-toast'

const initialState = {
  totalDistance: 0,
  totalCost: 0,
  detectedTolls: [],
  totalTollCost: 0,
  truckType: 'A' as const,
  requiresManeuver: false,
  selectedVehicleModel: '',
  tollInfo: null,
  paymentInfo: {
    subtotal: 0,
    tax: 0,
    total: 0,
    isPending: false,
    isProcessing: false,
  },
  isLoadingLocations: false,
  isProcessingPayment: false,
}

const TowingContext = createContext<TowingContextType | null>(null)

export const TowingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(towingReducer, initialState)
  const { toast } = useToast()

  const updateTowingInfo = (distance: number) => {
    dispatch({ type: 'UPDATE_DISTANCE', payload: distance })
  }

  const updateTollInfo = (tolls: any[], tollCost: number) => {
    dispatch({ type: 'UPDATE_TOLL_INFO', payload: { tolls, tollCost } })
  }

  const updateTruckType = (type: 'A' | 'B' | 'C' | 'D') => {
    dispatch({ type: 'UPDATE_TRUCK_TYPE', payload: type })
  }

  const updateManeuverRequired = (required: boolean) => {
    dispatch({ type: 'UPDATE_MANEUVER', payload: required })
  }

  const updateSelectedVehicleModel = (model: string) => {
    dispatch({ type: 'UPDATE_VEHICLE_MODEL', payload: model })
  }

  const updateLocationInfo = async (info: LocationInfo) => {
    dispatch({ type: 'SET_LOADING_LOCATIONS', payload: true })
    try {
      if (info.pickup) {
        toast({
          title: 'Ubicación de Recogida Actualizada',
          description: info.pickup.address,
        })
      }
      if (info.drop) {
        toast({
          title: 'Ubicación de Entrega Actualizada',
          description: info.drop.address,
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar la ubicación',
        variant: 'destructive',
      })
    } finally {
      dispatch({ type: 'SET_LOADING_LOCATIONS', payload: false })
    }
  }

  const processPayment = async (amount: number): Promise<boolean> => {
    dispatch({ type: 'SET_PROCESSING_PAYMENT', payload: true })
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast({
        title: 'Pago Procesado',
        description: `Se ha procesado el pago por $${amount.toFixed(2)} MXN`,
      })
      return true
    } catch (error) {
      toast({
        title: 'Error en el Pago',
        description: 'No se pudo procesar el pago',
        variant: 'destructive',
      })
      return false
    } finally {
      dispatch({ type: 'SET_PROCESSING_PAYMENT', payload: false })
    }
  }

  const setLoadingLocations = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING_LOCATIONS', payload: loading })
  }

  return (
    <TowingContext.Provider
      value={{
        ...state,
        updateTowingInfo,
        updateTollInfo,
        updateTruckType,
        updateManeuverRequired,
        updateSelectedVehicleModel,
        updateLocationInfo,
        processPayment,
        setLoadingLocations,
      }}
    >
      {children}
    </TowingContext.Provider>
  )
}

export const useTowing = () => {
  const context = useContext(TowingContext)
  if (context === null) {
    throw new Error('useTowing must be used within a TowingProvider')
  }
  return context
}