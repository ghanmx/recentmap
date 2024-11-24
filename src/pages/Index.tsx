import { useState, Suspense, lazy } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { TowingWrapper } from '@/components/TowingWrapper'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
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
    src: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmrgruas.github.io%2F&psig=AOvVaw0W-StWu4TaPfbI_4cmaWwn&ust=1732460736484000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKDe-s7d8okDFQAAAAAdAAAAABAE',
    alt: 'Featured service 1',
    title: 'Professional Service',
  },
  {
    src: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmrgruas.github.io%2F&psig=AOvVaw0W-StWu4TaPfbI_4cmaWwn&ust=1732460736484000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKDe-s7d8okDFQAAAAAdAAAAABAJ',
    alt: 'Featured service 2',
    title: '24/7 Support',
  },
  {
    src: 'https://mrgruas.github.io/img/TipoA.gif',
    alt: 'Featured service 3',
    title: 'Nationwide Coverage',
  },
]

const LoadingSpinner = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
  >
    <div className="glass-card p-8 rounded-xl shadow-lg border border-blue-200/20 text-center max-w-md mx-auto">
      <div className="relative mb-8">
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            {FEATURED_IMAGES.map((image, index) => (
              <CarouselItem key={index}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative aspect-video overflow-hidden rounded-lg"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="absolute bottom-4 left-4 text-white font-semibold">
                      {image.title}
                    </p>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full" />
        <Loader2 className="h-12 w-12 animate-spin text-primary relative z-10 mx-auto" />
      </div>
      <Separator className="my-6 bg-blue-200/20" />
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent font-heading"
      >
        Cargando las rutas
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-lg font-medium bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent animate-pulse"
      >
        Preparando el mapa...
      </motion.p>
      <Separator className="my-4 bg-blue-200/20" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-2 text-sm text-muted-foreground text-center leading-relaxed"
      >
        Porfavor espera en lo que preparamos tu mapa interactivo
        <span className="block mt-1 text-xs text-blue-500/70 hover:text-blue-600/70 transition-colors">
          Esto tomara un momento...
        </span>
      </motion.div>
    </div>
  </motion.div>
)

const Index = (): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-blue-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-destructive/5" />
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
