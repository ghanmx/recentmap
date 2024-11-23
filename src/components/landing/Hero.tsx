import { motion } from 'framer-motion';
import { MapIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7 }}
          src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fmrgruas.github.io%2F&psig=AOvVaw0W-StWu4TaPfbI_4cmaWwn&ust=1732460736484000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKDe-s7d8okDFQAAAAAdAAAAABAE"
          alt="Hero background"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold font-heading">
            Servicio de Grúas Profesional
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            Asistencia vehicular 24/7 en toda la región
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => navigate('/map')}
            >
              <MapIcon className="mr-2 h-5 w-5" />
              Solicitar Servicio
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
              onClick={() => window.location.href = 'tel:+5218180107110'}
            >
              Llamar Ahora
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};