import { MapPin, Navigation } from 'lucide-react'

interface MapMetricsProps {
  distance: number
  price: number
}

export const MapMetrics = ({ distance, price }: MapMetricsProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <MapPin className="text-green-500" />
        <span className="font-semibold">
          Distance:
        </span> {distance.toFixed(2)} km
      </div>
      <div className="flex items-center gap-2">
        <Navigation className="text-primary" />
        <span className="font-semibold">
          Estimated Cost:
        </span> ${price}
      </div>
    </div>
  )
}
