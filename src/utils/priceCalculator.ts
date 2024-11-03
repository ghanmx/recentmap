import { getRouteDetails } from '../services/routeService';
import { calculateTotalCost, getTowTruckType } from './towTruckPricing';
import { calculateDistance } from './distanceUtils';

interface Location {
  lat: number;
  lng: number;
}

export const COMPANY_LOCATION = { lat: 26.510272, lng: -100.006323 };

export interface RouteDetails {
  totalPrice: number;
  totalDistance: number;
  segments: {
    companyToPickup: number;
    pickupToDrop: number;
    dropToCompany: number;
  };
  tollFees: number;
  routeGeometry: {
    companyToPickup: string;
    pickupToDrop: string;
    dropToCompany: string;
  };
}

export const calculateTowingPrice = async (
  pickupLocation: Location,
  dropLocation: Location,
  vehicleModel: string,
  requiresManeuver = false,
  isRoundTrip = true
): Promise<RouteDetails> => {
  try {
    const companyToPickup = await getRouteDetails(COMPANY_LOCATION, pickupLocation);
    const pickupToDrop = await getRouteDetails(pickupLocation, dropLocation);
    const dropToCompany = await getRouteDetails(dropLocation, COMPANY_LOCATION);
    
    const segments = {
      companyToPickup: Number(companyToPickup.distance.toFixed(2)),
      pickupToDrop: Number(pickupToDrop.distance.toFixed(2)),
      dropToCompany: Number(dropToCompany.distance.toFixed(2))
    };
    
    const totalDistance = Number((
      segments.companyToPickup +
      segments.pickupToDrop +
      segments.dropToCompany
    ).toFixed(2));

    const towTruckType = getTowTruckType(vehicleModel);
    const totalPrice = calculateTotalCost(totalDistance, towTruckType, requiresManeuver) * (isRoundTrip ? 2 : 1);

    return {
      totalPrice,
      totalDistance,
      segments,
      tollFees: 0, // Toll fees are now handled separately by tollCalculator
      routeGeometry: {
        companyToPickup: companyToPickup.geometry,
        pickupToDrop: pickupToDrop.geometry,
        dropToCompany: dropToCompany.geometry
      }
    };
  } catch (error) {
    console.error('Error calculating price:', error);
    throw error;
  }
};