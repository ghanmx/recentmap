import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { CreditCard, Calendar, CheckCircle, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaymentWindowProps {
  isOpen: boolean
  onClose: () => void
  onPaymentSubmit?: (result: { success: boolean; error?: string }) => void
  finalCost: number
}

const PaymentWindow = ({
  isOpen,
  onClose,
  onPaymentSubmit,
  finalCost = 0,
}: PaymentWindowProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [cardComplete, setCardComplete] = React.useState(false)

  React.useEffect(() => {
    if (isOpen) {
      setCardComplete(false)
    }
  }, [isOpen])

  const handleClose = () => {
    if (isProcessing) {
      toast({
        title: 'Payment in Progress',
        description: 'Please wait while we process your payment',
        variant: 'destructive',
      })
      return
    }
    onClose()
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!cardComplete) {
      toast({
        title: 'Incomplete Card Details',
        description: 'Please fill in all card information before proceeding',
        variant: 'destructive',
      })
      return
    }

    setIsProcessing(true)

    if (!stripe || !elements) {
      toast({
        title: 'Error',
        description: 'Payment system is not ready. Please try again later.',
        variant: 'destructive',
      })
      setIsProcessing(false)
      return
    }

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      toast({
        title: 'Error',
        description: 'Card element not found.',
        variant: 'destructive',
      })
      setIsProcessing(false)
      return
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      })

      if (error) {
        throw error
      }

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: 'Payment Successful',
        description: 'Your payment has been processed successfully.',
      })

      onPaymentSubmit?.({ success: true })
      onClose()
    } catch (err: any) {
      toast({
        title: 'Payment Failed',
        description:
          err.message || 'An error occurred during payment processing',
        variant: 'destructive',
      })
      onPaymentSubmit?.({ success: false, error: err.message })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-gray-50 border-gray-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <CreditCard className="w-5 h-5 text-primary" />
            Secure Payment
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
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

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                Secure SSL Encryption
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date().toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center justify-between px-2">
              <span className="text-sm text-gray-600">Service Fee</span>
              <span className="text-lg font-semibold text-primary">
                ${finalCost.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isProcessing}
              className="border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!stripe || isProcessing || !cardComplete}
              className={cn(
                'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white min-w-[120px]',
                isProcessing && 'opacity-80',
              )}
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Pay ${finalCost.toFixed(2)}
                </span>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentWindow
