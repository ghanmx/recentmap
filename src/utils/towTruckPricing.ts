export interface TowTruckType {
  name: string;
  capacity: string;
  perKm: number;
  maneuverCharge: number;
  flagDropFee: number;
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

  // Large SUVs, Luxury SUVs, and Full-Size vehicles that require Type C
  const typeCVehicles = [
    // Full-size SUVs
    'murano', 'pathfinder', 'highlander', 'pilot', '4runner', 'expedition',
    'tahoe', 'suburban', 'sequoia', 'armada', 'telluride', 'palisade',
    'explorer', 'traverse', 'atlas', 'ascent', 'cx-9',
    // Luxury SUVs
    'q7', 'gx', 'lx', 'x7', 'gls', 'navigator', 'escalade', 'range rover',
    'lexus rx', 'bmw x5', 'mercedes gle', 'acura mdx', 'infiniti qx60',
    // Large Vans
    'sienna', 'odyssey', 'carnival', 'pacifica', 'grand caravan',
    'transit connect', 'metris', 'nv200',
    // Additional Full-size SUVs
    'durango', 'grand cherokee l', 'yukon', 'land cruiser', 'gv80',
    'volvo xc90', 'audi q8', 'porsche cayenne'
  ];

  // Mid-size SUVs, Crossovers, and Light Trucks that require Type B
  const typeBVehicles = [
    // Compact & Mid-size SUVs
    'rav4', 'cr-v', 'rogue', 'tucson', 'sportage', 'equinox', 'escape',
    'compass', 'cherokee', 'forester', 'outback', 'cx-5', 'tiguan',
    'mazda cx-30', 'kona', 'seltos', 'trailblazer', 'bronco sport',
    // Additional Crossovers
    'edge', 'blazer', 'passport', 'venza', 'santa fe', 'sorento',
    'rdx', 'nx', 'x3', 'glc', 'q5', 'xt5', 'corsair',
    'volvo xc60', 'macan', 'qx50', 'ux', 'xc40',
    // Small Trucks
    'maverick', 'santa cruz', 'ranger', 'colorado', 'canyon', 'frontier',
    'tacoma', 'ridgeline'
  ];

  // Heavy Duty Vehicles, Large Trucks, and Commercial Vehicles that require Type D
  const typeDVehicles = [
    // Heavy Duty Trucks
    'f-150', 'f-250', 'f-350', 'f-450', 'silverado', 'sierra', 'ram', 'tundra', 'titan',
    'super duty', 'power wagon',
    // Commercial Vehicles
    'sprinter', 'transit', 'promaster', 'nv', 'savana', 'express',
    'daily', 'master', 'ducato', 'boxer',
    // Heavy Duty Specific Models
    'silverado 2500', 'silverado 3500', 'sierra 2500', 'sierra 3500',
    'ram 2500', 'ram 3500', 'ram 4500', 'ram 5500',
    // Additional Commercial
    'hino', 'isuzu', 'kenworth', 'peterbilt', 'freightliner',
    'international', 'mack', 'western star', 'volvo truck', 'scania'
  ];

  // Check for specific keywords in the model name
  const heavyKeywords = ['heavy duty', 'commercial', 'camion', 'truck', '2500', '3500', '4500', '5500', 'diesel', 'semi', 'tractor'];
  const largeKeywords = ['full-size', 'large suv', 'luxury suv', 'van', 'executive', 'premium', 'grand'];
  const mediumKeywords = ['suv', 'crossover', 'pickup', 'mid-size', 'compact suv', 'sport utility', 'cuv', 'wagon'];

  // Check vehicle type based on model or keywords
  if (typeDVehicles.some(v => modelLower.includes(v)) ||
    heavyKeywords.some(k => modelLower.includes(k))) {
    return "D";
  }

  if (typeCVehicles.some(v => modelLower.includes(v)) ||
    largeKeywords.some(k => modelLower.includes(k))) {
    return "C";
  }

  if (typeBVehicles.some(v => modelLower.includes(v)) ||
    mediumKeywords.some(k => modelLower.includes(k))) {
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