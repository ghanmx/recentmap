import { useRef, useState, useEffect } from "react";
import { Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import PaymentWindow from "./payment/PaymentWindow";
import { calculateTowingPrice } from "@/utils/priceCalculator";
import { showRouteNotification, showPaymentNotification } from "@/utils/notificationUtils";
import VehicleForm from "./VehicleForm";
import { FloatingPanel } from "./map/FloatingPanel";
import { MapControlPanel } from "./map/MapControlPanel";
import { MapHeader } from "./map/MapHeader";
import { MapBottomControls } from "./map/MapBottomControls";
import { MapContainerComponent } from "./map/MapContainer";
import { useToast } from "@/hooks/use-toast";

const TowMap = () => {
  const [pickupLocation, setPickupLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [dropLocation, setDropLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectingPickup, setSelectingPickup] = useState(false);
  const [selectingDrop, setSelectingDrop] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const mapRef = useRef<Map | null>(null);
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

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    if (selectingPickup) {
      setPickupLocation(location);
      setSelectingPickup(false);
    } else if (selectingDrop) {
      setDropLocation(location);
      setSelectingDrop(false);
    }
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
    <div className="relative h-screen overflow-hidden bg-gray-50">
      <MapHeader />
      
      <MapControlPanel
        selectingPickup={selectingPickup}
        selectingDrop={selectingDrop}
        setSelectingPickup={setSelectingPickup}
        setSelectingDrop={setSelectingDrop}
        pickupLocation={pickupLocation}
        dropLocation={dropLocation}
      />

      <MapContainerComponent
        pickupLocation={pickupLocation}
        dropLocation={dropLocation}
        selectingPickup={selectingPickup}
        selectingDrop={selectingDrop}
        onLocationSelect={handleLocationSelect}
        setPickupLocation={setPickupLocation}
        setDropLocation={setDropLocation}
        onRouteCalculated={handleRouteCalculated}
      />

      <FloatingPanel 
        position="right" 
        className="w-[450px] max-h-[calc(100vh-12rem)] overflow-y-auto z-40 bg-white/95 backdrop-blur-sm shadow-xl"
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