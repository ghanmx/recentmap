import { motion } from 'framer-motion'
import { Card } from '../ui/card'
import { Clock, MapPin, Shield, ThumbsUp } from 'lucide-react'

const services = [
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: 'Servicio de Grúas',
    description:
      'Disponibles en carreteras MTY-NVO. LAREDO',
  },
  {
    icon: <MapPin className="w-8 h-8 text-primary" />,
    title: 'Cobertura Amplia',
    description:
      'Servicio en toda la región y carreteras principales, llegamos donde nos necesites',
  },
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: 'Seguridad Garantizada',
    description:
      'Tu vehículo está asegurado durante todo el proceso de transporte',
  },
  {
    icon: <ThumbsUp className="w-8 h-8 text-primary" />,
    title: 'Servicio Profesional',
    description:
      'Personal altamente capacitado y equipo especializado para cada situación',
  },
]

export const Services = () => {
  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-6xl"
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold font-heading text-gradient-shine drop-shadow-xl mb-4"
          >
            Nuestros Servicios
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gradient-shine drop-shadow-lg font-semibold max-w-2xl mx-auto"
          >
            Ofrecemos una amplia gama de servicios de asistencia vial para
            mantener su vehículo en movimiento
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              <Card className="w-full p-8 text-center hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <div className="rounded-full bg-primary/10 p-6 mx-auto mb-6 w-20 h-20 flex items-center justify-center">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold font-heading mb-4">{service.title}</h3>
                <p className="text-sm text-muted-foreground">
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