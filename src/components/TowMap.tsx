import { useRef, useState } from "react";
import { TopNavMenu } from "./navigation/TopNavMenu";
import { FloatingPanel } from "./map/FloatingPanel";
import { MapContent } from "./map/MapContent";
import VehicleForm from "./VehicleForm";
import PaymentWindow from "./payment/PaymentWindow";
import { RouteDisplay } from "./map/RouteDisplay";
import { calculateTowingPrice } from "@/utils/priceCalculator";
import { showRouteNotification, showPaymentNotification } from "@/utils/notificationUtils";
import L from "leaflet";

const TowMap = () => {
  const [pickupLocation, setPickupLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [dropLocation, setDropLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectingPickup, setSelectingPickup] = useState(false);
  const [selectingDrop, setSelectingDrop] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const mapRef = useRef<L.Map | null>(null);

  const handleRouteCalculated = (distance: number) => {
    showRouteNotification(distance);
  };

  const handlePaymentSubmit = (result: { success: boolean; error?: string }) => {
    showPaymentNotification(result.success, result.error);
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

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-x-0 top-0 z-[1000] bg-white/95 shadow-md backdrop-blur-sm">
        <TopNavMenu />
      </div>

      <MapContent
        pickupLocation={pickupLocation}
        dropLocation={dropLocation}
        handleLocationSelect={handleLocationSelect}
        selectingPickup={selectingPickup}
        selectingDrop={selectingDrop}
        setPickupLocation={setPickupLocation}
        setDropLocation={setDropLocation}
        handleRouteCalculated={handleRouteCalculated}
      />

      <FloatingPanel 
        position="right" 
        className="w-[400px] max-h-[80vh] overflow-y-auto"
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

      <div className="absolute inset-x-0 bottom-4 z-[1000] px-4">
        <div className="max-w-xl mx-auto space-y-4">
          <RouteDisplay pickupLocation={pickupLocation} dropLocation={dropLocation} />
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