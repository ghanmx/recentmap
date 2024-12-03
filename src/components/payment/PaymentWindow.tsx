import { useState } from 'react'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { PaymentHeader } from './PaymentHeader'
import { PaymentForm } from './PaymentForm'
import { PaymentFooter } from './PaymentFooter'
import { PaymentActions } from './PaymentActions'

interface PaymentWindowProps {
  isOpen: boolean
  onClose: () => void
  onPaymentSubmit?: (result: { success: boolean; error?: string }) => void
  subtotal: number
  tax: number
  requiresInvoice: boolean
}

const PaymentWindow = ({
  isOpen,
  onClose,
  onPaymentSubmit,
  subtotal,
  tax,
  requiresInvoice,
}: PaymentWindowProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardComplete, setCardComplete] = useState(false)

  const handleClose = () => {
    if (isProcessing) {
      toast({
        title: 'Pago en Proceso',
        description: 'Por favor espere mientras procesamos su pago',
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
        title: 'Datos de Tarjeta Incompletos',
        description: 'Por favor complete todos los datos de la tarjeta',
        variant: 'destructive',
      })
      return
    }

    setIsProcessing(true)

    if (!stripe || !elements) {
      toast({
        title: 'Error',
        description: 'Sistema de pago no disponible. Intente más tarde.',
        variant: 'destructive',
      })
      setIsProcessing(false)
      return
    }

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      toast({
        title: 'Error',
        description: 'Elemento de tarjeta no encontrado.',
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
        title: 'Pago Exitoso',
        description: 'Su pago ha sido procesado exitosamente.',
      })

      onPaymentSubmit?.({ success: true })
      onClose()
    } catch (err: any) {
      toast({
        title: 'Error en el Pago',
        description:
          err.message || 'Ocurrió un error durante el procesamiento del pago',
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
        <PaymentHeader />
        <form onSubmit={handleSubmit} className="space-y-6">
          <PaymentForm
            subtotal={subtotal}
            tax={tax}
            requiresInvoice={requiresInvoice}
            onCardChange={setCardComplete}
          />
          <PaymentFooter />
          <PaymentActions
            onClose={handleClose}
            isProcessing={isProcessing}
            handleSubmit={handleSubmit}
            cardComplete={cardComplete}
            finalAmount={requiresInvoice ? subtotal + tax : subtotal}
          />
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentWindow