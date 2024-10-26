import { useEffect, useRef, useCallback, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { calculateTowingPrice } from "@/utils/priceCalculator";
import { LocationMarker } from "./map/LocationMarker";
import { DraggableMarker } from "./map/DraggableMarker";
import { MapControls } from "./map/MapControls";
import { BorderControls } from "./map/BorderControls";
import { FloatingPanel } from "./map/FloatingPanel";
import { MapMetrics } from "./map/MapMetrics";
import { useToast } from "@/components/ui/use-toast";

// Fix Leaflet marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

const ENTERPRISE_LOCATIONS = [
  { lat: 26.510272, lng: -100.006323, name: "Main Service Center" },
  { lat: 26.512272, lng: -100.008323, name: "Secondary Service Point" },
];

interface TowMapProps {
  onPickupSelect: (location: { lat: number; lng: number }) => void;
  onDropSelect: (location: { lat: number; lng: number }) => void;
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
}

const TowMap = ({ onPickupSelect, onDropSelect, pickupLocation, dropLocation }: TowMapProps) => {
  const [selectingPickup, setSelectingPickup] = useState(false);
  const [selectingDrop, setSelectingDrop] = useState(false);
  const [distance, setDistance] = useState(0);
  const [price, setPrice] = useState(0);
  const mapRef = useRef<L.Map | null>(null);
  const { toast } = useToast();

  const handleLocationSelect = useCallback((location: { lat: number; lng: number }) => {
    if (selectingPickup) {
      onPickupSelect(location);
      setSelectingPickup(false);
      toast({
        title: "Pickup Location Set",
        description: "Click and drag the marker to adjust the location",
      });
    } else if (selectingDrop) {
      onDropSelect(location);
      setSelectingDrop(false);
      toast({
        title: "Drop-off Location Set",
        description: "Click and drag the marker to adjust the location",
      });
    }
  }, [selectingPickup, selectingDrop, onPickupSelect, onDropSelect, toast]);

  const calculateDistanceAndPrice = useCallback(() => {
    if (pickupLocation && dropLocation) {
      const R = 6371;
      const dLat = (dropLocation.lat - pickupLocation.lat) * Math.PI / 180;
      const dLon = (dropLocation.lng - pickupLocation.lng) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(pickupLocation.lat * Math.PI / 180) * Math.cos(dropLocation.lat * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const dist = R * c;
      setDistance(dist);
      setPrice(calculateTowingPrice(pickupLocation, dropLocation, 'standard'));
    }
  }, [pickupLocation, dropLocation]);

  useEffect(() => {
    calculateDistanceAndPrice();
    
    if (mapRef.current && pickupLocation && dropLocation) {
      const bounds = L.latLngBounds(
        [pickupLocation.lat, pickupLocation.lng],
        [dropLocation.lat, dropLocation.lng]
      );
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [pickupLocation, dropLocation, calculateDistanceAndPrice]);

  return (
    <div className="fixed inset-0">
      <FloatingPanel position="top" className="max-w-md mx-auto">
        <MapControls 
          selectingPickup={selectingPickup}
          selectingDrop={selectingDrop}
          onPickupClick={() => {
            setSelectingPickup(true);
            setSelectingDrop(false);
            toast({
              title: "Select Pickup Location",
              description: "Click on the map to set pickup location",
            });
          }}
          onDropClick={() => {
            setSelectingDrop(true);
            setSelectingPickup(false);
            toast({
              title: "Select Drop-off Location",
              description: "Click on the map to set drop-off location",
            });
          }}
        />
      </FloatingPanel>

      <MapContainer
        center={[26.510272, -100.006323]}
        zoom={13}
        style={{ height: "100vh", width: "100vw" }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker onLocationSelect={handleLocationSelect} />
        <BorderControls />
        
        {ENTERPRISE_LOCATIONS.map((location, index) => (
          <DraggableMarker
            key={index}
            position={[location.lat, location.lng]}
            onDragEnd={() => {}}
            label={location.name}
          />
        ))}

        {pickupLocation && (
          <DraggableMarker 
            position={[pickupLocation.lat, pickupLocation.lng]}
            onDragEnd={(latlng) => onPickupSelect({ lat: latlng.lat, lng: latlng.lng })}
            label="Pickup Location"
          />
        )}
        {dropLocation && (
          <DraggableMarker 
            position={[dropLocation.lat, dropLocation.lng]}
            onDragEnd={(latlng) => onDropSelect({ lat: latlng.lat, lng: latlng.lng })}
            label="Drop-off Location"
          />
        )}
      </MapContainer>

      <FloatingPanel position="bottom" className="max-w-xl mx-auto">
        <MapMetrics distance={distance} price={price} />
      </FloatingPanel>
    </div>
  );
};

export default TowMap;