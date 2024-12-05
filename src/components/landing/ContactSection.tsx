import React from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

export const ContactSection = () => {
  return (
    <section id="contact" className="py-12 px-4 bg-primary/5 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-6xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-center"
          >
            <Card className="w-full p-4 text-center hover:shadow-lg transition-all duration-300 bg-white/80">
              <div className="rounded-full bg-primary/10 p-3 mx-auto mb-2">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Dirección</h3>
              <a
                href="https://goo.gl/maps/Bm2taxCFni9G7ZjD6"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-gray-600 hover:text-primary transition-colors"
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
            <Card className="w-full p-4 text-center hover:shadow-lg transition-all duration-300 bg-white/80">
              <div className="rounded-full bg-primary/10 p-3 mx-auto mb-2">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Teléfono</h3>
              <a
                href="tel:+5218180107110"
                className="text-sm text-gray-600 hover:text-primary transition-colors"
              >
                +52 1 81 8010 7110
              </a>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-center"
          >
            <Card className="w-full p-4 text-center hover:shadow-lg transition-all duration-300 bg-white/80">
              <div className="rounded-full bg-primary/10 p-3 mx-auto mb-2">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <a
                href="mailto:gruasmartinezreyes@hotmail.com"
                className="text-sm text-gray-600 hover:text-primary transition-colors break-words"
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