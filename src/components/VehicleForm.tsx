import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const VehicleForm = () => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Vehicle Make</Label>
        <Input placeholder="e.g., Toyota" />
      </div>
      
      <div>
        <Label>Vehicle Model</Label>
        <Input placeholder="e.g., Corolla" />
      </div>
      
      <div>
        <Label>Year</Label>
        <Input placeholder="e.g., 2020" type="number" />
      </div>
      
      <div>
        <Label>Issue Description</Label>
        <Textarea placeholder="Describe the problem with your vehicle..." />
      </div>
    </div>
  );
};

export default VehicleForm;