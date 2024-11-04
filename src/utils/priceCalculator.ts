import { towTruckTypes } from "./towTruckPricing";
import { getRouteGeometry } from "@/services/routeService";

export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)} MXN`;
};

export const calculateBaseCost = (distance: number, truckType: string): number => {
  const truck = towTruckTypes[truckType || 'A'];
  return distance * truck.perKm;
};

export const calculateTotalCost = (
  distance: number,
  truckType: string,
  requiresManeuver: boolean,
  tollCosts: number = 0,
  requiresInvoice: boolean = false
): number => {
  const truck = towTruckTypes[truckType || 'A'];
  const baseCost = calculateBaseCost(distance, truckType);
  const maneuverCost = requiresManeuver ? truck.maneuverCharge : 0;
  const subtotal = baseCost + maneuverCost + tollCosts;
  const tax = requiresInvoice ? subtotal * 0.16 : 0;
  return subtotal + tax;
};

export const getTruckTypeForVehicle = (vehicleType: string): string => {
  switch (vehicleType.toLowerCase()) {
    case 'car':
    case 'sedan':
      return 'A';
    case 'suv':
    case 'pickup':
      return 'B';
    case 'van':
    case 'truck':
      return 'C';
    case 'heavy_truck':
      return 'D';
    default:
      return 'A';
  }
};

interface RouteGeometry {
  companyToPickup: string;
  pickupToDrop: string;
  dropToCompany: string;
}

interface TowingPriceResult {
  totalDistance: number;
  totalPrice: number;
  routeGeometry: RouteGeometry;
}

export const calculateTowingPrice = async (
  pickupLocation: { lat: number; lng: number },
  dropLocation: { lat: number; lng: number },
  vehicleModel: string,
  requiresManeuver: boolean
): Promise<TowingPriceResult> => {
  const routeGeometry = await getRouteGeometry(pickupLocation, dropLocation);
  const truckType = getTruckTypeForVehicle(vehicleModel);
  
  // Calculate total distance from all route segments
  const totalDistance = 
    routeGeometry.companyToPickupDistance + 
    routeGeometry.pickupToDropDistance + 
    routeGeometry.dropToCompanyDistance;

  const totalPrice = calculateTotalCost(
    totalDistance,
    truckType,
    requiresManeuver,
    0, // toll costs
    false // requires invoice
  );

  return {
    totalDistance,
    totalPrice,
    routeGeometry: {
      companyToPickup: routeGeometry.companyToPickupGeometry,
      pickupToDrop: routeGeometry.pickupToDropGeometry,
      dropToCompany: routeGeometry.dropToCompanyGeometry
    }
  };
};