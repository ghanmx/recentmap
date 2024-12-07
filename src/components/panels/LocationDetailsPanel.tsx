import { Location } from '@/types/location'
import { Card } from '../ui/card'
import { MapPin, Navigation } from 'lucide-react'

interface LocationDetailsPanelProps {
  pickupLocation: Location | null
  dropLocation: Location | null
  pickupAddress: string
  dropAddress: string
}

export const LocationDetailsPanel = ({
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
}: LocationDetailsPanelProps) => {
  if (!pickupLocation && !dropLocation) return null

  return (
    <Card className="bg-white/95 backdrop-blur-sm p-4 shadow-lg border-blue-100/50 max-w-sm mx-auto">
      {pickupLocation && (
        <div className="flex items-start gap-2 mb-4">
          <MapPin className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
          <div>
            <div className="font-semibold text-shadow-sm">Punto de Recogida</div>
            <div className="text-sm text-gray-600 break-words text-shadow-sm">
              {pickupAddress}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {pickupLocation.lat.toFixed(6)}, {pickupLocation.lng.toFixed(6)}
            </div>
          </div>
        </div>
      )}

      {dropLocation && (
        <div className="flex items-start gap-2">
          <Navigation className="w-5 h-5 mt-1 text-red-500 flex-shrink-0" />
          <div>
            <div className="font-semibold text-shadow-sm">Punto de Entrega</div>
            <div className="text-sm text-gray-600 break-words text-shadow-sm">
              {dropAddress}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {dropLocation.lat.toFixed(6)}, {dropLocation.lng.toFixed(6)}
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}