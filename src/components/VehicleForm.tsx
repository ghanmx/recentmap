import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Car, MapPin, User, Truck } from 'lucide-react';

// Componentes personalizados
import { Form } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LocationSelector } from './form/LocationSelector';
import { VehicleBasicFields } from './form/VehicleBasicFields';
import { UserInfoFields } from './form/UserInfoFields';
import { TowTruckSelector } from './form/TowTruckSelector';
import { AnimatedFormText } from './form/AnimatedFormText';

// Tipos y esquemas
import { FormData, formSchema } from '@/types/form';
import { Location } from '@/types/location';

// Hooks y contextos
import { useToast } from '@/hooks/use-toast';
import { useTowing } from '@/contexts/TowingContext';

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
  const { toast } = useToast();
  const { updateTruckType } = useTowing();

  const [isPending, setIsPending] = useState(false);
  const [activeSection, setActiveSection] = useState('location');
  const [progress, setProgress] = useState(25);

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
  });

  const handleSubmitForm = methods.handleSubmit(async (data) => {
    setIsPending(true);
    try {
      toast({
        title: 'Procesando solicitud',
        description: 'Tu solicitud está siendo procesada...',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsPending(false);
    }
  });

  const handleAccordionChange = (value: string) => {
    setActiveSection(value);
    switch (value) {
      case 'location':
        setProgress(25);
        break;
      case 'user':
        setProgress(50);
        break;
      case 'vehicle':
        setProgress(75);
        break;
      case 'truck':
        setProgress(100);
        break;
    }
  };

  // Configuración de animaciones reutilizables
  const motionConfig = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={handleSubmitForm} className="space-y-8 w-full max-w-4xl mx-auto">
          {/* Barra de progreso animada */}
          <motion.div
            initial={motionConfig.hidden}
            animate={motionConfig.visible}
            transition={{ type: 'tween', duration: 0.6 }}
            className="mb-8"
          >
            <Progress
              value={progress}
              className="h-2 bg-gray-200"
              style={{
                '--progress-foreground': '#45537A',
              } as React.CSSProperties}
            />
          </motion.div>

          {/* Sección del acordeón animado */}
          <Accordion
            type="single"
            collapsible
            value={activeSection}
            onValueChange={handleAccordionChange}
            className="space-y-4"
          >
            {/* SECCIÓN 1: Ubicación */}
            <AccordionItem value="location">
              <AccordionTrigger>
                <motion.div
                  className="flex items-center gap-2 text-lg font-semibold"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <MapPin className="h-5 w-5 text-primary" />
                  <AnimatedFormText>Ubicación</AnimatedFormText>
                </motion.div>
              </AccordionTrigger>
              <AccordionContent>
                <motion.div
                  initial={motionConfig.hidden}
                  animate={motionConfig.visible}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="p-6 shadow-md border border-gray-100 rounded-lg">
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

            {/* SECCIÓN 2: Información del Usuario */}
            <AccordionItem value="user">
              <AccordionTrigger>
                <motion.div
                  className="flex items-center gap-2 text-lg font-semibold"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <User className="h-5 w-5 text-primary" />
                  <AnimatedFormText>Información Personal</AnimatedFormText>
                </motion.div>
              </AccordionTrigger>
              <AccordionContent>
                <motion.div
                  initial={motionConfig.hidden}
                  animate={motionConfig.visible}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="p-6 shadow-md border border-gray-100 rounded-lg">
                    <UserInfoFields form={methods} />
                  </Card>
                </motion.div>
              </AccordionContent>
            </AccordionItem>

            {/* SECCIÓN 3: Información del Vehículo */}
            <AccordionItem value="vehicle">
              <AccordionTrigger>
                <motion.div
                  className="flex items-center gap-2 text-lg font-semibold"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Car className="h-5 w-5 text-primary" />
                  <AnimatedFormText>Detalles del Vehículo</AnimatedFormText>
                </motion.div>
              </AccordionTrigger>
              <AccordionContent>
                <motion.div
                  initial={motionConfig.hidden}
                  animate={motionConfig.visible}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="p-6 shadow-md border border-gray-100 rounded-lg">
                    <VehicleBasicFields
                      form={methods}
                      onVehicleModelChange={(model) =>
                        methods.setValue('vehicleModel', model)
                      }
                    />
                  </Card>
                </motion.div>
              </AccordionContent>
            </AccordionItem>

            {/* SECCIÓN 4: Selección de Grúa */}
            <AccordionItem value="truck">
              <AccordionTrigger>
                <motion.div
                  className="flex items-center gap-2 text-lg font-semibold"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Truck className="h-5 w-5 text-primary" />
                  <AnimatedFormText>Selección de Grúa</AnimatedFormText>
                </motion.div>
              </AccordionTrigger>
              <AccordionContent>
                <motion.div
                  initial={motionConfig.hidden}
                  animate={motionConfig.visible}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="p-6 shadow-md border border-gray-100 rounded-lg">
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