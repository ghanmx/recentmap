import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { CarFront, Truck } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const towingTypes = [
  {
    icon: <CarFront className="w-12 h-12 text-primary" aria-label="Car Front Icon" />,
    title: 'Servicio Plataforma',
    description: 'Ideal para vehículos ligeros y medianos. Transporte seguro sin arrastre.',
    gifs: ['/lovable-uploads/TipoA.gif', '/lovable-uploads/TipoC.gif'],
    detailedDescription: {
      title: 'Servicio de Plataforma - Características',
      content: [
        'Capacidad de carga hasta 2,000 kg',
        'Ideal para vehículos de lujo y deportivos',
        'Evita daños adicionales al vehículo',
        'Perfecto para distancias largas',
        'Sistema hidráulico de última generación',
        'Equipado con sistema de winch para carga segura',
      ],
      pricing: 'Tarifa base desde $528.69 MXN + $18.82 MXN/km',
    },
  },
  {
    icon: <Truck className="w-12 h-12 text-primary" aria-label="Truck Icon" />,
    title: 'Servicio de Rescate',
    description: 'Para situaciones de emergencia y traslados rápidos. Servicio económico.',
    gifs: ['/lovable-uploads/TipoD.gif', '/lovable-uploads/TipoD2.gif'],
    detailedDescription: {
      title: 'Servicio de Rescate - Características',
      content: [
        'Capacidad de carga hasta 8,000 kg',
        'Ideal para vehículos pesados y comerciales',
        'Servicio rápido en emergencias',
        'Equipado para rescates en condiciones difíciles',
        'Personal altamente capacitado',
        'Disponible 24/7 para emergencias',
      ],
      pricing: 'Tarifa base desde $885.84 MXN + $32.35 MXN/km',
    },
  },
];

export const TowingTypes = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-6xl"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-4">
            Tipos de Servicio
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Contamos con diferentes tipos de grúas para adaptarnos a sus necesidades específicas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {towingTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col items-center"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="w-full p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl cursor-pointer">
                    <div className="mb-6">
                      <div className="flex justify-center mb-4">{type.icon}</div>
                      <h3 className="text-2xl font-semibold text-center mb-2">{type.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center mb-4">{type.description}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {type.gifs.map((gif, gifIndex) => (
                        <div
                          key={gifIndex}
                          className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                        >
                          <img
                            src={gif}
                            alt={`Servicio tipo ${gifIndex + 1} para ${type.title}`}
                            className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ))}
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-primary">
                      {type.detailedDescription.title}
                    </DialogTitle>
                    <DialogDescription>
                      <div className="mt-4 space-y-4">
                        <ul className="list-disc pl-5 space-y-2">
                          {type.detailedDescription.content.map((item, i) => (
                            <li key={i} className="text-gray-700 dark:text-gray-300">
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <p className="font-semibold text-primary">
                            Precios Aproximados:
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            {type.detailedDescription.pricing}
                          </p>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};