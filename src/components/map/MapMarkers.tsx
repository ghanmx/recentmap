import { DraggableMarker } from './DraggableMarker'
import { RoutePolyline } from './RoutePolyline'
import { MapLocationHandler } from './MapLocationHandler'
import { enterpriseIcon, pickupIcon, dropIcon } from '@/utils/mapUtils'
import { COMPANY_LOCATION } from '@/services/routeService'
import { Marker, Popup } from 'react-leaflet'
import { Location } from '@/types/location'

interface MapMarkersProps {
  pickupLocation: Location | null
  dropLocation: Location | null
  selectingPickup: boolean
  selectingDrop: boolean
  onLocationSelect: (location: Location) => void
  setPickupLocation: (location: Location | null) => void
  setDropLocation: (location: Location | null) => void
  onRouteCalculated: (distance: number) => void
}

export const MapMarkers = ({
  pickupLocation,
  dropLocation,
  selectingPickup,
  selectingDrop,
  onLocationSelect,
  setPickupLocation,
  setDropLocation,
  onRouteCalculated,
}: MapMarkersProps) => {
  return (
    <>
      <MapLocationHandler
        selectingPickup={selectingPickup}
        selectingDrop={selectingDrop}
        handleLocationSelect={onLocationSelect}
      />

      <Marker
        position={[COMPANY_LOCATION.lat, COMPANY_LOCATION.lng]}
        icon={enterpriseIcon}
      >
        <Popup className="rounded-lg shadow-lg">
          <div className="font-semibold">Empresa de Grúas</div>
          <div className="text-sm text-gray-600">Ubicación Principal</div>
        </Popup>
      </Marker>

      {pickupLocation && (
        <DraggableMarker
          position={[pickupLocation.lat, pickupLocation.lng]}
          onDragEnd={(latlng) => {
            const location = { lat: latlng.lat, lng: latlng.lng }
            setPickupLocation(location)
            onLocationSelect(location)
          }}
          icon={pickupIcon}
          label="Punto de Recogida"
          isPickup={true}
        />
      )}

      {dropLocation && (
        <DraggableMarker
          position={[dropLocation.lat, dropLocation.lng]}
          onDragEnd={(latlng) => {
            const location = { lat: latlng.lat, lng: latlng.lng }
            setDropLocation(location)
            onLocationSelect(location)
          }}
          icon={dropIcon}
          label="Punto de Entrega"
          isPickup={false}
        />
      )}

      {pickupLocation && dropLocation && (
        <RoutePolyline
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          onRouteCalculated={onRouteCalculated}
        />
      )}
    </>
  )
}
