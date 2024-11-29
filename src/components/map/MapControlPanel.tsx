import { MapControls } from './MapControls'
import { RouteStreetInfo } from './RouteStreetInfo'
import { showLocationNotification } from '@/utils/notificationUtils'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

interface MapControlPanelProps {
  selectingPickup: boolean
  selectingDrop: boolean
  setSelectingPickup: (value: boolean) => void
  setSelectingDrop: (value: boolean) => void
  pickupLocation: { lat: number; lng: number } | null
  dropLocation: { lat: number; lng: number } | null
  pickupAddress?: string
  dropAddress?: string
  isLoading?: boolean
}

export const MapControlPanel = ({
  selectingPickup,
  selectingDrop,
  setSelectingPickup,
  setSelectingDrop,
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  isLoading = false,
}: MapControlPanelProps) => {
  const { toast } = useToast()

  const handlePickupClick = () => {
    setSelectingPickup(true)
    setSelectingDrop(false)
    showLocationNotification('pickup', { lat: 0, lng: 0 })
    toast({
      title: 'Seleccionando punto de recogida',
      description: 'Haz clic en el mapa para seleccionar el punto de recogida',
      className: 'bg-green-50 border-green-200',
    })
  }

  const handleDropClick = () => {
    setSelectingDrop(true)
    setSelectingPickup(false)
    showLocationNotification('drop', { lat: 0, lng: 0 })
    toast({
      title: 'Seleccionando punto de entrega',
      description: 'Haz clic en el mapa para seleccionar el punto de entrega',
      className: 'bg-blue-50 border-blue-200',
    })
  }

  return (
    <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-3 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Card className="relative w-full bg-white/95 backdrop-blur-md shadow-md rounded-lg p-4 border border-primary/10 hover:border-primary/20 transition-all duration-300">
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg"
            >
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </motion.div>
          )}
          <MapControls
            selectingPickup={selectingPickup}
            selectingDrop={selectingDrop}
            onPickupClick={handlePickupClick}
            onDropClick={handleDropClick}
          />
        </Card>
      </motion.div>

      <AnimatePresence>
        {(pickupLocation || dropLocation) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mt-3 w-full"
          >
            <RouteStreetInfo
              pickupLocation={pickupLocation}
              dropLocation={dropLocation}
              pickupAddress={pickupAddress}
              dropAddress={dropAddress}
              isLoading={isLoading}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
