import { MapContainer, TileLayer } from "react-leaflet";
import { DraggableMarker } from "./DraggableMarker";
import { RoutePolyline } from "./RoutePolyline";
import { MapControls } from "./MapControls";
import { BorderControls } from "./BorderControls";
import { MapLocationHandler } from "./MapLocationHandler";

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
        onLocationSelect={onLocationSelect}
      />

      {pickupLocation && (
        <DraggableMarker
          position={pickupLocation}
          onDragEnd={setPickupLocation}
          type="pickup"
        />
      )}

      {dropLocation && (
        <DraggableMarker
          position={dropLocation}
          onDragEnd={setDropLocation}
          type="drop"
        />
      )}

      {pickupLocation && dropLocation && (
        <RoutePolyline
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          onRouteCalculated={onRouteCalculated}
        />
      )}

      <MapControls />
      <BorderControls />
    </MapContainer>
  );
};