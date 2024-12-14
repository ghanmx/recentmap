import React, { useState } from 'react'
import { Truck, MapPin, Phone, Menu, ArrowLeft, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AdminNavigationMenu } from '../admin/AdminNavigationMenu'
import { UserNavigationMenu } from '../user/UserNavigationMenu'
import { useNavigate } from 'react-router-dom'

export const MapHeader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const isAdmin = true // TODO: Replace with actual auth logic
  const navigate = useNavigate()

  return (
    <div className="absolute inset-x-0 top-0 z-50 bg-gradient-to-r from-white/95 via-blue-50/95 to-white/95 shadow-lg backdrop-blur-sm border-b border-blue-100">
      <nav className="px-4 sm:px-6 py-4 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Button>
          <div className="bg-primary/10 p-2 sm:p-2.5 rounded-xl shadow-inner">
            <Truck className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
              Tow Truck Service
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">
              Professional Assistance 24/7
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          {isAdmin ? <AdminNavigationMenu /> : <UserNavigationMenu />}
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/user')}
            className="flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            Profile
          </Button>
          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200 shadow-sm">
            <MapPin className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              Available in your area
            </span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200 shadow-sm">
            <Phone className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              24/7 Support
            </span>
          </div>
        </div>

        <div className="sm:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative z-50"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] z-[60]"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <div className="flex flex-col gap-4 mt-6">
                {isAdmin ? <AdminNavigationMenu /> : <UserNavigationMenu />}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/user')}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Button>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-3 rounded-full border border-green-200 shadow-sm">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">
                    Available in your area
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-3 rounded-full border border-blue-200 shadow-sm">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">
                    24/7 Support
                  </span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  )
}