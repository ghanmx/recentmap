import { CardElement } from '@stripe/react-stripe-js'
import { PaymentAmount } from './PaymentAmount'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatCurrency } from '@/utils/priceCalculator'
import { useTowing } from '@/contexts/TowingContext'
import { towTruckTypes } from '@/utils/pricing'
import { motion } from 'framer-motion'
import { Receipt, Flag, Truck, TrendingUp } from 'lucide-react'

interface PaymentFormProps {
  subtotal: number
  tax: number
  requiresInvoice: boolean
  onCardChange: (complete: boolean) => void
  finalTotal: number
}

export const PaymentForm = ({
  subtotal,
  tax,
  requiresInvoice,
  onCardChange,
  finalTotal,
}: PaymentFormProps) => {
  const { totalDistance, truckType, requiresManeuver, totalTollCost } = useTowing()
  const selectedTruck = towTruckTypes[truckType || 'A']
  const baseCost = totalDistance * selectedTruck.perKm
  const flagDropFee = selectedTruck.flagDropFee
  const maneuverCost = requiresManeuver ? selectedTruck.maneuverCharge : 0

  return (
    <div className="space-y-6">
      <ScrollArea className="h-[300px] rounded-md border p-4">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h3 className="font-semibold text-lg mb-2">Desglose de Costos</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span>Distancia ({totalDistance.toFixed(2)} km × {formatCurrency(selectedTruck.perKm)}/km)</span>
                </div>
                <span>{formatCurrency(baseCost)}</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4 text-primary" />
                  <span>Banderazo ({selectedTruck.name})</span>
                </div>
                <span>{formatCurrency(flagDropFee)}</span>
              </div>

              {requiresManeuver && (
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-orange-500" />
                    <span>Cargo por maniobra</span>
                  </div>
                  <span>{formatCurrency(maneuverCost)}</span>
                </div>
              )}

              {totalTollCost > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-blue-500" />
                    <span>Peajes</span>
                  </div>
                  <span>{formatCurrency(totalTollCost)}</span>
                </div>
              )}
            </div>

            <div className="pt-2 border-t">
              <PaymentAmount
                subtotal={subtotal}
                tax={tax}
                requiresInvoice={requiresInvoice}
                finalTotal={finalTotal}
              />
            </div>
          </motion.div>
        </div>
      </ScrollArea>

      <div className="space-y-4">
        <div className="rounded-md border p-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
            onChange={(e) => onCardChange(e.complete)}
          />
        </div>
      </div>
    </div>
  )
}