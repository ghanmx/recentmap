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

  return (
    <div className="px-4 sm:px-6 flex flex-col items-center gap-6 pointer-events-auto max-w-3xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Card className="relative w-full bg-white/95 backdrop-blur-sm shadow-lg rounded-xl p-4 sm:p-6 border-blue-100/50 hover:shadow-xl transition-all duration-300">
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50 rounded-xl"
            >
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </motion.div>
          )}
          <MapControls 
            selectingPickup={selectingPickup}
            selectingDrop={selectingDrop}
            onPickupClick={() => {
              setSelectingPickup(true)
              setSelectingDrop(false)
              showLocationNotification('pickup', { lat: 0, lng: 0 })
              toast({
                title: 'Seleccionando punto de recogida',
                description:
                  'Haz clic en el mapa para seleccionar el punto de recogida',
              })
            }}
            onDropClick={() => {
              setSelectingDrop(true)
              setSelectingPickup(false)
              showLocationNotification('drop', { lat: 0, lng: 0 })
              toast({
                title: 'Seleccionando punto de entrega',
                description:
                  'Haz clic en el mapa para seleccionar el punto de entrega',
              })
            }}
          />
        </Card>
      </motion.div>
      
      <AnimatePresence>
        {(pickupLocation || dropLocation) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full"
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