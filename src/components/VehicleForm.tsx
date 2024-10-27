import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Car, CreditCard, Wrench, AlertTriangle } from "lucide-react";
import { vehicleBrands, vehicleModels } from "@/data/vehicleData";
import { ServiceRequest } from "@/types/service";
import { useServiceRequest } from "@/hooks/useServiceRequest";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  vehicleMake: z.string().min(1, "Brand is required"),
  vehicleModel: z.string().min(1, "Model is required"),
  vehicleYear: z.string()
    .min(4, "Year must be 4 digits")
    .max(4, "Year must be 4 digits")
    .refine((val) => {
      const year = parseInt(val);
      return year >= 1900 && year <= new Date().getFullYear() + 1;
    }, "Invalid year"),
  issueDescription: z.string().min(10, "Please provide more details about the issue"),
});

interface VehicleFormProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  serviceType: ServiceRequest['serviceType'];
  onManeuverChange?: (requiresManeuver: boolean) => void;
  onVehicleModelChange?: (model: string) => void;
}

const VehicleForm = ({
  pickupLocation,
  dropLocation,
  serviceType,
  onManeuverChange,
  onVehicleModelChange
}: VehicleFormProps) => {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [requiresManeuver, setRequiresManeuver] = useState(false);
  const { toast } = useToast();
  const { mutate: submitRequest, isPending } = useServiceRequest();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      issueDescription: "",
    },
  });

  const handleManeuverChange = (checked: boolean) => {
    setRequiresManeuver(checked);
    onManeuverChange?.(checked);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!pickupLocation || !dropLocation) {
      toast({
        title: "Missing Location",
        description: "Please select both pickup and drop-off locations",
        variant: "destructive",
      });
      return;
    }

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <Car className="w-5 h-5 text-primary animate-pulse" />
              <h2>Vehicle Details</h2>
            </div>

            <FormField
              control={form.control}
              name="vehicleMake"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedBrand(value);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white/80 border-gray-300 focus:ring-2 ring-primary/20">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vehicleBrands.map((brand) => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vehicleModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      onVehicleModelChange?.(value);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white/80 border-gray-300 focus:ring-2 ring-primary/20">
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedBrand && vehicleModels[selectedBrand]?.map((model) => (
                        <SelectItem key={model} value={model}>{model}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vehicleYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="e.g., 2020"
                      className="bg-white/80 border-gray-300 focus:ring-2 ring-primary/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <Wrench className="w-5 h-5 text-secondary animate-spin-slow" />
              <h2>Service Requirements</h2>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/80 rounded-lg border border-gray-200">
              <FormLabel className="text-gray-600">Requires Special Maneuver</FormLabel>
              <Switch
                checked={requiresManeuver}
                onCheckedChange={handleManeuverChange}
              />
            </div>

            <FormField
              control={form.control}
              name="issueDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issue Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe the problem with your vehicle..."
                      className="bg-white/80 border-gray-300 focus:ring-2 ring-primary/20 min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-yellow-700">
                Additional fees may apply based on vehicle type and service requirements
              </p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
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
        </form>
      </Form>
    </Card>
  );
};

export default VehicleForm;