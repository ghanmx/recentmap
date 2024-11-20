import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Shield, Calendar, CheckCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaymentFormProps {
  amount: number
  isProcessing: boolean
  cardComplete: boolean
  onClose: () => void
  onSubmit: (e: React.FormEvent) => Promise<void>
}

export const PaymentForm = ({
  amount,
  isProcessing,
  cardComplete,
  onClose,
  onSubmit,
}: PaymentFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
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
              hidePostalCode: true,
            }}
          />
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4" />
            Encriptación SSL Segura
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center justify-between px-2">
          <span className="text-sm text-gray-600">Total a Pagar</span>
          <span className="text-lg font-semibold text-primary">
            ${amount.toFixed(2)} MXN
          </span>
        </div>
      </div>

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
          className={cn(
            'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white min-w-[120px]',
            isProcessing && 'opacity-80',
          )}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Procesando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Pagar ${amount.toFixed(2)} MXN
            </span>
          )}
        </Button>
      </div>
    </form>
  )
}
