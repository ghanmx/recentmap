export interface TowTruckConfig {
  perKm: number;
  basePrice: number;
  maneuverCharge: number;
  maxWeight: number;
}

export const towTruckTypes: Record<'A' | 'B' | 'C' | 'D', TowTruckConfig> = {
  A: { perKm: 18.82, basePrice: 528.69, maneuverCharge: 1219.55, maxWeight: 2000 },
  B: { perKm: 20.62, basePrice: 607.43, maneuverCharge: 1350.00, maxWeight: 3000 },
  C: { perKm: 23.47, basePrice: 721.79, maneuverCharge: 1524.21, maxWeight: 4000 },
  D: { perKm: 32.35, basePrice: 885.84, maneuverCharge: 2101.65, maxWeight: 8000 }
};