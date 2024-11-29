import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Car } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/types/form'
import { motion } from 'framer-motion'

export interface VehicleSelectorProps {
  form: UseFormReturn<FormData>
  onVehicleModelChange: (value: string) => void
}

export const VehicleSelector = ({
  form,
  onVehicleModelChange,
}: VehicleSelectorProps) => {
  const vehicles = [
    { value: 'sedan', label: 'Sedán' },
    { value: 'suv', label: 'SUV' },
    { value: 'pickup', label: 'Pickup' },
    { value: 'van', label: 'Van' },
    { value: 'truck', label: 'Camión' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <FormField
        control={form.control}
        name="vehicleModel"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-semibold flex items-center gap-2">
              <Car className="w-5 h-5 text-primary" />
              Tipo de Vehículo
            </FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  onVehicleModelChange(value)
                }}
                defaultValue={field.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona el tipo de vehículo" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.value} value={vehicle.value}>
                      {vehicle.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
    </motion.div>
  )
}
