import L from "leaflet";
import { Marker, Popup } from "react-leaflet";

interface DraggableMarkerProps {
  position: L.LatLngExpression;
  onDragEnd: (latlng: L.LatLng) => void;
  icon?: L.Icon;
  label: string;
  draggable?: boolean;
}

export const DraggableMarker = ({ 
  position, 
  onDragEnd, 
  icon, 
  label,
  draggable = true 
}: DraggableMarkerProps) => {
  const handleDragEnd = (e: L.DragEndEvent) => {
    const marker = e.target;
    onDragEnd(marker.getLatLng());
  };

  return (
    <Marker 
      position={position} 
      draggable={draggable}
      icon={icon}
      eventHandlers={{
        dragend: handleDragEnd,
      }}
    >
      <Popup>
        <div className="font-semibold">{label}</div>
      </Popup>
    </Marker>
  );
};