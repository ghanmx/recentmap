interface Location {
  lat: number;
  lng: number;
}

export const calculateRoadDistance = async (point1: Location, point2: Location): Promise<number> => {
  try {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${point1.lng},${point1.lat};${point2.lng},${point2.lat}?overview=false`
    );
    
    if (!response.ok) {
      throw new Error('Error al obtener la ruta');
    }

    const data = await response.json();
    
    if (!data.routes || data.routes.length === 0) {
      throw new Error('No se encontró ninguna ruta');
    }

    // OSRM devuelve la distancia en metros, convertir a kilómetros
    return Number((data.routes[0].distance / 1000).toFixed(2));
  } catch (error) {
    console.error('Error calculando la distancia por carretera:', error);
    // Si falla la API, usar distancia en línea recta como respaldo
    return calculateStraightLineDistance(point1, point2);
  }
};

const calculateStraightLineDistance = (point1: Location, point2: Location): number => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLon = (point2.lng - point1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Number((R * c).toFixed(2));
};