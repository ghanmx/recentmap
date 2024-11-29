import { Dispatch, SetStateAction } from 'react';

export interface LocationInfo {
  pickup?: {
    address: string;
  };
  drop?: {
    address: string;
  };
}

export interface TollInfo {
  tolls: TollLocation[];
  totalTollCost: number;
}

export interface TollLocation {
  name: string;               // Name of the toll
  location: string;           // Ensure this is defined in all instances
  cost: number;               // Cost of the toll
}

export interface PaymentInfo {
  subtotal: number;           // Subtotal payment
  tax: number;                // Tax amount
  total: number;              // Total payment including tax
  isPending: boolean;         // Payment pending status
  isProcessing: boolean;      // Currently processing payment status
}

export interface TowingContextType {
  totalDistance: number;      // Total distance being towed
  totalCost: number;          // Total cost of towing
  detectedTolls: TollLocation[]; // List of detected toll locations
  totalTollCost: number;      // Total cost associated with tolls
  truckType: 'A' | 'B' | 'C' | 'D'; // Type of truck
  requiresManeuver: boolean;   // Indicates if maneuver is required
  selectedVehicleModel: string; // Model of selected vehicle
  tollInfo: TollInfo | null;    // Information about tolls
  paymentInfo: PaymentInfo;      // Information about payments
  isLoadingLocations: boolean;   // Loading status for locations
  isProcessingPayment: boolean;   // Processing payment status
  updateTowingInfo: (distance: number) => void; // Update towing info
  updateTollInfo: (tolls: TollLocation[], tollCost: number) => void; // Update toll info
  updateTruckType: (type: 'A' | 'B' | 'C' | 'D') => void; // Update truck type
  updateManeuverRequired: (required: boolean) => void; // Update if maneuver is needed
  updateSelectedVehicleModel: (model: string) => void; // Update selected vehicle model
  updateLocationInfo: (info: LocationInfo) => Promise<void>; // Update location info
  processPayment: (amount: number) => Promise<boolean>; // Process payment
  setIsLoadingLocations: Dispatch<SetStateAction<boolean>>; // Update loading state
}