import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/types/form'
import { VehicleDetails } from './VehicleDetails'

interface VehicleFormFieldsProps {
  form: UseFormReturn<FormData>
  formData: {
    vehicleMake: string
    vehicleModel: string
    vehicleYear: string
    vehicleColor: string
    truckType: string
    requiresManeuver: boolean
    issueDescription: string
    pickupLocation: null | any
    dropoffLocation: null | any
  }
  onChange: (field: string, value: any) => void
  onVehicleModelChange?: (value: string) => void
}

export const VehicleFormFields = ({
  form,
  formData,
  onChange,
  onVehicleModelChange,
}: VehicleFormFieldsProps) => {
  return (
    <div className="space-y-6">
      <VehicleDetails
        onBrandChange={(brand) => {
          form.setValue('vehicleMake', brand)
          onChange('vehicleMake', brand)
        }}
        onModelChange={(model) => {
          form.setValue('vehicleModel', model)
          onChange('vehicleModel', model)
          onVehicleModelChange?.(model)
        }}
        onYearChange={(year) => {
          form.setValue('vehicleYear', year)
          onChange('vehicleYear', year)
        }}
        onColorChange={(color) => {
          form.setValue('vehicleColor', color)
          onChange('vehicleColor', color)
        }}
      />
    </div>
  )
}