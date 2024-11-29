interface Location {
  lat: number
  lng: number
}

const MEXICAN_ROADS_ADJUSTMENT = 1.15 // 15% adjustment for Mexican roads
const URBAN_AREA_THRESHOLD = 0.1 // 100m threshold for urban area detection

export const calculateRoadDistance = async (
  point1: Location,
  point2: Location,
): Promise<number> => {
  try {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${point1.lng},${point1.lat};${point2.lng},${point2.lat}?overview=false&alternatives=true`,
    )

    if (!response.ok) {
      throw new Error('Error al obtener la ruta')
    }

    const data = await response.json()

    if (!data.routes || data.routes.length === 0) {
      throw new Error('No se encontró ninguna ruta')
    }

    // Find the most efficient route
    const bestRoute = data.routes.reduce((best: any, current: any) => {
      return current.duration / current.distance < best.duration / best.distance
        ? current
        : best
    }, data.routes[0])

    // Apply Mexican roads adjustment
    return Number(
      ((bestRoute.distance / 1000) * MEXICAN_ROADS_ADJUSTMENT).toFixed(2),
    )
  } catch (error) {
    console.error('Error calculando la distancia por carretera:', error)
    return (
      calculateStraightLineDistance(point1, point2) * MEXICAN_ROADS_ADJUSTMENT
    )
  }
}

const calculateStraightLineDistance = (
  point1: Location,
  point2: Location,
): number => {
  const R = 6371
  const dLat = ((point2.lat - point1.lat) * Math.PI) / 180
  const dLon = ((point2.lng - point1.lng) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((point1.lat * Math.PI) / 180) *
      Math.cos((point2.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Number((R * c).toFixed(2))
}
