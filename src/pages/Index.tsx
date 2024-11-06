import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import TowMap from "@/components/TowMap";

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