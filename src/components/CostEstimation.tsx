import { Button } from './ui/button'
import { formatCurrency } from '@/utils/costCalculator'
import { motion } from 'framer-motion'

export interface CostEstimationProps {
  onShowPayment: () => void
  subtotal: number
  tax: number
  finalTotal: number
}

export const CostEstimation = ({
  onShowPayment,
  subtotal,
  tax,
  finalTotal,
}: CostEstimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>IVA (16%):</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t">
          <span>Total:</span>
          <span className="text-primary">{formatCurrency(finalTotal)}</span>
        </div>
      </div>

      <Button
        onClick={onShowPayment}
        className="w-full bg-primary hover:bg-primary/90"
      >
        Proceder al pago
      </Button>
    </motion.div>
  )
}