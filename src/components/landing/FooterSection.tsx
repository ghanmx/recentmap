import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'

export const FooterSection = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <CompanyInfo />
          <ContactInfo />
          <SocialLinks />
        </div>
        <Copyright />
      </div>
    </footer>
  )
}

const CompanyInfo = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="space-y-4"
  >
    <h3 className="text-2xl font-bold text-gradient-shine">M.R. Grúas</h3>
    <p className="text-gray-300 leading-relaxed">
      Servicio profesional de grúas y asistencia vial. Su seguridad y satisfacción son nuestra
      prioridad.
    </p>
  </motion.div>
)

const ContactInfo = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2 }}
    className="space-y-4"
  >
    <h3 className="text-2xl font-bold text-gradient-shine">Contacto</h3>
    <div className="space-y-3">
      <div className="flex items-start space-x-3">
        <MapPin className="w-5 h-5 text-primary mt-1" />
        <p className="text-gray-300">
          México 85D, Autopista Monterrey - Nuevo Laredo
          <br />
          Agualeguas Km 6+100 #200 Ebano, 65336 Sabinas Hidalgo, N.L., México
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <Phone className="w-5 h-5 text-primary" />
        <a
          href="tel:+5218180107110"
          className="text-gray-300 hover:text-white transition-colors"
        >
          +52 1 81 8010 7110
        </a>
      </div>
      <div className="flex items-center space-x-3">
        <Mail className="w-5 h-5 text-primary" />
        <a
          href="mailto:gruasmartinezreyes@hotmail.com"
          className="text-gray-300 hover:text-white transition-colors break-all"
        >
          gruasmartinezreyes@hotmail.com
        </a>
      </div>
    </div>
  </motion.div>
)

const SocialLinks = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.4 }}
    className="space-y-4"
  >
    <h3 className="text-2xl font-bold text-gradient-shine">Síguenos</h3>
    <div className="flex flex-wrap gap-4">
      {['Facebook', 'Twitter', 'Instagram'].map((platform) => (
        <a
          key={platform}
          href="#"
          className="px-4 py-2 bg-gray-800 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-300"
        >
          {platform}
        </a>
      ))}
    </div>
  </motion.div>
)

const Copyright = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.6 }}
    className="mt-12 pt-8 border-t border-gray-700 text-center"
  >
    <p className="text-gray-400">
      © {new Date().getFullYear()} I.M.R. Grúas. Todos los derechos reservados.
    </p>
  </motion.div>
)