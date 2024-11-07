const OSRM_API_URLS = [
  'https://router.project-osrm.org/route/v1',
  'http://router.project-osrm.org/route/v1',
  'https://routing.openstreetmap.de/routed-car/route/v1'
];

const BASE_DELAY = 1000;
const MAX_RETRIES = 3;
const BACKOFF_FACTOR = 1.5;
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

const calculateDelay = (attempt: number): number => {
  return Math.min(BASE_DELAY * Math.pow(BACKOFF_FACTOR, attempt), 5000);
};

const delay = async (ms: number) => {
  const now = Date.now();
  const timeToWait = Math.max(0, ms - (now - lastRequestTime));
  if (timeToWait > 0) {
    await new Promise(resolve => setTimeout(resolve, timeToWait));
  }
  lastRequestTime = Date.now();
};

async function tryFetchWithUrls(urls: string[], coordinates: string, options: RequestInit, retryCount = 0): Promise<Response> {
  const errors: Error[] = [];

  for (const baseUrl of urls) {
    try {
      await delay(calculateDelay(retryCount));
      const url = `${baseUrl}/driving/${coordinates}?overview=full&geometries=polyline`;
      
      const response = await fetch(url, {
        ...options,
        mode: 'cors',
        credentials: 'omit',
        headers: {
          ...options.headers,
          'Accept': 'application/json',
          'User-Agent': 'TowingServiceApplication/1.0'
        }
      });

      if (response.ok) {
        return response;
      }

      errors.push(new Error(`Failed response from ${baseUrl}: ${response.status}`));
    } catch (error) {
      errors.push(error instanceof Error ? error : new Error(`Unknown error from ${baseUrl}`));
      continue;
    }
  }

  if (retryCount < MAX_RETRIES) {
    await delay(calculateDelay(retryCount));
    return tryFetchWithUrls(urls, coordinates, options, retryCount + 1);
  }

  throw new Error(`All routing services failed after ${MAX_RETRIES} retries. Errors: ${errors.map(e => e.message).join(', ')}`);
}

export async function getRouteFromOSRM(start: Coordinates, end: Coordinates): Promise<{
  distance: number;
  duration: number;
  geometry: string;
}> {
  const coordinates = `${start.lng},${start.lat};${end.lng},${end.lat}`;
  
  try {
    const response = await tryFetchWithUrls(OSRM_API_URLS, coordinates, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'TowingServiceApplication/1.0'
      }
    });

    const data: OSRMResponse = await response.json();
    
    if (!data.routes || data.routes.length === 0) {
      throw new Error('No route found between the specified locations.');
    }

    return {
      distance: data.routes[0].distance / 1000, // Convert to kilometers
      duration: data.routes[0].duration,
      geometry: data.routes[0].geometry,
    };
  } catch (error) {
    console.error('Error fetching route:', error);
    throw error instanceof Error ? error : new Error('An unexpected error occurred while fetching the route.');
  }
}