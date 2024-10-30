import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreditCard, Download } from "lucide-react";
import { ServiceRequest } from "@/types/service";
import { useServiceRequest } from "@/hooks/useServiceRequest";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { VehicleDetails } from "./form/VehicleDetails";
import { ServiceRequirements } from "./form/ServiceRequirements";

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
  vehicleColor: z.string().min(1, "Color is required"),
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
  const [requiresManeuver, setRequiresManeuver] = useState(false);
  const { toast } = useToast();
  const { mutate: submitRequest, isPending } = useServiceRequest();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      vehicleColor: "",
      issueDescription: "",
    },
  });

  const handleManeuverChange = (checked: boolean) => {
    setRequiresManeuver(checked);
    onManeuverChange?.(checked);
  };

  const downloadServiceInfo = () => {
    const formData = form.getValues();
    const currentDate = new Date().toLocaleString();
    
    // Create CSV content with Unicode BOM for Excel compatibility
    const csvContent = '\ufeff' + [
      ['SERVICE REQUEST INFORMATION'],
      ['Generated on:', currentDate],
      [''],
      ['LOCATION DETAILS'],
      ['Pickup Location'],
      ['Latitude:', pickupLocation?.lat.toFixed(6)],
      ['Longitude:', pickupLocation?.lng.toFixed(6)],
      [''],
      ['Drop-off Location'],
      ['Latitude:', dropLocation?.lat.toFixed(6)],
      ['Longitude:', dropLocation?.lng.toFixed(6)],
      [''],
      ['VEHICLE DETAILS'],
      ['Make:', formData.vehicleMake],
      ['Model:', formData.vehicleModel],
      ['Year:', formData.vehicleYear],
      ['Color:', formData.vehicleColor],
      [''],
      ['SERVICE DETAILS'],
      ['Service Type:', serviceType],
      ['Requires Special Maneuver:', requiresManeuver ? 'Yes' : 'No'],
      ['Issue Description:', formData.issueDescription]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `service-request-${new Date().getTime()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    // Show toast only once after download completes
    toast({
      title: "Information Downloaded",
      description: "Service request information has been saved as CSV file.",
      duration: 3000, // Set specific duration to prevent loops
    });
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!pickupLocation || !dropLocation) {
      toast({
        title: "Missing Location",
        description: "Please select both pickup and drop-off locations",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const serviceRequest: Omit<ServiceRequest, 'id' | 'status' | 'createdAt'> = {
      vehicleMake: data.vehicleMake,
      vehicleModel: data.vehicleModel,
      vehicleYear: parseInt(data.vehicleYear),
      vehicleColor: data.vehicleColor,
      issueDescription: data.issueDescription,
      serviceType,
      pickupLocation,
      dropLocation,
      requiresManeuver
    };

    submitRequest(serviceRequest);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-lg backdrop-blur-sm animate-fade-in hover:shadow-xl transition-all duration-300">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <VehicleDetails
            onBrandChange={(brand) => form.setValue('vehicleMake', brand)}
            onModelChange={(model) => {
              form.setValue('vehicleModel', model);
              onVehicleModelChange?.(model);
            }}
            onYearChange={(year) => form.setValue('vehicleYear', year)}
            onColorChange={(color) => form.setValue('vehicleColor', color)}
          />

          <ServiceRequirements
            form={form}
            requiresManeuver={requiresManeuver}
            onManeuverChange={handleManeuverChange}
          />

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={downloadServiceInfo}
              className="flex-1 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-100 transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2 text-emerald-600" />
              Download Info
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isPending ? (
                "Processing..."
              ) : (
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Continue to Payment
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default VehicleForm;
