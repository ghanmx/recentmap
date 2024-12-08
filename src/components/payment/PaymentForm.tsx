import { useState } from 'react'
import { CardElement } from '@stripe/react-stripe-js'
import { Button } from '../ui/button'
import { PaymentAmount } from './PaymentAmount'

interface PaymentFormProps {
  subtotal: number
  tax: number
  requiresInvoice: boolean
  onCardChange: (complete: boolean) => void
  finalTotal: number
  requestId?: string
}

export const PaymentForm = ({
  subtotal,
  tax,
  requiresInvoice,
  onCardChange,
  finalTotal,
  requestId = '',
}: PaymentFormProps) => {
  const [isProcessing, setIsProcessing] = useState(false)

  return (
    <div className="space-y-6">
      <PaymentAmount
        subtotal={subtotal}
        tax={tax}
        requiresInvoice={requiresInvoice}
        finalTotal={finalTotal}
      />

      <div className="p-4 border rounded-lg">
        <CardElement
          onChange={(e) => onCardChange(e.complete)}
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
        />
      </div>

      <Button
        type="submit"
        disabled={isProcessing}
        className="w-full"
      >
        {isProcessing ? 'Procesando...' : `Pagar ${finalTotal.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`}
      </Button>
    </div>
  )
}