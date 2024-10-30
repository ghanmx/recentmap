interface Location {
  lat: number;
  lng: number;
}

interface RouteResponse {
  distance: number;
  duration: number;
  geometry: string;
}

const calculateStraightLineDistance = (start: Location, end: Location): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (end.lat - start.lat) * Math.PI / 180;
  const dLon = (end.lng - start.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(start.lat * Math.PI / 180) * Math.cos(end.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const createFallbackResponse = (start: Location, end: Location): RouteResponse => {
  const distance = calculateStraightLineDistance(start, end);
  // Create a simple straight line for visualization
  const geometry = "_p~iF~ps|U_ulLnnqC_mqNvxq@"; // Fixed template literal syntax
  return {
    distance,
    duration: distance * 60, // Rough estimate: 1 km/minute
    geometry
  };
};

// Queue for managing requests
let requestQueue: (() => Promise<void>)[] = [];
let isProcessingQueue = false;

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 2000;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const processQueue = async () => {
  if (isProcessingQueue || requestQueue.length === 0) return;
  
  isProcessingQueue = true;
  while (requestQueue.length > 0) {
    const request = requestQueue.shift();
    if (request) {
      await request();
      await delay(1100);
    }
  }
  isProcessingQueue = false;
};

const fetchWithRetry = async (url: string, retryCount = 0): Promise<Response> => {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'TowTruckService/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
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
  return new Promise((resolve) => {
    const makeRequest = async () => {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=polyline`;
        const response = await fetchWithRetry(url);
        const data = await response.json();
        
        if (!data.routes || data.routes.length === 0) {
          console.warn('No route found, using fallback calculation');
          resolve(createFallbackResponse(start, end));
          return;
        }

        resolve({
          distance: data.routes[0].distance / 1000,
          duration: data.routes[0].duration,
          geometry: data.routes[0].geometry
        });
      } catch (error) {
        console.warn('Route calculation failed, using fallback calculation:', error);
        resolve(createFallbackResponse(start, end));
      }
    };

    requestQueue.push(makeRequest);
    processQueue();
  });
};

export const COMPANY_LOCATION = { lat: 26.510272, lng: -100.006323 };