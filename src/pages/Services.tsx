import React from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/landing/Header'
import { FooterSection } from '@/components/landing/FooterSection'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Calculator, Car, Truck, MapPin, Clock, DollarSign, Info, Phone, AlertTriangle, FileText, CreditCard, Route } from 'lucide-react'

const Services: React.FC = () => {
  const truckTypes = [
    {
      type: 'A',
      name: 'Grúa Tipo A',
      description: 'Para vehículos ligeros y compactos',
      capacity: 'Hasta 3.5 toneladas',
      vehicles: ['Autos compactos', 'Sedanes medianos', 'Hatchbacks', 'Vehículos subcompactos'],
      baseRate: 18.82,
      maneuverCost: 1219.55,
      flagDrop: 528.69,
      color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    },
    {
      type: 'B',
      name: 'Grúa Tipo B',
      description: 'Para vehículos medianos',
      capacity: 'Hasta 5 toneladas',
      vehicles: ['Sedanes grandes', 'SUVs medianos', 'Pickups ligeras', 'Camionetas familiares'],
      baseRate: 20.62,
      maneuverCost: 1336.73,
      flagDrop: 607.43,
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    },
    {
      type: 'C',
      name: 'Grúa Tipo C',
      description: 'Para vehículos grandes y pesados',
      capacity: 'Hasta 8 toneladas',
      vehicles: ['SUVs grandes', 'Pickups pesadas', 'Vans comerciales', 'Camiones ligeros'],
      baseRate: 23.47,
      maneuverCost: 1524.21,
      flagDrop: 721.79,
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    },
    {
      type: 'D',
      name: 'Grúa Tipo D',
      description: 'Para vehículos extra pesados',
      capacity: 'Hasta 12 toneladas',
      vehicles: ['Camiones comerciales', 'Autobuses', 'Vehículos industriales', 'Maquinaria pesada'],
      baseRate: 32.35,
      maneuverCost: 2101.65,
      flagDrop: 885.84,
      color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    }
  ]

  const faqItems = [
    {
      question: '¿Cómo se calcula la distancia total del servicio?',
      answer: 'La distancia incluye el recorrido completo: desde nuestra empresa hasta el punto de recogida, del punto de recogida al destino final, y del destino de vuelta a nuestra empresa. Esto garantiza el costo real del servicio completo.'
    },
    {
      question: '¿El precio incluye los peajes?',
      answer: 'Sí, todos los peajes del recorrido completo están incluidos automáticamente en el cálculo. No hay cargos adicionales por peajes en las carreteras.'
    },
    {
      question: '¿Qué pasa si necesito cancelar el servicio?',
      answer: 'Puedes cancelar sin costo antes de que la grúa salga de nuestra empresa. Una vez en camino, se aplicará un cargo por movilización según la distancia recorrida.'
    },
    {
      question: '¿Qué hacer en caso de emergencia?',
      answer: 'Para emergencias las 24 horas, llama directamente al número de emergencia. Priorizamos los servicios de emergencia y mantenemos grúas disponibles para respuesta rápida.'
    },
    {
      question: '¿Puedo cambiar el destino durante el servicio?',
      answer: 'Sí, pero el cambio puede implicar costos adicionales basados en la nueva distancia total. Te informaremos del nuevo costo antes de proceder.'
    },
    {
      question: '¿Qué incluye el cargo por maniobra?',
      answer: 'El cargo por maniobra cubre situaciones especiales como vehículos en lugares de difícil acceso, estacionamientos subterráneos, o que requieren maniobras especiales de carga.'
    },
    {
      question: '¿Necesito factura?',
      answer: 'La factura es opcional. Si requieres factura fiscal, se aplicará el 16% de IVA sobre el total del servicio. Solicítala al momento de contratar el servicio.'
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos efectivo, tarjetas de débito y crédito, transferencias bancarias y pagos electrónicos. El pago se realiza al completar el servicio.'
    }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/5" />
      
      <Header />
      
      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold font-heading mb-6 text-foreground"
            >
              Nuestros Servicios de Grúas
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Servicio profesional de grúas con tarifas transparentes y cobertura completa en toda la región
            </motion.p>
          </div>
        </section>

        {/* Truck Types Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold font-heading text-center mb-12 text-foreground"
            >
              Tipos de Grúas Disponibles
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {truckTypes.map((truck, index) => (
                <motion.div
                  key={truck.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-2xl font-bold font-heading">{truck.name}</CardTitle>
                        <Badge className={truck.color}>{truck.type}</Badge>
                      </div>
                      <CardDescription>{truck.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-primary" />
                        <span className="font-medium">{truck.capacity}</span>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold font-heading mb-2">Vehículos compatibles:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {truck.vehicles.map((vehicle, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Car className="h-3 w-3" />
                              {vehicle}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator />

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Tarifa por km:</span>
                          <span className="font-medium">${truck.baseRate} MXN</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Banderazo:</span>
                          <span className="font-medium">${truck.flagDrop} MXN</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Maniobra especial:</span>
                          <span className="font-medium">${truck.maneuverCost} MXN</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Cost Calculation Section */}
        <section className="py-16 px-4 bg-white/50 dark:bg-gray-800/50">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold font-heading text-center mb-8 text-foreground"
            >
              ¿Cómo Calculamos el Costo?
            </motion.h2>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Transparencia Total en Nuestras Tarifas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-bold font-heading mb-2">Distancia Total</h3>
                      <p className="text-sm text-muted-foreground">
                        Empresa → Punto de recogida → Destino → Empresa
                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <Truck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h3 className="font-bold font-heading mb-2">Tipo de Grúa</h3>
                      <p className="text-sm text-muted-foreground">
                        Según el peso y tamaño de su vehículo
                      </p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                      <Route className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <h3 className="font-bold font-heading mb-2">Peajes Incluidos</h3>
                      <p className="text-sm text-muted-foreground">
                        Todos los peajes del recorrido automáticamente
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-bold font-heading mb-4">Componentes del Costo:</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                        <div className="flex items-center gap-2">
                          <Route className="h-4 w-4 text-blue-600" />
                          <span>Distancia total × Tarifa por km</span>
                        </div>
                        <span className="text-sm font-medium">Variable</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-green-600" />
                          <span>Banderazo (cargo base)</span>
                        </div>
                        <span className="text-sm font-medium">Fijo por tipo</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          <span>Maniobra especial (opcional)</span>
                        </div>
                        <span className="text-sm font-medium">Solo si aplica</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-purple-600" />
                          <span>Peajes del recorrido</span>
                        </div>
                        <span className="text-sm font-medium">Automático</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-red-600" />
                          <span>IVA (solo con factura)</span>
                        </div>
                        <span className="text-sm font-medium">16% opcional</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Ejemplo de Cálculo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <h4 className="font-semibold mb-2">Escenario: Auto sedán desde Monterrey a Guadalupe</h4>
                    <div className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                      <p>• Empresa a punto de recogida: 15 km</p>
                      <p>• Punto de recogida a destino: 25 km</p>
                      <p>• Destino de vuelta a empresa: 20 km</p>
                      <p>• <strong>Total: 60 km</strong></p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Grúa Tipo B:</h4>
                      <div className="text-sm space-y-1">
                        <p>60 km × $20.62 = $1,237.20</p>
                        <p>Banderazo: $607.43</p>
                        <p>Peajes: $45.00</p>
                        <p className="font-semibold border-t pt-1">Total: $1,889.63</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      * Los peajes se calculan automáticamente según la ruta
                      <br />
                      * Precios de ejemplo, pueden variar según condiciones específicas
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold font-heading text-center mb-12 text-foreground"
            >
              Preguntas Frecuentes
            </motion.h2>

            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 dark:border-gray-700 rounded-lg px-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300 pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 bg-white/50 dark:bg-gray-800/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold font-heading mb-8 text-foreground"
            >
              ¿Necesitas Ayuda?
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 justify-center">
                    <Phone className="h-5 w-5" />
                    Emergencias 24/7
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold font-heading text-primary mb-2">811-123-4567</p>
                  <p className="text-sm text-muted-foreground">
                    Respuesta inmediata para emergencias en carretera
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 justify-center">
                    <CreditCard className="h-5 w-5" />
                    Solicitar Servicio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.a
                    href="/map"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block w-full py-3 px-6 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Calcular Costo y Solicitar
                  </motion.a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </motion.div>
  )
}

export default Services