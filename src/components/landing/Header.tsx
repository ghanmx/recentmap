import React from 'react'
import { Navigation } from './Navigation'
import { Button } from '../ui/button'
import { Phone, MapIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const Header = (): JSX.Element => {
  const navigate = useNavigate()

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex-shrink-0">
          <h1 className="text-2xl md:text-3xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            <a href="#intro" className="hover:opacity-80 transition-opacity">
              M.R. Grúas
            </a>
          </h1>
        </div>

        <Navigation />

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/map')}
            className="group"
          >
            <MapIcon className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
            Solicitar Servicio
          </Button>

          <Button
            variant="default"
            size="sm"
            className="animate-pulse hover:animate-none group"
            onClick={() => (window.location.href = 'tel:+5218180107110')}
          >
            <Phone className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
            Llámanos
          </Button>
        </div>
      </div>
    </header>
  )
}
