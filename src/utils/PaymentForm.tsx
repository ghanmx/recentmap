import { useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import type { Stripe, StripeElements } from '@stripe/stripe-js'

interface PaymentFormProps {
  amount: number
  onSuccess: () => void
  onError: (error: string) => void
}

export const PaymentForm = ({
  amount,
  onSuccess,
  onError,
}: PaymentFormProps) => {
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
      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement)!,
        })

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message)
      }

      // Process payment with your backend
      // This is a placeholder for the actual payment processing
      const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount,
        }),
      })

      if (!response.ok) {
        throw new Error('Payment processing failed')
      }

      onSuccess()
      toast({
        title: 'Payment Successful',
        description: 'Your payment has been processed successfully.',
      })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Payment processing failed'
      onError(errorMessage)
      toast({
        title: 'Payment Failed',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        {isProcessing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </Button>
    </form>
  )
}
