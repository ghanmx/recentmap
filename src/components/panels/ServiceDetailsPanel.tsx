import { PaymentSteps } from '../payment/PaymentSteps'
import { VehicleForm } from '../VehicleForm'
import { LocationDetailsPanel } from './LocationDetailsPanel'
import { Location } from '@/types/location'
import { TowingProvider } from '@/contexts/TowingContext'

interface ServiceDetailsPanelProps {
  pickupLocation: Location | null
  dropLocation: Location | null
  pickupAddress: string
  dropAddress: string
  onPickupSelect: (location: Location) => void
  onDropSelect: (location: Location) => void
  onSelectingPickup: () => void
  onSelectingDrop: () => void
  steps: Array<{ title: string; description: string }>
}

export const ServiceDetailsPanel = ({
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  onPickupSelect,
  onDropSelect,
  onSelectingPickup,
  onSelectingDrop,
  steps,
}: ServiceDetailsPanelProps) => {
  return (
    <>
      <PaymentSteps currentStep={0} steps={steps} />
      <TowingProvider>
        <VehicleForm
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          pickupAddress={pickupAddress}
          dropAddress={dropAddress}
          onPickupSelect={onPickupSelect}
          onDropSelect={onDropSelect}
          onSelectingPickup={onSelectingPickup}
          onSelectingDrop={onSelectingDrop}
        />
      </TowingProvider>
      <LocationDetailsPanel
        pickupLocation={pickupLocation}
        dropLocation={dropLocation}
        pickupAddress={pickupAddress}
        dropAddress={dropAddress}
      />
    </>
  )
}