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
  }>;
}

export const getAddressFromCoordinates = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    return data.display_name || 'Address not found';
  } catch (error) {
    console.error('Error fetching address:', error);
    return 'Error fetching address';
  }
};

export const searchAddresses = async (query: string): Promise<string[]> => {
  if (!query || query.length < 3) return [];
  
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
    );
    const data = await response.json();
    return data.map((item: any) => item.display_name);
  } catch (error) {
    console.error('Error searching addresses:', error);
    return [];
  }
};