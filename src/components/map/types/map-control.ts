import { Location } from '@/types/location'

export interface MapControlsProps {
  selectingPickup: boolean
  selectingDrop: boolean
  setSelectingPickup: (value: boolean) => void
  setSelectingDrop: (value: boolean) => void
}

export interface MapControlPanelProps extends MapControlsProps {
  pickupLocation: Location | null
  dropLocation: Location | null
  pickupAddress: string
  dropAddress: string
  isLoading: boolean
}