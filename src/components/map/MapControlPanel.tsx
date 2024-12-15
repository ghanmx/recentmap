import { MapControls } from './MapControls'
import { RouteStreetInfo } from './RouteStreetInfo'
import { useToast } from '@/hooks/use-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Loader2, Maximize2, Minimize2, RefreshCw } from 'lucide-react'
import { useMapNotifications } from '@/features/map/hooks/useMapNotifications'
import { Button } from '@/components/ui/button'

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
  onReset?: () => void
  onToggleFullscreen?: () => void
  isFullscreen?: boolean
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
  onReset,
  onToggleFullscreen,
  isFullscreen,
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
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-3 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Card className="relative w-full bg-white/95 backdrop-blur-xl shadow-lg rounded-lg p-3 sm:p-4 border-2 border-primary/20 hover:border-primary/30 transition-all duration-300">
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
          
          <div className="flex items-center justify-between mb-4">
            <MapControls
              selectingPickup={selectingPickup}
              selectingDrop={selectingDrop}
              onPickupClick={handlePickupClick}
              onDropClick={handleDropClick}
            />
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={onReset}
                className="hover:bg-primary/5"
                title="Reset Map"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={onToggleFullscreen}
                className="hover:bg-primary/5"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
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