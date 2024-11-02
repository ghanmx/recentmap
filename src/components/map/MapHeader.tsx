import React, { useState } from 'react';
import { Truck, MapPin, Phone, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const MapHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="absolute inset-x-0 top-0 z-50 bg-gradient-to-r from-white/95 via-blue-50/95 to-white/95 shadow-lg backdrop-blur-sm border-b border-blue-100">
      <nav className="px-4 sm:px-6 py-4 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 p-2 sm:p-2.5 rounded-xl shadow-inner">
            <Truck className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
              Tow Truck Service
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">Professional Assistance 24/7</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200 shadow-sm">
            <MapPin className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Available in your area</span>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowForm(!showForm)}
            className="items-center gap-2 hidden sm:flex"
          >
            <Truck className="w-4 h-4" />
            {showForm ? "Hide Form" : "Show Form"}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="sm:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowForm(!showForm)}
                  className="w-full"
                >
                  <Truck className="w-4 h-4 mr-2" />
                  {showForm ? "Hide Form" : "Show Form"}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
};