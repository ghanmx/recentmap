export interface TowTruckType {
  name: string
  capacity: string
  perKm: number
  maneuverCharge: number
  flagDropFee: number
  maxWeight: number
}

export const towTruckTypes: Record<string, TowTruckType> = {
  A: {
    name: 'Grúa tipo A',
    capacity: 'hasta 2000kg',
    perKm: 18.82,
    maneuverCharge: 1219.55,
    flagDropFee: 528.69,
    maxWeight: 2000,
  },
  B: {
    name: 'Grúa tipo B',
    capacity: 'hasta 3000kg',
    perKm: 20.62,
    maneuverCharge: 1336.73,
    flagDropFee: 607.43,
    maxWeight: 3000,
  },
  C: {
    name: 'Grúa tipo C',
    capacity: 'hasta 4000kg',
    perKm: 23.47,
    maneuverCharge: 1524.21,
    flagDropFee: 721.79,
    maxWeight: 4000,
  },
  D: {
    name: 'Grúa tipo D',
    capacity: 'hasta 8000kg',
    perKm: 32.35,
    maneuverCharge: 2101.65,
    flagDropFee: 885.84,
    maxWeight: 8000,
  },
}