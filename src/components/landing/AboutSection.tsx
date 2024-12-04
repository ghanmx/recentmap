import { motion } from 'framer-motion'
import { Card } from '../ui/card'
import { Mail, MapPin, Phone } from 'lucide-react'

export const AboutSection = () => {
  return (
    <section id="contact" className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-6xl"
      >
        <div className="text-center mb-4">
          <h2 className="text-4xl font-bold font-heading text-gradient-shine mb-4">
            Nos gustaría saber tu opinión
          </h2>
          <p className="text-lg text-black-600 max-w-2xl mx-auto">
            Dispuestos a brindar ayuda y responder a las preguntas que pueda tener.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ContactCard
            icon={<Phone className="w-8 h-8 text-primary" />}
            title="Teléfono"
            href="tel:+5218180107110"
            content="+52 1 81 8010 7110"
          />
          <ContactCard
            icon={<MapPin className="w-8 h-8 text-primary" />}
            title="Dirección"
            href="https://goo.gl/maps/Bm2taxCFni9G7ZjD6"
            content="Autopista Monterrey - Nuevo Laredo\nSabinas - Hidalgo, México"
          />
          <ContactCard
            icon={<Mail className="w-8 h-8 text-primary" />}
            title="Email"
            href="mailto:gruasmartinezreyes@hotmail.com"
            content="gruasmartinezreyes@hotmail.com"
          />
        </div>
      </motion.div>
    </section>
  )
}

const ContactCard = ({
  icon,
  title,
  href,
  content,
}: {
  icon: React.ReactNode
  title: string
  href: string
  content: string
}) => (
  <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col items-center">
    <Card className="w-full p-6 text-center hover:shadow-lg transition-all duration-300">
      <div className="rounded-full bg-primary/10 p-4 mx-auto mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <a
        href={href}
        className="text-gray-600 hover:text-primary transition-colors break-words"
      >
        {content}
      </a>
    </Card>
  </motion.div>
)