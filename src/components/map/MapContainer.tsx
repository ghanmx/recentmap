import { MapContainer, TileLayer } from 'react-leaflet'
import { Map } from 'leaflet'
import { MutableRefObject, useState } from 'react'
import { MapMarkers } from './MapMarkers'
import { MapUpdater } from './MapUpdater'
import { UserLocationMarker } from './UserLocationMarker'
import { UserLocationControl } from './UserLocationControl'
import { motion } from 'framer-motion'
import { Location } from '@/types/location'

interface MapContainerComponentProps {
  pickupLocation: Location | null
  dropLocation: Location | null
  selectingPickup: boolean
  selectingDrop: boolean
  onLocationSelect: (location: Location) => void
  setPickupLocation: (location: Location | null) => void
  setDropLocation: (location: Location | null) => void
  onRouteCalculated: (distance: number) => void
  isLoading?: boolean
  mapRef?: MutableRefObject<Map | null>
}

export const MapContainerComponent = ({
  pickupLocation,
  dropLocation,
  selectingPickup,
  selectingDrop,
  onLocationSelect,
  setPickupLocation,
  setDropLocation,
  onRouteCalculated,
  isLoading = false,
  mapRef,
}: MapContainerComponentProps) => {
  const [showUserLocation, setShowUserLocation] = useState(false)
  const defaultPosition: [number, number] = [25.6866, -100.3161]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full rounded-lg overflow-hidden shadow-lg relative"
    >
      <MapContainer
        center={defaultPosition}
        zoom={13}
        className="w-full h-full"
        zoomControl={false}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="brightness-95"
        />

        <MapMarkers
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          selectingPickup={selectingPickup}
          selectingDrop={selectingDrop}
          onLocationSelect={onLocationSelect}
          setPickupLocation={setPickupLocation}
          setDropLocation={setDropLocation}
          onRouteCalculated={onRouteCalculated}
        />

        <MapUpdater
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
        />

        <UserLocationMarker visible={showUserLocation} />

        <div className="absolute bottom-5 right-5 z-[1000]">
          <UserLocationControl
            visible={showUserLocation}
            onToggle={() => setShowUserLocation(!showUserLocation)}
          />
        </div>
      </MapContainer>
    </motion.div>
  )
}