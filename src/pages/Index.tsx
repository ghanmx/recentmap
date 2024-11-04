import { useToast } from "@/components/ui/use-toast";
import TowMap from "@/components/TowMap";
import { ServiceRequest } from "@/types/service";
import { calculateTotalCost, getTruckTypeForVehicle } from "@/utils/towTruckPricing";
import { calculateRoadDistance } from "@/utils/routeCalculator";

const Index = () => {
  const [totalCost, setTotalCost] = useState(0);
  const { toast } = useToast();

  return (
    <div className="relative h-screen">
      <TowMap />
    </div>
  );
};

export default Index;