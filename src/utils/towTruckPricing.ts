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

const vehicleWeights: Record<string, number> = {
  'Toyota Corolla': 1500, 'Honda Civic': 1600, 'Mazda3': 1550,
  'Hyundai Elantra': 1450, 'Nissan Sentra': 1520, 'Volkswagen Jetta': 1580,
  'Toyota RAV4': 3500, 'Honda CR-V': 3600, 'Ford Explorer': 3800,
  'Chevrolet Equinox': 3400, 'Nissan Rogue': 3550, 'Jeep Cherokee': 3700,
  'Ford F-250': 6000, 'RAM 2500': 6500, 'Chevrolet Silverado 2500HD': 7000,
  'GMC Sierra 2500HD': 6800, 'Dodge Ram 3500': 7500
};

export const getTruckTypeForVehicle = (model: string): 'A' | 'B' | 'C' | 'D' => {
  if (!model) return 'A';
  
  const modelLower = model.toLowerCase();
  
  if (modelLower.includes('pickup') || 
      modelLower.includes('suv') || 
      modelLower.includes('camioneta') ||
      modelLower.includes('truck')) {
    return 'C';
  }
  if (modelLower.includes('van') || modelLower.includes('minivan')) {
    return 'B';
  }
  
  const weight = vehicleWeights[model];
  if (weight) {
    if (weight <= towTruckTypes.A.maxWeight) return 'A';
    if (weight <= towTruckTypes.B.maxWeight) return 'B';
    if (weight <= towTruckTypes.C.maxWeight) return 'C';
    return 'D';
  }
  
  return 'A';
};

export const calculateTotalCost = (distance: number, towTruckType: 'A' | 'B' | 'C' | 'D', requiresManeuver: boolean): number => {
  const { perKm, basePrice, maneuverCharge } = towTruckTypes[towTruckType];
  const distanceCost = distance * perKm;
  const maneuverCost = requiresManeuver ? maneuverCharge : 0;
  return Number((basePrice + distanceCost + maneuverCost).toFixed(2));
};