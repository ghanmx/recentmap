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

export const getAddressFromCoordinates = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=es`
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
}

export const searchAddresses = async (query: string): Promise<SearchResult[]> => {
  if (!query || query.length < 3) return [];
  
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&accept-language=es`
    );
    
    if (!response.ok) {
      throw new Error('Error en la búsqueda de direcciones');
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }
    
    return data.map((item: any) => ({
      address: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon)
    }));
  } catch (error) {
    console.error('Error searching addresses:', error);
    throw new Error('Error en la búsqueda de direcciones');
  }
};