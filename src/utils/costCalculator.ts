import { TowTruckType } from '@/utils/pricing'

export const calculateTotalCost = (
  distance: number,
  truckType: 'A' | 'B' | 'C' | 'D',
  requiresManeuver: boolean,
  tollCost: number = 0,
  requiresInvoice: boolean = false,
): { subtotal: number; tax: number; finalTotal: number } => {
  const baseRate = {
    A: 18.82,
    B: 20.62,
    C: 23.47,
    D: 32.35,
  }[truckType] || 18.82

  const maneuverCost = requiresManeuver
    ? {
        A: 1219.55,
        B: 1336.73,
        C: 1524.21,
        D: 2101.65,
      }[truckType]
    : 0

  const flagDropFee = {
    A: 528.69,
    B: 607.43,
    C: 721.79,
    D: 885.84,
  }[truckType]

  const baseCost = distance * baseRate
  const subtotal = baseCost + maneuverCost + flagDropFee + tollCost
  const tax = requiresInvoice ? subtotal * 0.16 : 0
  const finalTotal = subtotal + tax

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