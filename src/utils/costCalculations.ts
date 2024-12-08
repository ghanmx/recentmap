import { TowTruckType } from '@/utils/pricing'

export interface CostBreakdown {
  baseCost: number
  maneuverCost: number
  flagDropFee: number
  tollCost: number
  subtotal: number
  tax: number
  finalTotal: number
}

export const calculateServiceCosts = (
  totalDistance: number,
  truckType: 'A' | 'B' | 'C' | 'D',
  requiresManeuver: boolean,
  totalTollCost: number,
  requiresInvoice: boolean
): CostBreakdown => {
  const baseRate = {
    A: 18.82,
    B: 20.62,
    C: 23.47,
    D: 32.35,
  }[truckType] || 18.82

  const maneuverCostRates = {
    A: 1219.55,
    B: 1336.73,
    C: 1524.21,
    D: 2101.65,
  }

  const flagDropFeeRates = {
    A: 528.69,
    B: 607.43,
    C: 721.79,
    D: 885.84,
  }

  const baseCost = totalDistance * baseRate
  const maneuverCost = requiresManeuver ? maneuverCostRates[truckType] : 0
  const flagDropFee = flagDropFeeRates[truckType]
  const subtotal = baseCost + maneuverCost + flagDropFee + totalTollCost
  const tax = requiresInvoice ? subtotal * 0.16 : 0
  const finalTotal = subtotal + tax

  return {
    baseCost,
    maneuverCost,
    flagDropFee,
    tollCost: totalTollCost,
    subtotal,
    tax,
    finalTotal,
  }
}