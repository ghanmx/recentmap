import React from 'react';
import { TowingProvider } from '../hooks/TowingContext';

export const TowingWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <TowingProvider>
      {children}
    </TowingProvider>
  );
};
