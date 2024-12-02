import { RouteStreetInfo } from './RouteStreetInfo'
import { MapControls } from '@/components/map/MapControls'
import { Location } from '@/types/location'

interface MapControlPanelProps {
  selectingPickup: boolean
  selectingDrop: boolean
  setSelectingPickup: (value: boolean) => void
  setSelectingDrop: (value: boolean) => void
  pickupLocation: Location | null
  dropLocation: Location | null
  pickupAddress: string
  dropAddress: string
  isLoading: boolean
}

export const MapControlPanel = ({
  selectingPickup,
  selectingDrop,
  setSelectingPickup,
  setSelectingDrop,
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  isLoading,
}: MapControlPanelProps) => {
  const handlePickupClick = () => {
    setSelectingPickup(true)
    setSelectingDrop(false)
  }

  const handleDropClick = () => {
    setSelectingDrop(true)
    setSelectingPickup(false)
  }

  return (
    <div className="absolute top-4 left-4 z-[1000] p-4 bg-white rounded-lg shadow-lg">
      <MapControls
        selectingPickup={selectingPickup}
        selectingDrop={selectingDrop}
        onPickupClick={handlePickupClick}
        onDropClick={handleDropClick}
      />
      <RouteStreetInfo
        pickupLocation={pickupLocation}
        dropLocation={dropLocation}
        pickupAddress={pickupAddress}
        dropAddress={dropAddress}
        isLoading={isLoading}
      />
    </div>
  )
}

export default MapControlPanel
