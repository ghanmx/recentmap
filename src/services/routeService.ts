interface Location {
  lat: number;
  lng: number;
}

interface RouteResponse {
  distance: number;
  duration: number;
  geometry: string;
}

// Queue for managing requests
let requestQueue: (() => Promise<void>)[] = [];
let isProcessingQueue = false;

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 2000; // 2 seconds

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const processQueue = async () => {
  if (isProcessingQueue || requestQueue.length === 0) return;
  
  isProcessingQueue = true;
  while (requestQueue.length > 0) {
    const request = requestQueue.shift();
    if (request) {
      await request();
      // Wait 1.1 seconds between requests to respect rate limit
      await delay(1100);
    }
  }
  isProcessingQueue = false;
};

const fetchWithRetry = async (url: string, retryCount = 0): Promise<Response> => {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'TowTruckService/1.0',
        'Referer': window.location.origin
      }
    });

    if (response.status === 429 && retryCount < MAX_RETRIES) {
      // Calculate exponential backoff delay
      const backoffDelay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount);
      await delay(backoffDelay);
      return fetchWithRetry(url, retryCount + 1);
    }

    return response;
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      const backoffDelay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount);
      await delay(backoffDelay);
      return fetchWithRetry(url, retryCount + 1);
    }
    throw error;
  }
};

export const getRouteDetails = async (start: Location, end: Location): Promise<RouteResponse> => {
  return new Promise((resolve, reject) => {
    const makeRequest = async () => {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=polyline`;
        const response = await fetchWithRetry(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch route: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.routes || data.routes.length === 0) {
          throw new Error('No route found');
        }

        resolve({
          distance: data.routes[0].distance / 1000, // Convert to kilometers
          duration: data.routes[0].duration,
          geometry: data.routes[0].geometry
        });
      } catch (error) {
        reject(new Error(`Failed to calculate route: ${error.message}`));
      }
    };

    requestQueue.push(makeRequest);
    processQueue();
  });
};

export const COMPANY_LOCATION = { lat: 26.510272, lng: -100.006323 };