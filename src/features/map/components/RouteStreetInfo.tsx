import { Card } from '@/components/ui/card'
import { MapPin, Navigation, Loader2 } from 'lucide-react'
import Draggable from 'react-draggable'
import { useRef } from 'react'

interface RouteStreetInfoProps {
  pickupLocation: { lat: number; lng: number } | null
  dropLocation: { lat: number; lng: number } | null
  pickupAddress?: string
  dropAddress?: string
  isLoading?: boolean
}

export const RouteStreetInfo = ({
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  isLoading = false,
}: RouteStreetInfoProps) => {
  const nodeRef = useRef(null)

  if (!pickupLocation && !dropLocation) return null

  return (
    <Draggable handle=".drag-handle" bounds="parent" nodeRef={nodeRef}>
      <div ref={nodeRef} className="absolute z-[1000] max-w-md">
        <Card className="p-4 space-y-3 bg-white/90 backdrop-blur-xl shadow-xl transition-all duration-300 hover:shadow-2xl border-2 border-primary/20 hover:border-primary/30 ring-4 ring-primary/5">
          <div className="flex items-center justify-between border-b pb-2 mb-2 drag-handle cursor-move bg-primary/5 rounded-lg p-2">
            <div className="font-semibold text-sm text-primary/90 drop-shadow-sm">
              Detalles de Ubicación
            </div>
            {isLoading && (
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            )}
          </div>

          {pickupLocation && (
            <div className="flex items-start gap-2 bg-green-50/50 p-3 rounded-lg">
              <MapPin className="w-5 h-5 mt-1 text-green-500 flex-shrink-0 drop-shadow" />
              <div className="flex-1">
                <div className="font-semibold text-sm text-green-700 drop-shadow-sm">Punto de Recogida</div>
                <div className="text-sm text-gray-600 break-words bg-white/50 p-2 rounded-md">
                  {pickupAddress || 'Cargando dirección...'}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Coordenadas: {pickupLocation.lat.toFixed(6)},{' '}
                  {pickupLocation.lng.toFixed(6)}
                </div>
              </div>
            </div>
          )}

          {dropLocation && (
            <div className="flex items-start gap-2 bg-blue-50/50 p-3 rounded-lg">
              <Navigation className="w-5 h-5 mt-1 text-blue-500 flex-shrink-0 drop-shadow" />
              <div className="flex-1">
                <div className="font-semibold text-sm text-blue-700 drop-shadow-sm">Punto de Entrega</div>
                <div className="text-sm text-gray-600 break-words bg-white/50 p-2 rounded-md">
                  {dropAddress || 'Cargando dirección...'}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Coordenadas: {dropLocation.lat.toFixed(6)},{' '}
                  {dropLocation.lng.toFixed(6)}
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </Draggable>
  )
}
