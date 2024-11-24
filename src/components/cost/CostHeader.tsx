import { ChevronDown, ChevronUp, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/utils/priceCalculator'
import { motion } from 'framer-motion'
import { TowTruckType } from '@/utils/towTruckPricing'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export interface CostHeaderProps {
  showBreakdown: boolean
  setShowBreakdown: (show: boolean) => void
  finalCost: number
  truckType: 'A' | 'B' | 'C' | 'D'
  selectedTruck: TowTruckType
}

export const CostHeader = ({
  showBreakdown,
  setShowBreakdown,
  finalCost,
  truckType,
  selectedTruck,
}: CostHeaderProps) => {
  console.log('CostHeader rendered:', {
    showBreakdown,
    finalCost,
    truckType,
  })

  return (
    <div className="flex justify-between items-center bg-white/50 p-4 rounded-lg backdrop-blur-sm border border-primary/10">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Costo Estimado</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-sm text-gray-600 flex items-center gap-2 cursor-help">
                {selectedTruck.name} - {selectedTruck.capacity}
                <Info className="h-4 w-4 text-primary/60" />
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>Capacidad máxima: {selectedTruck.maxWeight}kg</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center gap-4">
        <motion.div
          key={finalCost}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-2xl font-bold ${truckType === 'D' ? 'text-orange-500' : 'text-primary'}`}
        >
          {formatCurrency(finalCost)}
        </motion.div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="hover:bg-primary/10"
        >
          {showBreakdown ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
