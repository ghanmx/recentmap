import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { MapPin } from "lucide-react";
import { useState } from "react";
import TowMap from "@/components/TowMap";
import VehicleForm from "@/components/VehicleForm";
import { ServiceRequest } from "@/types/service";

const Index = () => {
  const [pickupLocation, setPickupLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [dropLocation, setDropLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [serviceType, setServiceType] = useState<ServiceRequest['serviceType']>('standard');
  const { toast } = useToast();

  const handleLocationSelect = (type: "pickup" | "drop", location: { lat: number; lng: number }) => {
    if (type === "pickup") {
      setPickupLocation(location);
      toast({
        title: "Pickup location selected",
        description: `Latitude: ${location.lat.toFixed(4)}, Longitude: ${location.lng.toFixed(4)}`,
      });
    } else {
      setDropLocation(location);
      toast({
        title: "Drop location selected",
        description: `Latitude: ${location.lat.toFixed(4)}, Longitude: ${location.lng.toFixed(4)}`,
      });
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Book a Tow Truck</h1>
          <p className="text-gray-600">Get immediate assistance for your vehicle</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <VehicleForm 
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
            serviceType={serviceType}
          />
          
          <div className="mt-6">
            <Label>Service Type</Label>
            <Select 
              defaultValue="standard"
              onValueChange={(value) => setServiceType(value as ServiceRequest['serviceType'])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Towing</SelectItem>
                <SelectItem value="flatbed">Flatbed Towing</SelectItem>
                <SelectItem value="emergency">Emergency Towing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6">
            <Label>Selected Locations</Label>
            <div className="space-y-4 mt-2">
              <div className="flex items-center gap-2">
                <MapPin className="text-primary" />
                <Input 
                  placeholder="Pickup location" 
                  value={pickupLocation ? `${pickupLocation.lat.toFixed(4)}, ${pickupLocation.lng.toFixed(4)}` : ""} 
                  readOnly 
                />
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-secondary" />
                <Input 
                  placeholder="Drop location" 
                  value={dropLocation ? `${dropLocation.lat.toFixed(4)}, ${dropLocation.lng.toFixed(4)}` : ""} 
                  readOnly 
                />
              </div>
            </div>
          </div>

          <Button className="w-full mt-6">
            Request Tow Truck
          </Button>
        </Card>

        <Card className="p-6">
          <TowMap 
            onPickupSelect={(location) => handleLocationSelect("pickup", location)}
            onDropSelect={(location) => handleLocationSelect("drop", location)}
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
          />
        </Card>
      </div>
    </div>
  );
};

export default Index;