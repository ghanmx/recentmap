import React from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm">
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
            Contáctanos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gradient-shine drop-shadow-lg font-semibold max-w-2xl mx-auto"
          >
            Estamos aquí para ayudarte. Contáctanos por cualquiera de estos medios
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-center"
          >
            <Card className="w-full p-8 text-center hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <div className="rounded-full bg-primary/10 p-4 mx-auto mb-6 w-16 h-16 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Dirección</h3>
              <a
                href="https://goo.gl/maps/Bm2taxCFni9G7ZjD6"
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
              >
                México 85D, Autopista Monterrey - Nuevo Laredo
                <br />
                Agualeguas Km 6+100 #200 Ebano, 65336 Sabinas Hidalgo, N.L.
              </a>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-center"
          >
            <Card className="w-full p-8 text-center hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <div className="rounded-full bg-primary/10 p-4 mx-auto mb-6 w-16 h-16 flex items-center justify-center">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Teléfono</h3>
              <a
                href="tel:+5218180107110"
                className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
              >
                +52 1 81 8010 7110
              </a>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-center"
          >
            <Card className="w-full p-8 text-center hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <div className="rounded-full bg-primary/10 p-4 mx-auto mb-6 w-16 h-16 flex items-center justify-center">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Email</h3>
              <a
                href="mailto:gruasmartinezreyes@hotmail.com"
                className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors break-words"
              >
                gruasmartinezreyes@hotmail.com
              </a>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}