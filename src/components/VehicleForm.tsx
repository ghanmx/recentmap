import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { LocationSelector } from './form/LocationSelector'
import { VehicleBasicFields } from './form/VehicleBasicFields'
import { UserInfoFields } from './form/UserInfoFields'
import { TowTruckSelector } from './form/TowTruckSelector'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { FormData, formSchema } from '@/types/form'
import { useToast } from '@/hooks/use-toast'
import { useTowing } from '@/contexts/TowingContext'

interface Location {
  lat: number
  lng: number
}

interface VehicleFormProps {
  pickupLocation: Location | null
  dropLocation: Location | null
  pickupAddress: string
  dropAddress: string
  onPickupSelect: (location: Location) => void
  onDropSelect: (location: Location) => void
  onSelectingPickup: () => void
  onSelectingDrop: () => void
}
// In VehicleForm.tsx, update the props interface to match the parent
interface VehicleFormProps {
  onPickupSelect: (location: {
    lat: number
    lng: number
    address: string
  }) => void
  onDropSelect: (location: {
    lat: number
    lng: number
    address: string
  }) => void
  // ... other props
}

export const VehicleForm = ({
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  onPickupSelect,
  onDropSelect,
  onSelectingPickup,
  onSelectingDrop,
}: VehicleFormProps) => {
  const { toast } = useToast()
  const [isPending, setIsPending] = useState(false)
  const { updateTruckType } = useTowing()

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: '',
      phone: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vehicleColor: '',
      truckType: 'A',
      issueDescription: '',
    },
  })

  const handleVehicleModelChange = (model: string) => {
    methods.setValue('vehicleModel', model)
  }

  const onSubmit = methods.handleSubmit(async (data) => {
    setIsPending(true)
    try {
      toast({
        title: 'Procesando solicitud',
        description: 'Tu solicitud está siendo procesada...',
      })
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsPending(false)
    }
  })

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={onSubmit} className="space-y-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 bg-gradient-to-br from-white/95 to-blue-50/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <LocationSelector
                form={methods}
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
                <UserInfoFields form={methods} />
                <VehicleBasicFields
                  form={methods}
                  onVehicleModelChange={handleVehicleModelChange}
                />
                <TowTruckSelector
                  form={methods}
                  onTruckTypeChange={updateTruckType}
                  selectedModel={methods.watch('vehicleModel')}
                />
              </div>
            </Card>
          </motion.div>
        </form>
      </Form>
    </FormProvider>
  )
}
