import { createContext, useContext, useState, ReactNode } from 'react';
import { TollLocation } from '@/data/tollData';

interface TowingContextType {
  totalDistance: number;
  totalCost: number;
  detectedTolls: TollLocation[];
  totalTollCost: number;
  truckType: "A" | "B" | "C" | "D";
  requiresManeuver: boolean;
  selectedVehicleModel: string;
  updateTowingInfo: (distance: number) => void;
  updateTollInfo: (tolls: TollLocation[], tollCost: number) => void;
  updateTruckType: (type: "A" | "B" | "C" | "D") => void;
  updateManeuverRequired: (required: boolean) => void;
  updateSelectedVehicleModel: (model: string) => void;
}

const TowingContext = createContext<TowingContextType | undefined>(undefined);

export const TowingProvider = ({ children }: { children: ReactNode }) => {
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [detectedTolls, setDetectedTolls] = useState<TollLocation[]>([]);
  const [totalTollCost, setTotalTollCost] = useState(0);
  const [truckType, setTruckType] = useState<"A" | "B" | "C" | "D">("A");
  const [requiresManeuver, setRequiresManeuver] = useState(false);
  const [selectedVehicleModel, setSelectedVehicleModel] = useState("");

  const updateTowingInfo = (distance: number) => {
    setTotalDistance(distance);
  };

  const updateTollInfo = (tolls: TollLocation[], tollCost: number) => {
    setDetectedTolls(tolls);
    setTotalTollCost(tollCost);
  };

  const updateTruckType = (type: "A" | "B" | "C" | "D") => {
    setTruckType(type);
  };

  const updateManeuverRequired = (required: boolean) => {
    setRequiresManeuver(required);
  };

  const updateSelectedVehicleModel = (model: string) => {
    setSelectedVehicleModel(model);
  };

  return (
    <TowingContext.Provider value={{ 
      totalDistance, 
      totalCost, 
      detectedTolls, 
      totalTollCost,
      truckType,
      requiresManeuver,
      selectedVehicleModel,
      updateTowingInfo, 
      updateTollInfo,
      updateTruckType,
      updateManeuverRequired,
      updateSelectedVehicleModel
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