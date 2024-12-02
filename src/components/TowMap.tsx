import { useRef } from 'react'
import { Map } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainerComponent } from './map/MapContainer'
import { MapControlPanel } from '@/features/map/components/MapControlPanel'
import { useToast } from '@/hooks/use-toast'
import { detectTollsOnRoute } from '@/utils/tollCalculator'
import { useTowing } from '@/contexts/TowingContext'
import { motion } from 'framer-motion'
import { FloatingQuestionsPanel } from './FloatingQuestionsPanel'
import { useMapState } from '@/features/map/hooks/useMapState'
import { Location } from '@/types/location'
import { getAddressFromCoordinates } from '@/services/geocodingService'

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
      const address = await getAddressFromCoordinates(
        location.lat,
        location.lng,
      )
      const locationWithAddress = { ...location }
      handleMapLocationSelect(
        locationWithAddress,
        selectingPickup ? 'pickup' : 'drop',
      )
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
      className="relative h-screen w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
    </motion.div>
  )
}

export default TowMap
