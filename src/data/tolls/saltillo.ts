import { TollLocation } from '@/types/toll'

export const saltilloTolls: TollLocation[] = [
  {
    name: 'Monterrey - La Gloria',
    location: 'Monterrey - La Gloria',
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
    location: 'Monterrey - Sabinas',
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
  }
]