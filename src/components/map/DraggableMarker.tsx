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
        <div className="p-2">
          <h3 className="font-semibold text-primary">{label}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {typeof position !== 'string' && Array.isArray(position) 
              ? `${position[0].toFixed(6)}, ${position[1].toFixed(6)}`
              : 'Location coordinates'}
          </p>
        </div>
      </Popup>
    </Marker>
  );
};