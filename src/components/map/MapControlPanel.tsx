import { RouteStreetInfo } from '@/features/map/components/RouteStreetInfo'
import { MapControls } from './MapControls'
import { useToast } from '@/hooks/use-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { useMapNotifications } from '@/features/map/hooks/useMapNotifications'
import { Location } from '@/types/location'

interface MapControlPanelProps {
  selectingPickup: boolean
  selectingDrop: boolean
  setSelectingPickup: (value: boolean) => void
  setSelectingDrop: (value: boolean) => void
  pickupLocation: Location | null
  dropLocation: Location | null
  pickupAddress?: string
  dropAddress?: string
  isLoading?: boolean
  className?: string
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
  const { showLocationSelectionNotification } = useMapNotifications()

  const handlePickupClick = () => {
    setSelectingPickup(true)
    setSelectingDrop(false)
    showLocationSelectionNotification('pickup')
  }

  const handleDropClick = () => {
    setSelectingDrop(true)
    setSelectingPickup(false)
    showLocationSelectionNotification('drop')
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