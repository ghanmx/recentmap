import { Card } from "@/components/ui/card";
import { Ticket, Clock, CreditCard } from "lucide-react";
import { TollLocation } from "@/data/tollData";
import { Separator } from "@/components/ui/separator";

interface TollInfoDisplayProps {
  tolls: TollLocation[];
  totalCost: number;
}

export const TollInfoDisplay = ({ tolls, totalCost }: TollInfoDisplayProps) => {
  if (tolls.length === 0) return null;

  return (
    <Card className="p-4 bg-yellow-50/80 border border-yellow-200 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ticket className="w-4 h-4 text-yellow-700" />
          <h3 className="font-semibold text-yellow-700">Peajes en la Ruta</h3>
        </div>
        <div className="text-sm font-semibold text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">
          Total: ${totalCost.toFixed(2)}
        </div>
      </div>

      <Separator className="bg-yellow-200/50" />

      <div className="space-y-2">
        {tolls.map((toll, index) => (
          <div
            key={index}
            className="bg-white/50 rounded-lg p-3 space-y-2 hover:bg-white/70 transition-colors"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm text-yellow-800">{toll.name}</span>
              <span className="text-sm font-semibold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">
                ${toll.cost.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{toll.operatingHours}</span>
              </div>
              <div className="flex items-center gap-1">
                <CreditCard className="w-3 h-3" />
                <span>{toll.acceptedPayments.join(', ')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};