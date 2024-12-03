import { ChevronDown, ChevronUp, Info, Receipt, Truck, TrendingUp, Flag, ArrowRight, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { formatCurrency } from '@/utils/priceCalculator'
import { TowTruckType } from '@/utils/pricing' // Updated import path
import { CostFormulaDisplay } from './CostFormulaDisplay'
import { CostItemDisplay } from './CostItemDisplay'
import { TruckInfoHeader } from './TruckInfoHeader'
import { TollBreakdownSection } from './TollBreakdownSection'
import { ServiceCostSection } from './ServiceCostSection'
import { Separator } from '@/components/ui/separator'
import { TollLocation } from '@/types/toll'

interface CostBreakdownProps {
  baseCost: number
  flagDropFee: number
  tax: number
  totalDistance: number
  totalTollCost: number
  finalCost: number
  detectedTolls: TollLocation[]
  requiresInvoice: boolean
  setShowPaymentWindow: (show: boolean) => void
  maneuverCost: number
  requiresManeuver: boolean
  selectedTruck: TowTruckType
  subtotal: number
  selectedVehicleModel: string
}

export const CostBreakdown = ({
  baseCost,
  flagDropFee,
  tax,
  totalDistance,
  totalTollCost,
  finalCost,
  detectedTolls,
  requiresInvoice,
  setShowPaymentWindow,
  maneuverCost,
  requiresManeuver,
  selectedTruck,
  subtotal,
  selectedVehicleModel,
}: CostBreakdownProps) => {
  const outboundTolls = detectedTolls.filter(
    (toll) => toll.direction === 'outbound',
  ) as TollLocation[]
  const returnTolls = detectedTolls.filter(
    (toll) => toll.direction === 'return',
  ) as TollLocation[]

  console.log('Cost Breakdown Props:', {
    finalCost,
    subtotal,
    totalTollCost,
    detectedTolls,
  })

  return (
    <Card className="p-4 space-y-4 bg-white/50">
      <div className="space-y-2">
        <motion.div
          key={selectedTruck.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-2"
        >
          <TruckInfoHeader
            selectedTruck={selectedTruck}
            selectedVehicleModel={selectedVehicleModel}
          />
          <CostFormulaDisplay
            selectedTruck={selectedTruck}
            requiresManeuver={requiresManeuver}
            requiresInvoice={requiresInvoice}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          <div className="space-y-3 border-t pt-3 mt-2">
            <ServiceCostSection
              flagDropFee={flagDropFee}
              baseCost={baseCost}
              totalDistance={totalDistance}
              selectedTruck={selectedTruck}
              maneuverCost={maneuverCost}
              requiresManeuver={requiresManeuver}
            />

            {(outboundTolls.length > 0 || returnTolls.length > 0) && (
              <motion.div
                key={`tolls-${selectedTruck.name}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                <div className="text-sm text-gray-600 font-medium flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-primary" />
                  Peajes detectados en la ruta:
                </div>

                {outboundTolls.length > 0 && (
                  <TollBreakdownSection
                    tolls={outboundTolls}
                    direction="outbound"
                  />
                )}

                {returnTolls.length > 0 && (
                  <TollBreakdownSection
                    tolls={returnTolls}
                    direction="return"
                  />
                )}

                <div className="pt-2">
                  <CostItemDisplay
                    label="Total peajes (ida y vuelta)"
                    amount={totalTollCost}
                    className="font-medium"
                  />
                </div>
              </motion.div>
            )}

            <motion.div
              key={`subtotal-${selectedTruck.name}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t pt-2 mt-2"
            >
              <CostItemDisplay
                label="Subtotal"
                amount={subtotal}
                description={`Suma de todos los cargos para grúa ${selectedTruck.name}`}
              />

              {requiresInvoice && (
                <CostItemDisplay
                  label="IVA (16%)"
                  amount={tax}
                  icon={<Receipt className="w-4 h-4 text-green-500" />}
                  description="Impuesto al Valor Agregado"
                />
              )}
            </motion.div>

            <motion.div
              key={`total-${selectedTruck.name}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t pt-3 text-lg font-bold flex justify-between items-center"
            >
              <span>Total Final</span>
              <span
                className={`${selectedTruck.name === 'Tipo D' ? 'text-orange-500' : 'text-primary'}`}
              >
                {formatCurrency(finalCost)}
              </span>
            </motion.div>
          </div>
        </AnimatePresence>
      </div>

      <Button
        className={`w-full ${
          selectedTruck.name === 'Tipo D'
            ? 'bg-orange-500 hover:bg-orange-600'
            : 'bg-primary hover:bg-primary/90'
        }`}
        onClick={() => setShowPaymentWindow(true)}
      >
        Proceder al pago
      </Button>
    </Card>
  )
}