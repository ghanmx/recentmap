import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/utils/priceCalculator'

interface PaymentActionsProps {
  onClose: () => void
  isProcessing: boolean
  handleSubmit: (e: React.FormEvent) => Promise<void>
  cardComplete: boolean
  finalAmount: number
}

export const PaymentActions = ({
  onClose,
  isProcessing,
  handleSubmit,
  cardComplete,
  finalAmount,
}: PaymentActionsProps) => {
  return (
    <div className="flex gap-3 justify-end">
      <Button
        type="button"
        variant="outline"
        onClick={onClose}
        disabled={isProcessing}
        className="border-gray-300 hover:bg-gray-100"
      >
        Cancelar
      </Button>
      <Button
        type="submit"
        disabled={isProcessing || !cardComplete}
        onClick={handleSubmit}
        className={cn(
          'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white min-w-[120px]',
          isProcessing && 'opacity-80',
        )}
      >
        {isProcessing ? (
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Procesando...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Pagar {formatCurrency(finalAmount)}
          </span>
        )}
      </Button>
    </div>
  )
}