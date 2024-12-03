import { CardElement } from '@stripe/react-stripe-js'
import { PaymentAmount } from './PaymentAmount'

interface PaymentFormProps {
  subtotal: number
  tax: number
  requiresInvoice: boolean
  onCardChange: (complete: boolean) => void
}

export const PaymentForm = ({
  subtotal,
  tax,
  requiresInvoice,
  onCardChange,
}: PaymentFormProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
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
            hidePostalCode: true,
          }}
        />
      </div>
      <PaymentAmount
        subtotal={subtotal}
        tax={tax}
        requiresInvoice={requiresInvoice}
      />
    </div>
  )
}