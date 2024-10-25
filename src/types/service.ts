export interface ServiceRequest {
  id?: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  issueDescription: string;
  serviceType: 'standard' | 'flatbed' | 'emergency';
  pickupLocation: {
    lat: number;
    lng: number;
  };
  dropLocation: {
    lat: number;
    lng: number;
  };
  status: 'pending' | 'accepted' | 'in_progress' | 'completed';
  createdAt?: Date;
}