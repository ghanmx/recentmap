import L from "leaflet";
import { Marker, Popup } from "react-leaflet";

interface DraggableMarkerProps {
  position: L.LatLngExpression;
  onDragEnd: (latlng: L.LatLng) => void;
  icon?: L.Icon;
  label: string;
}

export const DraggableMarker = ({ position, onDragEnd, icon, label }: DraggableMarkerProps) => {
  return (
    <Marker 
      position={position} 
      draggable={true}
      icon={icon}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          onDragEnd(marker.getLatLng());
        },
      }}
    >
      <Popup>
        <div className="font-semibold">{label}</div>
      </Popup>
    </Marker>
  );
};