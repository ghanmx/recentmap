import { useState, useRef, useCallback } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Map } from 'leaflet'
import { MapControlPanel } from './map/MapControlPanel'
import { MapMarkers } from './map/MapMarkers'
import { MapUpdater } from './map/MapUpdater'
import { UserLocationMarker } from './map/UserLocationMarker'
import { motion } from 'framer-motion'
import { useToast } from './ui/use-toast'
import { useTowing } from '@/contexts/TowingContext'
import { Location } from '@/types/location'
import 'leaflet/dist/leaflet.css'

const TowMap = () => {
  const mapRef = useRef<Map | null>(null)
  const [selectingPickup, setSelectingPickup] = useState(false)
  const [selectingDrop, setSelectingDrop] = useState(false)
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null)
  const [dropLocation, setDropLocation] = useState<Location | null>(null)
  const [pickupAddress, setPickupAddress] = useState<string>('')
  const [dropAddress, setDropAddress] = useState<string>('')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showUserLocation, setShowUserLocation] = useState(true)
  const [isPanelVisible, setIsPanelVisible] = useState(true)
  const { toast } = useToast()
  const { updateTowingInfo } = useTowing()

  const handleLocationSelect = useCallback((location: Location) => {
    if (selectingPickup) {
      setPickupLocation(location)
      setPickupAddress(location.address || '')
      setSelectingPickup(false)
      toast({
        title: 'Punto de recogida seleccionado',
        description: location.address,
      })
    } else if (selectingDrop) {
      setDropLocation(location)
      setDropAddress(location.address || '')
      setSelectingDrop(false)
      toast({
        title: 'Punto de entrega seleccionado',
        description: location.address,
      })
    }
  }, [selectingPickup, selectingDrop, toast])

  const handleRouteCalculated = useCallback((distance: number) => {
    updateTowingInfo(distance)
  }, [updateTowingInfo])

  const handleReset = useCallback(() => {
    setPickupLocation(null)
    setDropLocation(null)
    setPickupAddress('')
    setDropAddress('')
    setSelectingPickup(false)
    setSelectingDrop(false)
    if (mapRef.current) {
      mapRef.current.setView([25.6866, -100.3161], 13)
    }
  }, [])

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev)
  }, [])

  const togglePanel = useCallback(() => {
    setIsPanelVisible(prev => !prev)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        'relative w-full',
        isFullscreen ? 'h-screen fixed inset-0 z-50' : 'h-[calc(100vh-4rem)]',
        'rounded-xl overflow-hidden'
      )}
    >
      <MapControlPanel
        selectingPickup={selectingPickup}
        selectingDrop={selectingDrop}
        setSelectingPickup={setSelectingPickup}
        setSelectingDrop={setSelectingDrop}
        pickupLocation={pickupLocation}
        dropLocation={dropLocation}
        pickupAddress={pickupAddress}
        dropAddress={dropAddress}
        onReset={handleReset}
        onToggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
        onTogglePanel={togglePanel}
        isPanelVisible={isPanelVisible}
      />

      <MapContainer
        center={[25.6866, -100.3161]}
        zoom={13}
        className="w-full h-full"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapMarkers
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          selectingPickup={selectingPickup}
          selectingDrop={selectingDrop}
          onLocationSelect={handleLocationSelect}
          setPickupLocation={setPickupLocation}
          setDropLocation={setDropLocation}
          onRouteCalculated={handleRouteCalculated}
        />

        <MapUpdater
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
        />

        <UserLocationMarker visible={showUserLocation} />
      </MapContainer>
    </motion.div>
  )
}

export default TowMap