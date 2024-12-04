import { Card } from '@/components/ui/card'
import { Ticket, Clock, CreditCard, Info, MapPin } from 'lucide-react'
import { TollLocation } from '@/types/toll'
import { Separator } from '@/components/ui/separator'
import { motion } from 'framer-motion'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'

interface TollInfoDisplayProps {
  tolls: TollLocation[]
  totalCost: number
}

export const TollInfoDisplay = ({ tolls, totalCost }: TollInfoDisplayProps) => {
  if (tolls.length === 0) return null

  return (
    <TooltipProvider>
      <Card className="p-6 bg-gradient-to-br from-white/95 via-yellow-50/30 to-white/80 backdrop-blur-sm border border-yellow-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-full">
                <Ticket className="w-5 h-5 text-yellow-700" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-semibold text-lg text-yellow-800">
                  Peajes en la Ruta
                </h3>
                <Badge variant="secondary" className="bg-yellow-100/50">
                  {tolls.length} {tolls.length === 1 ? 'peaje' : 'peajes'} detectados
                </Badge>
              </div>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-sm font-semibold text-yellow-700 bg-gradient-to-r from-yellow-100 to-yellow-50 px-4 py-2 rounded-full shadow-sm flex items-center gap-2 cursor-help"
                >
                  <span>Total: ${totalCost.toFixed(2)}</span>
                  <Info className="w-4 h-4 text-yellow-600" />
                </motion.div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Costo total de peajes en ambas direcciones</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <Separator className="bg-yellow-200/30" />

          <div className="space-y-3">
            {tolls.map((toll, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-white/80 to-yellow-50/30 backdrop-blur-sm p-4 space-y-3 hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-yellow-600" />
                        <span className="font-medium text-yellow-900">
                          {toll.name}
                        </span>
                      </div>
                      {toll.description && (
                        <p className="text-sm text-yellow-700/80 pl-6">
                          {toll.description}
                        </p>
                      )}
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-sm font-semibold text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full cursor-help">
                          ${toll.cost.toFixed(2)}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Tarifa actual del peaje</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-600" />
                        <span>{toll.operatingHours}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Horario de operación del peaje</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-yellow-600" />
                        <span>{toll.acceptedPayments.join(', ')}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Métodos de pago aceptados</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  {toll.direction && (
                    <Badge
                      variant="secondary"
                      className={`mt-2 ${
                        toll.direction === 'outbound'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {toll.direction === 'outbound' ? 'Ida' : 'Regreso'}
                    </Badge>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Card>
    </TooltipProvider>
  )
}