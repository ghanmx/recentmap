export type VehicleCategory = 'sedan' | 'suv' | 'pickup' | 'van' | 'luxury' | 'commercial' | 'sports'

export const vehicleCategories: Record<VehicleCategory, string> = {
  sedan: 'Sedán',
  suv: 'SUV',
  pickup: 'Pickup',
  van: 'Van',
  luxury: 'Luxury',
  commercial: 'Commercial',
  sports: 'Sports'
}