import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { TowTruckType } from '@/utils/pricing'
import { motion } from 'framer-motion'

export interface CostMetricsProps {
  totalDistance: number
  requiresInvoice: boolean
  setRequiresInvoice: (requires: boolean) => void
  requiresManeuver: boolean
  onManeuverChange: (checked: boolean) => void
  selectedTruck: TowTruckType
}

export const CostMetrics = ({
  totalDistance,
  requiresInvoice,
  setRequiresInvoice,
  requiresManeuver,
  onManeuverChange,
  selectedTruck,
}: CostMetricsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div className="flex items-center justify-between space-x-2 p-4 bg-white/50 rounded-lg">
        <Label htmlFor="invoice" className="text-sm">
          Requiere factura (IVA 16%)
          <span className="block text-xs text-gray-500">
            Para {selectedTruck.name}
          </span>
        </Label>
        <Switch
          id="invoice"
          checked={requiresInvoice}
          onCheckedChange={setRequiresInvoice}
        />
      </div>

      <div className="flex items-center justify-between space-x-2 p-4 bg-white/50 rounded-lg">
        <Label htmlFor="maneuver" className="text-sm">
          Requiere maniobra especial
          <span className="block text-xs text-gray-500">
            +{selectedTruck.maneuverCharge.toFixed(2)} MXN para{' '}
            {selectedTruck.name}
          </span>
        </Label>
        <Switch
          id="maneuver"
          checked={requiresManeuver}
          onCheckedChange={onManeuverChange}
        />
      </div>
    </motion.div>
  )
}
