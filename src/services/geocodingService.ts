interface GeocodingResponse {
  features: Array<{
    properties: {
      label: string;
      name: string;
      street: string;
      city: string;
      state: string;
      country: string;
      postcode: string;
    };
    geometry: {
      coordinates: [number, number];
    };
  }>;
}

const NUEVO_LEON_COORDS = {
  lat: 25.5922,
  lng: -99.9962
};

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const getAddressFromCoordinates = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=es`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'TowTruck Application'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Error al obtener la dirección');
    }
    
    const data = await response.json();
    return data.display_name || 'Dirección no encontrada';
  } catch (error) {
    console.error('Error fetching address:', error);
    throw new Error('Error al obtener la dirección');
  }
};

interface SearchResult {
  address: string;
  lat: number;
  lon: number;
  distance: number;
}

export const searchAddresses = async (query: string): Promise<SearchResult[]> => {
  if (!query || query.length < 3) return [];
  
  try {
    // Add Nuevo León context to the search query
    const enhancedQuery = `${query}, Nuevo Leon, Mexico`;
    
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(enhancedQuery)}&limit=10&accept-language=es`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'TowTruck Application'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Error en la búsqueda de direcciones');
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      return [];
    }
    
    // Calculate distance from Nuevo León for each result
    const results = data.map((item: any) => ({
      address: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      distance: calculateDistance(
        parseFloat(item.lat),
        parseFloat(item.lon),
        NUEVO_LEON_COORDS.lat,
        NUEVO_LEON_COORDS.lng
      )
    }));

    // Sort results by distance from Nuevo León
    return results.sort((a, b) => a.distance - b.distance);
  } catch (error) {
    console.error('Error searching addresses:', error);
    throw new Error('Error en la búsqueda de direcciones');
  }
};