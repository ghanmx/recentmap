import { useState, Suspense, lazy } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { TowingWrapper } from '@/components/TowingWrapper'
import { Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const TowMap = lazy(() => import('@/components/TowMap'))

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

const LoadingSpinner = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100/80 via-blue-50/80 to-white/80 dark:from-blue-950/80 dark:via-blue-900/80 dark:to-gray-900/80"
  >
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
      <div className="glass-card p-8 rounded-xl shadow-lg border border-blue-200/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg text-center max-w-md mx-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-blue-500/5 to-blue-400/10 animate-shimmer" />
        <div className="relative mb-8">
          <Carousel className="w-full max-w-xs mx-auto">
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
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent">
                      <p className="absolute bottom-4 left-4 text-white font-semibold text-shadow">
                        {image.title}
                      </p>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex border-blue-200 hover:bg-blue-50 dark:border-blue-700 dark:hover:bg-blue-900/50" />
            <CarouselNext className="hidden sm:flex border-blue-200 hover:bg-blue-50 dark:border-blue-700 dark:hover:bg-blue-900/50" />
          </Carousel>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/10 blur-xl rounded-full" />
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-400 relative z-10 mx-auto" />
        </div>
        <Separator className="my-6 bg-blue-200/30 dark:bg-blue-700/30" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent font-heading"
        >
          Cargando las rutas
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-lg font-medium bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-clip-text text-transparent animate-pulse"
        >
          Preparando el mapa...
        </motion.p>
        <Separator className="my-4 bg-blue-200/30 dark:bg-blue-700/30" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-2 text-sm text-blue-600/70 dark:text-blue-400/70 text-center leading-relaxed"
        >
          Porfavor espera en lo que preparamos tu mapa interactivo
          <span className="block mt-1 text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            Esto tomara un momento...
          </span>
        </motion.div>
      </div>
    </div>
  </motion.div>
)

const Index = (): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50/90 via-white/90 to-blue-100/90 dark:from-blue-950/90 dark:via-gray-900/90 dark:to-blue-900/90"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent" />
      <div className="relative z-10 h-full">
        <TowingWrapper>
          <Suspense fallback={<LoadingSpinner />}>
            <TowMap />
          </Suspense>
        </TowingWrapper>
      </div>
    </motion.div>
  )
}

export default Index