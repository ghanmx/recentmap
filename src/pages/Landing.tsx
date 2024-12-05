import React from 'react'
import { Header } from '@/components/landing/Header'
import { MetaTags } from '@/components/landing/MetaTags'
import { Services } from '@/components/landing/Services'
import { Hero } from '@/components/landing/Hero'
import { TowingTypes } from '@/components/landing/TowingTypes'
import { ContactSection } from '@/components/landing/ContactSection'
import { FooterSection } from '@/components/landing/FooterSection'

const Landing = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="relative z-10">
        <MetaTags />
        <Header />
        <Hero />
        <main>
          <TowingTypes />
          <Services />
          <ContactSection />
        </main>
        <FooterSection />
      </div>
    </div>
  )
}

export default Landing