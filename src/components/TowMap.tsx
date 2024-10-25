import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Button } from "@/components/ui/button"; // Add Button import
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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
      if (!bounds.isValid()) {
        mapRef.current.setView(bounds.getCenter(), 13);
      } else {
        mapRef.current.fitBounds(bounds);
      }
    }
  }, [pickupLocation, dropLocation]);

  const defaultCenter: L.LatLngTuple = [51.505, -0.09];
  const greenIcon = new L.Icon({
    iconUrl: "/marker-icon-green.png",
    iconRetinaUrl: "/marker-icon-2x-green.png",
    shadowUrl: "/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const redIcon = new L.Icon({
    iconUrl: "/marker-icon-red.png",
    iconRetinaUrl: "/marker-icon-2x-red.png",
    shadowUrl: "/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

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
          center={defaultCenter}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          whenReady={(map) => {
            mapRef.current = map.target;
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker onLocationSelect={handleLocationSelect} />
          {pickupLocation && (
            <Marker 
              position={[pickupLocation.lat, pickupLocation.lng] as L.LatLngTuple}
              icon={greenIcon}
            />
          )}
          {dropLocation && (
            <Marker 
              position={[dropLocation.lat, dropLocation.lng] as L.LatLngTuple}
              icon={redIcon}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default TowMap;