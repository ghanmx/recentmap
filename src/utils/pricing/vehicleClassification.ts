import { sedanBrands } from '@/data/vehicles/sedans'
import { suvBrands } from '@/data/vehicles/suvs'
import { pickupBrands } from '@/data/vehicles/pickups'
import { commercialBrands } from '@/data/vehicles/commercial'

const getVehicleType = (make: string, model: string): 'A' | 'B' | 'C' | 'D' => {
  const modelLower = model.toLowerCase()
  const makeLower = make.toLowerCase()

  // Type D (Heavy/Commercial)
  if (isCommercialVehicle(makeLower, modelLower)) return 'D'
  
  // Type C (Large SUVs/Pickups)
  if (isLargeVehicle(makeLower, modelLower)) return 'C'
  
  // Type B (Medium SUVs/Crossovers)
  if (isMediumVehicle(makeLower, modelLower)) return 'B'
  
  // Type A (Default - Sedans and small vehicles)
  return 'A'
}

const isCommercialVehicle = (make: string, model: string): boolean => {
  // Check commercial vehicles
  const isCommercial = Object.entries(commercialBrands).some(([brand, models]) => {
    return make.includes(brand.toLowerCase()) && 
           models.some(m => model.includes(m.toLowerCase()))
  })

  // Check heavy duty pickups
  const heavyDutyKeywords = ['2500', '3500', '4500', 'heavy duty', 'hd']
  const isHeavyDuty = heavyDutyKeywords.some(keyword => model.includes(keyword))

  return isCommercial || isHeavyDuty
}

const isLargeVehicle = (make: string, model: string): boolean => {
  // Large SUVs
  const largeSuvs = ['tahoe', 'suburban', 'expedition', 'sequoia', 'armada', 'telluride', 'palisade']
  if (largeSuvs.some(suv => model.includes(suv))) return true

  // Full-size pickups
  const fullSizePickups = ['f-150', 'silverado 1500', 'ram 1500', 'tundra', 'titan']
  if (fullSizePickups.some(pickup => model.includes(pickup))) return true

  return false
}

const isMediumVehicle = (make: string, model: string): boolean => {
  // Check medium SUVs
  const isMediumSuv = Object.entries(suvBrands).some(([brand, models]) => {
    return make.includes(brand.toLowerCase()) && 
           models.some(m => model.includes(m.toLowerCase()))
  })

  // Medium-size keywords
  const mediumKeywords = ['suv', 'crossover', 'pickup', 'mid-size']
  const hasMediumKeyword = mediumKeywords.some(keyword => model.includes(keyword))

  return isMediumSuv || hasMediumKeyword
}

export const getTruckTypeForVehicle = (make: string, model: string): 'A' | 'B' | 'C' | 'D' => {
  return getVehicleType(make, model)
}