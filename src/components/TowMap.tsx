import { useEffect, useRef, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { calculateTowingPrice } from "@/utils/priceCalculator";
import { LocationMarker } from "./map/LocationMarker";
import { DraggableMarker } from "./map/DraggableMarker";
import { MapControls } from "./map/MapControls";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Navigation, Maximize2, Minimize2 } from "lucide-react";

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
  const [isExpanded, setIsExpanded] = useState(false);
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

  const toggleMapSize = () => {
    setIsExpanded(!isExpanded);
    setTimeout(() => {
      mapRef.current?.invalidateSize();
    }, 100);
  };

  useEffect(() => {
    calculateDistanceAndPrice();
    
    // Center map on markers when they're both set
    if (mapRef.current && pickupLocation && dropLocation) {
      const bounds = L.latLngBounds(
        [pickupLocation.lat, pickupLocation.lng],
        [dropLocation.lat, dropLocation.lng]
      );
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [pickupLocation, dropLocation, calculateDistanceAndPrice]);

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
      <div className="flex justify-between items-center">
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
        <button
          onClick={toggleMapSize}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          {isExpanded ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
      </div>
      
      <div className="relative">
        <div className={`transition-all duration-300 rounded-lg overflow-hidden border relative ${
          isExpanded ? 'fixed top-4 left-4 right-4 bottom-4 z-50' : 'h-[500px]'
        }`}>
          <MapContainer
            center={[26.510272, -100.006323]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker onLocationSelect={handleLocationSelect} />
            
            {/* Hidden border controls */}
            <div className="absolute inset-0 pointer-events-none">
              <button 
                className="absolute top-0 left-0 w-full h-8 opacity-0 cursor-n-resize pointer-events-auto"
                onClick={() => mapRef.current?.panBy([0, -50])}
              />
              <button 
                className="absolute bottom-0 left-0 w-full h-8 opacity-0 cursor-s-resize pointer-events-auto"
                onClick={() => mapRef.current?.panBy([0, 50])}
              />
              <button 
                className="absolute top-0 left-0 h-full w-8 opacity-0 cursor-w-resize pointer-events-auto"
                onClick={() => mapRef.current?.panBy([-50, 0])}
              />
              <button 
                className="absolute top-0 right-0 h-full w-8 opacity-0 cursor-e-resize pointer-events-auto"
                onClick={() => mapRef.current?.panBy([50, 0])}
              />
            </div>
            
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
        
        <div className={`absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg z-[1000] bg-opacity-90 ${
          isExpanded ? 'mb-4' : ''
        }`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MapPin className="text-green-500" />
              <span className="font-semibold">Distance:</span> {distance.toFixed(2)} km
            </div>
            <div className="flex items-center gap-2">
              <Navigation className="text-primary" />
              <span className="font-semibold">Estimated Cost:</span> ${price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TowMap;
