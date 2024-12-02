import React from 'react'
import { motion } from 'framer-motion'
import { Truck, Link, Warehouse, Car, Shield, Wrench } from 'lucide-react'
import { Card } from '@/components/ui/card'

const services = [
  { icon: Truck, title: 'Grúas de plataforma' },
  { icon: Link, title: 'Grúas de arrastre' },
  { icon: Warehouse, title: 'Grúas carga pesada' },
  { icon: Car, title: 'Arrastre' },
  { icon: Shield, title: 'Resguardo de vehículos' },
  { icon: Wrench, title: 'Servicios adicionales' },
]

export const Services = (): JSX.Element => {
  return (
    <section id="Servicios" className="relative py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6">
            Servicios
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Brindamos el mejor servicio a tiempo a un precio razonable porque
            sabemos lo importante que es su tiempo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 p-6">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-heading font-semibold group-hover:text-primary transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Servicio disponible 24/7
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
