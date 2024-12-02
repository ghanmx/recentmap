import { RouteStreetInfo } from '@/features/map/components/RouteStreetInfo'
import { MapControls } from '@/features/map/components/MapControls'
import { useMapState } from '@/features/map/hooks/useMapState'
import { Location } from '@/types/location'

interface MapControlsProps {
  selectingPickup: boolean
  selectingDrop: boolean
  setSelectingPickup: (value: boolean) => void
  setSelectingDrop: (value: boolean) => void
}

const MapControlPanel = () => {
  const {
    pickupLocation,
    dropLocation,
    pickupAddress,
    dropAddress,
    selectingPickup,
    selectingDrop,
    setSelectingPickup,
    setSelectingDrop,
    isLoading,
  } = useMapState()

  return (
    <div className="absolute top-4 left-4 z-[1000] p-4 bg-white rounded-lg shadow-lg">
      <RouteStreetInfo
        pickupLocation={pickupLocation}
        dropLocation={dropLocation}
        pickupAddress={pickupAddress}
        dropAddress={dropAddress}
        isLoading={isLoading}
      />
      <MapControls
        selectingPickup={selectingPickup}
        selectingDrop={selectingDrop}
        setSelectingPickup={setSelectingPickup}
        setSelectingDrop={setSelectingDrop}
      />
    </div>
  )
}

export default MapControlPanel