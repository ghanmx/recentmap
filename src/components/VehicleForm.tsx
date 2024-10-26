import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ServiceRequest } from "@/types/service";
import { useServiceRequest } from "@/hooks/useServiceRequest";
import { Card } from "@/components/ui/card";
import { CreditCard, Car, Calendar, MapPin, Tools, Alert } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { vehicleBrands, vehicleModels, vehicleWeights, towTruckTypes } from "@/data/vehicleData";
import { Switch } from "@/components/ui/switch";

interface VehicleFormProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  serviceType: ServiceRequest['serviceType'];
}

const VehicleForm = ({ pickupLocation, dropLocation, serviceType }: VehicleFormProps) => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const { mutate: submitRequest, isPending } = useServiceRequest();
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [requiresManeuver, setRequiresManeuver] = useState(false);

  const onSubmit = (data: any) => {
    if (!pickupLocation || !dropLocation) return;
    
    const serviceRequest: Omit<ServiceRequest, 'id' | 'status' | 'createdAt'> = {
      ...data,
      serviceType,
      pickupLocation,
      dropLocation,
      requiresManeuver,
    };

    submitRequest(serviceRequest);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-lg backdrop-blur-sm animate-fade-in hover:shadow-xl transition-all duration-300">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
            <Car className="w-5 h-5 text-primary animate-pulse" />
            <h2>Vehicle Details</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="text-gray-600">Brand</Label>
              <Select onValueChange={(value) => {
                setSelectedBrand(value);
                setValue("vehicleMake", value);
              }}>
                <SelectTrigger className="bg-white/80 border-gray-300 focus:ring-2 ring-primary/20">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleBrands.map((brand) => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-600">Model</Label>
              <Select onValueChange={(value) => setValue("vehicleModel", value)}>
                <SelectTrigger className="bg-white/80 border-gray-300 focus:ring-2 ring-primary/20">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {selectedBrand && vehicleModels[selectedBrand]?.map((model) => (
                    <SelectItem key={model} value={model}>{model}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                className="bg-white/80 border-gray-300 focus:ring-2 ring-primary/20 hover:border-primary/50 transition-colors"
              />
              {errors.vehicleYear && <span className="text-sm text-destructive">Enter valid year</span>}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
            <Tools className="w-5 h-5 text-secondary animate-spin-slow" />
            <h2>Service Requirements</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-gray-600">Requires Special Maneuver</Label>
              <Switch
                checked={requiresManeuver}
                onCheckedChange={setRequiresManeuver}
              />
            </div>

            <div>
              <Label className="text-gray-600">Issue Description</Label>
              <Textarea 
                {...register("issueDescription", { required: true })}
                placeholder="Describe the problem with your vehicle..."
                className="bg-white/80 border-gray-300 focus:ring-2 ring-primary/20 min-h-[100px] hover:border-primary/50 transition-colors"
              />
              {errors.issueDescription && <span className="text-sm text-destructive">Required</span>}
            </div>

            <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <Alert className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-yellow-700">
                Additional fees may apply based on vehicle type and service requirements
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-slow"
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