import { useMapEvents } from "react-leaflet";

interface LocationMarkerProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  selectingPickup: boolean;
  selectingDrop: boolean;
}

export const LocationMarker = ({ onLocationSelect, selectingPickup, selectingDrop }: LocationMarkerProps) => {
  useMapEvents({
    click(e) {
      if (selectingPickup || selectingDrop) {
        onLocationSelect(e.latlng);
      }
    },
  });
  return null;
};