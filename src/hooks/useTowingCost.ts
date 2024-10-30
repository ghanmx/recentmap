import { useState, useEffect } from 'react';
import { getRouteDetails } from '@/services/routeService';
import { calculateTotalCost, towTruckTypes, TowTruckConfig } from '@/utils/towTruckPricing';
import { TowTruckType } from '@/utils/downloadUtils';
import { useToast } from '@/components/ui/use-toast';

interface Location {
  lat: number;
  lng: number;
}

export const useTowingCost = (
  pickupLocation: Location | null,
  dropLocation: Location | null,
  requiresManeuver: boolean,
  truckType: TowTruckType,
  tollFees: number
) => {
  const [costDetails, setCostDetails] = useState<{
    distance: number;
    basePrice: number;
    costPerKm: number;
    maneuverCost: number;
    totalCost: number;
  } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const calculateCosts = async () => {
      if (pickupLocation && dropLocation) {
        try {
          const route = await getRouteDetails(pickupLocation, dropLocation);
          const distance = route.distance;
          const truckDetails: TowTruckConfig = towTruckTypes[truckType];
          const costPerKm = truckDetails.perKm * distance;
          const basePrice = truckDetails.basePrice;
          const maneuverCost = requiresManeuver ? truckDetails.maneuverCharge : 0;
          const totalCost = calculateTotalCost(distance, truckType, requiresManeuver) + tollFees;

          setCostDetails({
            distance,
            basePrice,
            costPerKm,
            maneuverCost,
            totalCost
          });
        } catch (error) {
          toast({
            title: "Error calculating costs",
            description: "Failed to calculate route costs. Please try again.",
            variant: "destructive",
          });
        }
      }
    };

    calculateCosts();
  }, [pickupLocation, dropLocation, requiresManeuver, truckType, tollFees]);

  return costDetails;
};