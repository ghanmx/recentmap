import { Location, RouteResponse } from '@/types/service';

interface RouteError extends Error {
  status?: number;
}

const MIN_REQUEST_INTERVAL = 2000; // 2 seconds between requests
const MAX_RETRIES = 3;
const RETRY_DELAY = 5000;
const FALLBACK_SPEED_KMH = 45;
const REQUEST_TIMEOUT = 30000;

// Request queue management
let requestQueue: Array<() => Promise<any>> = [];
let isProcessingQueue = false;
let lastRequestTime = 0;

const OSRM_SERVERS = [
  'https://router.project-osrm.org',
  'https://routing.openstreetmap.de'
];

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const createFallbackResponse = (start: Location, end: Location): RouteResponse => {
  const R = 6371; // Earth's radius in km
  const dLat = (end.lat - start.lat) * Math.PI / 180;
  const dLon = (end.lng - start.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(start.lat * Math.PI / 180) * Math.cos(end.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return {
    distance,
    duration: (distance / FALLBACK_SPEED_KMH) * 60,
    geometry: `_p~iF~ps|U_ulLnnqC_mqNvxq`@`
  };
};

const shouldWaitBeforeRequest = () => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  return timeSinceLastRequest < MIN_REQUEST_INTERVAL;
};

async function fetchWithTimeout(url: string, timeout: number): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    if (shouldWaitBeforeRequest()) {
      await wait(MIN_REQUEST_INTERVAL - (Date.now() - lastRequestTime));
    }

    lastRequestTime = Date.now();
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'MRGruas-TowingService/1.0 (https://mrgruas.com)',
        'Referer': 'https://mrgruas.com'
      }
    });
    return response;
  } finally {
    clearTimeout(id);
  }
}

async function processQueue() {
  if (isProcessingQueue || requestQueue.length === 0) return;
  
  isProcessingQueue = true;
  
  while (requestQueue.length > 0) {
    const request = requestQueue.shift();
    if (request) {
      try {
        await request();
        await wait(MIN_REQUEST_INTERVAL);
      } catch (error) {
        console.error('Error processing queued request:', error);
      }
    }
  }
  
  isProcessingQueue = false;
}

async function tryFetchRoute(start: Location, end: Location, serverUrl: string, retryCount = 0): Promise<RouteResponse> {
  const url = `${serverUrl}/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=polyline&alternatives=true`;
  
  try {
    const response = await fetchWithTimeout(url, REQUEST_TIMEOUT);
    
    if (response.status === 429) {
      const retryAfter = parseInt(response.headers.get('Retry-After') || '5');
      await wait(retryAfter * 1000 || RETRY_DELAY * (retryCount + 1));
      if (retryCount < MAX_RETRIES) {
        return tryFetchRoute(start, end, serverUrl, retryCount + 1);
      }
      throw new Error('Rate limit exceeded after retries');
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.routes || data.routes.length === 0) {
      throw new Error('No routes found');
    }

    return {
      distance: data.routes[0].distance / 1000, // Convert to kilometers
      duration: data.routes[0].duration / 60, // Convert to minutes
      geometry: data.routes[0].geometry
    };
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      await wait(RETRY_DELAY * Math.pow(2, retryCount)); // Exponential backoff
      return tryFetchRoute(start, end, serverUrl, retryCount + 1);
    }
    throw error;
  }
}

export const getRouteDetails = async (start: Location, end: Location): Promise<RouteResponse> => {
  return new Promise((resolve, reject) => {
    const request = async () => {
      for (const serverUrl of OSRM_SERVERS) {
        try {
          const result = await tryFetchRoute(start, end, serverUrl);
          resolve(result);
          return;
        } catch (error) {
          const routeError = error as RouteError;
          if (routeError.status === 429) {
            continue; // Try next server if rate limited
          }
          console.warn(`Failed to fetch from ${serverUrl}, trying next server...`, error);
        }
      }
      
      resolve(createFallbackResponse(start, end));
    };

    requestQueue.push(request);
    processQueue().catch(console.error);
  });
};

export const getRouteGeometry = async (pickupLocation: Location, dropLocation: Location) => {
  try {
    const route = await getRouteDetails(pickupLocation, dropLocation);
    return route.geometry;
  } catch (error) {
    console.error('Failed to get route geometry:', error);
    return null;
  }
};
