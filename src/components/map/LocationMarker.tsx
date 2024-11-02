import { useEffect, useCallback } from "react";
import { useMap } from "react-leaflet";

interface LocationMarkerProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  selectingPickup: boolean;
  selectingDrop: boolean;
}

export const LocationMarker = ({ onLocationSelect, selectingPickup, selectingDrop }: LocationMarkerProps) => {
  const map = useMap();

  const handleClick = useCallback((e: L.LeafletMouseEvent) => {
    if (selectingPickup || selectingDrop) {
      onLocationSelect(e.latlng);
    }
  }, [selectingPickup, selectingDrop, onLocationSelect]);

  useEffect(() => {
    if (selectingPickup || selectingDrop) {
      map.on('click', handleClick);
      
      return () => {
        map.off('click', handleClick);
      };
    }
  }, [map, handleClick, selectingPickup, selectingDrop]);

  return null;
};