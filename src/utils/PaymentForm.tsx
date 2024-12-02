import { useState } from 'react'
import {
  useStripe,
  useElements,
  CardElement,
  PaymentMethodResult,
} from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import type { Stripe, StripeElements } from '@stripe/stripe-js'

interface PaymentFormProps {
  amount: number
  onSuccess: () => void
  onError: (error: Error) => void
}

export const PaymentForm = ({ amount, onSuccess, onError }: PaymentFormProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    try {
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)!,
      })

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message)
      }

      const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: amount * 100, // Convert to cents
        }),
      })

      if (!response.ok) {
        throw new Error('Payment processing failed')
      }

      const result = await response.json()

      if (result.error) {
        throw new Error(result.error)
      }

      toast({
        title: 'Payment Successful',
        description: 'Your payment has been processed successfully.',
      })

      onSuccess()
    } catch (error) {
      onError(error as Error)
      toast({
        title: 'Error',
        description: 'Payment failed. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border rounded-lg">
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
        />
      </div>

      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay $${amount.toFixed(2)}`
        )}
      </Button>
    </form>
  )
}