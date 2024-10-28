import { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { DraggableMarker } from "./map/DraggableMarker";
import { LocationMarker } from "./map/LocationMarker";
import PaymentWindow from "./payment/PaymentWindow";
import { RoutePolyline } from "./map/RoutePolyline";
import { calculateTowingPrice } from "@/utils/priceCalculator";
import { showRouteNotification, showPaymentNotification } from "@/utils/notificationUtils";
import VehicleForm from "./VehicleForm";
import { FloatingPanel } from "./map/FloatingPanel";
import { MapControlPanel } from "./map/MapControlPanel";
import { MapHeader } from "./map/MapHeader";
import { MapBottomControls } from "./map/MapBottomControls";
import { useToast } from "@/hooks/use-toast";

const ENTERPRISE_LOCATIONS = [
  { lat: 26.510272, lng: -100.006323, name: "Main Service Center" },
];

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

const TowMap = () => {
  const [pickupLocation, setPickupLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [dropLocation, setDropLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectingPickup, setSelectingPickup] = useState(false);
  const [selectingDrop, setSelectingDrop] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const { toast } = useToast();

  const validateLocations = () => {
    if (!pickupLocation || !dropLocation) {
      toast({
        title: "Missing Locations",
        description: "Please select both pickup and drop-off locations before proceeding",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleRouteCalculated = (distance: number) => {
    showRouteNotification(distance);
  };

  const handlePaymentSubmit = (result: { success: boolean; error?: string }) => {
    showPaymentNotification(result.success, result.error);
    if (result.success) {
      setIsPaymentComplete(true);
    }
  };

  const handleRequestTow = () => {
    if (!validateLocations()) return;
    
    if (isPaymentComplete) {
      toast({
        title: "Payment Already Completed",
        description: "Your tow truck request is already being processed",
      });
      return;
    }
    
    setShowPayment(true);
  };

  useEffect(() => {
    const updatePrice = async () => {
      if (pickupLocation && dropLocation) {
        try {
          const result = await calculateTowingPrice(
            pickupLocation,
            dropLocation,
            'Toyota Corolla'
          );
          setTotalCost(result.totalPrice);
        } catch (error) {
          console.error('Error calculating price:', error);
          toast({
            title: "Price Calculation Error",
            description: "Unable to calculate price. Please try again.",
            variant: "destructive",
          });
        }
      }
    };

    updatePrice();
  }, [pickupLocation, dropLocation]);

  return (
    <div className="relative h-screen overflow-hidden">
      <MapHeader />
      
      <MapControlPanel
        selectingPickup={selectingPickup}
        selectingDrop={selectingDrop}
        setSelectingPickup={setSelectingPickup}
        setSelectingDrop={setSelectingDrop}
        pickupLocation={pickupLocation}
        dropLocation={dropLocation}
      />

      <MapContainer
        center={[ENTERPRISE_LOCATIONS[0].lat, ENTERPRISE_LOCATIONS[0].lng]}
        zoom={13}
        style={{ height: "100vh", width: "100vw" }}
        ref={mapRef}
        className="z-10"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker 
          onLocationSelect={(location) => {
            if (selectingPickup) {
              setPickupLocation(location);
              setSelectingPickup(false);
            } else if (selectingDrop) {
              setDropLocation(location);
              setSelectingDrop(false);
            }
          }}
          selectingPickup={selectingPickup}
          selectingDrop={selectingDrop}
        />
        
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
            onDragEnd={(latlng) => setPickupLocation({ lat: latlng.lat, lng: latlng.lng })}
            icon={pickupIcon}
            label="Pickup Location"
            draggable={true}
          />
        )}
        
        {dropLocation && (
          <DraggableMarker 
            position={[dropLocation.lat, dropLocation.lng]}
            onDragEnd={(latlng) => setDropLocation({ lat: latlng.lat, lng: latlng.lng })}
            icon={dropIcon}
            label="Drop-off Location"
            draggable={true}
          />
        )}

        <RoutePolyline
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          onRouteCalculated={handleRouteCalculated}
        />
      </MapContainer>

      <FloatingPanel 
        position="right" 
        className="w-[450px] max-h-[calc(100vh-12rem)] overflow-y-auto z-40"
        title="Vehicle Information"
      >
        <VehicleForm
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          serviceType="standard"
          onManeuverChange={() => {}}
          onVehicleModelChange={() => {}}
        />
      </FloatingPanel>

      <MapBottomControls
        pickupLocation={pickupLocation}
        dropLocation={dropLocation}
        onRequestTow={handleRequestTow}
      />

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
