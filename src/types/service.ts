export interface Location {
  lat: number;
  lng: number;
}

export interface RouteResponse {
  geometry: string;
  distance: number;
  duration: number;
}

export interface ServiceRequest {
  id: string;
  status: 'pending' | 'completed';
  createdAt: Date;
  pickupLocation?: Location;
  dropLocation?: Location;
}