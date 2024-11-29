import React from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-6xl"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-heading bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-4">
            Nos gustaría saber tu opinión
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dispuestos a brindar ayuda y responder a las preguntas que pueda
            tener.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-center"
          >
            <Card className="w-full p-6 text-center glass-card hover:shadow-lg transition-all duration-300">
              <div className="rounded-full bg-primary/10 p-4 mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Dirección</h3>
              <a
                href="https://goo.gl/maps/Bm2taxCFni9G7ZjD6"
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 hover:text-primary transition-colors"
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
            <Card className="w-full p-6 text-center glass-card hover:shadow-lg transition-all duration-300">
              <div className="rounded-full bg-primary/10 p-4 mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Teléfono</h3>
              <a
                href="tel:+5218180107110"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                +52 1 81 8010 7110
              </a>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-center"
          >
            <Card className="w-full p-6 text-center glass-card hover:shadow-lg transition-all duration-300">
              <div className="rounded-full bg-primary/10 p-4 mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Email</h3>
              <a
                href="mailto:gruasmartinezreyes@hotmail.com"
                className="text-gray-600 hover:text-primary transition-colors break-words"
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
