import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";

interface LocationMarkerProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  selectingPickup: boolean;
  selectingDrop: boolean;
}

export const LocationMarker = ({ onLocationSelect, selectingPickup, selectingDrop }: LocationMarkerProps) => {
  const map = useMap();

  useEffect(() => {
    const handleClick = (e: L.LeafletMouseEvent) => {
      if (selectingPickup || selectingDrop) {
        onLocationSelect(e.latlng);
      }
    };

    if (selectingPickup || selectingDrop) {
      map.on('click', handleClick);
    }

    return () => {
      map.off('click', handleClick);
    };
  }, [map, selectingPickup, selectingDrop, onLocationSelect]);

  return null;
};