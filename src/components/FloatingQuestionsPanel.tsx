import { useState } from 'react'
import { FloatingPanel } from './map/FloatingPanel'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { VehicleForm } from './VehicleForm'
import { CostEstimation } from './CostEstimation'
import { motion, AnimatePresence } from 'framer-motion'
import { useTowing } from '@/contexts/TowingContext'
import PaymentWindow from './payment/PaymentWindow'
import { Location } from '@/types/location'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { NotificationBadge } from './notifications/NotificationBadge'
import { PaymentSteps } from './payment/PaymentSteps'
import { useToast } from '@/hooks/use-toast'
import { LocationDetailsPanel } from './panels/LocationDetailsPanel'
import { TollBreakdownPanel } from './panels/TollBreakdownPanel'
import { CostSummary } from './cost/CostSummary'

interface FloatingQuestionsPanelProps {
  pickupLocation: Location | null
  dropLocation: Location | null
  pickupAddress: string
  dropAddress: string
  onPickupSelect: (location: Location) => void
  onDropSelect: (location: Location) => void
  onSelectingPickup: () => void
  onSelectingDrop: () => void
}

export const FloatingQuestionsPanel = ({
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  onPickupSelect,
  onDropSelect,
  onSelectingPickup,
  onSelectingDrop,
}: FloatingQuestionsPanelProps) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [showPaymentWindow, setShowPaymentWindow] = useState(false)
  const [requiresInvoice, setRequiresInvoice] = useState(false)
  const { totalDistance, truckType, requiresManeuver, totalTollCost, detectedTolls } = useTowing()
  const { toast } = useToast()

  const baseCost = totalDistance * (truckType === 'D' ? 32.35 : 18.82)
  const maneuverCost = requiresManeuver ? (truckType === 'D' ? 2101.65 : 1219.55) : 0
  const flagDropFee = truckType === 'D' ? 885.84 : 528.69
  const subtotal = baseCost + maneuverCost + flagDropFee + totalTollCost
  const tax = requiresInvoice ? 0.16 * subtotal : 0
  const finalTotal = subtotal + tax

  const handlePaymentSubmit = async () => {
    toast({
      title: "Procesando pago",
      description: "Por favor espere mientras procesamos su pago...",
      className: "bg-primary text-white text-shadow-sm",
    })
    setShowPaymentWindow(false)
  }

  const paymentSteps = [
    {
      title: "Detalles del Servicio",
      description: "Información del vehículo y ubicaciones"
    },
    {
      title: "Revisión de Costos",
      description: "Desglose de tarifas y peajes"
    }
  ]

  const pages = [
    {
      id: 1,
      title: 'Detalles del Servicio',
      component: (
        <>
          <PaymentSteps currentStep={0} steps={paymentSteps} />
          <VehicleForm
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
            pickupAddress={pickupAddress}
            dropAddress={dropAddress}
            onPickupSelect={onPickupSelect}
            onDropSelect={onDropSelect}
            onSelectingPickup={onSelectingPickup}
            onSelectingDrop={onSelectingDrop}
          />
          <LocationDetailsPanel
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
            pickupAddress={pickupAddress}
            dropAddress={dropAddress}
          />
        </>
      ),
    },
    {
      id: 2,
      title: 'Costos y Ruta',
      component: (
        <div className="space-y-6">
          <PaymentSteps currentStep={1} steps={paymentSteps} />
          <div className="space-y-4">
            <div className="flex items-center space-x-2 p-4 bg-white/50 rounded-lg border border-primary/10">
              <Label htmlFor="invoice" className="text-sm text-shadow-sm">
                Requiere factura (IVA 16%)
              </Label>
              <Switch
                id="invoice"
                checked={requiresInvoice}
                onCheckedChange={setRequiresInvoice}
              />
            </div>

            <CostEstimation 
              onShowPayment={() => {
                setShowPaymentWindow(true)
                toast({
                  title: "Preparando pago",
                  description: "Redirigiendo al formulario de pago...",
                  className: "text-shadow-sm"
                })
              }} 
              subtotal={subtotal}
              tax={tax}
              finalTotal={finalTotal}
            />
            
            <TollBreakdownPanel
              detectedTolls={detectedTolls}
              totalTollCost={totalTollCost}
            />

            <CostSummary
              subtotal={subtotal}
              tax={tax}
              finalTotal={finalTotal}
              detectedTolls={detectedTolls}
              totalTollCost={totalTollCost}
              requiresInvoice={requiresInvoice}
            />
          </div>
        </div>
      ),
    },
  ]

  return (
    <>
      <FloatingPanel
        title={
          <div className="flex items-center justify-between">
            <span className="text-shadow-sm">{pages[currentPage].title}</span>
            <NotificationBadge count={detectedTolls.length} />
          </div>
        }
        position="right"
        className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-lg"
      >
        <div className="space-y-6 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[400px]"
            >
              {pages[currentPage].component}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => {
                setCurrentPage((prev) => Math.max(0, prev - 1))
                toast({
                  title: "Volviendo atrás",
                  description: "Puede modificar los detalles del servicio",
                  className: "text-shadow-sm"
                })
              }}
              disabled={currentPage === 0}
              className="w-24 bg-white/80 hover:bg-white/95 transition-all text-shadow-sm"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setCurrentPage((prev) => Math.min(pages.length - 1, prev + 1))
                toast({
                  title: "Siguiente paso",
                  description: "Revisando costos y ruta",
                  className: "text-shadow-sm"
                })
              }}
              disabled={currentPage === pages.length - 1}
              className="w-24 bg-white/80 hover:bg-white/95 transition-all text-shadow-sm"
            >
              Siguiente
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </FloatingPanel>

      <PaymentWindow
        isOpen={showPaymentWindow}
        onClose={() => setShowPaymentWindow(false)}
        subtotal={subtotal}
        tax={tax}
        requiresInvoice={requiresInvoice}
        onPaymentSubmit={handlePaymentSubmit}
        finalTotal={finalTotal}
      />
    </>
  )
}