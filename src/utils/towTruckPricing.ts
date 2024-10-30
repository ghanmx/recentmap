const towTruckTypes = {
  A: { perKm: 18.82, basePrice: 528.69, maneuverCharge: 1219.55, maxWeight: 2000 },
  B: { perKm: 20.62, basePrice: 607.43, maneuverCharge: 1350.00, maxWeight: 3000 },
  C: { perKm: 23.47, basePrice: 721.79, maneuverCharge: 1524.21, maxWeight: 4000 },
  D: { perKm: 32.35, basePrice: 885.84, maneuverCharge: 2101.65, maxWeight: 8000 }
};

const vehicleWeights = {
  'Toyota Corolla': 1500, 'Honda Civic': 1600, 'Mazda3': 1550,
  'Hyundai Elantra': 1450, 'Nissan Sentra': 1520, 'Volkswagen Jetta': 1580,
  'Toyota RAV4': 3500, 'Honda CR-V': 3600, 'Ford Explorer': 3800,
  'Chevrolet Equinox': 3400, 'Nissan Rogue': 3550, 'Jeep Cherokee': 3700,
  'Ford F-250': 6000, 'RAM 2500': 6500, 'Chevrolet Silverado 2500HD': 7000,
  'GMC Sierra 2500HD': 6800, 'Dodge Ram 3500': 7500
};

const customPrices = {
  'Tesla Model S': { perKm: 25, basePrice: 600, maneuverCharge: 1300, weight: 2200 },
  'Ford Mustang Mach-E': { perKm: 22, basePrice: 550, maneuverCharge: 1200, weight: 2500 }
};

export const getTowTruckType = (vehicleModel: string): 'A' | 'B' | 'C' | 'D' => {
  const weight = customPrices[vehicleModel]?.weight || vehicleWeights[vehicleModel];
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
  return Number((basePrice + (distance * perKm) + (requiresManeuver ? maneuverCharge : 0)).toFixed(2));
};