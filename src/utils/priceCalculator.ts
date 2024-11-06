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
  const flagDropFee = truck.flagDropFee;
  const subtotal = baseCost + maneuverCost + tollCosts + flagDropFee;
  const tax = requiresInvoice ? subtotal * 0.16 : 0;
  return subtotal + tax;
};

export const COMPANY_LOCATION = { lat: 26.510272, lng: -100.006323 };