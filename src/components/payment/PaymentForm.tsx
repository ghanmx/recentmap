import { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { PaymentAmount } from './PaymentAmount'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatCurrency } from '@/utils/priceCalculator'
import { useTowing } from '@/contexts/TowingContext'
import { towTruckTypes } from '@/utils/pricing'
import { motion } from 'framer-motion'
import { Receipt, Flag, Truck, TrendingUp } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface PaymentFormProps {
  subtotal: number
  tax: number
  requiresInvoice: boolean
  onCardChange: (complete: boolean) => void
  finalTotal: number
  requestId: string
}

export const PaymentForm = ({
  subtotal,
  tax,
  requiresInvoice,
  onCardChange,
  finalTotal,
  requestId,
}: PaymentFormProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const { totalDistance, truckType, requiresManeuver, totalTollCost } = useTowing()
  const selectedTruck = towTruckTypes[truckType || 'A']
  const baseCost = totalDistance * selectedTruck.perKm
  const flagDropFee = selectedTruck.flagDropFee
  const maneuverCost = requiresManeuver ? selectedTruck.maneuverCharge : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsProcessing(true)
    try {
      const { error: intentError, data: intentData } = await supabase.functions.invoke(
        'create-payment-intent',
        {
          body: {
            amount: finalTotal,
            requestId,
          },
        },
      )

      if (intentError) throw intentError

      const cardElement = elements.getElement(CardElement)
      if (!cardElement) throw new Error('Card element not found')

      const { error: stripeError } = await stripe.confirmCardPayment(
        intentData.clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        },
      )

      if (stripeError) {
        throw stripeError
      }

      // Update request status
      await supabase
        .from('vehicle_requests')
        .update({
          payment_status: 'processing',
          payment_intent_id: intentData.paymentIntentId,
          payment_amount: finalTotal,
        })
        .eq('id', requestId)

      toast({
        title: 'Pago Procesado',
        description: 'Tu pago ha sido procesado exitosamente.',
      })

    } catch (error: any) {
      console.error('Payment error:', error)
      toast({
        title: 'Error en el Pago',
        description: error.message || 'Hubo un error al procesar el pago.',
        variant: 'destructive',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <ScrollArea className="h-[300px] rounded-md border p-4">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h3 className="font-semibold text-lg mb-2">Desglose de Costos</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span>Distancia ({totalDistance.toFixed(2)} km × {formatCurrency(selectedTruck.perKm)}/km)</span>
                </div>
                <span>{formatCurrency(baseCost)}</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4 text-primary" />
                  <span>Banderazo ({selectedTruck.name})</span>
                </div>
                <span>{formatCurrency(flagDropFee)}</span>
              </div>

              {requiresManeuver && (
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-orange-500" />
                    <span>Cargo por maniobra</span>
                  </div>
                  <span>{formatCurrency(maneuverCost)}</span>
                </div>
              )}

              {totalTollCost > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-blue-500" />
                    <span>Peajes</span>
                  </div>
                  <span>{formatCurrency(totalTollCost)}</span>
                </div>
              )}
            </div>

            <div className="pt-2 border-t">
              <PaymentAmount
                subtotal={subtotal}
                tax={tax}
                requiresInvoice={requiresInvoice}
                finalTotal={finalTotal}
              />
            </div>
          </motion.div>
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="rounded-md border p-4">
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
            onChange={(e) => onCardChange(e.complete)}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className={`
            w-full px-4 py-2 rounded-md text-sm font-medium text-white
            ${
              !stripe || isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90'
            }
            transition-colors duration-200
          `}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Procesando...
            </span>
          ) : (
            `Pagar ${formatCurrency(finalTotal)}`
          )}
        </button>
      </form>
    </div>
  )
}