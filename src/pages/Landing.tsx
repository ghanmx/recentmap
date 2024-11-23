import React from 'react';
import { Header } from '@/components/landing/Header';
import { MetaTags } from '@/components/landing/MetaTags';
import { Services } from '@/components/landing/Services';
import { Hero } from '@/components/landing/Hero';
import { Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const Landing = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="relative z-10">
        <MetaTags />
        <Header />
        <Hero />
        <main>
          <Services />
          
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
                  Dispuestos a brindar ayuda y responder a las preguntas que pueda tener.
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
                      Sabinas Hidalgo, N.L., México
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
        </main>

        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold gradient-text">M.R. Grúas</h3>
                <p className="text-gray-300 leading-relaxed">
                  Servicio profesional de grúas y asistencia vial disponible las 24 horas del día, 
                  los 7 días de la semana. Su seguridad y satisfacción son nuestra prioridad.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold gradient-text">Contacto</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <p className="text-gray-300">
                      México 85D, Autopista Monterrey - Nuevo Laredo<br />
                      Sabinas Hidalgo, N.L., México
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <a href="tel:+5218180107110" className="text-gray-300 hover:text-white transition-colors">
                      +52 1 81 8010 7110
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <a href="mailto:gruasmartinezreyes@hotmail.com" className="text-gray-300 hover:text-white transition-colors break-all">
                      gruasmartinezreyes@hotmail.com
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold gradient-text">Síguenos</h3>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="#" 
                    className="px-4 py-2 bg-gray-800 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-300"
                  >
                    Facebook
                  </a>
                  <a 
                    href="#" 
                    className="px-4 py-2 bg-gray-800 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-300"
                  >
                    Twitter
                  </a>
                  <a 
                    href="#" 
                    className="px-4 py-2 bg-gray-800 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-300"
                  >
                    Instagram
                  </a>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 pt-8 border-t border-gray-700 text-center"
            >
              <p className="text-gray-400">
                © {new Date().getFullYear()} M.R. Grúas. Todos los derechos reservados.
              </p>
            </motion.div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
