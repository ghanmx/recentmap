import { TowTruckType } from '@/utils/pricing'

export const calculateTotalCost = (
  distance: number,
  truckType: 'A' | 'B' | 'C' | 'D',
  requiresManeuver: boolean,
  tollCost: number = 0,
  requiresInvoice: boolean = false,
): { subtotal: number; tax: number; finalTotal: number } => {
  // Base rates per kilometer for each truck type
  const baseRate = {
    A: 18.82,
    B: 20.62,
    C: 23.47,
    D: 32.35,
  }[truckType] || 18.82

  // Maneuver costs for each truck type
  const maneuverCost = requiresManeuver
    ? {
        A: 1219.55,
        B: 1336.73,
        C: 1524.21,
        D: 2101.65,
      }[truckType]
    : 0

  // Flag drop fees for each truck type
  const flagDropFee = {
    A: 528.69,
    B: 607.43,
    C: 721.79,
    D: 885.84,
  }[truckType]

  // Calculate total distance cost
  const baseCost = distance * baseRate
  
  // Calculate subtotal including all components
  const subtotal = baseCost + (maneuverCost || 0) + flagDropFee + tollCost
  
  // Calculate tax if invoice is required
  const tax = requiresInvoice ? subtotal * 0.16 : 0
  
  // Calculate final total
  const finalTotal = subtotal + tax

  console.log('Cost calculation details:', {
    distance,
    truckType,
    baseRate,
    baseCost,
    maneuverCost,
    flagDropFee,
    tollCost,
    subtotal,
    tax,
    finalTotal,
  })

  return {
    subtotal,
    tax,
    finalTotal,
  }
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}