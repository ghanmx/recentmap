
import React, { createContext, useContext, useState, ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { CreditCard } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

import { generateInvoiceNumber, createBillHTML } from '@/utils/billingUtils'
import { sendBillEmails } from '@/utils/emailService'
import { PaymentForm } from './PaymentForm'
import { TollLocation } from '@/data/tollData'
import { calculateTotalCost } from '@/utils/costCalculator'
import { LocationInfo, TollInfo, PaymentInfo, TowingContextType } from './types/towing'

const TowingContext = createContext<TowingContextType | undefined>(undefined)

export const TowingProvider = ({ children }: { children: ReactNode }) => {
  const [totalDistance, setTotalDistance] = useState(0)
  const [totalCost, setTotalCost] = useState(0)
  const [detectedTolls, setDetectedTolls] = useState<TollLocation[]>([])
  const [totalTollCost, setTotalTollCost] = useState(0)
  const [truckType, setTruckType] = useState<"A" | "B" | "C" | "D">("A")
  const [requiresManeuver, setRequiresManeuver] = useState(false)
  const [selectedVehicleModel, setSelectedVehicleModel] = useState("")
  const [tollInfo, setTollInfo] = useState<TollInfo | null>(null)
  const [isLoadingLocations, setIsLoadingLocations] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const { toast } = useToast()

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    subtotal: 0,
    tax: 0,
    total: 0,
    isPending: false,
    isProcessing: false
  })

  const updateTowingInfo = (distance: number) => {
    setTotalDistance(distance)
    const newCost = calculateTotalCost(distance, truckType, requiresManeuver, totalTollCost)
    setTotalCost(newCost)
    setPaymentInfo(prev => ({
      ...prev,
      subtotal: newCost,
      total: newCost * 1.16
    }))
  }

  const updateTollInfo = (tolls: TollLocation[], tollCost: number) => {
    setDetectedTolls(tolls)
    setTotalTollCost(tollCost)
    setTollInfo({ tolls, totalTollCost: tollCost })
    const newCost = calculateTotalCost(totalDistance, truckType, requiresManeuver, tollCost)
    setTotalCost(newCost)
  }

  const updateTruckType = (type: "A" | "B" | "C" | "D") => {
    setTruckType(type)
    const newCost = calculateTotalCost(totalDistance, type, requiresManeuver, totalTollCost)
    setTotalCost(newCost)
  }

  const updateManeuverRequired = (required: boolean) => {
    setRequiresManeuver(required)
    const newCost = calculateTotalCost(totalDistance, truckType, required, totalTollCost)
    setTotalCost(newCost)
  }

  const updateSelectedVehicleModel = (model: string) => {
    setSelectedVehicleModel(model)
  }

  const updateLocationInfo = async (info: LocationInfo) => {
    setIsLoadingLocations(true)
    try {
      if (info.pickup) {
        toast({
          title: "Ubicación de Recogida Actualizada",
          description: info.pickup.address,
        })
      }
      if (info.drop) {
        toast({
          title: "Ubicación de Entrega Actualizada",
          description: info.drop.address,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar la ubicación",
        variant: "destructive",
      })
    } finally {
      setIsLoadingLocations(false)
    }
  }

  const processPayment = async (amount: number): Promise<boolean> => {
    setIsProcessingPayment(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast({
        title: "Pago Procesado",
        description: `Se ha procesado el pago por ${amount.toFixed(2)} MXN`,
      })
      return true
    } catch (error) {
      toast({
        title: "Error en el Pago",
        description: "No se pudo procesar el pago",
        variant: "destructive",
      })
      return false
    } finally {
      setIsProcessingPayment(false)
    }
  }

  const value = {
    totalDistance,
    totalCost,
    detectedTolls,
    totalTollCost,
    truckType,
    requiresManeuver,
    selectedVehicleModel,
    tollInfo,
    paymentInfo,
    isLoadingLocations,
    isProcessingPayment,
    updateTowingInfo,
    updateTollInfo,
    updateTruckType,
    updateManeuverRequired,
    updateSelectedVehicleModel,
    updateLocationInfo,
    processPayment,
    setLoadingLocations: setIsLoadingLocations
  }

  return (
    <TowingContext.Provider value={value}>
      {children}
    </TowingContext.Provider>
  )
}

export const useTowing = () => {
  const context = useContext(TowingContext)
  if (context === undefined) {
    throw new Error('useTowing must be used within a TowingProvider')
  }
  return context
}

export interface PaymentWindowProps {
  isOpen: boolean
  onClose: () => void
  onPaymentSubmit?: (result: { success: boolean; error?: string }) => void
  amount: number
  userDetails: UserDetails
}

const PaymentWindow: React.FC<PaymentWindowProps> = ({
  isOpen,
  onClose,
  onPaymentSubmit,
  amount = 0,
  userDetails,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [cardComplete, setCardComplete] = React.useState(false)

  const {
    totalDistance,
    detectedTolls,
    totalTollCost,
    truckType,
    requiresManeuver,
    pickupLocation,
    dropLocation,
  } = useTowing()

  React.useEffect(() => {
    if (isOpen) {
      setCardComplete(false)
    }
  }, [isOpen])

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

  const generateBill = async (paymentMethod: string, paymentId: string) => {
    if (!userDetails || !pickupLocation || !dropLocation) {
      throw new Error('Missing required details for bill generation')
    }

    const invoiceNumber = generateInvoiceNumber()
    const services = [
      { description: 'Servicio Base de Grúa', amount: amount - totalTollCost },
      ...detectedTolls.map((toll) => ({
        description: `Peaje - ${toll.name}`,
        amount: toll.cost,
      })),
      ...(requiresManeuver
        ? [{ description: 'Cargo por Maniobra Especial', amount: 0 }]
        : []),
    ]

    const billDetails = {
      invoiceNumber,
      date: new Date(),
      userName: userDetails.name,
      userEmail: userDetails.email,
      phone: userDetails.phone,
      vehicleDetails: {
        make: userDetails.vehicleMake,
        model: userDetails.vehicleModel,
        year: userDetails.vehicleYear,
        color: userDetails.vehicleColor,
      },
      locations: {
        pickup: {
          address: pickupLocation.address || '',
          coordinates: { lat: pickupLocation.lat, lng: pickupLocation.lng },
        },
        dropoff: {
          address: dropLocation.address || '',
          coordinates: { lat: dropLocation.lat, lng: dropLocation.lng },
        },
      },
      services,
      totalAmount: amount,
      paymentMethod,
      paymentId,
    }

    const billHtml = createBillHTML(billDetails)
    await sendBillEmails(billDetails, billHtml)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!cardComplete) {
      toast({
        title: 'Datos Incompletos',
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

      await generateBill('Tarjeta de Crédito', paymentMethod.id)

      toast({
        title: 'Pago Exitoso',
        description: 'El pago ha sido procesado y la factura ha sido enviada.',
      })

      onPaymentSubmit?.({ success: true })
      onClose()
    } catch (err: any) {
      toast({
        title: 'Error en el Pago',
        description:
          err.message || 'Ocurrió un error durante el proceso de pago',
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
            Pago Seguro
          </DialogTitle>
        </DialogHeader>

        <PaymentForm
          amount={amount}
          isProcessing={isProcessing}
          cardComplete={cardComplete}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}

export default PaymentWindow
