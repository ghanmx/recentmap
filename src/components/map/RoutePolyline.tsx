import { useEffect, useState } from "react";
import { Polyline } from "react-leaflet";
import { decode } from "@mapbox/polyline";
import { showRouteNotification } from "@/utils/notificationUtils";
import { useTowing } from "@/contexts/TowingContext";
import { calculateTowingPrice, COMPANY_LOCATION } from "@/utils/priceCalculator";

interface RoutePolylineProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  onRouteCalculated?: (distance: number) => void;
}

export const RoutePolyline = ({ pickupLocation, dropLocation, onRouteCalculated }: RoutePolylineProps) => {
  const [companyToPickupRoute, setCompanyToPickupRoute] = useState<[number, number][]>([]);
  const [pickupToDropRoute, setPickupToDropRoute] = useState<[number, number][]>([]);
  const [dropToCompanyRoute, setDropToCompanyRoute] = useState<[number, number][]>([]);
  const { updateTowingInfo } = useTowing();

  useEffect(() => {
    const fetchRoutes = async () => {
      if (pickupLocation && dropLocation) {
        try {
          const routeDetails = await calculateTowingPrice(
            pickupLocation,
            dropLocation,
            'standard', // default vehicle model
            false // default maneuver requirement
          );

          // Decode and set route geometries
          setCompanyToPickupRoute(decode(routeDetails.routeGeometry.companyToPickup).map(([lat, lng]) => [lat, lng]));
          setPickupToDropRoute(decode(routeDetails.routeGeometry.pickupToDrop).map(([lat, lng]) => [lat, lng]));
          setDropToCompanyRoute(decode(routeDetails.routeGeometry.dropToCompany).map(([lat, lng]) => [lat, lng]));

          // Update global towing context with total distance and price
          updateTowingInfo(routeDetails.totalDistance, routeDetails.totalPrice);
          onRouteCalculated?.(routeDetails.totalDistance);
          showRouteNotification(routeDetails.totalDistance);
        } catch (error) {
          console.error('Error calculating routes:', error);
        }
      }
    };

    fetchRoutes();
  }, [pickupLocation, dropLocation, onRouteCalculated, updateTowingInfo]);

  return (
    <>
      <Polyline positions={companyToPickupRoute} color="blue" weight={3} dashArray="10, 10" />
      <Polyline positions={pickupToDropRoute} color="green" weight={3} />
      <Polyline positions={dropToCompanyRoute} color="red" weight={3} dashArray="10, 10" />
    </>
  );
};