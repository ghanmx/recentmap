import { useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { LocationMarker } from "./map/LocationMarker";
import { MapControls } from "./map/MapControls";
import { BorderControls } from "./map/BorderControls";
import { RouteStreetInfo } from "./map/RouteStreetInfo";
import { RoutePolyline } from "./map/RoutePolyline";
import PaymentWindow from "./payment/PaymentWindow";
import { Button } from "@/components/ui/button";
import { RouteDisplay } from "./map/RouteDisplay";
import { calculateTowingPrice } from "@/utils/priceCalculator";
import { TopNavMenu } from "./navigation/TopNavMenu";
import { MapLocationHandler } from "./map/MapLocationHandler";
import { MapMarkers } from "./map/MapMarkers";
import { showRouteNotification, showPaymentNotification } from "@/utils/notificationUtils";

const ENTERPRISE_LOCATIONS = [
  { lat: 26.510272, lng: -100.006323, name: "Main Service Center" },
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
  const [showPayment, setShowPayment] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [arrivalLocation, setArrivalLocation] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const handleRouteCalculated = (distance: number) => {
    showRouteNotification(distance);
    // Calculate arrival location as midpoint between pickup and drop
    if (pickupLocation && dropLocation) {
      const midLat = (pickupLocation.lat + dropLocation.lat) / 2;
      const midLng = (pickupLocation.lng + dropLocation.lng) / 2;
      setArrivalLocation({ lat: midLat, lng: midLng });
    }
  };

  const handlePaymentSubmit = (result: { success: boolean; error?: string }) => {
    showPaymentNotification(result.success, result.error);
  };

  return (
    <div className="fixed inset-0">
      <div className="absolute inset-x-0 top-0 z-[1000] bg-white/95 shadow-md backdrop-blur-sm">
        <TopNavMenu />
      </div>

      <MapLocationHandler
        onPickupSelect={onPickupSelect}
        onDropSelect={onDropSelect}
        selectingPickup={selectingPickup}
        selectingDrop={selectingDrop}
        setSelectingPickup={setSelectingPickup}
        setSelectingDrop={setSelectingDrop}
      />

      <div className="absolute inset-x-0 top-16 z-[1000] px-4 flex flex-col items-center gap-4 pointer-events-none">
        <div className="w-full max-w-md pointer-events-auto">
          <MapControls 
            selectingPickup={selectingPickup}
            selectingDrop={selectingDrop}
            onPickupClick={() => {
              setSelectingPickup(true);
              setSelectingDrop(false);
            }}
            onDropClick={() => {
              setSelectingDrop(true);
              setSelectingPickup(false);
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
        <LocationMarker 
          onLocationSelect={(location) => {
            if (selectingPickup) {
              onPickupSelect(location);
              setSelectingPickup(false);
            } else if (selectingDrop) {
              onDropSelect(location);
              setSelectingDrop(false);
            }
          }}
          selectingPickup={selectingPickup}
          selectingDrop={selectingDrop}
        />
        <BorderControls />
        
        <MapMarkers
          enterpriseLocations={ENTERPRISE_LOCATIONS}
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          arrivalLocation={arrivalLocation}
          onPickupSelect={onPickupSelect}
          onDropSelect={onDropSelect}
        />

        <RoutePolyline
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          onRouteCalculated={handleRouteCalculated}
        />
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