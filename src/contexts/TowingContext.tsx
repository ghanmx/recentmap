import { createContext, useContext, useState, ReactNode } from 'react'
import { TollLocation } from '@/data/tollData'

interface LocationInfo {
  pickup?: { lat: number; lng: number; address: string }
  drop?: { lat: number; lng: number; address: string }
}

interface TollInfo {
  tolls: TollLocation[]
  totalTollCost: number
}

interface TowingContextType {
  totalDistance: number
  totalCost: number
  detectedTolls: TollLocation[]
  totalTollCost: number
  truckType: 'A' | 'B' | 'C' | 'D'
  requiresManeuver: boolean
  selectedVehicleModel: string
  tollInfo: TollInfo | null
  updateTowingInfo: (distance: number) => void
  updateTollInfo: (tolls: TollLocation[], tollCost: number) => void
  updateTruckType: (type: 'A' | 'B' | 'C' | 'D') => void
  updateManeuverRequired: (required: boolean) => void
  updateSelectedVehicleModel: (model: string) => void
  updateLocationInfo: (info: LocationInfo) => void
}

const TowingContext = createContext<TowingContextType | undefined>(undefined)

export const TowingProvider = ({ children }: { children: ReactNode }) => {
  const [totalDistance, setTotalDistance] = useState(0)
  const [totalCost, setTotalCost] = useState(0)
  const [detectedTolls, setDetectedTolls] = useState<TollLocation[]>([])
  const [totalTollCost, setTotalTollCost] = useState(0)
  const [truckType, setTruckType] = useState<'A' | 'B' | 'C' | 'D'>('A')
  const [requiresManeuver, setRequiresManeuver] = useState(false)
  const [selectedVehicleModel, setSelectedVehicleModel] = useState('')
  const [tollInfo, setTollInfo] = useState<TollInfo | null>(null)

  const updateTowingInfo = (distance: number) => {
    setTotalDistance(distance)
  }

  const updateTollInfo = (tolls: TollLocation[], tollCost: number) => {
    setDetectedTolls(tolls)
    setTotalTollCost(tollCost)
    setTollInfo({ tolls, totalTollCost: tollCost })
  }

  const updateTruckType = (type: 'A' | 'B' | 'C' | 'D') => {
    setTruckType(type)
  }

  const updateManeuverRequired = (required: boolean) => {
    setRequiresManeuver(required)
  }

  const updateSelectedVehicleModel = (model: string) => {
    setSelectedVehicleModel(model)
  }

  const updateLocationInfo = (info: LocationInfo) => {
    // This function is used to update pickup and drop location information
    // The actual state updates will be handled by the map component
  }

  return (
    <TowingContext.Provider
      value={{
        totalDistance,
        totalCost,
        detectedTolls,
        totalTollCost,
        truckType,
        requiresManeuver,
        selectedVehicleModel,
        tollInfo,
        updateTowingInfo,
        updateTollInfo,
        updateTruckType,
        updateManeuverRequired,
        updateSelectedVehicleModel,
        updateLocationInfo,
      }}
    >
      {children}
    </TowingContext.Provider>
  )
}

export const useTowing = () => {
  const context = useContext(TowingContext)
  if (context === undefined) {
    throw new Error('useTowing must be used within a TowingProvider')
  }
  return context
}
