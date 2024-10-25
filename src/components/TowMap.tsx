import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "./ui/button";

// Fix Leaflet marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

interface TowMapProps {
  onPickupSelect: (location: { lat: number; lng: number }) => void;
  onDropSelect: (location: { lat: number; lng: number }) => void;
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
}

const LocationMarker = ({ onLocationSelect }: { onLocationSelect: (location: { lat: number; lng: number }) => void }) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
};

const TowMap = ({ onPickupSelect, onDropSelect, pickupLocation, dropLocation }: TowMapProps) => {
  const [selectingPickup, setSelectingPickup] = useState(false);
  const [selectingDrop, setSelectingDrop] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    if (selectingPickup) {
      onPickupSelect(location);
      setSelectingPickup(false);
    } else if (selectingDrop) {
      onDropSelect(location);
      setSelectingDrop(false);
    }
  };

  useEffect(() => {
    if (mapRef.current && (pickupLocation || dropLocation)) {
      const bounds = L.latLngBounds([]);
      if (pickupLocation) bounds.extend([pickupLocation.lat, pickupLocation.lng]);
      if (dropLocation) bounds.extend([dropLocation.lat, dropLocation.lng]);
      if (!bounds.isEmpty()) mapRef.current.fitBounds(bounds);
    }
  }, [pickupLocation, dropLocation]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button 
          variant={selectingPickup ? "secondary" : "outline"}
          onClick={() => {
            setSelectingPickup(true);
            setSelectingDrop(false);
          }}
        >
          Select Pickup
        </Button>
        <Button 
          variant={selectingDrop ? "secondary" : "outline"}
          onClick={() => {
            setSelectingDrop(true);
            setSelectingPickup(false);
          }}
        >
          Select Drop-off
        </Button>
      </div>
      
      <div className="h-[500px] rounded-lg overflow-hidden border">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker onLocationSelect={handleLocationSelect} />
          {pickupLocation && (
            <Marker 
              position={[pickupLocation.lat, pickupLocation.lng]}
              icon={new L.Icon({
                iconUrl: "/marker-icon-green.png",
                iconRetinaUrl: "/marker-icon-2x-green.png",
                shadowUrl: "/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })}
            />
          )}
          {dropLocation && (
            <Marker 
              position={[dropLocation.lat, dropLocation.lng]}
              icon={new L.Icon({
                iconUrl: "/marker-icon-red.png",
                iconRetinaUrl: "/marker-icon-2x-red.png",
                shadowUrl: "/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default TowMap;