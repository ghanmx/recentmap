import { TollLocation } from '@/types/location'

export const TOLL_LOCATIONS: TollLocation[] = [
  {
    name: 'Monterrey - Nuevo Laredo',
    lat: 25.8941,
    lng: -100.1824,
    cost: 418.0,
    description: 'Cuota principal hacia Nuevo Laredo',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2024-03-20',
    status: 'active',
    route: 'Monterrey - Nuevo Laredo',
    distance: 123.1,
    location: 'Monterrey - Nuevo Laredo'
  },
  {
    name: 'Agualeguas',
    lat: 26.3167,
    lng: -99.5333,
    cost: 171.0,
    description: 'Caseta Agualeguas',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2024-03-20',
    status: 'active',
    kilometer: '79+600',
    route: 'Monterrey - Agualeguas',
    distance: 56.9,
  },
  {
    name: 'Monterrey - La Gloria',
    lat: 25.7833,
    lng: -100.5667,
    cost: 418.0,
    description: 'Peaje entre Monterrey y La Gloria',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2024-03-20',
    status: 'active',
    kilometer: '100+000',
    route: 'Monterrey - La Gloria',
    distance: 45.8,
  },
  {
    name: 'Monterrey - Sabinas',
    lat: 25.4506,
    lng: -100.9447,
    cost: 231.0,
    description: 'Peaje entre Monterrey y Sabinas',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2024-03-20',
    status: 'active',
    kilometer: '99+300',
    route: 'Monterrey - Sabinas',
    distance: 77.3,
  },
  {
    name: 'Sabinas - La Gloria',
    lat: 25.7833,
    lng: -100.5667,
    cost: 188.0,
    description: 'Peaje entre Sabinas y La Gloria',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2024-03-20',
    status: 'active',
    kilometer: '100+000',
    route: 'Sabinas - La Gloria',
    distance: 45.8,
  },
  {
    name: 'Agualeguas - Sabinas',
    lat: 26.3167,
    lng: -99.5333,
    cost: 60.0,
    description: 'Peaje entre Agualeguas y Sabinas',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2024-03-20',
    status: 'active',
    kilometer: '79+600',
    route: 'Agualeguas - Sabinas',
    distance: 60.0,
  },
  {
    name: 'Detalle por ruta: Monterrey - Saltillo y Libramiento Norponiente de Saltillo',
    lat: 25.4506,
    lng: -100.9447,
    cost: 492.0,
    description: 'Coste total del peaje por la ruta mencionada',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2024-03-20',
    status: 'active',
  },
  {
    name: 'Zacatecas - Monclova',
    lat: 23.9999,
    lng: -102.0,
    cost: 133.0,
    description: 'Peaje entre Zacatecas y Monclova',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2024-03-20',
    status: 'active',
  },
  {
    name: 'Monclova - Ojo Caliente 1',
    lat: 25.8667,
    lng: -100.7833,
    cost: 57.0,
    description: 'Peaje entre Monclova y Ojo Caliente 1',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2024-03-20',
    status: 'active',
  },
  {
    name: 'Monclova - Ojo Caliente 2',
    lat: 25.8667,
    lng: -100.7833,
    cost: 102.0,
    description: 'Peaje entre Monclova y Ojo Caliente 2',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2024-03-20',
    status: 'active',
  },
  {
    name: 'Ojo Caliente 2 - Morones Prieto',
    lat: 25.8667,
    lng: -100.7833,
    cost: 257.0,
    description: 'Peaje entre Ojo Caliente 2 y Morones Prieto',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2024-03-20',
    status: 'active',
  },
  {
    name: 'El Jónuco - Periférico',
    lat: 25.8667,
    lng: -100.7833,
    cost: 32.0,
    description: 'Peaje entre El Jónuco y Periférico',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2024-03-20',
    status: 'active',
  },
  {
    name: 'El Jónuco - Morones Prieto',
    lat: 25.8667,
    lng: -100.7833,
    cost: 88.0,
    description: 'Peaje entre El Jónuco y Morones Prieto',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2024-03-20',
    status: 'active',
  },
  {
    name: 'Zacatecas - Torreón',
    lat: 25.8667,
    lng: -100.7833,
    cost: 91.0,
    description: 'Peaje entre Zacatecas y Torreón',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2024-03-20',
    status: 'active',
  },
  {
    name: 'Torreón - Monclova',
    lat: 25.8667,
    lng: -100.7833,
    cost: 42.0,
    description: 'Peaje entre Torreón y Monclova',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2024-03-20',
    status: 'active',
  },
  {
    name: 'Ojo Caliente 1 - Ojo Caliente 2',
    lat: 25.8667,
    lng: -100.7833,
    cost: 45.0,
    description: 'Peaje entre Ojo Caliente 1 y Ojo Caliente 2',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2024-03-20',
    status: 'active',
  },
  {
    name: 'Ojo Caliente 2 - Periférico',
    lat: 25.8667,
    lng: -100.7833,
    cost: 155.0,
    description: 'Peaje entre Ojo Caliente 2 y Periférico',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2024-03-20',
    status: 'active',
  },
  {
    name: 'Periférico - Morones Prieto',
    lat: 25.8667,
    lng: -100.7833,
    cost: 102.0,
    description: 'Peaje entre Periférico y Morones Prieto',
    type: 'highway',
    operatingHours: '24/7',
    acceptedPayments: ['cash', 'card', 'tag'],
    vehicleTypes: ['car', 'truck', 'motorcycle'],
    lastUpdated: '2024-03-20',
    status: 'active',
  },
]
