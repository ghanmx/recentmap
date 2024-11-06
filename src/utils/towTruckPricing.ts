export interface TowTruckType {
  name: string;
  capacity: string;
  perKm: number;
  maneuverCharge: number;
  flagDropFee: number;  // Added for "banderazo"
  maxWeight: number;
}

export const towTruckTypes: Record<string, TowTruckType> = {
  A: {
    name: "Tipo A",
    capacity: "hasta 2000kg",
    perKm: 18.82,
    maneuverCharge: 1219.55,
    flagDropFee: 528.69,
    maxWeight: 2000
  },
  B: {
    name: "Tipo B",
    capacity: "hasta 3000kg",
    perKm: 20.62,
    maneuverCharge: 1336.73,
    flagDropFee: 607.43,
    maxWeight: 3000
  },
  C: {
    name: "Tipo C",
    capacity: "hasta 4000kg",
    perKm: 23.47,
    maneuverCharge: 1524.21,
    flagDropFee: 721.79,
    maxWeight: 4000
  },
  D: {
    name: "Tipo D",
    capacity: "hasta 8000kg",
    perKm: 32.35,
    maneuverCharge: 2101.65,
    flagDropFee: 885.84,
    maxWeight: 8000
  }
};

export const getTruckTypeForVehicle = (model: string): "A" | "B" | "C" | "D" => {
  const modelLower = model.toLowerCase();
  
  // SUVs and Crossovers that require Type C
  const typeCVehicles = [
    'murano', 'pathfinder', 'highlander', 'pilot', '4runner', 'expedition',
    'tahoe', 'suburban', 'sequoia', 'armada', 'telluride', 'palisade',
    'explorer', 'traverse', 'atlas', 'ascent', 'cx-9'
  ];
  
  // Medium vehicles that require Type B
  const typeBVehicles = [
    'rav4', 'cr-v', 'rogue', 'tucson', 'sportage', 'equinox', 'escape',
    'compass', 'cherokee', 'forester', 'outback', 'cx-5', 'tiguan'
  ];
  
  // Heavy duty vehicles that require Type D
  const typeDVehicles = [
    'f-150', 'f-250', 'f-350', 'silverado', 'sierra', 'ram', 'tundra', 'titan',
    'sprinter', 'transit', 'promaster', 'nv', 'savana', 'express'
  ];

  // Check vehicle type based on model or keywords
  if (typeDVehicles.some(v => modelLower.includes(v)) || 
      modelLower.includes('heavy') || 
      modelLower.includes('camion')) {
    return "D";
  }
  
  if (typeCVehicles.some(v => modelLower.includes(v)) || 
      modelLower.includes('large suv') || 
      modelLower.includes('full-size')) {
    return "C";
  }
  
  if (typeBVehicles.some(v => modelLower.includes(v)) || 
      modelLower.includes('suv') || 
      modelLower.includes('crossover') ||
      modelLower.includes('pickup')) {
    return "B";
  }
  
  // Default to Type A for sedans and smaller vehicles
  return "A";
};

export const calculateTotalCost = (
  distance: number,
  truckType: string,
  requiresManeuver: boolean,
  tollCosts: number = 0,
  requiresInvoice: boolean = false
): number => {
  const truck = towTruckTypes[truckType || 'A'];
  const baseCost = distance * truck.perKm;
  const maneuverCost = requiresManeuver ? truck.maneuverCharge : 0;
  const subtotal = baseCost + maneuverCost + tollCosts;
  const tax = requiresInvoice ? subtotal * 0.16 : 0;
  return subtotal + tax;
};
