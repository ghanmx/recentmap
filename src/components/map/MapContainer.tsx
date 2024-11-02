import { useRef, useState, useEffect } from "react";
import { MapContainer as LeafletMapContainer, TileLayer, useMap } from "react-leaflet";
import { DraggableMarker } from "./DraggableMarker";
import { RoutePolyline } from "./RoutePolyline";
import { ENTERPRISE_LOCATIONS, enterpriseIcon, pickupIcon, dropIcon } from "@/utils/mapUtils";
import { LocationMarker } from "./LocationMarker";
import { useToast } from "@/hooks/use-toast";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Initialize Leaflet default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const UserLocationMarker = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMap();
  const { toast } = useToast();
  const locationHandlerRef = useRef<((e: L.LocationEvent) => void) | null>(null);

  useEffect(() => {
    let isMounted = true;

    const handleLocationFound = (e: L.LocationEvent) => {
      if (isMounted) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        map.flyTo(e.latlng, map.getZoom());
        toast({
          title: "Location found",
          description: "Your current location has been detected",
        });
      }
    };

    locationHandlerRef.current = handleLocationFound;
    map.on("locationfound", locationHandlerRef.current);
    map.locate();

    return () => {
      isMounted = false;
      if (locationHandlerRef.current) {
        map.off("locationfound", locationHandlerRef.current);
      }
    };
  }, [map, toast]);

  if (!position) return null;

  return (
    <DraggableMarker
      position={position}
      onDragEnd={() => {}}
      label="Your Location"
      draggable={false}
    />
  );
};

interface MapContainerProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  selectingPickup: boolean;
  selectingDrop: boolean;
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  setPickupLocation: (location: { lat: number; lng: number }) => void;
  setDropLocation: (location: { lat: number; lng: number }) => void;
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
  onRouteCalculated,
}: MapContainerProps) => {
  const mapRef = useRef<L.Map | null>(null);

  return (
    <LeafletMapContainer
      center={[ENTERPRISE_LOCATIONS[0].lat, ENTERPRISE_LOCATIONS[0].lng]}
      zoom={13}
      style={{ height: "100vh", width: "100vw" }}
      className="z-10"
      whenReady={(map) => {
        mapRef.current = map.target;
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      <UserLocationMarker />
      
      <LocationMarker
        onLocationSelect={onLocationSelect}
        selectingPickup={selectingPickup}
        selectingDrop={selectingDrop}
      />
      
      {ENTERPRISE_LOCATIONS.map((location, index) => (
        <DraggableMarker
          key={`enterprise-${index}`}
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
          onDragEnd={(latlng) => setPickupLocation({ lat: latlng.lat, lng: latlng.lng })}
          icon={pickupIcon}
          label="Pickup Location"
        />
      )}

      {dropLocation && (
        <DraggableMarker
          position={[dropLocation.lat, dropLocation.lng]}
          onDragEnd={(latlng) => setDropLocation({ lat: latlng.lat, lng: latlng.lng })}
          icon={dropIcon}
          label="Drop-off Location"
        />
      )}

      {pickupLocation && dropLocation && (
        <RoutePolyline
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          onRouteCalculated={onRouteCalculated}
        />
      )}
    </LeafletMapContainer>
  );
};