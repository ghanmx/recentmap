import { TollLocation } from '@/types/toll'

export const monterreyTolls: TollLocation[] = [
  {
    name: 'Monterrey - Nuevo Laredo',
    location: 'Monterrey - Nuevo Laredo',
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
    distance: 123.1
  },
  {
    name: 'Agualeguas',
    location: 'Agualeguas',
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
  }
]