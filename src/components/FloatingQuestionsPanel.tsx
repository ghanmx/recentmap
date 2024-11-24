import { useState } from 'react'
import { FloatingPanel } from './map/FloatingPanel'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { VehicleForm } from './VehicleForm'
import { CostEstimation } from './CostEstimation'
import { RouteDisplay } from './map/RouteDisplay'
import { motion, AnimatePresence } from 'framer-motion'
import { useTowing } from '@/contexts/TowingContext'
import PaymentWindow from './payment/PaymentWindow'
import { ScrollArea } from './ui/scroll-area'

interface QuestionPage {
  id: number
  title: string
  component: React.ReactNode
}

interface LocationData {
  lat: number
  lng: number
}

interface FloatingQuestionsPanelProps {
  pickupLocation: LocationData | null
  dropLocation: LocationData | null
  pickupAddress: string
  dropAddress: string
  onPickupSelect: (location: {
    lat: number
    lng: number
    address: string
  }) => void
  onDropSelect: (location: {
    lat: number
    lng: number
    address: string
  }) => void
  onSelectingPickup: () => void
  onSelectingDrop: () => void
  className?: string
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
  className,
}: FloatingQuestionsPanelProps) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [showPaymentWindow, setShowPaymentWindow] = useState(false)
  const { totalDistance, truckType, requiresManeuver, totalTollCost } =
    useTowing()

  const handlePaymentSubmit = async (result: {
    success: boolean
    error?: string
  }) => {
    if (result.success) {
      setShowPaymentWindow(false)
    }
  }

  const pages: QuestionPage[] = [
    {
      id: 1,
      title: 'Detalles del Servicio',
      component: (
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
      ),
    },
    {
      id: 2,
      title: 'Costos y Ruta',
      component: (
        <div className="space-y-6">
          <CostEstimation onShowPayment={() => setShowPaymentWindow(true)} />
          <RouteDisplay
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
          />
        </div>
      ),
    },
  ]

  const handlePageChange = (direction: 'next' | 'prev') => {
    setCurrentPage((prev) =>
      direction === 'next'
        ? Math.min(pages.length - 1, prev + 1)
        : Math.max(0, prev - 1),
    )
  }

  return (
    <>
      <FloatingPanel
        title={pages[currentPage].title}
        position="right"
        className={`w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-lg ${className}`}
      >
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="space-y-6 p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-[50vh]"
              >
                {pages[currentPage].component}
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="flex justify-between mt-4 pt-4 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                variant="outline"
                onClick={() => handlePageChange('prev')}
                disabled={currentPage === 0}
                className="w-24 bg-white/80 hover:bg-white/95 transition-all"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>
              <Button
                variant="outline"
                onClick={() => handlePageChange('next')}
                disabled={currentPage === pages.length - 1}
                className="w-24 bg-white/80 hover:bg-white/95 transition-all"
              >
                Siguiente
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </ScrollArea>
      </FloatingPanel>

      <PaymentWindow
        isOpen={showPaymentWindow}
        onClose={() => setShowPaymentWindow(false)}
        amount={totalDistance * (truckType === 'D' ? 32.35 : 18.82)}
        onPaymentSubmit={handlePaymentSubmit}
      />
    </>
  )
}
