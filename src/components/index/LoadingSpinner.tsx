import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'

const FEATURED_IMAGES = [
  {
    src: '/lovable-uploads/5bd1e0d3-a4e1-4275-9763-92ebb0a5b36c.png',
    alt: 'Mr Gruas Logo with Truck',
    title: 'Servicio Profesional de Grúas',
  },
  {
    src: '/lovable-uploads/241d8ca8-32ad-4b10-a3dd-d10b6ac33567.png',
    alt: 'Mr Gruas Mountain Logo',
    title: 'Cobertura Regional',
  },
  {
    src: '/lovable-uploads/3455912e-e855-4b8b-ade4-bed07e1c437b.png',
    alt: 'Mr Gruas Highway',
    title: 'Servicio en Carretera 24/7',
  },
]

export const LoadingSpinner = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col items-center justify-center min-h-[100dvh] bg-gradient-to-br from-blue-100/80 via-blue-50/80 to-white/80 dark:from-blue-950/80 dark:via-blue-900/80 dark:to-gray-900/80 px-4 sm:px-6 py-safe"
  >
    <div className="relative w-full max-w-lg mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
      <div className="glass-card p-4 sm:p-8 rounded-xl shadow-lg border border-blue-200/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-blue-500/5 to-blue-400/10 animate-shimmer" />
        <div className="relative mb-6 sm:mb-8">
          <Carousel 
            className="w-full max-w-xs mx-auto touch-pan-y"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {FEATURED_IMAGES.map((image, index) => (
                <CarouselItem key={index}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative aspect-video overflow-hidden rounded-lg shadow-blue-200/50 dark:shadow-blue-500/20 shadow-lg group"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="object-contain w-full h-full transform transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent">
                      <p className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white text-sm sm:text-base font-semibold text-shadow">
                        {image.title}
                      </p>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4 border-blue-200 hover:bg-blue-50 dark:border-blue-700 dark:hover:bg-blue-900/50" />
            <CarouselNext className="hidden sm:flex -right-4 border-blue-200 hover:bg-blue-50 dark:border-blue-700 dark:hover:bg-blue-900/50" />
          </Carousel>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/10 blur-xl rounded-full" />
          <Loader2 className="h-8 w-8 sm:h-12 sm:w-12 animate-spin text-blue-600 dark:text-blue-400 relative z-10 mx-auto" />
        </div>
        <Separator className="my-4 sm:my-6 bg-blue-200/30 dark:bg-blue-700/30" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent font-heading"
        >
          Cargando las rutas
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-2 sm:mt-4 text-sm sm:text-base md:text-lg font-medium bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-clip-text text-transparent animate-pulse"
        >
          Preparando el mapa...
        </motion.p>
        <Separator className="my-3 sm:my-4 bg-blue-200/30 dark:bg-blue-700/30" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-2 text-xs sm:text-sm text-blue-600/70 dark:text-blue-400/70 text-center leading-relaxed"
        >
          Por favor espera mientras preparamos tu mapa interactivo
          <span className="block mt-1 text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            Esto tomará un momento...
          </span>
        </motion.div>
      </div>
    </div>
  </motion.div>
)