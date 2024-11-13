import { Button } from '@/components/ui/button'
import { MapPin, Navigation } from 'lucide-react'
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
    <div className="flex flex-col sm:flex-row gap-4">
      <Button
        variant={selectingPickup ? 'secondary' : 'outline'}
        onClick={onPickupClick}
        className={cn(
          'flex-1 flex items-center justify-center gap-3 h-14 text-base font-medium',
          'bg-white/95 backdrop-blur-sm border border-gray-200',
          'hover:bg-primary/10 hover:border-primary/50',
          'active:scale-[0.98] transition-all duration-200',
          'shadow-sm hover:shadow-md',
          selectingPickup && 'bg-primary/10 border-primary text-primary',
        )}
      >
        <MapPin
          className={cn(
            'w-5 h-5 transition-colors',
            selectingPickup ? 'text-primary' : 'text-gray-600',
          )}
        />
        Seleccionar Punto de Recogida
      </Button>
      <Button
        variant={selectingDrop ? 'secondary' : 'outline'}
        onClick={onDropClick}
        className={cn(
          'flex-1 flex items-center justify-center gap-3 h-14 text-base font-medium',
          'bg-white/95 backdrop-blur-sm border border-gray-200',
          'hover:bg-primary/10 hover:border-primary/50',
          'active:scale-[0.98] transition-all duration-200',
          'shadow-sm hover:shadow-md',
          selectingDrop && 'bg-primary/10 border-primary text-primary',
        )}
      >
        <Navigation
          className={cn(
            'w-5 h-5 transition-colors',
            selectingDrop ? 'text-primary' : 'text-gray-600',
          )}
        />
        Seleccionar Punto de Entrega
      </Button>
    </div>
  )
}
