import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { formatCurrency } from '@/utils/costCalculator'
import { TowTruckType } from '@/utils/pricing'
import { CostFormulaDisplay } from './CostFormulaDisplay'
import { CostItemDisplay } from './CostItemDisplay'
import { TruckInfoHeader } from './TruckInfoHeader'
import { TollBreakdownSection } from './TollBreakdownSection'
import { ServiceCostSection } from './ServiceCostSection'
import { TollLocation } from '@/types/toll'
import { TollBadgeInfo } from './TollBadgeInfo'
import { useToast } from '@/hooks/use-toast'
import { Receipt } from 'lucide-react'

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
  const { toast } = useToast()
  const outboundTolls = detectedTolls.filter(toll => toll.direction === 'outbound')
  const returnTolls = detectedTolls.filter(toll => toll.direction === 'return')

  const handleTollInfo = () => {
    if (detectedTolls.length === 0) {
      toast({
        title: "No se detectaron peajes",
        description: "No hay peajes en la ruta seleccionada",
      })
    }
  }

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
          
          <TollBadgeInfo 
            tollCount={detectedTolls.length}
            onInfoClick={handleTollInfo}
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
                    label="Total peajes"
                    amount={totalTollCost}
                    className="font-medium text-blue-600"
                    icon={<Receipt className="w-4 h-4 text-blue-500" />}
                    description="Suma total de peajes (ida y vuelta)"
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
                description={`Suma de todos los cargos para ${selectedTruck.name}`}
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
              <span className={`${
                selectedTruck.name === 'Tipo D' ? 'text-orange-500' : 'text-primary'
              }`}>
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