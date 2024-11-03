export interface TollLocation {
  name: string;
  lat: number;
  lng: number;
  cost: number;
  description: string;
  type: 'highway' | 'urban';
  operatingHours: string;
  acceptedPayments: ('cash' | 'card' | 'tag')[];
}

export const TOLL_LOCATIONS: TollLocation[] = [
  { 
    name: "Autopista Monterrey Cadereyta", 
    lat: 25.6603, 
    lng: -100.2142, 
    cost: 385,
    description: "Cuota de peaje estándar",
    type: "highway",
    operatingHours: "24/7",
    acceptedPayments: ["cash", "card", "tag"]
  },
  { 
    name: "Periférico de Monterrey", 
    lat: 25.6767, 
    lng: -100.3165, 
    cost: 385,
    description: "Cuota de peaje estándar",
    type: "urban",
    operatingHours: "24/7",
    acceptedPayments: ["cash", "card", "tag"]
  },
  { 
    name: "Cadereyta – Reynosa (40D)", 
    lat: 26.0292, 
    lng: -99.8537, 
    cost: 385,
    description: "Cuota de peaje estándar",
    type: "highway",
    operatingHours: "24/7",
    acceptedPayments: ["cash", "card", "tag"]
  },
  { 
    name: "Monterrey – Saltillo (40D)", 
    lat: 25.4506, 
    lng: -100.9447, 
    cost: 385,
    description: "Cuota de peaje estándar",
    type: "highway",
    operatingHours: "24/7",
    acceptedPayments: ["cash", "card", "tag"]
  }
];