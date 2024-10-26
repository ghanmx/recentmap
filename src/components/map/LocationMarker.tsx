import { useMapEvents } from "react-leaflet";

interface LocationMarkerProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
}

export const LocationMarker = ({ onLocationSelect }: LocationMarkerProps) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
};