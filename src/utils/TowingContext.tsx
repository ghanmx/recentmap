import { createContext, useContext, useState, ReactNode } from 'react'
import { TollLocation } from '@/data/tollData'

export interface UserDetails {
  name: string
  email: string
  phone: string
  vehicleMake: string
  vehicleModel: string
  vehicleYear: string
  vehicleColor: string
}

interface Location {
  lat: number
  lng: number
  address?: string
}

interface TowingContextType {
  totalDistance: number
  totalCost: number
  detectedTolls: TollLocation[]
  totalTollCost: number
  truckType: 'A' | 'B' | 'C' | 'D'
  requiresManeuver: boolean
  selectedVehicleModel: string
  userDetails: UserDetails | null
  pickupLocation: Location | null
  dropLocation: Location | null
  updateTowingInfo: (distance: number) => void
  updateTollInfo: (tolls: TollLocation[], tollCost: number) => void
  updateTruckType: (type: 'A' | 'B' | 'C' | 'D') => void
  updateManeuverRequired: (required: boolean) => void
  updateSelectedVehicleModel: (model: string) => void
  updateUserDetails: (details: UserDetails) => void
  updateLocations: (pickup: Location | null, drop: Location | null) => void
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
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null)
  const [dropLocation, setDropLocation] = useState<Location | null>(null)

  const updateTowingInfo = (distance: number) => {
    setTotalDistance(distance)
  }

  const updateTollInfo = (tolls: TollLocation[], tollCost: number) => {
    setDetectedTolls(tolls)
    setTotalTollCost(tollCost)
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

  const updateUserDetails = (details: UserDetails) => {
    setUserDetails(details)
  }

  const updateLocations = (pickup: Location | null, drop: Location | null) => {
    setPickupLocation(pickup)
    setDropLocation(drop)
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
        userDetails,
        pickupLocation,
        dropLocation,
        updateTowingInfo,
        updateTollInfo,
        updateTruckType,
        updateManeuverRequired,
        updateSelectedVehicleModel,
        updateUserDetails,
        updateLocations,
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
