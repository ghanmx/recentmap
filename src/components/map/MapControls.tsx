import { MapPin, Navigation } from 'lucide-react'
import { MapButton } from '@/components/ui/map-button'

interface MapControlsProps {
  selectingPickup: boolean
  selectingDrop: boolean
  onPickupClick: () => void
  onDropClick: () => void
  setSelectingPickup: (value: boolean) => void
  setSelectingDrop: (value: boolean) => void
}

export const MapControls = ({
  selectingPickup,
  selectingDrop,
  onPickupClick,
  onDropClick,
  setSelectingPickup,
  setSelectingDrop,
}: MapControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <MapButton
        icon={<MapPin className="h-4 w-4" />}
        label="Punto de Recogida"
        isActive={selectingPickup}
        onClick={() => {
          onPickupClick()
          setSelectingPickup(true)
          setSelectingDrop(false)
        }}
      />
      <MapButton
        icon={<Navigation className="h-4 w-4" />}
        label="Punto de Entrega"
        isActive={selectingDrop}
        onClick={() => {
          onDropClick()
          setSelectingDrop(true)
          setSelectingPickup(false)
        }}
      />
    </div>
  )
}