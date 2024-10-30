import { useEffect, useState } from "react";
import { Polyline } from "react-leaflet";
import { getRouteDetails } from "@/services/routeService";
import { decode } from "@mapbox/polyline";
import { showRouteNotification } from "@/utils/notificationUtils";
import { useTowing } from "@/contexts/TowingContext";
import { calculateTotalCost } from "@/utils/towTruckPricing";

interface RoutePolylineProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  onRouteCalculated?: (distance: number) => void;
}

const COMPANY_LOCATION = { lat: 26.510272, lng: -100.006323 };

export const RoutePolyline = ({ pickupLocation, dropLocation, onRouteCalculated }: RoutePolylineProps) => {
  const [companyToPickupRoute, setCompanyToPickupRoute] = useState<[number, number][]>([]);
  const [pickupToDropRoute, setPickupToDropRoute] = useState<[number, number][]>([]);
  const [dropToCompanyRoute, setDropToCompanyRoute] = useState<[number, number][]>([]);
  const { updateTowingInfo } = useTowing();

  useEffect(() => {
    const fetchRoutes = async () => {
      if (pickupLocation && dropLocation) {
        try {
          const companyToPickup = await getRouteDetails(COMPANY_LOCATION, pickupLocation);
          setCompanyToPickupRoute(decode(companyToPickup.geometry).map(([lat, lng]) => [lat, lng] as [number, number]));

          const pickupToDrop = await getRouteDetails(pickupLocation, dropLocation);
          setPickupToDropRoute(decode(pickupToDrop.geometry).map(([lat, lng]) => [lat, lng] as [number, number]));

          const dropToCompany = await getRouteDetails(dropLocation, COMPANY_LOCATION);
          setDropToCompanyRoute(decode(dropToCompany.geometry).map(([lat, lng]) => [lat, lng] as [number, number]));

          const totalDist = companyToPickup.distance + pickupToDrop.distance + dropToCompany.distance;
          const totalCost = calculateTotalCost(totalDist, 'A', false);
          
          updateTowingInfo(totalDist, totalCost);
          onRouteCalculated?.(totalDist);
          showRouteNotification(totalDist);
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