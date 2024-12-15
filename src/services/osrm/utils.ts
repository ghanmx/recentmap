export const wait = (ms: number): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms))

export const calculateBackoffDelay = (attempt: number): number => {
  return Math.min(1100 * Math.pow(2, attempt), 5000)
}

export const normalizeCoordinate = (coord: number, isLongitude: boolean): number => {
  const max = isLongitude ? 180 : 90
  let normalized = coord % (max * 2)

  if (normalized > max) {
    normalized = normalized - (max * 2)
  } else if (normalized < -max) {
    normalized = normalized + (max * 2)
  }

  return Number(normalized.toFixed(6))
}

export const calculateStraightLineDistance = (
  start: { lat: number; lng: number },
  end: { lat: number; lng: number },
): number => {
  const R = 6371
  const dLat = ((end.lat - start.lat) * Math.PI) / 180
  const dLon = ((end.lng - start.lng) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((start.lat * Math.PI) / 180) *
      Math.cos((end.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Number((R * c).toFixed(2))
}