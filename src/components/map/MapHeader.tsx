import React from 'react';
import { Truck, MapPin, Phone } from 'lucide-react';

export const MapHeader = () => {
  return (
    <div className="absolute inset-x-0 top-0 z-20 bg-gradient-to-r from-white/95 via-blue-50/95 to-white/95 shadow-lg backdrop-blur-sm border-b border-blue-100">
      <nav className="px-6 py-4 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2.5 rounded-xl shadow-inner">
            <Truck className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
              Tow Truck Service
            </h1>
            <p className="text-sm text-gray-600">Professional Assistance 24/7</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200 shadow-sm">
            <MapPin className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Available in your area</span>
          </div>
          
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200 shadow-sm">
            <Phone className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">24/7 Support</span>
          </div>
        </div>
      </nav>
    </div>
  );
};