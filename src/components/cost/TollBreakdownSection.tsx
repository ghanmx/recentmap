import { TollLocation } from '@/types/toll'
import { CostItemDisplay } from './CostItemDisplay'
import { ArrowRight, ArrowLeft, Info, MapPin } from 'lucide-react'
import { calculateTotalTollCost } from '@/utils/tollUtils'
import { motion } from 'framer-motion'
import { formatCurrency } from '@/utils/priceCalculator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Card } from '@/components/ui/card'

interface TollBreakdownSectionProps {
  tolls: TollLocation[]
  direction: 'outbound' | 'return'
  showDetails?: boolean
}

export const TollBreakdownSection = ({
  tolls,
  direction,
  showDetails = false,
}: TollBreakdownSectionProps) => {
  if (tolls.length === 0) return null

  const isOutbound = direction === 'outbound'
  const icon = isOutbound ? (
    <ArrowRight className="w-4 h-4" />
  ) : (
    <ArrowLeft className="w-4 h-4" />
  )
  const label = isOutbound ? 'Peajes de ida:' : 'Peajes de regreso:'
  const totalCost = calculateTotalTollCost(tolls)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <div className="flex items-center gap-2 text-sm text-blue-600">
        {icon}
        <span>{label}</span>
      </div>
      {tolls.map((toll, index) => (
        <motion.div
          key={`${direction}-toll-${index}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-3 bg-white/50 hover:bg-white/80 transition-colors duration-200">
            <TooltipProvider>
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-1 text-primary/60" />
                    <div>
                      <div className="font-medium text-sm">{toll.name}</div>
                      {showDetails && toll.description && (
                        <div className="text-xs text-gray-500">
                          {toll.description}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="font-medium text-primary">
                    {formatCurrency(toll.cost)}
                  </span>
                </div>

                {showDetails && (
                  <div className="pl-6 space-y-1">
                    {toll.kilometer && (
                      <div className="text-xs text-gray-500">
                        Kilómetro: {toll.kilometer}
                      </div>
                    )}
                    {toll.route && (
                      <div className="text-xs text-gray-500">
                        Ruta: {toll.route}
                      </div>
                    )}
                    <div className="text-xs text-gray-500">
                      Horario: {toll.operatingHours}
                    </div>
                    <div className="text-xs text-gray-500">
                      Pagos aceptados: {toll.acceptedPayments.join(', ')}
                    </div>
                  </div>
                )}
              </div>

              <Tooltip>
                <TooltipTrigger className="absolute top-3 right-3">
                  <Info className="w-4 h-4 text-primary/60 hover:text-primary" />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1 text-sm">
                    <p>Estado: {toll.status}</p>
                    {toll.distance && <p>Distancia: {toll.distance}km</p>}
                    <p>Última actualización: {toll.lastUpdated}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Card>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <CostItemDisplay
          label={`Total peajes ${isOutbound ? 'ida' : 'regreso'}`}
          amount={totalCost}
          className="font-medium text-primary"
        />
      </motion.div>
    </motion.div>
  )
}
