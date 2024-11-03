import { MapContainer, TileLayer } from "react-leaflet";
import { DraggableMarker } from "./DraggableMarker";
import { RoutePolyline } from "./RoutePolyline";
import { MapControls } from "./MapControls";
import { BorderControls } from "./BorderControls";
import { MapLocationHandler } from "./MapLocationHandler";
import { useState } from "react";

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
  const handlePickupClick = () => {
    onLocationSelect({ lat: 0, lng: 0 }); // Default coordinates
  };

  const handleDropClick = () => {
    onLocationSelect({ lat: 0, lng: 0 }); // Default coordinates
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
        handleLocationSelect={onLocationSelect}
      />

      {pickupLocation && (
        <DraggableMarker
          position={pickupLocation}
          onDragEnd={setPickupLocation}
          icon={undefined}
          label="Pickup Location"
          draggable={true}
        />
      )}

      {dropLocation && (
        <DraggableMarker
          position={dropLocation}
          onDragEnd={setDropLocation}
          icon={undefined}
          label="Drop-off Location"
          draggable={true}
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
        onPickupClick={handlePickupClick}
        onDropClick={handleDropClick}
      />
      <BorderControls />
    </MapContainer>
  );
};