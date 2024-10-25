import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { ServiceRequest } from "@/types/service";
import { useServiceRequest } from "@/hooks/useServiceRequest";

interface VehicleFormProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  serviceType: string;
}

const VehicleForm = ({ pickupLocation, dropLocation, serviceType }: VehicleFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { mutate: submitRequest, isLoading } = useServiceRequest();

  const onSubmit = (data: any) => {
    if (!pickupLocation || !dropLocation) {
      return;
    }

    const serviceRequest: Omit<ServiceRequest, 'id' | 'status' | 'createdAt'> = {
      ...data,
      serviceType: serviceType as ServiceRequest['serviceType'],
      pickupLocation,
      dropLocation,
    };

    submitRequest(serviceRequest);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Vehicle Make</Label>
        <Input 
          {...register("vehicleMake", { required: true })}
          placeholder="e.g., Toyota" 
        />
        {errors.vehicleMake && <span className="text-sm text-destructive">This field is required</span>}
      </div>
      
      <div>
        <Label>Vehicle Model</Label>
        <Input 
          {...register("vehicleModel", { required: true })}
          placeholder="e.g., Corolla" 
        />
        {errors.vehicleModel && <span className="text-sm text-destructive">This field is required</span>}
      </div>
      
      <div>
        <Label>Year</Label>
        <Input 
          {...register("vehicleYear", { 
            required: true,
            min: 1900,
            max: new Date().getFullYear() + 1
          })}
          type="number" 
          placeholder="e.g., 2020" 
        />
        {errors.vehicleYear && <span className="text-sm text-destructive">Please enter a valid year</span>}
      </div>
      
      <div>
        <Label>Issue Description</Label>
        <Textarea 
          {...register("issueDescription", { required: true })}
          placeholder="Describe the problem with your vehicle..." 
        />
        {errors.issueDescription && <span className="text-sm text-destructive">This field is required</span>}
      </div>
    </form>
  );
};

export default VehicleForm;