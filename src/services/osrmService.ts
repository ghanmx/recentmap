const OSRM_API_URL = 'https://router.project-osrm.org/route/v1';
const FALLBACK_OSRM_API_URL = 'http://router.project-osrm.org/route/v1';
const BASE_DELAY = 1000; // 1 second base delay
const MAX_RETRIES = 3;
const BACKOFF_FACTOR = 1.5; // Exponential backoff factor
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
  return Math.min(BASE_DELAY * Math.pow(BACKOFF_FACTOR, attempt), 5000); // Cap at 5 seconds
};

const delay = async (ms: number) => {
  const now = Date.now();
  const timeToWait = Math.max(0, ms - (now - lastRequestTime));
  if (timeToWait > 0) {
    await new Promise(resolve => setTimeout(resolve, timeToWait));
  }
  lastRequestTime = Date.now();
};

async function fetchWithRetry(url: string, options: RequestInit, retries = MAX_RETRIES, useFallback = false): Promise<Response> {
  const finalUrl = useFallback ? url.replace('https://', 'http://') : url;
  
  try {
    await delay(calculateDelay(MAX_RETRIES - retries));
    
    const response = await fetch(finalUrl, {
      ...options,
      mode: 'cors',
      credentials: 'omit'
    });

    if (response.status === 429 && retries > 0) {
      // If rate limited, use exponential backoff
      await delay(calculateDelay(MAX_RETRIES - retries + 1));
      return fetchWithRetry(url, options, retries - 1, useFallback);
    }

    if (!response.ok && !useFallback && retries === MAX_RETRIES) {
      // If first attempt fails with HTTPS, try HTTP
      return fetchWithRetry(url, options, retries, true);
    }

    return response;
  } catch (error) {
    if (retries > 0) {
      // On network error, wait with exponential backoff
      await delay(calculateDelay(MAX_RETRIES - retries + 1));
      return fetchWithRetry(url, options, retries - 1, useFallback);
    }
    
    if (!useFallback) {
      // If HTTPS failed completely, try HTTP as last resort
      return fetchWithRetry(url, options, MAX_RETRIES, true);
    }
    
    throw new Error('Network error: Unable to connect to routing service. Please check your internet connection.');
  }
}

export async function getRouteFromOSRM(start: Coordinates, end: Coordinates): Promise<{
  distance: number;
  duration: number;
  geometry: string;
}> {
  try {
    const response = await fetchWithRetry(
      `${OSRM_API_URL}/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=polyline`,
      {
        headers: {
          'User-Agent': 'TowingServiceApplication/1.0',
          'Referer': window.location.origin,
          'Accept': 'application/json',
          'Origin': window.location.origin
        }
      }
    );

    if (!response.ok) {
      throw new Error(response.status === 429 
        ? 'Rate limit exceeded. Please try again in a few seconds.'
        : 'Failed to fetch route data. Please try again.');
    }

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