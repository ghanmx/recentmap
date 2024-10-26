import L from "leaflet";
import { Marker, Popup } from "react-leaflet";

interface DraggableMarkerProps {
  position: L.LatLngExpression;
  onDragEnd: (latlng: L.LatLng) => void;
  icon?: L.Icon;
  label: string;
  draggable?: boolean;
}

export const DraggableMarker = ({ position, onDragEnd, icon, label, draggable = true }: DraggableMarkerProps) => {
  return (
    <Marker 
      position={position} 
      draggable={draggable}
      icon={icon}
      eventHandlers={{
        dragend: (e) => {
          if (draggable) {
            const marker = e.target;
            onDragEnd(marker.getLatLng());
          }
        },
      }}
    >
      <Popup>
        <div className="font-semibold">{label}</div>
      </Popup>
    </Marker>
  );
};