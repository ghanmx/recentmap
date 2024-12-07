import { useState } from 'react'
import { FloatingPanel } from './form/FloatingPanel'
import { LocationSelector } from './form/LocationSelector'
import { useForm } from 'react-hook-form'
import { FormData } from '@/types/form'
import { Location } from '@/types/location'

interface FloatingQuestionsPanelProps {
  pickupLocation: Location | null
  dropLocation: Location | null
  pickupAddress?: string
  dropAddress?: string
  onPickupSelect: (location: Location) => void
  onDropSelect: (location: Location) => void
  onSelectingPickup: () => void
  onSelectingDrop: () => void
}

export const FloatingQuestionsPanel = ({
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  onPickupSelect,
  onDropSelect,
  onSelectingPickup,
  onSelectingDrop,
}: FloatingQuestionsPanelProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const form = useForm<FormData>()

  return (
    <FloatingPanel
      title="Selección de Ubicaciones"
      position="right"
      className="z-[1000]"
    >
      <LocationSelector
        form={form}
        pickupLocation={pickupLocation}
        dropLocation={dropLocation}
        pickupAddress={pickupAddress}
        dropAddress={dropAddress}
        onPickupSelect={onPickupSelect}
        onDropSelect={onDropSelect}
        onSelectingPickup={onSelectingPickup}
        onSelectingDrop={onSelectingDrop}
      />
    </FloatingPanel>
  )
}