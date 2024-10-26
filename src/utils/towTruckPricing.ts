export const towTruckTypes = {
  A: { perKm: 18.82, basePrice: 528.69, maneuverCharge: 1219.55, maxWeight: 2000 },
  C: { perKm: 23.47, basePrice: 721.79, maneuverCharge: 1524.21, maxWeight: 4000 },
  D: { perKm: 32.35, basePrice: 885.84, maneuverCharge: 2101.65, maxWeight: 8000 },
};

export const vehicleWeights = {
  'Toyota Corolla': 1500,
  'Honda Civic': 1600,
  'Mazda3': 1550,
  'Hyundai Elantra': 1450,
  'Nissan Sentra': 1520,
  'Volkswagen Jetta': 1580,
  'Toyota RAV4': 3500,
  'Honda CR-V': 3600,
  'Ford Explorer': 3800,
  'Chevrolet Equinox': 3400,
  'Nissan Rogue': 3550,
  'Jeep Cherokee': 3700,
  'Ford F-250': 6000,
  'RAM 2500': 6500,
  'Chevrolet Silverado 2500HD': 7000,
  'GMC Sierra 2500HD': 6800,
  'Dodge Ram 3500': 7500
};

export const customPrices = {
  'Tesla Model S': { perKm: 25, basePrice: 600, maneuverCharge: 1300, weight: 2200 },
  'Ford Mustang Mach-E': { perKm: 22, basePrice: 550, maneuverCharge: 1200, weight: 2500 },
};

export const getVehicleSize = (vehicleModel: string): 'small' | 'medium' | 'large' => {
  const smallCars = [
    'Toyota Corolla', 'Honda Civic', 'Mazda3', 'Hyundai Elantra', 'Volkswagen Jetta',
    'Nissan Sentra', 'Kia Forte', 'Subaru Impreza'
  ];

  const mediumVehicles = [
    'Toyota RAV4', 'Honda CR-V', 'Ford Explorer', 'Chevrolet Equinox', 'Nissan Rogue',
    'Jeep Cherokee', 'Hyundai Tucson', 'Mazda CX-5', 'Ford F-150', 'RAM 1500'
  ];

  const largeVehicles = [
    'Ford F-250', 'Ford F-350', 'Chevrolet Silverado 2500HD', 'RAM 2500', 'RAM 3500',
    'GMC Sierra 2500HD', 'Toyota Tundra', 'Nissan Titan XD'
  ];

  if (largeVehicles.includes(vehicleModel)) return 'large';
  if (mediumVehicles.includes(vehicleModel)) return 'medium';
  if (smallCars.includes(vehicleModel)) return 'small';
  return 'small';
};

export const getTowTruckType = (vehicleModel: string): 'A' | 'C' | 'D' => {
  if (customPrices[vehicleModel]) {
    const weight = customPrices[vehicleModel].weight;
    if (weight <= towTruckTypes.A.maxWeight) return 'A';
    if (weight <= towTruckTypes.C.maxWeight) return 'C';
    return 'D';
  }

  const weight = vehicleWeights[vehicleModel];
  if (weight) {
    if (weight <= towTruckTypes.A.maxWeight) return 'A';
    if (weight <= towTruckTypes.C.maxWeight) return 'C';
    return 'D';
  }

  const vehicleSize = getVehicleSize(vehicleModel);
  switch (vehicleSize) {
    case 'small': return 'A';
    case 'medium': return 'C';
    case 'large': return 'D';
    default: return 'A';
  }
};

export const calculateTotalCost = (distance: number, towTruckType: 'A' | 'C' | 'D', requiresManeuver: boolean): number => {
  const { perKm, basePrice, maneuverCharge } = towTruckTypes[towTruckType] || towTruckTypes.A;
  let totalCost = basePrice + (distance * perKm);
  if (requiresManeuver) {
    totalCost += maneuverCharge;
  }
  return Number(totalCost.toFixed(2));
};