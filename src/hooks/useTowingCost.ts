import { useState, useEffect } from 'react';
import { calculateTowingPrice } from '@/utils/priceCalculator';
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
          const routeDetails = await calculateTowingPrice(
            pickupLocation,
            dropLocation,
            'standard',
            requiresManeuver
          );

          setCostDetails({
            distance: routeDetails.totalDistance,
            basePrice: routeDetails.segments.basePrice,
            costPerKm: routeDetails.segments.costPerKm,
            maneuverCost: requiresManeuver ? routeDetails.segments.maneuverCost : 0,
            totalCost: routeDetails.totalPrice + tollFees
          });
        } catch (error) {
          toast({
            title: "Error al calcular costos",
            description: "No se pudieron calcular los costos de la ruta. Por favor, intente de nuevo.",
            variant: "destructive",
          });
        }
      }
    };

    calculateCosts();
  }, [pickupLocation, dropLocation, requiresManeuver, truckType, tollFees]);

  return costDetails;
};