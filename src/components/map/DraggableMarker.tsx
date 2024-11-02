import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleDragEnd = (e: L.DragEndEvent) => {
    if (draggable) {
      const marker = e.target;
      onDragEnd(marker.getLatLng());
      toast({
        title: "Location Updated",
        description: `${label} has been moved to a new position`,
        duration: 3000,
      });
    }
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