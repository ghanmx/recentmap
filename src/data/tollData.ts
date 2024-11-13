export interface TollLocation {
  name: string
  lat: number
  lng: number
  cost: number
  description: string
  type: 'highway' | 'urban'
  operatingHours: string
  acceptedPayments: ('cash' | 'card' | 'tag')[]
  vehicleTypes: ('car' | 'truck' | 'motorcycle')[]
  lastUpdated: string
  status: 'active' | 'maintenance' | 'closed'
  direction?: 'outbound' | 'return'
}

export const TOLL_LOCATIONS: TollLocation[] = [
  {
    name: 'Autopista Monterrey Cadereyta',
    lat: 25.6603,
    lng: -100.2142,
    cost: 385,
    description:
      'Cuota de peaje estándar para vehículos ligeros. Tarifa variable según tipo de vehículo.',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2023-11-15',
    status: 'active',
  },
  {
    name: 'Periférico de Monterrey',
    lat: 25.6767,
    lng: -100.3165,
    cost: 385,
    description:
      'Cuota de peaje urbano con descuentos en horarios valle. Sistema automatizado disponible.',
    type: 'urban',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2023-11-15',
    status: 'active',
  },
  {
    name: 'Cadereyta – Reynosa (40D)',
    lat: 26.0292,
    lng: -99.8537,
    cost: 385,
    description:
      'Autopista federal con sistema de telepeaje. Descuentos disponibles para usuarios frecuentes.',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2023-11-15',
    status: 'active',
  },
  {
    name: 'Monterrey – Saltillo (40D)',
    lat: 25.4506,
    lng: -100.9447,
    cost: 385,
    description:
      'Carretera interestatal con múltiples carriles y servicios de asistencia vial 24/7.',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2023-11-15',
    status: 'active',
  },
  {
    name: 'Monterrey – Colombia (2)',
    lat: 25.7833,
    lng: -100.5667,
    cost: 275,
    description:
      'Carretera internacional con acceso a la frontera. Servicios aduanales disponibles.',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2023-11-15',
    status: 'active',
  },
  {
    name: 'Monterrey – Nuevo Laredo (85D)',
    lat: 25.8941,
    lng: -100.1824,
    cost: 450,
    description:
      'Autopista principal hacia la frontera con Estados Unidos. Vigilancia las 24 horas.',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2023-11-15',
    status: 'active',
  },
  {
    name: 'Libramiento Noreste',
    lat: 25.7459,
    lng: -100.1559,
    cost: 320,
    description:
      'Vía de circunvalación para tráfico pesado. Conexión con principales carreteras.',
    type: 'urban',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2023-11-15',
    status: 'active',
  },
  {
    name: 'Monterrey – Monclova (53)',
    lat: 25.8667,
    lng: -100.7833,
    cost: 295,
    description:
      'Ruta industrial con servicios especializados para transporte de carga.',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2023-11-15',
    status: 'active',
  },
  {
    name: 'Peaje Nuevo León Norte 1',
    lat: 26.33994,
    lng: -100.072232,
    cost: 385,
    description: 'Peaje principal en carretera Nuevo León',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2024-03-19',
    status: 'active',
  },
  {
    name: 'Peaje Nuevo León Norte 2',
    lat: 26.340124,
    lng: -100.070719,
    cost: 385,
    description: 'Peaje secundario en carretera Nuevo León',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2024-03-19',
    status: 'active',
  },
]
