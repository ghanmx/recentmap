import { Truck } from "lucide-react";
import { motion } from "framer-motion";
import { TowTruckType } from "@/utils/towTruckPricing";

interface TruckInfoHeaderProps {
  selectedTruck: TowTruckType;
}

export const TruckInfoHeader = ({ selectedTruck }: TruckInfoHeaderProps) => {
  return (
    <div className="text-lg font-semibold text-gray-800 flex items-center gap-2">
      <Truck className={`w-5 h-5 ${selectedTruck.name === 'Tipo D' ? 'text-orange-500' : 'text-primary'}`} />
      <span>{selectedTruck.name} - Capacidad: {selectedTruck.maxWeight.toLocaleString()} kg</span>
    </div>
  );
};