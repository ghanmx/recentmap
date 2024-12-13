import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { PaymentForm } from './PaymentForm'
import { Lock, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { formatCurrency } from '@/utils/priceCalculator'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe outside of component to avoid recreating the Stripe object
const stripePromise = loadStripe('pk_test_51Kmzu5Huhx2WCwdMfDhPkRWGwdER3XFkbCmvOYMtKoI5h15QuU7R0QnkgjkFK3gMLoYXuRxKQrqv6fMatPWQFUEx00YLH32VSn')

export interface PaymentWindowProps {
  isOpen: boolean
  onClose: () => void
  subtotal: number
  tax: number
  requiresInvoice: boolean
  onPaymentSubmit: () => Promise<void>
  finalTotal: number
}

const PaymentWindow = ({
  isOpen,
  onClose,
  subtotal,
  tax,
  requiresInvoice,
  onPaymentSubmit,
  finalTotal,
}: PaymentWindowProps) => {
  const [cardComplete, setCardComplete] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    try {
      await onPaymentSubmit()
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Lock className="w-5 h-5 text-primary" />
            Pago Seguro
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="bg-green-50 border border-green-100 rounded-lg p-3 mb-6">
            <div className="flex items-center gap-2 text-green-700">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-medium">
                Encriptación SSL Segura
              </span>
            </div>
            <p className="text-xs text-green-600 mt-1">
              Tus datos de pago están protegidos
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{format(new Date(), 'dd/MM/yyyy')}</span>
            </div>

            <Elements stripe={stripePromise}>
              <PaymentForm
                subtotal={subtotal}
                tax={tax}
                requiresInvoice={requiresInvoice}
                onCardChange={(complete: boolean) => setCardComplete(complete)}
                finalTotal={finalTotal}
              />
            </Elements>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                disabled={isProcessing}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 focus:outline-none"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!cardComplete || isProcessing}
                onClick={handleSubmit}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium text-white
                  ${
                    !cardComplete || isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primary hover:bg-primary/90'
                  }
                  transition-colors duration-200
                `}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Procesando...
                  </span>
                ) : (
                  `Pagar ${formatCurrency(finalTotal)}`
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentWindow