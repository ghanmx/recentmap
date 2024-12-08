import { useState } from 'react'
import { FloatingPanel } from './form/FloatingPanel'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTowing } from '@/contexts/TowingContext'
import PaymentWindow from './payment/PaymentWindow'
import { Location } from '@/types/location'
import { NotificationBadge } from './notifications/NotificationBadge'
import { useToast } from '@/hooks/use-toast'
import { ServiceDetailsPanel } from './panels/ServiceDetailsPanel'
import { CostDetailsPanel } from './panels/CostDetailsPanel'
import { calculateServiceCosts } from '@/utils/costCalculations'

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

  const costs = calculateServiceCosts(
    totalDistance,
    truckType,
    requiresManeuver,
    totalTollCost,
    requiresInvoice
  )

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
        <ServiceDetailsPanel
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          pickupAddress={pickupAddress}
          dropAddress={dropAddress}
          onPickupSelect={onPickupSelect}
          onDropSelect={onDropSelect}
          onSelectingPickup={onSelectingPickup}
          onSelectingDrop={onSelectingDrop}
          steps={paymentSteps}
        />
      ),
    },
    {
      id: 2,
      title: 'Costos y Ruta',
      component: (
        <CostDetailsPanel
          steps={paymentSteps}
          requiresInvoice={requiresInvoice}
          setRequiresInvoice={setRequiresInvoice}
          subtotal={costs.subtotal}
          tax={costs.tax}
          finalTotal={costs.finalTotal}
          detectedTolls={detectedTolls}
          totalTollCost={totalTollCost}
          onShowPayment={() => setShowPaymentWindow(true)}
        />
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
        subtotal={costs.subtotal}
        tax={costs.tax}
        requiresInvoice={requiresInvoice}
        onPaymentSubmit={handlePaymentSubmit}
        finalTotal={costs.finalTotal}
        requestId=""
      />
    </>
  )
}