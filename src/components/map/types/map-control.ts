import { Location } from '@/types/location'
import { Dispatch, SetStateAction } from 'react'

export interface MapControlPanelProps {
  selectingPickup: boolean
  selectingDrop: boolean
  setSelectingPickup: Dispatch<SetStateAction<boolean>>
  setSelectingDrop: Dispatch<SetStateAction<boolean>>
  pickupLocation: Location | null
  dropLocation: Location | null
  pickupAddress?: string
  dropAddress?: string
  isLoading?: boolean
}

export interface MapControlsProps {
  selectingPickup: boolean
  selectingDrop: boolean
  onPickupClick: () => void
  onDropClick: () => void
  setSelectingPickup: (value: boolean) => void
  setSelectingDrop: (value: boolean) => void
}