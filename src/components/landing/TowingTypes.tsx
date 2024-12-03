import { motion } from 'framer-motion'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card } from '@/components/ui/card'

const TOWING_TYPES = [
  {
    title: 'Servicio de Plataforma',
    description: 'Transporte seguro para todo tipo de vehículos',
    gif: 'https://jmp.sh/s/8HF36yHh1B896xjduKLl',
  },
  {
    title: 'Grúa de Arrastre',
    description: 'Remolque profesional para emergencias',
    gif: 'https://jmp.sh/Voiqn6s3',
  },
  {
    title: 'Servicio de Rescate',
    description: 'Recuperación de vehículos en situaciones complejas',
    gif: 'https://jmp.sh/uKkz3BPs',
  },
  {
    title: 'Asistencia Especializada',
    description: 'Soluciones para todo tipo de situaciones',
    gif: 'https://jmp.sh/i2Qpczhr',
  },
]

export const TowingTypes = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold font-heading bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-4">
            Nuestros Servicios de Grúa
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios de grúa para satisfacer todas
            sus necesidades de asistencia vehicular
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {TOWING_TYPES.map((type, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={type.gif}
                        alt={type.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-lg font-semibold mb-1">
                          {type.title}
                        </h3>
                        <p className="text-sm text-gray-200">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex">
            <CarouselPrevious className="absolute -left-12 top-1/2" />
            <CarouselNext className="absolute -right-12 top-1/2" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}