import React from 'react';
import { Truck, MapPin } from 'lucide-react';

export const MapHeader = () => {
  return (
    <div className="absolute inset-x-0 top-0 z-20 bg-gradient-to-r from-white to-blue-50 shadow-xl backdrop-blur-lg border-b-2 border-blue-200">
      <nav className="px-8 py-5 max-w-7xl mx-auto flex items-center gap-4">
        <div className="bg-primary/15 p-3 rounded-xl shadow-inner">
          <Truck className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Tow Truck Service</h1>
          <p className="text-base text-gray-700 font-medium">24/7 Professional Assistance</p>
        </div>
        <div className="ml-auto flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full border-2 border-green-300 shadow-sm">
          <MapPin className="w-5 h-5 text-green-700" />
          <span className="text-sm font-semibold text-green-800">Available in your area</span>
        </div>
      </nav>
    </div>
  );
};