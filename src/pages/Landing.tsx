import React from 'react'
import { Header } from '@/components/landing/Header'
import { MetaTags } from '@/components/landing/MetaTags'
import { Services } from '@/components/landing/Services'
import { Hero } from '@/components/landing/Hero'
import { TowingTypes } from '@/components/landing/TowingTypes'
import { ContactSection } from '@/components/landing/ContactSection'
import { FooterSection } from '@/components/landing/FooterSection'
import { motion } from 'framer-motion'

const Landing: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent" />
      <div className="relative z-10">
        <MetaTags />
        <Header />
        <Hero />
        <main className="relative z-10 overflow-hidden">
          <TowingTypes />
          <Services />
          <ContactSection />
        </main>
        <FooterSection />
      </div>
    </motion.div>
  )
}

export default Landing
