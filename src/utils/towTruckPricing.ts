export interface TowTruckType {
  name: string;
  capacity: string;
  perKm: number;
  maneuverCharge: number;
  maxWeight: number;
  basePrice: number;
}

export const towTruckTypes: Record<string, TowTruckType> = {
  A: {
    name: "Tipo A",
    capacity: "hasta 2000kg",
    perKm: 25,
    maneuverCharge: 500,
    maxWeight: 2000,
    basePrice: 800
  },
  B: {
    name: "Tipo B",
    capacity: "hasta 3000kg",
    perKm: 35,
    maneuverCharge: 750,
    maxWeight: 3000,
    basePrice: 1000
  },
  C: {
    name: "Tipo C",
    capacity: "hasta 4000kg",
    perKm: 45,
    maneuverCharge: 1000,
    maxWeight: 4000,
    basePrice: 1200
  },
  D: {
    name: "Tipo D",
    capacity: "hasta 8000kg",
    perKm: 60,
    maneuverCharge: 1500,
    maxWeight: 8000,
    basePrice: 1500
  }
};

export const getTruckTypeForVehicle = (vehicleType: string): string => {
  switch (vehicleType.toLowerCase()) {
    case 'car':
    case 'sedan':
      return 'A';
    case 'suv':
    case 'pickup':
      return 'B';
    case 'van':
    case 'truck':
      return 'C';
    case 'heavy_truck':
      return 'D';
    default:
      return 'A';
  }
};