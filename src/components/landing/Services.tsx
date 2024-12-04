import { motion } from 'framer-motion'
import { Card } from '../ui/card'
import {
  Car,
  Clock,
  MapPin,
  Shield,
  ThumbsUp,
  Truck,
  Wrench,
} from 'lucide-react'

const services = [
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: 'Servicio 24/7',
    description: 'Disponibles todo el día, todos los días del año',
  },
  {
    icon: <MapPin className="w-8 h-8 text-primary" />,
    title: 'Cobertura Amplia',
    description: 'Servicio en toda la región y carreteras principales',
  },
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: 'Seguridad Garantizada',
    description: 'Su vehículo está asegurado durante todo el proceso',
  },
  {
    icon: <ThumbsUp className="w-8 h-8 text-primary" />,
    title: 'Servicio Profesional',
    description: 'Personal capacitado y equipo especializado',
  },
  {
    icon: <Car className="w-8 h-8 text-primary" />,
    title: 'Todo Tipo de Vehículos',
    description: 'Desde motocicletas hasta camiones pesados',
  },
  {
    icon: <Wrench className="w-8 h-8 text-primary" />,
    title: 'Asistencia Mecánica',
    description: 'Diagnóstico y reparaciones menores en sitio',
  },
]

export const Services = () => {
  return (
    <section id="services" className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-6xl"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-heading text-gradient-shine mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-gradient-shine max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios de asistencia vial para
            mantener su vehículo en movimiento
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col items-center"
            >
              <Card className="w-full p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="rounded-full bg-primary/10 p-4 mx-auto mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}