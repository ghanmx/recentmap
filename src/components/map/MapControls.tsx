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
    <div className="flex flex-col sm:flex-row gap-3 p-4 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg">
      <Button
        variant="outline"
        size="lg"
        onClick={onPickupClick}
        className={cn(
          'flex items-center gap-2 transition-all duration-500',
          'bg-gradient-to-r hover:scale-[1.02]',
          selectingPickup
            ? 'from-green-50 to-green-100 border-green-200 text-green-700 shadow-[0_0_15px_rgba(0,255,0,0.1)]'
            : 'hover:from-green-50 hover:to-white',
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
          'flex items-center gap-2 transition-all duration-500',
          'bg-gradient-to-r hover:scale-[1.02]',
          selectingDrop
            ? 'from-blue-50 to-blue-100 border-blue-200 text-blue-700 shadow-[0_0_15px_rgba(0,0,255,0.1)]'
            : 'hover:from-blue-50 hover:to-white',
        )}
      >
        <Navigation className="h-4 w-4" />
        <span className="hidden sm:inline">Punto de Entrega</span>
      </Button>
    </div>
  )
}