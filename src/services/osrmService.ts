const OSRM_API_URL = 'https://router.project-osrm.org/route/v1';

interface Coordinates {
  lat: number;
  lng: number;
}

interface OSRMResponse {
  routes: {
    distance: number;
    duration: number;
    geometry: string;
  }[];
}

export async function getRouteFromOSRM(start: Coordinates, end: Coordinates): Promise<{
  distance: number;
  duration: number;
  geometry: string;
}> {
  try {
    const response = await fetch(
      `${OSRM_API_URL}/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=polyline`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch route');
    }

    const data: OSRMResponse = await response.json();
    
    if (!data.routes || data.routes.length === 0) {
      throw new Error('No route found');
    }

    return {
      distance: data.routes[0].distance / 1000, // Convert to kilometers
      duration: data.routes[0].duration,
      geometry: data.routes[0].geometry,
    };
  } catch (error) {
    console.error('Error fetching route:', error);
    throw error;
  }
}