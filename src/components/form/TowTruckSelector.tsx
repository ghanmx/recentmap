import { useEffect } from 'react'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { towTruckTypes, getTruckTypeForVehicle } from '@/utils/pricing'
import { Truck } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/types/form'
import { motion } from 'framer-motion'
import { useTowing } from '@/contexts/TowingContext'
import { useToast } from '@/hooks/use-toast'

interface TowTruckSelectorProps {
  form: UseFormReturn<FormData>
  onTruckTypeChange?: (type: 'A' | 'B' | 'C' | 'D') => void
  selectedModel: string
}

export const TowTruckSelector = ({
  form,
  onTruckTypeChange,
  selectedModel,
}: TowTruckSelectorProps) => {
  const { updateTruckType } = useTowing()
  const { toast } = useToast()

  useEffect(() => {
    if (selectedModel) {
      const recommendedType = getTruckTypeForVehicle(selectedModel)
      form.setValue('truckType', recommendedType)
      onTruckTypeChange?.(recommendedType)
      updateTruckType(recommendedType)

      const truckInfo = towTruckTypes[recommendedType]
      toast({
        title: 'Tipo de grúa recomendado',
        description: `Se ha seleccionado ${truckInfo.name} para ${selectedModel} (capacidad: ${truckInfo.maxWeight.toLocaleString()} kg)`,
        duration: 5000,
      })
    }
  }, [selectedModel, form, onTruckTypeChange, updateTruckType])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <FormField
        control={form.control}
        name="truckType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-semibold flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              Tipo de Grúa
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  const truckType = value as 'A' | 'B' | 'C' | 'D'
                  field.onChange(truckType)
                  onTruckTypeChange?.(truckType)
                  updateTruckType(truckType)

                  const selectedTruckInfo = towTruckTypes[truckType]
                  toast({
                    title: `${selectedTruckInfo.name} seleccionada`,
                    description: `Capacidad máxima: ${selectedTruckInfo.maxWeight.toLocaleString()} kg - Tarifa: ${selectedTruckInfo.perKm.toFixed(2)} MXN/km`,
                  })
                }}
                value={field.value}
                className="flex flex-col space-y-3"
              >
                {Object.entries(towTruckTypes).map(([key, type]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: Number(key.charCodeAt(0) - 65) * 0.1,
                    }}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    <RadioGroupItem
                      value={key}
                      id={key}
                      className="border-primary"
                    />
                    <div className="flex items-center gap-2">
                      <Truck
                        className={`w-5 h-5 ${key === 'D' ? 'text-orange-500' : 'text-primary'}`}
                      />
                      <span className="font-medium">
                        {type.name} (hasta {type.maxWeight.toLocaleString()}kg)
                      </span>
                    </div>
                  </motion.div>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </motion.div>
  )
}
