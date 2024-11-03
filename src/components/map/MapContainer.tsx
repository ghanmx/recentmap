import { MapContainer, TileLayer } from "react-leaflet";
import { DraggableMarker } from "./DraggableMarker";
import { RoutePolyline } from "./RoutePolyline";
import { MapControls } from "./MapControls";
import { BorderControls } from "./BorderControls";
import { MapLocationHandler } from "./MapLocationHandler";
import { enterpriseIcon, pickupIcon, dropIcon } from "@/utils/mapUtils";
import { COMPANY_LOCATION } from "@/services/routeService";
import { Marker, Popup } from "react-leaflet";
import { getAddressFromCoordinates } from "@/services/geocodingService";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapUpdater = ({ pickupLocation, dropLocation }: { 
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
}) => {
  const map = useMap();

  useEffect(() => {
    if (pickupLocation && dropLocation) {
      const bounds = [
        [pickupLocation.lat, pickupLocation.lng],
        [dropLocation.lat, dropLocation.lng]
      ];
      map.fitBounds(bounds);
    } else if (pickupLocation) {
      map.setView([pickupLocation.lat, pickupLocation.lng], 13);
    } else if (dropLocation) {
      map.setView([dropLocation.lat, dropLocation.lng], 13);
    }
  }, [map, pickupLocation, dropLocation]);

  return null;
};

interface MapContainerComponentProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  selectingPickup: boolean;
  selectingDrop: boolean;
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  setPickupLocation: (location: { lat: number; lng: number } | null) => void;
  setDropLocation: (location: { lat: number; lng: number } | null) => void;
  onRouteCalculated: (distance: number) => void;
}

export const MapContainerComponent = ({
  pickupLocation,
  dropLocation,
  selectingPickup,
  selectingDrop,
  onLocationSelect,
  setPickupLocation,
  setDropLocation,
  onRouteCalculated
}: MapContainerComponentProps) => {
  const handleLocationSelect = async (location: { lat: number; lng: number }) => {
    const address = await getAddressFromCoordinates(location.lat, location.lng);
    onLocationSelect({ ...location, address });
  };

  return (
    <MapContainer
      center={[25.6866, -100.3161]}
      zoom={13}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapLocationHandler
        selectingPickup={selectingPickup}
        selectingDrop={selectingDrop}
        handleLocationSelect={handleLocationSelect}
      />

      <MapUpdater pickupLocation={pickupLocation} dropLocation={dropLocation} />

      <Marker 
        position={[COMPANY_LOCATION.lat, COMPANY_LOCATION.lng]} 
        icon={enterpriseIcon}
      >
        <Popup>
          <div className="font-semibold">Empresa de Grúas</div>
          <div className="text-sm text-gray-600">Ubicación Principal</div>
        </Popup>
      </Marker>

      {pickupLocation && (
        <DraggableMarker
          position={[pickupLocation.lat, pickupLocation.lng]}
          onDragEnd={async (latlng) => {
            const location = { lat: latlng.lat, lng: latlng.lng };
            const address = await getAddressFromCoordinates(latlng.lat, latlng.lng);
            setPickupLocation(location);
            onLocationSelect({ ...location, address });
          }}
          icon={pickupIcon}
          label="Punto de Recogida"
        />
      )}

      {dropLocation && (
        <DraggableMarker
          position={[dropLocation.lat, dropLocation.lng]}
          onDragEnd={async (latlng) => {
            const location = { lat: latlng.lat, lng: latlng.lng };
            const address = await getAddressFromCoordinates(latlng.lat, latlng.lng);
            setDropLocation(location);
            onLocationSelect({ ...location, address });
          }}
          icon={dropIcon}
          label="Punto de Entrega"
        />
      )}

      {pickupLocation && dropLocation && (
        <RoutePolyline
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          onRouteCalculated={onRouteCalculated}
        />
      )}
    </MapContainer>
  );
};