import { motion } from 'framer-motion'
import { MapIcon, Phone, Star } from 'lucide-react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

export const Hero = () => {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 0.7 }}
          src="/lovable-uploads/bceb9702-dedb-4578-a695-1a2e4089f56f.png"
          alt="Mr Gruas Logo"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-gray-100/50 to-gray-50/95 dark:from-gray-900/90 dark:via-gray-800/70 dark:to-gray-900/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          {/* Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold font-heading tracking-tight relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-gray-100 to-blue-500 animate-gradient-text"
              initial={{ textShadow: '0px 0px 10px rgba(0,0,255,0.5)' }}
              animate={{
                textShadow: [
                  '0px 0px 10px rgba(0,0,255,0.5)',
                  '0px 0px 20px rgba(0,255,255,0.7)',
                  '0px 0px 10px rgba(0,0,255,0.5)'
                ],
                opacity: [1, 0.9, 1],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'mirror',
              }}
            >
              Servicio de Grúas Profesional
            </motion.span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Asistencia vehicular / Rescate de vehículos / Transporte de vehículos / Grúa
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 group min-w-[200px]"
              onClick={() => navigate('/map')}
            >
              <MapIcon className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Solicitar Servicio
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 group min-w-[200px]"
              onClick={() => (window.location.href = 'tel:+5218180107110')}
            >
              <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Llamar Ahora
            </Button>
          </motion.div>

          {/* Features */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {['Servicio 24/7', 'Cobertura Regional', 'Atención Inmediata'].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 text-sm md:text-base font-medium text-gray-700 dark:text-gray-300"
              >
                <Star className="h-4 w-4 text-blue-600" />
                <span>{feature}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 to-transparent dark:from-gray-900"></div>
    </section>
  )
}
