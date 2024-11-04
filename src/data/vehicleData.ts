export const vehicleBrands = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'Volkswagen', 'BMW', 'Mercedes-Benz',
  'Audi', 'Hyundai', 'Mazda', 'Subaru', 'Kia', 'Lexus', 'Volvo', 'Tesla', 'Porsche',
  'Jaguar', 'Land Rover', 'Acura', 'RAM', 'GMC', 'Jeep', 'Dodge', 'Chrysler'
];

export const vehicleModels = {
  Toyota: ['Corolla', 'Camry', 'RAV4', 'Highlander', 'Tacoma', 'Tundra', 'Sienna', 'Prius', '4Runner', 'Land Cruiser'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey', 'HR-V', 'Fit', 'Ridgeline', 'Passport'],
  Ford: ['F-150', 'Mustang', 'Explorer', 'Escape', 'Focus', 'Ranger', 'Edge', 'Expedition', 'F-250', 'F-350', 'Bronco'],
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
  // Sedanes y Compactos (Tipo A - hasta 2000kg)
  'Toyota Corolla': 1500,
  'Honda Civic': 1600,
  'Toyota Camry': 1800,
  'Honda Accord': 1850,
  'Volkswagen Jetta': 1700,
  'Nissan Sentra': 1600,
  'Hyundai Elantra': 1500,
  'Mazda3': 1550,
  'Tesla Model 3': 1950,
  
  // SUVs Medianas (Tipo B - hasta 3000kg)
  'Toyota RAV4': 2200,
  'Honda CR-V': 2400,
  'Nissan Rogue': 2300,
  'Ford Escape': 2500,
  'Mazda CX-5': 2600,
  'Hyundai Tucson': 2400,
  'Volkswagen Tiguan': 2800,
  'Tesla Model Y': 2700,
  
  // SUVs Grandes y Pickups Ligeras (Tipo C - hasta 4000kg)
  'Toyota Highlander': 3200,
  'Ford Explorer': 3500,
  'Honda Pilot': 3300,
  'Chevrolet Tahoe': 3800,
  'Toyota 4Runner': 3500,
  'Ford F-150': 3900,
  'Toyota Tundra': 3800,
  'Nissan Titan': 3900,
  
  // Pickups Pesadas y Vehículos Grandes (Tipo D - más de 4000kg)
  'Ford F-250': 6000,
  'Ford F-350': 7000,
  'Chevrolet Silverado 2500HD': 6500,
  'RAM 2500': 6800,
  'GMC Sierra 2500HD': 6500,
  'RAM 3500': 7500,
  'Ford F-450': 8000,
  
  // Vehículos de Lujo y Deportivos
  'BMW 3 Series': 1800,
  'Mercedes-Benz C-Class': 1900,
  'Audi A4': 1850,
  'Lexus ES': 1900,
  'Porsche 911': 1800,
  'Tesla Model S': 2200,
  'BMW X5': 2800,
  'Mercedes-Benz GLE': 2900,
  
  // Vehículos Comerciales
  'Ford Transit': 3500,
  'Mercedes-Benz Sprinter': 3800,
  'RAM ProMaster': 3600,
  'Chevrolet Express': 3500
};

export const getTruckTypeForVehicle = (model: string): "A" | "B" | "C" | "D" => {
  const weight = vehicleWeights[model];
  if (!weight) return "A"; // default to smallest truck if weight unknown
  
  if (weight <= 2000) return "A";
  if (weight <= 3000) return "B";
  if (weight <= 4000) return "C";
  return "D";
};