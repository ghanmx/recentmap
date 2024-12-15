export interface Coordinates {
  lat: number
  lng: number
}

export interface OSRMResponse {
  routes: {
    distance: number
    duration: number
    geometry: string
  }[]
}