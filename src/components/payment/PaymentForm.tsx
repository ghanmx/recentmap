import { CardElement } from '@stripe/react-stripe-js'
import { motion } from 'framer-motion'
import { formatCurrency } from '@/utils/priceCalculator'

interface PaymentFormProps {
  cardComplete: boolean
  setCardComplete: (complete: boolean) => void
  finalCost: number
}

export const PaymentForm = ({
  cardComplete,
  setCardComplete,
  finalCost,
}: PaymentFormProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <CardElement
          onChange={(e) => setCardComplete(e.complete)}
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

      <div className="flex flex-col space-y-2 px-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Cargo por Servicio</span>
          <span className="text-lg font-semibold text-primary">
            {formatCurrency(finalCost)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}