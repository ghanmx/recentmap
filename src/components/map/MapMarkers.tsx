import { DraggableMarker } from './DraggableMarker'
import { RoutePolyline } from './RoutePolyline'
import { MapLocationHandler } from './MapLocationHandler'
import { enterpriseIcon, pickupIcon, dropIcon } from '@/utils/mapUtils'
import { COMPANY_LOCATION } from '@/services/routeService'
import { Marker, Popup } from 'react-leaflet'
import { Location } from '@/types/location'
import { useToast } from '@/hooks/use-toast'
import { TowingProvider } from '@/contexts/TowingContext'

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
  const { toast } = useToast()

  const handlePickupDragEnd = (latlng: L.LatLng) => {
    const location = { lat: latlng.lat, lng: latlng.lng }
    setPickupLocation(location)
    onLocationSelect(location)
    toast({
      title: 'Punto de recogida actualizado',
      description: 'La ubicación de recogida ha sido actualizada',
    })
  }

  const handleDropDragEnd = (latlng: L.LatLng) => {
    const location = { lat: latlng.lat, lng: latlng.lng }
    setDropLocation(location)
    onLocationSelect(location)
    toast({
      title: 'Punto de entrega actualizado',
      description: 'La ubicación de entrega ha sido actualizada',
    })
  }

  return (
    <>
      <MapLocationHandler
        onLocationSelect={onLocationSelect}
        selectingPickup={selectingPickup}
        selectingDrop={selectingDrop}
      />

      <Marker position={[COMPANY_LOCATION.lat, COMPANY_LOCATION.lng]} icon={enterpriseIcon}>
        <Popup className="rounded-lg shadow-lg">
          <div className="font-semibold">Empresa de Grúas</div>
          <div className="text-sm text-gray-600">Ubicación Principal</div>
        </Popup>
      </Marker>

      {pickupLocation && (
        <DraggableMarker
          position={[pickupLocation.lat, pickupLocation.lng]}
          onDragEnd={handlePickupDragEnd}
          icon={pickupIcon}
          label="Punto de Recogida"
          isPickup={true}
        />
      )}

      {dropLocation && (
        <DraggableMarker
          position={[dropLocation.lat, dropLocation.lng]}
          onDragEnd={handleDropDragEnd}
          icon={dropIcon}
          label="Punto de Entrega"
          isPickup={false}
        />
      )}

      {pickupLocation && dropLocation && (
        <TowingProvider>
          <RoutePolyline
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
            onRouteCalculated={onRouteCalculated}
          />
        </TowingProvider>
      )}
    </>
  )
}