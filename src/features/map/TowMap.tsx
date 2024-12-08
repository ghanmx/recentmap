import { useRef } from 'react'
import { Map } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainerComponent } from '@/components/map/MapContainer'
import { MapControlPanel } from './components/MapControlPanel'
import { useToast } from '@/hooks/use-toast'
import { detectTollsOnRoute } from '@/utils/tollCalculator'
import { useTowing } from '@/contexts/TowingContext'
import { motion, AnimatePresence } from 'framer-motion'
import { FloatingQuestionsPanel } from '@/components/FloatingQuestionsPanel'
import { useMapState } from './hooks/useMapState'
import { Location } from '@/types/location'
import { getAddressFromCoords } from '@/services/geocodingService'
import { MapLoadingOverlay } from './components/MapLoadingOverlay'
import { LocationSelectionHint } from './components/LocationSelectionHint'

const TowMap = () => {
  const mapRef = useRef<Map | null>(null)
  const { toast } = useToast()
  const { updateTollInfo } = useTowing()
  const {
    pickupLocation,
    dropLocation,
    pickupAddress,
    dropAddress,
    selectingPickup,
    selectingDrop,
    isLoading,
    setSelectingPickup,
    setSelectingDrop,
    handleLocationSelect: handleMapLocationSelect,
  } = useMapState()

  const handleTollDetection = async () => {
    if (pickupLocation && dropLocation) {
      try {
        const tollInfo = await detectTollsOnRoute(pickupLocation, dropLocation)
        updateTollInfo(tollInfo.tolls, tollInfo.totalTollCost)

        if (tollInfo.tolls.length > 0) {
          toast({
            title: 'Peajes Detectados',
            description: `Se detectaron ${tollInfo.tolls.length} peajes en la ruta con un costo total de $${tollInfo.totalTollCost}`,
            className: 'bg-blue-50 border-blue-200 text-blue-800',
          })
        }
      } catch (error) {
        console.error('Error detecting tolls:', error)
        toast({
          title: 'Error',
          description: 'No se pudieron detectar los peajes en la ruta',
          variant: 'destructive',
        })
      }
    }
  }

  const handleLocationSelect = async (location: Location) => {
    try {
      const address = await getAddressFromCoords(location.lat, location.lng)
      
      if (selectingPickup) {
        handleMapLocationSelect({ ...location, address }, 'pickup')
        setSelectingPickup(false)
        toast({
          title: 'Punto de Recogida Actualizado',
          description: address,
          className: 'bg-green-50 border-green-200 text-green-800',
        })
      } else if (selectingDrop) {
        handleMapLocationSelect({ ...location, address }, 'drop')
        setSelectingDrop(false)
        toast({
          title: 'Punto de Entrega Actualizado',
          description: address,
          className: 'bg-blue-50 border-blue-200 text-blue-800',
        })
      }
    } catch (error) {
      console.error('Error getting address:', error)
      toast({
        title: 'Error',
        description: 'No se pudo obtener la dirección',
        variant: 'destructive',
      })
    }
  }

  return (
    <motion.div
      className="relative h-screen w-full bg-gradient-to-br from-blue-50/50 via-white to-blue-50/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        <MapLoadingOverlay isVisible={isLoading} />
      </AnimatePresence>

      <div className="absolute inset-0 z-0">
        <MapContainerComponent
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          selectingPickup={selectingPickup}
          selectingDrop={selectingDrop}
          onLocationSelect={handleLocationSelect}
          setPickupLocation={(location: Location | null) =>
            location && handleLocationSelect(location)
          }
          setDropLocation={(location: Location | null) =>
            location && handleLocationSelect(location)
          }
          isLoading={isLoading}
          mapRef={mapRef}
          onRouteCalculated={handleTollDetection}
        />
      </div>

      <MapControlPanel
        selectingPickup={selectingPickup}
        selectingDrop={selectingDrop}
        setSelectingPickup={setSelectingPickup}
        setSelectingDrop={setSelectingDrop}
        pickupLocation={pickupLocation}
        dropLocation={dropLocation}
        pickupAddress={pickupAddress}
        dropAddress={dropAddress}
        isLoading={isLoading}
      />

      <FloatingQuestionsPanel
        pickupLocation={pickupLocation}
        dropLocation={dropLocation}
        pickupAddress={pickupAddress}
        dropAddress={dropAddress}
        onPickupSelect={(location: Location) => handleLocationSelect(location)}
        onDropSelect={(location: Location) => handleLocationSelect(location)}
        onSelectingPickup={() => setSelectingPickup(true)}
        onSelectingDrop={() => setSelectingDrop(true)}
      />

      <LocationSelectionHint
        isSelectingPickup={selectingPickup}
        isSelectingDrop={selectingDrop}
      />
    </motion.div>
  )
}

export default TowMap