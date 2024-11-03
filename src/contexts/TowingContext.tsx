import { createContext, useContext, useState, ReactNode } from 'react';
import { TOLL_LOCATIONS } from '@/data/tollData';

interface TowingContextType {
  totalDistance: number;
  totalCost: number;
  detectedTolls: typeof TOLL_LOCATIONS;
  totalTollCost: number;
  updateTowingInfo: (distance: number, cost: number) => void;
  updateTollInfo: (tolls: typeof TOLL_LOCATIONS, tollCost: number) => void;
}

const TowingContext = createContext<TowingContextType | undefined>(undefined);

export const TowingProvider = ({ children }: { children: ReactNode }) => {
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [detectedTolls, setDetectedTolls] = useState<typeof TOLL_LOCATIONS>([]);
  const [totalTollCost, setTotalTollCost] = useState(0);

  const updateTowingInfo = (distance: number, cost: number) => {
    setTotalDistance(distance);
    setTotalCost(cost + totalTollCost); // Add toll costs to total
  };

  const updateTollInfo = (tolls: typeof TOLL_LOCATIONS, tollCost: number) => {
    setDetectedTolls(tolls);
    setTotalTollCost(tollCost);
    setTotalCost(prevCost => {
      const baseCost = prevCost - totalTollCost; // Remove previous toll cost
      return baseCost + tollCost; // Add new toll cost
    });
  };

  return (
    <TowingContext.Provider value={{ 
      totalDistance, 
      totalCost, 
      detectedTolls, 
      totalTollCost, 
      updateTowingInfo, 
      updateTollInfo 
    }}>
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