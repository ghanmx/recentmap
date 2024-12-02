import { TollLocation } from '@/types/toll'

export const monclovaTolls: TollLocation[] = [
  {
    name: 'Monclova - Ojo Caliente 1',
    location: 'Monclova - Ojo Caliente 1',
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
    location: 'Monclova - Ojo Caliente 2',
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
]
