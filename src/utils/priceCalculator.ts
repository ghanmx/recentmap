import { TowTruckType, towTruckTypes } from '@/utils/pricing'

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export const calculateTotalCost = (
  distance: number,
  truckType: string,
  requiresManeuver: boolean,
  tollCosts: number = 0,
  requiresInvoice: boolean = false,
): number => {
  const truck = towTruckTypes[truckType as keyof typeof towTruckTypes] || towTruckTypes.A
  const baseCost = calculateBaseCost(distance, truckType)
  const maneuverCost = requiresManeuver ? truck.maneuverCharge : 0
  const flagDropFee = truck.flagDropFee
  const subtotal = baseCost + maneuverCost + tollCosts + flagDropFee
  const tax = requiresInvoice ? subtotal * 0.16 : 0

  console.log('Cost calculation:', {
    distance,
    truckType,
    baseCost,
    maneuverCost,
    flagDropFee,
    tollCosts,
    subtotal,
    tax,
    total: subtotal + tax,
  })

  return subtotal + tax
}

export const calculateBaseCost = (
  distance: number,
  truckType: string,
): number => {
  const truck = towTruckTypes[truckType as keyof typeof towTruckTypes] || towTruckTypes.A
  return distance * truck.perKm
}

export const COMPANY_LOCATION = { lat: 26.510272, lng: -100.006323 }