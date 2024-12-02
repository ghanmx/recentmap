import { TollLocation } from '@/types/toll'

/**
 * Separates tolls by direction (outbound/return)
 */
export const separateTollsByDirection = (tolls: TollLocation[]) => {
  return {
    outboundTolls: tolls.filter((toll) => toll.direction === 'outbound'),
    returnTolls: tolls.filter((toll) => toll.direction === 'return'),
  }
}

/**
 * Formats toll information for display
 */
export const formatTollInfo = (toll: TollLocation) => ({
  name: toll.name,
  cost: toll.cost,
  operatingHours: toll.operatingHours,
  acceptedPayments: toll.acceptedPayments.join(', '),
})

/**
 * Calculates total toll cost for a route
 */
export const calculateTotalTollCost = (tolls: TollLocation[]): number => {
  return tolls.reduce((sum, toll) => sum + toll.cost, 0)
}
