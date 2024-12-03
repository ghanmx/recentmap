const FALLBACK_GEOCODING_URL = 'https://nominatim.openstreetmap.org'

interface GeocodingOptions {
  fuzzyMatch?: boolean
  limit?: number
  countryCode?: string
  proximity?: { lat: number; lng: number }
}

export const searchAddresses = async (
  query: string,
  options: GeocodingOptions = {},
) => {
  const {
    fuzzyMatch = true,
    limit = 10,
    countryCode = 'MX',
    proximity,
  } = options

  const searchParams = new URLSearchParams({
    q: query,
    format: 'json',
    limit: limit.toString(),
    countrycodes: countryCode,
  })

  if (proximity) {
    searchParams.append('lat', proximity.lat.toString())
    searchParams.append('lon', proximity.lng.toString())
  }

  try {
    const response = await fetch(
      `${FALLBACK_GEOCODING_URL}/search?${searchParams}`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'TowingServiceApplication/1.0',
        },
        mode: 'cors',
      },
    )

    if (!response.ok) {
      throw new Error(`Error en la búsqueda de direcciones: ${response.status}`)
    }

    const data = await response.json()
    return data.map((item: any) => ({
      address: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      importance: item.importance || 0,
    }))
  } catch (error) {
    console.error('Error searching addresses:', error)
    return []
  }
}

export const getAddressFromCoordinates = async (
  lat: number,
  lng: number,
): Promise<string> => {
  try {
    // First try with a proxy service (you'll need to set this up)
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
      `${FALLBACK_GEOCODING_URL}/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
    )}`

    const response = await fetch(proxyUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'TowingServiceApplication/1.0',
      },
    })

    if (!response.ok) {
      throw new Error(`Error al obtener la dirección: ${response.status}`)
    }

    const data = await response.json()
    return data.display_name || 'Dirección no encontrada'
  } catch (error) {
    console.error('Error getting address:', error)
    return 'Dirección no disponible'
  }
}