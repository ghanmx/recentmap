import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { VehicleSelector } from "./form/VehicleSelector";
import { TowTruckSelector } from "./form/TowTruckSelector";
import { LocationSelector } from "./form/LocationSelector";
import { FormData, formSchema } from "@/types/form";
import { Card } from "./ui/card";
import { useTowing } from "@/contexts/TowingContext";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { FormField, FormItem, FormLabel, FormControl } from "./ui/form";

interface VehicleFormProps {
  pickupLocation?: { lat: number; lng: number } | null;
  dropLocation?: { lat: number; lng: number } | null;
  pickupAddress?: string;
  dropAddress?: string;
  serviceType?: string;
  onManeuverChange?: () => void;
  onVehicleModelChange?: () => void;
  onPickupSelect?: (location: { lat: number; lng: number; address: string }) => void;
  onDropSelect?: (location: { lat: number; lng: number; address: string }) => void;
  onSelectingPickup?: (selecting: boolean) => void;
  onSelectingDrop?: (selecting: boolean) => void;
}

export const VehicleForm = ({
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  serviceType = "standard",
  onManeuverChange,
  onVehicleModelChange,
  onPickupSelect,
  onDropSelect,
  onSelectingPickup,
  onSelectingDrop
}: VehicleFormProps) => {
  const { updateSelectedVehicleModel, updateTruckType } = useTowing();
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      phone: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      vehicleColor: "",
      truckType: "A",
      requiresManeuver: false,
      issueDescription: "",
    },
  });

  const handleVehicleModelChange = (value: string) => {
    form.setValue("vehicleModel", value);
    updateSelectedVehicleModel(value);
    onVehicleModelChange?.();
    
    toast({
      title: "Vehicle Model Updated",
      description: `Selected vehicle model: ${value}`,
    });
  };

  const handleTruckTypeChange = (value: "A" | "B" | "C" | "D") => {
    form.setValue("truckType", value);
    updateTruckType(value);
    
    toast({
      title: "Tow Truck Type Updated",
      description: `Selected truck type: ${value}`,
    });
  };

  const onSubmit = form.handleSubmit((data) => {
    toast({
      title: "Form Submitted",
      description: "Vehicle and location details have been saved",
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8 w-full">
        <Card className="p-6">
          <LocationSelector 
            form={form}
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
            pickupAddress={pickupAddress}
            dropAddress={dropAddress}
            onPickupSelect={onPickupSelect}
            onDropSelect={onDropSelect}
            onSelectingPickup={onSelectingPickup}
            onSelectingDrop={onSelectingDrop}
          />
        </Card>

        <Card className="p-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your name" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" placeholder="Enter your phone number" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vehicleMake"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Make</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter vehicle make" />
                  </FormControl>
                </FormItem>
              )}
            />

            <VehicleSelector 
              form={form} 
              onVehicleModelChange={handleVehicleModelChange}
            />

            <FormField
              control={form.control}
              name="vehicleYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Year</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Enter vehicle year" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vehicleColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Color</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter vehicle color" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requiresManeuver"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Requires Maneuver</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </Card>

        <Card className="p-6">
          <TowTruckSelector
            form={form}
            selectedModel={form.watch("vehicleModel")}
            onTruckTypeChange={handleTruckTypeChange}
          />
        </Card>
      </form>
    </Form>
  );
};