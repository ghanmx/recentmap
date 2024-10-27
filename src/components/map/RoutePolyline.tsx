import { useEffect, useState, useRef } from "react";
import { Polyline } from "react-leaflet";
import { getRouteDetails } from "@/services/routeService";
import { decode } from "@mapbox/polyline";
import { showRouteNotification } from "@/utils/notificationUtils";

interface RoutePolylineProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  onRouteCalculated?: (distance: number) => void;
}

export const RoutePolyline = ({ pickupLocation, dropLocation, onRouteCalculated }: RoutePolylineProps) => {
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([]);
  const lastDistance = useRef<number>(0);

  useEffect(() => {
    const fetchRoute = async () => {
      if (pickupLocation && dropLocation) {
        try {
          const route = await getRouteDetails(pickupLocation, dropLocation);
          const decodedCoordinates = decode(route.geometry).map(([lat, lng]) => [lat, lng] as [number, number]);
          setRouteCoordinates(decodedCoordinates);
          
          // Only show notification if distance has changed significantly (more than 0.1 km)
          if (Math.abs(route.distance - lastDistance.current) > 0.1) {
            showRouteNotification(route.distance);
            onRouteCalculated?.(route.distance);
            lastDistance.current = route.distance;
          }
        } catch (error) {
          console.error('Error obteniendo la ruta:', error);
        }
      }
    };

    fetchRoute();
  }, [pickupLocation, dropLocation, onRouteCalculated]);

  if (!routeCoordinates.length) return null;

  return <Polyline positions={routeCoordinates} color="blue" weight={3} />;
};