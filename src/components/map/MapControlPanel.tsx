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
    <div className="absolute inset-x-0 top-16 z-[1000] px-4 flex flex-col items-center gap-4">
      <div className="w-full max-w-md">
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
        <div className="w-full max-w-md">
          <RouteStreetInfo 
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
          />
        </div>
      )}
    </div>
  );
};