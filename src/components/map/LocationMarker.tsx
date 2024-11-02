import { useEffect, useCallback, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

interface LocationMarkerProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  selectingPickup: boolean;
  selectingDrop: boolean;
}

export const LocationMarker = ({ 
  onLocationSelect, 
  selectingPickup, 
  selectingDrop 
}: LocationMarkerProps) => {
  const map = useMap();
  const clickHandlerRef = useRef<((e: L.LeafletMouseEvent) => void) | null>(null);

  const handleClick = useCallback((e: L.LeafletMouseEvent) => {
    if (selectingPickup || selectingDrop) {
      onLocationSelect(e.latlng);
    }
  }, [selectingPickup, selectingDrop, onLocationSelect]);

  useEffect(() => {
    if (selectingPickup || selectingDrop) {
      if (clickHandlerRef.current) {
        map.off('click', clickHandlerRef.current);
      }
      
      clickHandlerRef.current = handleClick;
      map.on('click', clickHandlerRef.current);
      
      return () => {
        if (clickHandlerRef.current) {
          map.off('click', clickHandlerRef.current);
          clickHandlerRef.current = null;
        }
      };
    } else if (clickHandlerRef.current) {
      map.off('click', clickHandlerRef.current);
      clickHandlerRef.current = null;
    }
  }, [map, handleClick, selectingPickup, selectingDrop]);

  return null;
};