import { Card } from "@/components/ui/card";
import { ServiceSummary } from "../analytics/ServiceSummary";

export const AdminMetrics = () => {
  return (
    <div className="space-y-6">
      <ServiceSummary />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold text-gray-700">Average Response Time</h3>
          <p className="text-2xl font-bold text-primary">15 mins</p>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-semibold text-gray-700">Customer Satisfaction</h3>
          <p className="text-2xl font-bold text-primary">4.8/5.0</p>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-semibold text-gray-700">Active Drivers</h3>
          <p className="text-2xl font-bold text-primary">8</p>
        </Card>
      </div>
    </div>
  );
};