import { MapPin, Navigation } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MapControlsProps {
  selectingPickup: boolean
  selectingDrop: boolean
  onPickupClick: () => void
  onDropClick: () => void
}

export const MapControls = ({
  selectingPickup,
  selectingDrop,
  onPickupClick,
  onDropClick,
}: MapControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        variant="outline"
        size="lg"
        onClick={onPickupClick}
        className={cn(
          'flex items-center gap-2 transition-all duration-300',
          selectingPickup
            ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
            : 'hover:bg-green-50',
        )}
      >
        <MapPin className="h-4 w-4" />
        <span className="hidden sm:inline">Punto de Recogida</span>
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={onDropClick}
        className={cn(
          'flex items-center gap-2 transition-all duration-300',
          selectingDrop
            ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
            : 'hover:bg-blue-50',
        )}
      >
        <Navigation className="h-4 w-4" />
        <span className="hidden sm:inline">Punto de Entrega</span>
      </Button>
    </div>
  )
}