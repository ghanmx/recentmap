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
    geometry: "_p~iF~ps|U_ulLnnqC_mqNvxq@"
  };
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url: string, retryCount = 0): Promise<Response> => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response;
  } catch (error) {
    if (retryCount < 3) {
      await delay(2000 * Math.pow(2, retryCount));
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