import { createContext, useContext, useState, ReactNode } from 'react';

interface TowingContextType {
  totalDistance: number;
  totalCost: number;
  updateTowingInfo: (distance: number, cost: number) => void;
}

const TowingContext = createContext<TowingContextType | undefined>(undefined);

export const TowingProvider = ({ children }: { children: ReactNode }) => {
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const updateTowingInfo = (distance: number, cost: number) => {
    setTotalDistance(distance);
    setTotalCost(cost);
  };

  return (
    <TowingContext.Provider value={{ totalDistance, totalCost, updateTowingInfo }}>
      {children}
    </TowingContext.Provider>
  );
};

export const useTowing = () => {
  const context = useContext(TowingContext);
  if (context === undefined) {
    throw new Error('useTowing must be used within a TowingProvider');
  }
  return context;
};