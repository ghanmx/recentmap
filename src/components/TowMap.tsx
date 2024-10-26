import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from "react-leaflet";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { calculateTowingPrice } from "@/utils/priceCalculator";

// Fix Leaflet marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

// Enterprise locations
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

const DraggableMarker = ({ 
  position, 
  onDragEnd,
  icon,
  label
}: { 
  position: L.LatLngExpression; 
  onDragEnd: (latlng: L.LatLng) => void;
  icon?: L.Icon;
  label: string;
}) => {
  return (
    <Marker 
      position={position} 
      draggable={true}
      icon={icon}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          onDragEnd(marker.getLatLng());
        },
      }}
    >
      <Popup>
        <div className="font-semibold">{label}</div>
      </Popup>
    </Marker>
  );
};

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
  const [distance, setDistance] = useState(0);
  const [price, setPrice] = useState(0);
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

  const calculateDistanceAndPrice = () => {
    if (pickupLocation && dropLocation) {
      const R = 6371; // Earth's radius in km
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
  };

  useEffect(() => {
    calculateDistanceAndPrice();
  }, [pickupLocation, dropLocation]);

  const defaultCenter: L.LatLngTuple = [26.510272, -100.006323];
  
  const enterpriseIcon = new L.Icon({
    iconUrl: "/marker-icon-blue.png",
    iconRetinaUrl: "/marker-icon-2x-blue.png",
    shadowUrl: "/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const pickupIcon = new L.Icon({
    iconUrl: "/marker-icon-green.png",
    iconRetinaUrl: "/marker-icon-2x-green.png",
    shadowUrl: "/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const dropIcon = new L.Icon({
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
      
      <div className="relative">
        <div className="h-[500px] rounded-lg overflow-hidden border">
          <MapContainer
            center={defaultCenter}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker onLocationSelect={handleLocationSelect} />
            
            {ENTERPRISE_LOCATIONS.map((location, index) => (
              <Marker
                key={index}
                position={[location.lat, location.lng]}
                icon={enterpriseIcon}
              >
                <Popup>
                  <div className="font-semibold">{location.name}</div>
                  <div className="text-sm text-gray-600">Service Center</div>
                </Popup>
              </Marker>
            ))}

            {pickupLocation && (
              <DraggableMarker 
                position={[pickupLocation.lat, pickupLocation.lng]}
                onDragEnd={(latlng) => onPickupSelect({ lat: latlng.lat, lng: latlng.lng })}
                icon={pickupIcon}
                label="Pickup Location"
              />
            )}
            {dropLocation && (
              <DraggableMarker 
                position={[dropLocation.lat, dropLocation.lng]}
                onDragEnd={(latlng) => onDropSelect({ lat: latlng.lat, lng: latlng.lng })}
                icon={dropIcon}
                label="Drop-off Location"
              />
            )}
          </MapContainer>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg z-[1000] bg-opacity-90">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-semibold">Distance:</span> {distance.toFixed(2)} km
            </div>
            <div>
              <span className="font-semibold">Estimated Cost:</span> ${price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TowMap;
