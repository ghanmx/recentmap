import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { VehicleSelector } from './form/VehicleSelector'
import { TowTruckSelector } from './form/TowTruckSelector'
import { LocationSelector } from './form/LocationSelector'
import { UserInfoFields } from './form/UserInfoFields'
import { VehicleBasicFields } from './form/VehicleBasicFields'
import { ManeuverField } from './form/ManeuverField'
import { FormData, formSchema } from '@/types/form'
import { Card } from './ui/card'
import { useTowing } from '@/contexts/TowingContext'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { VehicleFormCopyButton } from './form/VehicleFormCopyButton'

interface VehicleFormProps {
  pickupLocation?: { lat: number; lng: number } | null
  dropLocation?: { lat: number; lng: number } | null
  pickupAddress?: string
  dropAddress?: string
  serviceType?: string
  onPickupSelect?: (location: {
    lat: number
    lng: number
    address: string
  }) => void
  onDropSelect?: (location: {
    lat: number
    lng: number
    address: string
  }) => void
  onSelectingPickup?: (selecting: boolean) => void
  onSelectingDrop?: (selecting: boolean) => void
}

export const VehicleForm = ({
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  serviceType = 'standard',
  onPickupSelect,
  onDropSelect,
  onSelectingPickup,
  onSelectingDrop,
}: VehicleFormProps) => {
  const { updateSelectedVehicleModel, updateTruckType } = useTowing()
  const { toast } = useToast()
  const [isPending, setIsPending] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: '',
      phone: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vehicleColor: '',
      truckType: 'A',
      requiresManeuver: false,
      issueDescription: '',
    },
    mode: 'onChange',
  })

  const handleVehicleModelChange = (value: string) => {
    updateSelectedVehicleModel(value)
    toast({
      title: 'Modelo de Vehículo Actualizado',
      description: `Modelo seleccionado: ${value}`,
    })
  }

  const handleTruckTypeChange = (value: 'A' | 'B' | 'C' | 'D') => {
    form.setValue('truckType', value, { shouldDirty: true })
    updateTruckType(value)
    toast({
      title: 'Tipo de Grúa Actualizado',
      description: `Tipo de grúa seleccionado: ${value}`,
    })
  }

  const onSubmit = form.handleSubmit(async (data) => {
    setIsPending(true)
    try {
      toast({
        title: 'Formulario Enviado',
        description: 'Los detalles del vehículo y ubicación han sido guardados',
      })
    } finally {
      setIsPending(false)
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 bg-gradient-to-br from-white/95 to-blue-50/30 shadow-lg hover:shadow-xl transition-all duration-300">
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
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 bg-gradient-to-br from-white/95 to-blue-50/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="space-y-6">
              <UserInfoFields form={form} />
              <VehicleBasicFields
                form={form}
                onVehicleModelChange={handleVehicleModelChange}
              />
              <ManeuverField form={form} />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-6 bg-gradient-to-br from-white/95 to-blue-50/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <TowTruckSelector
              form={form}
              selectedModel={form.watch('vehicleModel')}
              onTruckTypeChange={handleTruckTypeChange}
            />
          </Card>
        </motion.div>

        <VehicleFormCopyButton
          form={form}
          pickupAddress={pickupAddress}
          dropAddress={dropAddress}
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          isPending={isPending}
        />
      </form>
    </Form>
  )
}
