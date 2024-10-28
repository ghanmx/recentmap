interface Location {
  lat: number;
  lng: number;
}

interface RouteResponse {
  distance: number;
  duration: number;
  geometry: string;
}

export const getRouteDetails = async (start: Location, end: Location): Promise<RouteResponse> => {
  const response = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=polyline`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch route');
  }

  const data = await response.json();
  
  if (!data.routes || data.routes.length === 0) {
    throw new Error('No route found');
  }

  return {
    distance: data.routes[0].distance / 1000, // Convert to kilometers
    duration: data.routes[0].duration,
    geometry: data.routes[0].geometry
  };
};

export const COMPANY_LOCATION = { lat: 26.510272, lng: -100.006323 };