import { Truck } from 'lucide-react'
import { motion } from 'framer-motion'
import { TowTruckType } from '@/utils/towTruckPricing'

interface TruckInfoHeaderProps {
  selectedTruck: TowTruckType
  selectedVehicleModel: string
}

export const TruckInfoHeader = ({
  selectedTruck,
  selectedVehicleModel,
}: TruckInfoHeaderProps) => {
  return (
    <div className="space-y-2">
      <div className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Truck
          className={`w-5 h-5 ${selectedTruck.name === 'Tipo D' ? 'text-orange-500' : 'text-primary'}`}
        />
        <span>
          {selectedTruck.name} - Capacidad:{' '}
          {selectedTruck.maxWeight.toLocaleString()} kg
        </span>
      </div>
      {selectedVehicleModel && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-600 ml-7"
        >
          Vehículo seleccionado: {selectedVehicleModel}
        </motion.p>
      )}
    </div>
  )
}
