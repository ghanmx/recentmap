export interface TowTruckType {
  name: string;
  capacity: string;
  perKm: number;
  maneuverCharge: number;
}

export const towTruckTypes: Record<string, TowTruckType> = {
  A: {
    name: "Tipo A",
    capacity: "hasta 2000kg",
    perKm: 25,
    maneuverCharge: 500
  },
  B: {
    name: "Tipo B",
    capacity: "hasta 3000kg",
    perKm: 35,
    maneuverCharge: 750
  },
  C: {
    name: "Tipo C",
    capacity: "hasta 4000kg",
    perKm: 45,
    maneuverCharge: 1000
  },
  D: {
    name: "Tipo D",
    capacity: "hasta 8000kg",
    perKm: 60,
    maneuverCharge: 1500
  }
};