import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { CarFront, Truck } from 'lucide-react';

const towingTypes = [
  {
    icon: <CarFront className="w-12 h-12 text-primary" aria-label="Car Front Icon" />,
    title: 'Grúa Plataforma',
    description: 'Ideal para vehículos ligeros y medianos. Transporte seguro sin arrastre.',
    gif: '/lovable-uploads/TipoA.gif',
  },
  {
    icon: <Truck className="w-12 h-12 text-primary" aria-label="Truck Icon" />,
    title: 'Grúa de Arrastre',
    description: 'Para situaciones de emergencia y traslados rápidos. Servicio económico.',
    gif: '/lovable-uploads/TipoD2.gif',
  },
];

export const TowingTypes = () => {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-6xl"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-heading text-gradient-shine mb-4">
            Tipos de Servicio
          </h2>
          <p className="text-lg text-gradient-shine max-w-2xl mx-auto">
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
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center"
            >
              <Card className="w-full p-8 text-center hover:shadow-xl transition-all duration-300">
                {type.gif ? (
                  <div className="w-full h-48 mb-6 overflow-hidden rounded-lg">
                    <img
                      src={type.gif}
                      alt={`GIF for ${type.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="rounded-full bg-primary/10 p-6 mx-auto mb-6">
                    {type.icon}
                  </div>
                )}
                <h3 className="text-2xl font-semibold mb-4">{type.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{type.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};