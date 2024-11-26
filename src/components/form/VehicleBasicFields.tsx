import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/types/form'
import { VehicleDetails } from './VehicleDetails'

interface VehicleBasicFieldsProps {
  form: UseFormReturn<FormData>
  onVehicleModelChange: (value: string) => void
}

export const VehicleBasicFields = ({
  form,
  onVehicleModelChange,
}: VehicleBasicFieldsProps) => {
  return (
    <div className="space-y-6">
      <VehicleDetails
        onBrandChange={(brand) => {
          form.setValue('vehicleMake', brand)
        }}
        onModelChange={(model) => {
          form.setValue('vehicleModel', model)
          onVehicleModelChange(model)
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
