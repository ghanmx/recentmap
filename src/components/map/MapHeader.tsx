import React from 'react';

export const MapHeader = () => {
  return (
    <div className="absolute inset-x-0 top-0 z-20 bg-white/95 shadow-lg backdrop-blur-sm">
      <nav className="px-6 py-4 max-w-7xl mx-auto">
        <h1 className="text-xl font-bold text-primary">Tow Truck Service</h1>
      </nav>
    </div>
  );
};