import React from 'react'
import { motion } from 'framer-motion'

const navItems = [
  { href: '#intro', label: 'Inicio' },
  { href: '#about', label: 'Nosotros' },
  { href: '#Servicios', label: 'Servicios' },
  { href: '#call-to-action', label: 'Llámanos' },
  { href: '#contact', label: 'Contacto' },
]

export const Navigation: React.FC = (): JSX.Element => {
  return (
    <nav className="hidden md:block">
      <ul className="flex items-center space-x-8">
        {navItems.map((item, index) => (
          <motion.li
            key={item.href}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <a
              href={item.href}
              className="relative text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors py-2 px-1"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform origin-left hover:scale-x-100" />
            </a>
          </motion.li>
        ))}
      </ul>
    </nav>
  )
}
