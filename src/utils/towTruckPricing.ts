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

// Vehicle type detection logic
export const getTruckTypeForVehicle = (
  model: string,
): 'A' | 'B' | 'C' | 'D' => {
  const modelLower = model.toLowerCase()

  if (isTypeDVehicle(modelLower)) return 'D'
  if (isTypeCVehicle(modelLower)) return 'C'
  if (isTypeBVehicle(modelLower)) return 'B'
  return 'A'
}

const isTypeDVehicle = (model: string): boolean => {
  const typeDVehicles = [
    'f-150',
    'f-250',
    'f-350',
    'f-450',
    'silverado',
    'sierra',
    'ram',
    'tundra',
    'titan',
    'super duty',
    'power wagon',
    'sprinter',
    'transit',
    'promaster',
    'gmc canyon',
    'chevrolet colorado',
    'ford ranger',
    'dodge dakota',
    'toyota hilux',
    'nissan frontier',
    'jeep gladiator',
    'land rover defender',
    'hummer h2',
    'toyota land cruiser',
    'chevrolet tahoe',
    'freightliner m2', // Additional heavy-duty vehicles for Type D
    'international durastar',
    'mack granite',
    'volvo vnl',
    'kenworth t180',
    'peterbilt 579',
    'ram 2500', // Adding medium-duty trucks
    'ram 3500',
    'toyota tundra',
    'isuzu n-series',
  ]

  const heavyKeywords = [
    'heavy duty',
    'commercial',
    'camion',
    'truck',
    '2500',
    '3500',
    '4500',
    '5500',
  ]

  return (
    typeDVehicles.some((v) => model.includes(v)) ||
    heavyKeywords.some((k) => model.includes(k))
  )
}

const isTypeCVehicle = (model: string): boolean => {
  const typeCVehicles = [
    'murano',
    'pathfinder',
    'highlander',
    'pilot',
    '4runner',
    'expedition',
    'tahoe',
    'suburban',
    'sequoia',
    'armada',
    'telluride',
    'palisade',
    'honda cr-v',
    'mazda cx-9',
    'ford explorer',
    'toyota 4runner',
    'subaru ascent',
    'volvo xc90',
    'audi q7',
    'mercedes-benz gle',
    'bmw x5',
    'jeep grand cherokee',
    'nissan murano',
    'buick enclave',
    'lincoln aviator',
    'ford edge',
    'hyundai santa fe',
    'toyota venza',
    'chevrolet blazer',
    'chevrolet traverse',
    'honda pilot',
    'kia sorento',
    'gmc acadia',
    'nissan pathfinder',
  ]

  const largeKeywords = [
    'full-size',
    'large suv',
    'luxury suv',
    'van',
    'executive',
  ]

  return (
    typeCVehicles.some((v) => model.includes(v)) ||
    largeKeywords.some((k) => model.includes(k))
  )
}

const isTypeBVehicle = (model: string): boolean => {
  const typeBVehicles = [
    'rav4',
    'cr-v',
    'rogue',
    'tucson',
    'sportage',
    'equinox',
    'escape',
    'compass',
    'cherokee',
    'forester',
    'outback',
    'cx-5',
    'honda hr-v',
    'nissan kicks',
    'subaru crosstrek',
    'jeep renegade',
    'ford bronco sport',
    'toyota corolla cross',
    'hyundai kona',
    'mazda cx-30',
    'kia seltos',
    'chevrolet trax',
    'volkswagen tiguan',
    'gmc terrain',
    'nissan rogue sport',
    'jeep compass',
    'ford escape hybrid',
    'honda fit',
    'ram 1500 classic',
    'chevrolet s10',
    'toyota tacoma',
    'nissan nv200',
  ]

  const mediumKeywords = [
    'suv',
    'crossover',
    'pickup',
    'mid-size',
    'compact suv',
  ]

  return (
    typeBVehicles.some((v) => model.includes(v)) ||
    mediumKeywords.some((k) => model.includes(k))
  )
}
