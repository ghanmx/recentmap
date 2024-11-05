import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { TOLL_LOCATIONS, TollLocation } from '@/data/tollData';

interface TowingContextType {
  totalDistance: number;
  totalCost: number;
  detectedTolls: TollLocation[];
  totalTollCost: number;
  truckType: "A" | "B" | "C" | "D";
  requiresManeuver: boolean;
  updateTowingInfo: (distance: number, cost: number) => void;
  updateTollInfo: (tolls: TollLocation[], tollCost: number) => void;
  updateTruckType: (type: "A" | "B" | "C" | "D") => void;
  updateManeuverRequired: (required: boolean) => void;
}

const TowingContext = createContext<TowingContextType | undefined>(undefined);

export const TowingProvider = ({ children }: { children: ReactNode }) => {
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [detectedTolls, setDetectedTolls] = useState<TollLocation[]>([]);
  const [totalTollCost, setTotalTollCost] = useState(0);
  const [truckType, setTruckType] = useState<"A" | "B" | "C" | "D">("A");
  const [requiresManeuver, setRequiresManeuver] = useState(false);

  useEffect(() => {
    console.log('[TowingContext] Truck Type Updated:', truckType);
  }, [truckType]);

  const updateTowingInfo = (distance: number, cost: number) => {
    setTotalDistance(distance);
    setTotalCost(cost + totalTollCost);
  };

  const updateTollInfo = (tolls: TollLocation[], tollCost: number) => {
    setDetectedTolls(tolls);
    setTotalTollCost(tollCost);
    setTotalCost(prevCost => {
      const baseCost = prevCost - totalTollCost;
      return baseCost + tollCost;
    });
  };

  const updateTruckType = (type: "A" | "B" | "C" | "D") => {
    console.log('[TowingContext] Updating truck type to:', type);
    setTruckType(type);
  };

  const updateManeuverRequired = (required: boolean) => {
    setRequiresManeuver(required);
  };

  return (
    <TowingContext.Provider value={{ 
      totalDistance, 
      totalCost, 
      detectedTolls, 
      totalTollCost,
      truckType,
      requiresManeuver,
      updateTowingInfo, 
      updateTollInfo,
      updateTruckType,
      updateManeuverRequired
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