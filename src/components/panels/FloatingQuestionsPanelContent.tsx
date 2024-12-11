import { PaymentSteps } from '../payment/PaymentSteps'
import { ServiceDetailsPanel } from './ServiceDetailsPanel'
import { CostDetailsPanel } from './CostDetailsPanel'
import { Location } from '@/types/location'
import { motion, AnimatePresence } from 'framer-motion'

interface FloatingQuestionsPanelContentProps {
  currentPage: number
  pickupLocation: Location | null
  dropLocation: Location | null
  pickupAddress: string
  dropAddress: string
  onPickupSelect: (location: Location) => void
  onDropSelect: (location: Location) => void
  onSelectingPickup: () => void
  onSelectingDrop: () => void
  requiresInvoice: boolean
  setRequiresInvoice: (value: boolean) => void
  subtotal: number
  tax: number
  finalTotal: number
  detectedTolls: any[]
  totalTollCost: number
  onShowPayment: () => void
  paymentSteps: Array<{ title: string; description: string }>
}

export const FloatingQuestionsPanelContent = ({
  currentPage,
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  onPickupSelect,
  onDropSelect,
  onSelectingPickup,
  onSelectingDrop,
  requiresInvoice,
  setRequiresInvoice,
  subtotal,
  tax,
  finalTotal,
  detectedTolls,
  totalTollCost,
  onShowPayment,
  paymentSteps,
}: FloatingQuestionsPanelContentProps) => {
  const pages = [
    {
      id: 1,
      title: 'Detalles del Servicio',
      content: (
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
      content: (
        <CostDetailsPanel
          steps={paymentSteps}
          requiresInvoice={requiresInvoice}
          setRequiresInvoice={setRequiresInvoice}
          subtotal={subtotal}
          tax={tax}
          finalTotal={finalTotal}
          detectedTolls={detectedTolls}
          totalTollCost={totalTollCost}
          onShowPayment={onShowPayment}
        />
      ),
    },
  ]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="min-h-[400px]"
      >
        {pages[currentPage].content}
      </motion.div>
    </AnimatePresence>
  )
}