import { calculateTotalCost, getTowTruckType } from './towTruckPricing';
import { calculateDistance } from './mapUtils';

interface Location {
  lat: number;
  lng: number;
}

export const calculateTowingPrice = (
  companyLocation: Location,
  pickupLocation: Location,
  dropLocation: Location,
  vehicleModel: string,
  requiresManeuver = false
) => {
  const totalDistance = calculateDistance(pickupLocation, dropLocation);
  const towTruckType = getTowTruckType(vehicleModel);
  const totalPrice = calculateTotalCost(totalDistance, towTruckType, requiresManeuver);

  return {
    totalPrice,
    totalDistance,
    towTruckType,
  };
};