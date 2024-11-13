import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/types/form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface VehicleDetailsProps {
  onBrandChange: (brand: string) => void
  onModelChange: (model: string) => void
  onYearChange: (year: string) => void
  onColorChange: (color: string) => void
}

export const VehicleDetails = ({
  onBrandChange,
  onModelChange,
  onYearChange,
  onColorChange,
}: VehicleDetailsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Marca del Vehículo</label>
          <Input
            placeholder="Ej: Toyota"
            onChange={(e) => onBrandChange(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Modelo</label>
          <Input
            placeholder="Ej: Corolla"
            onChange={(e) => onModelChange(e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Año</label>
          <Input
            placeholder="Ej: 2020"
            onChange={(e) => onYearChange(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Color</label>
          <Input
            placeholder="Ej: Rojo"
            onChange={(e) => onColorChange(e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  )
}
