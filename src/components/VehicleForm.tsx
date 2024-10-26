import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ServiceRequest } from "@/types/service";
import { useServiceRequest } from "@/hooks/useServiceRequest";
import { Card } from "@/components/ui/card";
import { CreditCard, Car, Calendar, MapPin } from "lucide-react";

interface VehicleFormProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  serviceType: ServiceRequest['serviceType'];
}

const VehicleForm = ({ pickupLocation, dropLocation, serviceType }: VehicleFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { mutate: submitRequest, isPending } = useServiceRequest();

  const onSubmit = (data: any) => {
    if (!pickupLocation || !dropLocation) {
      return;
    }

    const serviceRequest: Omit<ServiceRequest, 'id' | 'status' | 'createdAt'> = {
      ...data,
      serviceType,
      pickupLocation,
      dropLocation,
    };

    submitRequest(serviceRequest);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-lg backdrop-blur-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
            <Car className="w-5 h-5 text-primary" />
            <h2>Vehicle Details</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-600">Vehicle Make</Label>
              <Input 
                {...register("vehicleMake", { required: true })}
                placeholder="e.g., Toyota"
                className="bg-white/80 border-gray-300 focus:border-primary"
              />
              {errors.vehicleMake && <span className="text-sm text-destructive">Required</span>}
            </div>
            <div>
              <Label className="text-gray-600">Vehicle Model</Label>
              <Input 
                {...register("vehicleModel", { required: true })}
                placeholder="e.g., Corolla"
                className="bg-white/80 border-gray-300 focus:border-primary"
              />
              {errors.vehicleModel && <span className="text-sm text-destructive">Required</span>}
            </div>
          </div>
        </div>

        <div>
          <Label className="text-gray-600">Year</Label>
          <Input 
            {...register("vehicleYear", { 
              required: true,
              min: 1900,
              max: new Date().getFullYear() + 1
            })}
            type="number"
            placeholder="e.g., 2020"
            className="bg-white/80 border-gray-300 focus:border-primary"
          />
          {errors.vehicleYear && <span className="text-sm text-destructive">Enter valid year</span>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
            <MapPin className="w-5 h-5 text-secondary" />
            <h2>Service Details</h2>
          </div>
          <div>
            <Label className="text-gray-600">Issue Description</Label>
            <Textarea 
              {...register("issueDescription", { required: true })}
              placeholder="Describe the problem with your vehicle..."
              className="bg-white/80 border-gray-300 focus:border-primary min-h-[100px]"
            />
            {errors.issueDescription && <span className="text-sm text-destructive">Required</span>}
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold py-3"
          >
            {isPending ? (
              "Processing..."
            ) : (
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Continue to Payment
              </div>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default VehicleForm;