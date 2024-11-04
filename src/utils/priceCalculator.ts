import { towTruckTypes } from "./towTruckPricing";

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