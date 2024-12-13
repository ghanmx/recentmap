import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Location } from '@/types/location'
import { FormData } from '@/types/form'
import { VehicleFormFields } from './form/VehicleFormFields'
import { useToast } from '@/hooks/use-toast'

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
  const [isPending, setIsPending] = useState(false)
  const { toast } = useToast()
  const form = useForm<FormData>({
    defaultValues: {
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vehicleColor: '',
      truckType: 'A',
      requiresManeuver: false,
      issueDescription: '',
      pickupLocation: pickupLocation ? {
        lat: pickupLocation.lat,
        lng: pickupLocation.lng,
        address: pickupLocation.address
      } : undefined,
      dropoffLocation: dropLocation ? {
        lat: dropLocation.lat,
        lng: dropLocation.lng,
        address: dropLocation.address
      } : undefined,
    },
  })

  const handleSubmit = async (): Promise<void> => {
    try {
      setIsPending(true)
      // Handle form submission
      const formData = form.getValues()
      console.log('Form submitted:', formData)
      
      toast({
        title: 'Formulario enviado',
        description: 'Los datos han sido procesados correctamente',
      })
      
      return Promise.resolve()
    } catch (error) {
      console.error('Error submitting form:', error)
      
      toast({
        title: 'Error',
        description: 'Hubo un error al procesar el formulario',
        variant: 'destructive',
      })
      
      return Promise.reject(error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <FormProvider {...form}>
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <VehicleFormFields
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
        
        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
          onClick={() => handleSubmit()}
        >
          {isPending ? 'Procesando...' : 'Enviar'}
        </Button>
      </div>
    </FormProvider>
  )
}