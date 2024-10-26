import { DraggableMarker } from "./DraggableMarker";
import { enterpriseIcon, pickupIcon, dropIcon, arrivalIcon } from "./MarkerIcons";

interface MapMarkersProps {
  enterpriseLocations: Array<{ lat: number; lng: number; name: string }>;
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  arrivalLocation: { lat: number; lng: number } | null;
  onPickupSelect: (location: { lat: number; lng: number }) => void;
  onDropSelect: (location: { lat: number; lng: number }) => void;
}

export const MapMarkers = ({
  enterpriseLocations,
  pickupLocation,
  dropLocation,
  arrivalLocation,
  onPickupSelect,
  onDropSelect,
}: MapMarkersProps) => {
  return (
    <>
      {enterpriseLocations.map((location, index) => (
        <DraggableMarker
          key={index}
          position={[location.lat, location.lng]}
          onDragEnd={() => {}}
          icon={enterpriseIcon}
          label={location.name}
          draggable={false}
        />
      ))}

      {pickupLocation && (
        <DraggableMarker
          position={[pickupLocation.lat, pickupLocation.lng]}
          onDragEnd={(latlng) => onPickupSelect({ lat: latlng.lat, lng: latlng.lng })}
          icon={pickupIcon}
          label="Pickup Location"
          draggable={true}
        />
      )}

      {dropLocation && (
        <DraggableMarker
          position={[dropLocation.lat, dropLocation.lng]}
          onDragEnd={(latlng) => onDropSelect({ lat: latlng.lat, lng: latlng.lng })}
          icon={dropIcon}
          label="Drop-off Location"
          draggable={true}
        />
      )}

      {arrivalLocation && (
        <DraggableMarker
          position={[arrivalLocation.lat, arrivalLocation.lng]}
          onDragEnd={() => {}}
          icon={arrivalIcon}
          label="Service Arrival"
          draggable={false}
        />
      )}
    </>
  );
};