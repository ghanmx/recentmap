import React from 'react';
import { Truck, MapPin } from 'lucide-react';

export const MapHeader = () => {
  return (
    <div className="absolute inset-x-0 top-0 z-20 bg-gradient-to-r from-white/95 to-blue-50/95 shadow-lg backdrop-blur-sm border-b border-blue-100">
      <nav className="px-6 py-4 max-w-7xl mx-auto flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-lg">
          <Truck className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-primary">Tow Truck Service</h1>
          <p className="text-sm text-gray-600">24/7 Professional Assistance</p>
        </div>
        <div className="ml-auto flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
          <MapPin className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-700">Available in your area</span>
        </div>
      </nav>
    </div>
  );
};