export interface ServiceRequest {
  id?: string;
  username: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  vehicleColor: string;
  issueDescription: string;
  serviceType: 'standard' | 'flatbed' | 'emergency';
  pickupLocation: { lat: number; lng: number };
  dropLocation: { lat: number; lng: number };
  requiresManeuver: boolean;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed';
  truckType: "A" | "B" | "C" | "D";
  tollFees: number;
  createdAt?: Date;
}

export interface FormData {
  username: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  issueDescription: string;
  truckType: "A" | "B" | "C" | "D";
  tollFees: number;
}