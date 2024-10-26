export const vehicleBrands = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'Volkswagen', 'BMW', 'Mercedes-Benz',
  'Audi', 'Hyundai', 'Mazda', 'Subaru', 'Kia', 'Lexus', 'Volvo', 'Tesla', 'Porsche',
  'Jaguar', 'Land Rover', 'Acura', 'RAM', 'GMC', 'Jeep', 'Dodge', 'Chrysler'
];

export const vehicleModels = {
  Toyota: ['Corolla', 'Camry', 'RAV4', 'Highlander', 'Tacoma', 'Tundra', 'Sienna', 'Prius', '4Runner'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey', 'HR-V', 'Fit', 'Ridgeline', 'Passport'],
  Ford: ['F-150', 'Mustang', 'Explorer', 'Escape', 'Focus', 'Ranger', 'Edge', 'Expedition', 'F-250', 'F-350'],
  Chevrolet: ['Silverado', 'Malibu', 'Equinox', 'Traverse', 'Camaro', 'Tahoe', 'Suburban', 'Colorado', 'Silverado 2500HD'],
  Nissan: ['Altima', 'Rogue', 'Sentra', 'Maxima', 'Pathfinder', 'Murano', 'Titan', 'Leaf', 'Titan XD'],
  Volkswagen: ['Jetta', 'Passat', 'Tiguan', 'Atlas', 'Golf', 'ID.4', 'Arteon', 'Taos'],
  BMW: ['3 Series', '5 Series', 'X3', 'X5', '7 Series', 'M4', 'X1', 'X7'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class', 'A-Class', 'GLA', 'GLS'],
  Audi: ['A4', 'A6', 'Q5', 'Q7', 'e-tron', 'A3', 'Q3', 'TT'],
  Hyundai: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Kona', 'Palisade', 'Venue', 'Ioniq'],
  Mazda: ['Mazda3', 'Mazda6', 'CX-5', 'CX-9', 'MX-5 Miata', 'CX-30', 'CX-3', 'CX-50'],
  Subaru: ['Outback', 'Forester', 'Impreza', 'Crosstrek', 'Legacy', 'Ascent', 'WRX', 'BRZ'],
  Kia: ['Forte', 'Optima', 'Sportage', 'Sorento', 'Telluride', 'Soul', 'Stinger', 'Seltos'],
  Lexus: ['RX', 'ES', 'NX', 'IS', 'GX', 'UX', 'LS', 'LC'],
  Volvo: ['XC90', 'XC60', 'S60', 'V60', 'XC40', 'S90', 'V90', 'C40'],
  Tesla: ['Model 3', 'Model S', 'Model X', 'Model Y', 'Cybertruck', 'Roadster'],
  Porsche: ['911', 'Cayenne', 'Panamera', 'Macan', 'Taycan', 'Boxster', 'Cayman', '718'],
  Jaguar: ['F-PACE', 'XF', 'E-PACE', 'I-PACE', 'XE', 'F-TYPE', 'XJ', 'XK'],
  'Land Rover': ['Range Rover', 'Discovery', 'Defender', 'Evoque', 'Velar'],
  Acura: ['TLX', 'RDX', 'MDX', 'ILX', 'NSX', 'RLX', 'TSX', 'RSX'],
  RAM: ['1500', '2500', '3500', 'ProMaster', 'ProMaster City'],
  GMC: ['Sierra', 'Yukon', 'Terrain', 'Acadia', 'Canyon', 'Savana', 'Sierra 2500HD'],
  Jeep: ['Wrangler', 'Grand Cherokee', 'Cherokee', 'Compass', 'Renegade', 'Gladiator'],
  Dodge: ['Charger', 'Challenger', 'Durango', 'Journey', 'Grand Caravan', 'Ram 3500'],
  Chrysler: ['300', 'Pacifica', 'Voyager']
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

export const towTruckTypes = {
  A: { perKm: 18.82, basePrice: 528.69, maneuverCharge: 1219.55, maxWeight: 2000 },
  C: { perKm: 23.47, basePrice: 721.79, maneuverCharge: 1524.21, maxWeight: 4000 },
  D: { perKm: 32.35, basePrice: 885.84, maneuverCharge: 2101.65, maxWeight: 8000 },
};

export const customPrices = {
  'Tesla Model S': { perKm: 25, basePrice: 600, maneuverCharge: 1300, weight: 2200 },
  'Ford Mustang Mach-E': { perKm: 22, basePrice: 550, maneuverCharge: 1200, weight: 2500 },
};
