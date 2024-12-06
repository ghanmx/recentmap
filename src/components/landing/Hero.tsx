import { motion } from 'framer-motion'
import { MapIcon, Phone, Star } from 'lucide-react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

export const Hero = () => {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 lg:py-32">
      {/* Enhanced background with parallax effect */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 0.7 }}
          src="/lovable-uploads/bceb9702-dedb-4578-a695-1a2e4089f56f.png"
          alt="Mr Gruas Logo"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/90 dark:from-gray-900/90 dark:via-gray-900/70 dark:to-gray-900/90" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold font-heading text-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-gradient-shine drop-shadow-xl">
              Servicio de Grúas Profesional
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gradient-shine drop-shadow-lg font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Asistencia vehicular / Rescate de vehículos / Transporte de vehículos / Grúa
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group min-w-[200px]"
              onClick={() => navigate('/map')}
            >
              <MapIcon className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Solicitar Servicio
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 group min-w-[200px]"
              onClick={() => window.location.href = 'tel:+5218180107110'}
            >
              <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Llamar Ahora
            </Button>
          </motion.div>

          <motion.div
            className="flex justify-center items-center gap-8 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[
              'Servicio 24/7',
              'Cobertura Regional',
              'Atención Inmediata',
            ].map((feature, index) => (
              <div
                key={feature}
                className="flex items-center gap-2 text-sm md:text-base font-medium text-gray-700 dark:text-gray-300"
              >
                <Star className="h-4 w-4 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent dark:from-gray-900" />
    </section>
  )
}