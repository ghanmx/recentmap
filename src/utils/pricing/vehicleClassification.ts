const typeDVehicles = [
  'f-150', 'f-250', 'f-350', 'f-450', 'silverado', 'sierra', 'ram',
  'tundra', 'titan', 'super duty', 'power wagon', 'sprinter', 'transit',
  'promaster', 'gmc canyon', 'chevrolet colorado', 'ford ranger',
  'dodge dakota', 'toyota hilux', 'nissan frontier', 'jeep gladiator',
  'land rover defender', 'hummer h2', 'toyota land cruiser', 'chevrolet tahoe',
  'freightliner m2', 'international durastar', 'mack granite', 'volvo vnl',
  'kenworth t180', 'peterbilt 579', 'ram 2500', 'ram 3500', 'toyota tundra',
  'isuzu n-series',
]

const typeCVehicles = [
  'murano', 'pathfinder', 'highlander', 'pilot', '4runner', 'expedition',
  'tahoe', 'suburban', 'sequoia', 'armada', 'telluride', 'palisade',
  'honda cr-v', 'mazda cx-9', 'ford explorer', 'toyota 4runner',
  'subaru ascent', 'volvo xc90', 'audi q7', 'mercedes-benz gle', 'bmw x5',
  'jeep grand cherokee', 'nissan murano', 'buick enclave', 'lincoln aviator',
  'ford edge', 'hyundai santa fe', 'toyota venza', 'chevrolet blazer',
  'chevrolet traverse', 'honda pilot', 'kia sorento', 'gmc acadia',
  'nissan pathfinder',
]

const typeBVehicles = [
  'rav4', 'cr-v', 'rogue', 'tucson', 'sportage', 'equinox', 'escape',
  'compass', 'cherokee', 'forester', 'outback', 'cx-5', 'honda hr-v',
  'nissan kicks', 'subaru crosstrek', 'jeep renegade', 'ford bronco sport',
  'toyota corolla cross', 'hyundai kona', 'mazda cx-30', 'kia seltos',
  'chevrolet trax', 'volkswagen tiguan', 'gmc terrain', 'nissan rogue sport',
  'jeep compass', 'ford escape hybrid', 'honda fit', 'ram 1500 classic',
  'chevrolet s10', 'toyota tacoma', 'nissan nv200',
]

export const getTruckTypeForVehicle = (model: string): 'A' | 'B' | 'C' | 'D' => {
  const modelLower = model.toLowerCase()

  if (isTypeDVehicle(modelLower)) return 'D'
  if (isTypeCVehicle(modelLower)) return 'C'
  if (isTypeBVehicle(modelLower)) return 'B'
  return 'A'
}

const isTypeDVehicle = (model: string): boolean => {
  const heavyKeywords = [
    'heavy duty', 'commercial', 'camion', 'truck',
    '2500', '3500', '4500', '5500',
  ]

  return (
    typeDVehicles.some((v) => model.includes(v)) ||
    heavyKeywords.some((k) => model.includes(k))
  )
}

const isTypeCVehicle = (model: string): boolean => {
  const largeKeywords = [
    'full-size', 'large suv', 'luxury suv', 'van', 'executive',
  ]

  return (
    typeCVehicles.some((v) => model.includes(v)) ||
    largeKeywords.some((k) => model.includes(k))
  )
}

const isTypeBVehicle = (model: string): boolean => {
  const mediumKeywords = [
    'suv', 'crossover', 'pickup', 'mid-size', 'compact suv',
  ]

  return (
    typeBVehicles.some((v) => model.includes(v)) ||
    mediumKeywords.some((k) => model.includes(k))
  )
}