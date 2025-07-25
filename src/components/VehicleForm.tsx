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
import { Location } from '@/types/location'
import { AnimatedFormText } from './form/AnimatedFormText'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Progress } from '@/components/ui/progress'
import { Car, MapPin, User, Truck } from 'lucide-react'

interface VehicleFormProps {
  pickupLocation: Location | null;
  dropLocation: Location | null;
  pickupAddress: string;
  dropAddress: string;
  onPickupSelect: (location: Location) => void;
  onDropSelect: (location: Location) => void;
  onSelectingPickup: () => void;
  onSelectingDrop: () => void;
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
  const [activeSection, setActiveSection] = useState('location')
  const [progress, setProgress] = useState(25)

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vehicleColor: '',
      truckType: 'A',
      requiresManeuver: false,
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
      setIsPending(false);
    }
  })

  const handleAccordionChange = (value: string) => {
    setActiveSection(value)
    switch (value) {
      case 'location':
        setProgress(25)
        break
      case 'user':
        setProgress(50)
        break
      case 'vehicle':
        setProgress(75)
        break
      case 'truck':
        setProgress(100)
        break
    }
  }

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={onSubmit} className="space-y-8 w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Progress
              value={progress}
              className="h-2 bg-[#6873BC]/20"
              // Removed indicatorClassName and using style prop instead
              style={{
                '--progress-foreground': '#6873BC',
              } as React.CSSProperties}
            />
          </motion.div>

          <Accordion
            type="single"
            collapsible
            value={activeSection}
            onValueChange={handleAccordionChange}
            className="space-y-4"
          >
            <AccordionItem value="location">
              <AccordionTrigger
                className="hover:no-underline group transition-all duration-300"
              >
                <motion.div
                  className="flex items-center gap-2 text-lg font-bold font-heading"
                  whileHover={{ scale: 1.02 }}
                >
                  <MapPin className="h-5 w-5 text-primary group-hover:text-primary transition-colors" />
                  <AnimatedFormText>Ubicación</AnimatedFormText>
                </motion.div>
              </AccordionTrigger>
              <AccordionContent>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="p-6 bg-gradient-to-br from-white/95 to-[#2c5ea8]/5 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-[#2c5ea8]/10">
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
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="user">
              <AccordionTrigger className="hover:no-underline group transition-all duration-300">
                <motion.div
                  className="flex items-center gap-2 text-lg font-bold font-heading"
                  whileHover={{ scale: 1.02 }}
                >
                  <User className="h-5 w-5 text-primary group-hover:text-primary transition-colors" />
                  <AnimatedFormText>Información Personal</AnimatedFormText>
                </motion.div>
              </AccordionTrigger>
              <AccordionContent>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="p-6 bg-gradient-to-br from-white/95 to-[#2c5ea8]/5 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-[#2c5ea8]/10">
                    <UserInfoFields form={methods} />
                  </Card>
                </motion.div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="vehicle">
              <AccordionTrigger className="hover:no-underline group transition-all duration-300">
                <motion.div
                  className="flex items-center gap-2 text-lg font-bold font-heading"
                  whileHover={{ scale: 1.02 }}
                >
                  <Car className="h-5 w-5 text-primary group-hover:text-primary transition-colors" />
                  <AnimatedFormText>Detalles del Vehículo</AnimatedFormText>
                </motion.div>
              </AccordionTrigger>
              <AccordionContent>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="p-6 bg-gradient-to-br from-white/95 to-[#2c5ea8]/5 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-[#2c5ea8]/10">
                    <VehicleBasicFields
                      form={methods}
                      onVehicleModelChange={handleVehicleModelChange}
                    />
                  </Card>
                </motion.div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="truck">
              <AccordionTrigger className="hover:no-underline group transition-all duration-300">
                <motion.div
                  className="flex items-center gap-2 text-lg font-bold font-heading"
                  whileHover={{ scale: 1.02 }}
                >
                  <Truck className="h-5 w-5 text-primary group-hover:text-primary transition-colors" />
                  <AnimatedFormText>Selección de Grúa</AnimatedFormText>
                </motion.div>
              </AccordionTrigger>
              <AccordionContent>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="p-6 bg-gradient-to-br from-white/95 to-[#2c5ea8]/5 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-[#2c5ea8]/10">
                    <TowTruckSelector
                      form={methods}
                      onTruckTypeChange={updateTruckType}
                      selectedModel={methods.watch('vehicleModel')}
                    />
                  </Card>
                </motion.div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </form>
      </Form>
    </FormProvider>
  );
};