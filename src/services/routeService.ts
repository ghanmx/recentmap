interface Location {
  lat: number;
  lng: number;
}

interface RouteResponse {
  distance: number;
  duration: number;
  geometry: string;
}

// Rate limiting setup
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1100; // Slightly over 1 second to be safe

const calculateStraightLineDistance = (start: Location, end: Location): number => {
  const R = 6371;
  const dLat = (end.lat - start.lat) * Math.PI / 180;
  const dLon = (end.lng - start.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(start.lat * Math.PI / 180) * Math.cos(end.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
};

const createFallbackResponse = (start: Location, end: Location): RouteResponse => {
  const distance = calculateStraightLineDistance(start, end);
  return {
    distance,
    duration: distance * 60,
    geometry: "_p~iF~ps|U_ulLnnqC_mqNvxq@" // Simple straight line
  };
};

const waitForRateLimit = async () => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
  
  lastRequestTime = Date.now();
};

const fetchWithRetry = async (url: string, retryCount = 0): Promise<Response> => {
  await waitForRateLimit();

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'TowTruck-Service/1.0',
        'Referer': window.location.origin
      }
    });
    
    if (response.status === 429) {
      if (retryCount < 3) {
        const waitTime = Math.pow(2, retryCount) * 2000;
        await new Promise(resolve => setTimeout(resolve, waitTime));
        return fetchWithRetry(url, retryCount + 1);
      }
      throw new Error('Rate limit exceeded after retries');
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response;
  } catch (error) {
    if (retryCount < 3) {
      const waitTime = Math.pow(2, retryCount) * 2000;
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return fetchWithRetry(url, retryCount + 1);
    }
    throw error;
  }
};

export const getRouteDetails = async (start: Location, end: Location): Promise<RouteResponse> => {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=polyline`;
    const response = await fetchWithRetry(url);
    const data = await response.json();
    
    if (!data.routes?.length) {
      console.warn('No route found, using fallback calculation');
      return createFallbackResponse(start, end);
    }

    return {
      distance: data.routes[0].distance / 1000,
      duration: data.routes[0].duration,
      geometry: data.routes[0].geometry
    };
  } catch (error) {
    console.warn('Route calculation failed, using fallback:', error);
    return createFallbackResponse(start, end);
  }
};

export const COMPANY_LOCATION = { lat: 26.510272, lng: -100.006323 };