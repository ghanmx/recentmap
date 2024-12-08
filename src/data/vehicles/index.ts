import { sedanBrands } from './sedans'
import { suvBrands } from './suvs'
import { pickupBrands } from './pickups'
import { commercialBrands } from './commercial'
import { VehicleCategory, vehicleCategories } from './categories'

export const allVehicleBrands = {
  ...sedanBrands,
  ...suvBrands,
  ...pickupBrands,
  ...commercialBrands,
}

export { vehicleCategories, type VehicleCategory }
export { sedanBrands } from './sedans'
export { suvBrands } from './suvs'
export { pickupBrands } from './pickups'
export { commercialBrands } from './commercial'