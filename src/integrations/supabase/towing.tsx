import { createContext, useContext, useState, ReactNode } from 'react';
import { TollLocation } from '@/data/tollData';
import { useToast } from '@/hooks/use-toast';
import { calculateTotalCost } from '@/utils/costCalculator';
import { LocationInfo, TollInfo, PaymentInfo, TowingContextType } from './types/towing';

const TowingContext = createContext<TowingContextType | undefined>(undefined);

export const TowingProvider = ({ children }: { children: ReactNode }) => {
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
    setPaymentInfo(prev => ({
      ...prev,
      subtotal: newCost,
      total: newCost * 1.16
    }));
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
        toast({
          title: "Ubicación de Recogida Actualizada",
          description: info.pickup.address,
        });
      }
      if (info.drop) {
        toast({
          title: "Ubicación de Entrega Actualizada",
          description: info.drop.address,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar la ubicación",
        variant: "destructive",
      });
    } finally {
      setIsLoadingLocations(false);
    }
  };

  const processPayment = async (amount: number): Promise<boolean> => {
    setIsProcessingPayment(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Pago Procesado",
        description: `Se ha procesado el pago por $${amount.toFixed(2)} MXN`,
      });
      return true;
    } catch (error) {
      toast({
        title: "Error en el Pago",
        description: "No se pudo procesar el pago",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <TowingContext.Provider value= {{
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
      setLoadingLocations: setIsLoadingLocations
  }
}>
  { children }
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