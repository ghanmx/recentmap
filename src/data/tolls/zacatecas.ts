import { TollLocation } from '@/types/toll'

export const zacatecasTolls: TollLocation[] = [
  {
    name: 'Zacatecas - Monclova',
    location: 'Zacatecas - Monclova',
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
    name: 'Zacatecas - Torreón',
    location: 'Zacatecas - Torreón',
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
]
