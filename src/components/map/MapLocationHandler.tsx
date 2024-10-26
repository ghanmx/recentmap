import { useCallback } from "react";
import { showLocationNotification } from "@/utils/notificationUtils";

interface MapLocationHandlerProps {
  onPickupSelect: (location: { lat: number; lng: number }) => void;
  onDropSelect: (location: { lat: number; lng: number }) => void;
  selectingPickup: boolean;
  selectingDrop: boolean;
  setSelectingPickup: (value: boolean) => void;
  setSelectingDrop: (value: boolean) => void;
}

export const MapLocationHandler = ({
  onPickupSelect,
  onDropSelect,
  selectingPickup,
  selectingDrop,
  setSelectingPickup,
  setSelectingDrop,
}: MapLocationHandlerProps) => {
  const handleLocationSelect = useCallback((location: { lat: number; lng: number }) => {
    if (selectingPickup) {
      onPickupSelect(location);
      setSelectingPickup(false);
      showLocationNotification('pickup', location);
    } else if (selectingDrop) {
      onDropSelect(location);
      setSelectingDrop(false);
      showLocationNotification('drop', location);
    }
  }, [selectingPickup, selectingDrop, onPickupSelect, onDropSelect, setSelectingPickup, setSelectingDrop]);

  return null; // This is a logic-only component
};