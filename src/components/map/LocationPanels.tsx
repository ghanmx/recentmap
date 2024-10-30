import { FloatingPanel } from "./FloatingPanel";
import { MapPin } from "lucide-react";
import VehicleForm from "../VehicleForm";

interface LocationPanelsProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  pickupAddress: string;
  dropAddress: string;
  handleLocationSearch: (location: { lat: number; lng: number; address: string }, type: 'pickup' | 'drop') => void;
}

export const LocationPanels = ({
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  handleLocationSearch
}: LocationPanelsProps) => {
  return (
    <>
      <FloatingPanel 
        position="right" 
        className="w-[450px] max-h-[calc(100vh-12rem)] overflow-y-auto z-40 bg-white/95 
                   backdrop-blur-sm shadow-xl border border-gray-200/50 rounded-xl"
        title="Vehicle Information"
      >
        <VehicleForm
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          pickupAddress={pickupAddress}
          dropAddress={dropAddress}
          serviceType="standard"
          onManeuverChange={() => {}}
          onVehicleModelChange={() => {}}
          onPickupSelect={(location) => handleLocationSearch(location, 'pickup')}
          onDropSelect={(location) => handleLocationSearch(location, 'drop')}
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
    </>
  );
};