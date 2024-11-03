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

interface MapContainerComponentProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  selectingPickup: boolean;
  selectingDrop: boolean;
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
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

      <MapControls 
        selectingPickup={selectingPickup}
        selectingDrop={selectingDrop}
        onPickupClick={() => onLocationSelect({ lat: 0, lng: 0, address: "" })}
        onDropClick={() => onLocationSelect({ lat: 0, lng: 0, address: "" })}
      />
      <BorderControls />
    </MapContainer>
  );
};