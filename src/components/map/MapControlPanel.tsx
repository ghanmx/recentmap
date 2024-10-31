import { Button } from "@/components/ui/button";
import { MapControls } from "./MapControls";
import { RouteStreetInfo } from "./RouteStreetInfo";
import { showLocationNotification } from "@/utils/notificationUtils";

interface MapControlPanelProps {
  selectingPickup: boolean;
  selectingDrop: boolean;
  setSelectingPickup: (value: boolean) => void;
  setSelectingDrop: (value: boolean) => void;
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
}

export const MapControlPanel = ({
  selectingPickup,
  selectingDrop,
  setSelectingPickup,
  setSelectingDrop,
  pickupLocation,
  dropLocation,
}: MapControlPanelProps) => {
  return (
    <div className="absolute top-24 sm:top-28 inset-x-0 z-[1000] px-4 sm:px-6 flex flex-col items-center gap-6">
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-sm shadow-lg rounded-xl p-4 sm:p-6">
        <MapControls 
          selectingPickup={selectingPickup}
          selectingDrop={selectingDrop}
          onPickupClick={() => {
            setSelectingPickup(true);
            setSelectingDrop(false);
            showLocationNotification('pickup', { lat: 0, lng: 0 });
          }}
          onDropClick={() => {
            setSelectingDrop(true);
            setSelectingPickup(false);
            showLocationNotification('drop', { lat: 0, lng: 0 });
          }}
        />
      </div>
      
      {(pickupLocation || dropLocation) && (
        <div className="w-full max-w-2xl">
          <RouteStreetInfo 
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
          />
        </div>
      )}
    </div>
  );
};