import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/types/form'
import { VehicleDetails } from './VehicleDetails'
import { Location } from '@/types/location'

interface VehicleFormFieldsProps {
  form: UseFormReturn<FormData>
  pickupLocation: Location | null
  dropLocation: Location | null
  pickupAddress: string
  dropAddress: string
  onPickupSelect: (location: Location) => void
  onDropSelect: (location: Location) => void
  onSelectingPickup: () => void
  onSelectingDrop: () => void
}

export const VehicleFormFields = ({
  form,
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  onPickupSelect,
  onDropSelect,
  onSelectingPickup,
  onSelectingDrop,
}: VehicleFormFieldsProps) => {
  return (
    <div className="space-y-6">
      <VehicleDetails
        onBrandChange={(brand) => {
          form.setValue('vehicleMake', brand)
        }}
        onModelChange={(model) => {
          form.setValue('vehicleModel', model)
        }}
        onYearChange={(year) => {
          form.setValue('vehicleYear', year)
        }}
        onColorChange={(color) => {
          form.setValue('vehicleColor', color)
        }}
      />
    </div>
  )
}