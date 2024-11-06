const OSRM_API_URL = 'https://router.project-osrm.org/route/v1';
const REQUEST_DELAY = 1100; // Slightly over 1 second to ensure we stay under rate limit
let lastRequestTime = 0;

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

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getRouteFromOSRM(start: Coordinates, end: Coordinates): Promise<{
  distance: number;
  duration: number;
  geometry: string;
}> {
  // Calculate time to wait
  const now = Date.now();
  const timeToWait = Math.max(0, REQUEST_DELAY - (now - lastRequestTime));
  
  // Wait if needed
  if (timeToWait > 0) {
    await delay(timeToWait);
  }
  
  try {
    // Update last request time
    lastRequestTime = Date.now();

    const response = await fetch(
      `${OSRM_API_URL}/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=polyline`,
      {
        headers: {
          'User-Agent': 'TowingServiceApplication/1.0',
          'Referer': window.location.origin
        }
      }
    );
    
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again in a few seconds.');
    }
    
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