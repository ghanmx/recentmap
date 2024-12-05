export const calculateMapCenter = (markers: { lat: number; lng: number }[]) => {
  if (markers.length === 0) return null;
  
  const total = markers.reduce(
    (acc, marker) => ({
      lat: acc.lat + marker.lat,
      lng: acc.lng + marker.lng,
    }),
    { lat: 0, lng: 0 }
  );
  
  return {
    lat: total.lat / markers.length,
    lng: total.lng / markers.length,
  };
};

export const fitBoundsToMarkers = (markers: { lat: number; lng: number }[]) => {
  if (markers.length === 0) return null;
  
  const bounds = markers.reduce(
    (acc, marker) => ({
      minLat: Math.min(acc.minLat, marker.lat),
      maxLat: Math.max(acc.maxLat, marker.lat),
      minLng: Math.min(acc.minLng, marker.lng),
      maxLng: Math.max(acc.maxLng, marker.lng),
    }),
    {
      minLat: markers[0].lat,
      maxLat: markers[0].lat,
      minLng: markers[0].lng,
      maxLng: markers[0].lng,
    }
  );
  
  return [
    [bounds.minLat, bounds.minLng],
    [bounds.maxLat, bounds.maxLng],
  ];
};