import { Route, Clock } from "lucide-react";

interface CostMetricsProps {
  totalDistance: number;
}

export const CostMetrics = ({ totalDistance }: CostMetricsProps) => {
  const MetricCard = ({ icon: Icon, label, value }: { 
    icon: any; 
    label: string; 
    value: string 
  }) => (
    <div className="flex items-center gap-2 bg-gray-50/50 p-3 rounded-lg hover:bg-gray-100/50 transition-colors">
      <Icon className="w-4 h-4 text-gray-500" />
      <div>
        <p className="text-xs font-medium text-gray-600">{label}</p>
        <p className="text-sm font-semibold text-primary">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      <MetricCard
        icon={Route}
        label="Distancia"
        value={`${totalDistance ? totalDistance.toFixed(2) : '0.00'} km`}
      />
      <MetricCard
        icon={Clock}
        label="Tiempo Est."
        value={`${totalDistance ? Math.ceil(totalDistance / 50) : '0'} hr`}
      />
    </div>
  );
};