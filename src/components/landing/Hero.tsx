import { motion } from 'framer-motion'
import { MapIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

export const Hero = () => {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 0.7 }}
          src="https://mrgruas.imgix.net/hero-bg.jpg?auto=compress,format&q=80"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-white/80 dark:from-gray-900/80 dark:via-gray-900/50 dark:to-gray-900/80" />
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
            Asistencia vehicular 24/7 en toda la región
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
              onClick={() => navigate('/map')}
            >
              <MapIcon className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Solicitar Servicio
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => (window.location.href = 'tel:+5218180107110')}
            >
              Llamar Ahora
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent dark:from-gray-900" />
    </section>
  )
}