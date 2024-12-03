import { formatCurrency } from '@/utils/priceCalculator'

interface PaymentAmountProps {
  subtotal: number
  tax: number
  requiresInvoice: boolean
}

export const PaymentAmount = ({ subtotal, tax, requiresInvoice }: PaymentAmountProps) => {
  const finalAmount = requiresInvoice ? subtotal + tax : subtotal

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span>Subtotal:</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      {requiresInvoice && (
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>IVA (16%):</span>
          <span>{formatCurrency(tax)}</span>
        </div>
      )}
      <div className="flex justify-between items-center text-lg font-bold pt-2 border-t">
        <span>Total a Pagar:</span>
        <span className="text-primary">{formatCurrency(finalAmount)}</span>
      </div>
    </div>
  )
}