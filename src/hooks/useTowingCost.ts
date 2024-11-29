import { useState } from 'react'
import { towTruckTypes } from '@/utils/towTruckPricing'

export const useTowingCost = () => {
  const [selectedTruck, setSelectedTruck] = useState<'A' | 'B' | 'C' | 'D'>('A')
  const [distance, setDistance] = useState(0)
  const [requiresManeuver, setRequiresManeuver] = useState(false)
  const [tollCost, setTollCost] = useState(0)

  const truck = towTruckTypes[selectedTruck]
  const baseCost = distance * truck.perKm
  const flagDropFee = truck.flagDropFee
  const maneuverCost = requiresManeuver ? truck.maneuverCharge : 0
  const totalCost = baseCost + flagDropFee + maneuverCost + tollCost

  return {
    selectedTruck,
    setSelectedTruck,
    distance,
    setDistance,
    requiresManeuver,
    setRequiresManeuver,
    tollCost,
    setTollCost,
    totalCost,
    baseCost,
    flagDropFee,
    maneuverCost,
  }
}
