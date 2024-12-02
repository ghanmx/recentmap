import { createContext, useContext, useState, ReactNode } from 'react';
import { TollLocation } from '../data/tollData';
import { useToast } from './use-toast';

interface LocationInfo {
  pickup?: { lat: number; lng: number; address: string };
  drop?: { lat: number; lng: number; address: string };
}

interface TollInfo {
  tolls: TollLocation[];
  totalTollCost: number;
}

interface PaymentInfo {
  subtotal: number;
  tax: number;
  total: number;
  isPending: boolean;
  isProcessing: boolean;
}

interface TowingContextType {
  totalDistance: number;
  totalCost: number;
  detectedTolls: TollLocation[];
  totalTollCost: number;
  truckType: "A" | "B" | "C" | "D";
  requiresManeuver: boolean;
  selectedVehicleModel: string;
  tollInfo: TollInfo | null;
  paymentInfo: PaymentInfo;
  isLoadingLocations: boolean;
  isProcessingPayment: boolean;
  updateTowingInfo: (distance: number) => void;
  updateTollInfo: (tolls: TollLocation[], tollCost: number) => void;
  updateTruckType: (type: "A" | "B" | "C" | "D") => void;
  updateManeuverRequired: (required: boolean) => void;
  updateSelectedVehicleModel: (model: string) => void;
  updateLocationInfo: (info: LocationInfo) => void;
  processPayment: (amount: number) => Promise<boolean>;
  setLoadingLocations: (loading: boolean) => void;
}

const TowingContext = createContext<TowingContextType | null>(null);

export const TowingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [detectedTolls, setDetectedTolls] = useState<TollLocation[]>([]);
  const [totalTollCost, setTotalTollCost] = useState(0);
  const [truckType, setTruckType] = useState<"A" | "B" | "C" | "D">("A");
  const [requiresManeuver, setRequiresManeuver] = useState(false);
  const [selectedVehicleModel, setSelectedVehicleModel] = useState("");
  const [tollInfo, setTollInfo] = useState<TollInfo | null>(null);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { toast } = useToast();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    subtotal: 0,
    tax: 0,
    total: 0,
    isPending: false,
    isProcessing: false
  });

  const updateTowingInfo = (distance: number) => {
    setTotalDistance(distance);
    const newCost = calculateTotalCost(distance, truckType, requiresManeuver, totalTollCost);
    setTotalCost(newCost);
    setPaymentInfo(prev => ({ ...prev, subtotal: newCost, total: newCost * 1.16 }));
  };

  const updateTollInfo = (tolls: TollLocation[], tollCost: number) => {
    setDetectedTolls(tolls);
    setTotalTollCost(tollCost);
    setTollInfo({ tolls, totalTollCost: tollCost });
    const newCost = calculateTotalCost(totalDistance, truckType, requiresManeuver, tollCost);
    setTotalCost(newCost);
  };

  const updateTruckType = (type: "A" | "B" | "C" | "D") => {
    setTruckType(type);
    const newCost = calculateTotalCost(totalDistance, type, requiresManeuver, totalTollCost);
    setTotalCost(newCost);
  };

  const updateManeuverRequired = (required: boolean) => {
    setRequiresManeuver(required);
    const newCost = calculateTotalCost(totalDistance, truckType, required, totalTollCost);
    setTotalCost(newCost);
  };

  const updateSelectedVehicleModel = (model: string) => {
    setSelectedVehicleModel(model);
  };

  const updateLocationInfo = async (info: LocationInfo) => {
    setIsLoadingLocations(true);
    try {
      if (info.pickup) {
        toast({ title: "Ubicación de Recogida Actualizada", description: info.pickup.address });
      }
      if (info.drop) {
        toast({ title: "Ubicación de Entrega Actualizada", description: info.drop.address });
      }
    } catch (error) {
      toast({ title: "Error", description: "No se pudo actualizar la ubicación", variant: "destructive" });
    } finally {
      setIsLoadingLocations(false);
    }
  };

  const processPayment = async (amount: number): Promise<boolean> => {
    setIsProcessingPayment(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({ title: "Pago Procesado", description: `Se ha procesado el pago por $${amount.toFixed(2)} MXN` });
      return true;
    } catch (error) {
      toast({ title: "Error en el Pago", description: "No se pudo procesar el pago", variant: "destructive" });
      return false;
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const setLoadingLocations = (loading: boolean) => {
    setIsLoadingLocations(loading);
  };

  const contextValue: TowingContextType = {
    totalDistance,
    totalCost,
    detectedTolls,
    totalTollCost,
    truckType,
    requiresManeuver,
    selectedVehicleModel,
    tollInfo,
    paymentInfo,
    isLoadingLocations,
    isProcessingPayment,
    updateTowingInfo,
    updateTollInfo,
    updateTruckType,
    updateManeuverRequired,
    updateSelectedVehicleModel,
    updateLocationInfo,
    processPayment,
    setLoadingLocations
  };

  return (
    <TowingContext.Provider value={contextValue} >
      {children}
    </TowingContext.Provider>
  );
};

export const useTowing = () => {
  const context = useContext(TowingContext);
  if (context === null) {
    throw new Error('useTowing must be used within a TowingProvider');
  }
  return context;
};

const calculateTotalCost = (
  distance: number,
  truckType: "A" | "B" | "C" | "D",
  requiresManeuver: boolean,
  tollCost: number
): number => {
  const baseRate = {
    A: 18.82,
    B: 20.62,
    C: 23.47,
    D: 32.35
  }[truckType] || 18.82;

  const maneuverCost = requiresManeuver ? {
    A: 1219.55,
    B: 1336.73,
    C: 1524.21,
    D: 2101.65
  }[truckType] || 0 : 0;

  const flagDropFee = {
    A: 528.69,
    B: 607.43,
    C: 721.79,
    D: 885.84
  }[truckType] || 0;

  return (distance * baseRate) + maneuverCost + flagDropFee + tollCost;
};
