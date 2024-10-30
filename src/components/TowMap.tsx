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
import { BookingProgress } from "./map/BookingProgress";
import { useToast } from "@/hooks/use-toast";
import { getAddressFromCoordinates } from "@/services/geocodingService";
import { MapPin } from "lucide-react";

const TowMap = () => {
  const [pickupLocation, setPickupLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [dropLocation, setDropLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [pickupAddress, setPickupAddress] = useState<string>("");
  const [dropAddress, setDropAddress] = useState<string>("");
  const [selectingPickup, setSelectingPickup] = useState(false);
  const [selectingDrop, setSelectingDrop] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const mapRef = useRef<Map | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const updateAddresses = async () => {
      if (pickupLocation) {
        const address = await getAddressFromCoordinates(pickupLocation.lat, pickupLocation.lng);
        setPickupAddress(address);
      }
      if (dropLocation) {
        const address = await getAddressFromCoordinates(dropLocation.lat, dropLocation.lng);
        setDropAddress(address);
      }
    };

    updateAddresses();
  }, [pickupLocation, dropLocation]);

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

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="relative z-10">
        <MapHeader />
        
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4">
          <BookingProgress currentStep={currentStep} />
        </div>

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
          className="w-[450px] max-h-[calc(100vh-12rem)] overflow-y-auto z-40 bg-white/95 
                     backdrop-blur-sm shadow-xl border border-gray-200/50 rounded-xl"
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

        {(pickupAddress || dropAddress) && (
          <FloatingPanel
            position="left"
            className="w-[350px] z-40 bg-white/95 backdrop-blur-sm shadow-xl border border-gray-200/50 rounded-xl"
            title="Selected Locations"
          >
            <div className="space-y-4 p-4">
              {pickupAddress && (
                <div className="space-y-2">
                  <div className="font-semibold text-sm text-primary flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Pickup Location
                  </div>
                  <p className="text-sm text-gray-600">{pickupAddress}</p>
                </div>
              )}
              {dropAddress && (
                <div className="space-y-2">
                  <div className="font-semibold text-sm text-secondary flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Drop-off Location
                  </div>
                  <p className="text-sm text-gray-600">{dropAddress}</p>
                </div>
              )}
            </div>
          </FloatingPanel>
        )}

        <div className="absolute bottom-6 inset-x-0 z-30 px-6 transition-all duration-300 
                      transform hover:translate-y-0 translate-y-2">
          <MapBottomControls
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
            onRequestTow={handleRequestTow}
          />
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
