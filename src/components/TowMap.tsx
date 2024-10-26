import { useRef, useCallback, useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { LocationMarker } from "./map/LocationMarker";
import { DraggableMarker } from "./map/DraggableMarker";
import { MapControls } from "./map/MapControls";
import { BorderControls } from "./map/BorderControls";
import { RouteStreetInfo } from "./map/RouteStreetInfo";
import { useToast } from "@/components/ui/use-toast";
import PaymentWindow from "./payment/PaymentWindow";
import { Button } from "@/components/ui/button";
import { RouteDisplay } from "./map/RouteDisplay";
import { calculateTowingPrice } from "@/utils/priceCalculator";
import { TopNavMenu } from "./navigation/TopNavMenu";

const enterpriseIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const pickupIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const dropIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ENTERPRISE_LOCATIONS = [
  { lat: 26.510272, lng: -100.006323, name: "Main Service Center" },
];

const TowMap = ({ onPickupSelect, onDropSelect, pickupLocation, dropLocation }: TowMapProps) => {
  const [selectingPickup, setSelectingPickup] = useState(false);
  const [selectingDrop, setSelectingDrop] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
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

  const handlePaymentSubmit = (result: { success: boolean; error?: string }) => {
    if (result.success) {
      toast({
        title: "Success",
        description: "Your tow truck request has been confirmed!",
      });
    }
  };

  useEffect(() => {
    const updatePrice = async () => {
      if (pickupLocation && dropLocation) {
        try {
          const result = await calculateTowingPrice(
            { lat: 26.510272, lng: -100.006323 },
            pickupLocation,
            dropLocation,
            'Toyota Corolla',
            false
          );
          setTotalCost(result.totalPrice);
        } catch (error) {
          console.error('Error calculating price:', error);
        }
      }
    };

    updatePrice();
  }, [pickupLocation, dropLocation]);

  return (
    <div className="fixed inset-0">
      <div className="absolute inset-x-0 top-0 z-[1000] bg-white/95 shadow-md backdrop-blur-sm">
        <TopNavMenu />
      </div>

      <div className="absolute inset-x-0 top-16 z-[1000] px-4 flex flex-col items-center gap-4 pointer-events-none">
        <div className="w-full max-w-md pointer-events-auto">
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
        </div>
        
        {(pickupLocation || dropLocation) && (
          <div className="w-full max-w-md pointer-events-auto">
            <RouteStreetInfo 
              pickupLocation={pickupLocation}
              dropLocation={dropLocation}
            />
          </div>
        )}
      </div>

      <MapContainer
        center={[ENTERPRISE_LOCATIONS[0].lat, ENTERPRISE_LOCATIONS[0].lng]}
        zoom={13}
        style={{ height: "100vh", width: "100vw" }}
        ref={mapRef}
        className="z-0"
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
      </MapContainer>

      <div className="absolute inset-x-0 bottom-4 z-[1000] px-4">
        <div className="max-w-xl mx-auto space-y-4">
          <RouteDisplay pickupLocation={pickupLocation} dropLocation={dropLocation} />
          {pickupLocation && dropLocation && (
            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 
                         hover:to-blue-700 text-white shadow-lg hover:shadow-xl 
                         transition-all duration-300 transform hover:-translate-y-1 
                         active:translate-y-0 animate-pulse-slow"
              onClick={() => setShowPayment(true)}
            >
              Request Tow Truck
            </Button>
          )}
        </div>
      </div>

      <PaymentWindow
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onPaymentSubmit={handlePaymentSubmit}
        totalCost={totalCost}
      />
    </div>
  );
};

export default TowMap;
