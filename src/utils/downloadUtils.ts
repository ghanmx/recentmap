import { getAddressFromCoordinates } from "@/services/geocodingService";
import { calculateTotalCost, towTruckTypes } from "./towTruckPricing";
import { getRouteDetails } from "@/services/routeService";
import { toast } from "@/components/ui/use-toast";

export type TowTruckType = "A" | "B" | "C" | "D";

export interface FormData {
  username: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  vehicleColor: string;
  issueDescription: string;
  truckType: TowTruckType;
  tollFees: number;
}

interface Location {
  lat: number;
  lng: number;
}

export const generateServiceInfo = async (
  formData: FormData,
  pickupLocation: Location | null,
  dropLocation: Location | null,
  serviceType: string,
  requiresManeuver: boolean
) => {
  const currentDate = new Date().toLocaleString();
  
  const pickupAddress = pickupLocation 
    ? await getAddressFromCoordinates(pickupLocation.lat, pickupLocation.lng)
    : 'Not specified';
  const dropAddress = dropLocation
    ? await getAddressFromCoordinates(dropLocation.lat, dropLocation.lng)
    : 'Not specified';

  let totalDistance = 0;
  let totalCost = 0;
  let costPerKm = 0;
  let basePrice = 0;
  let maneuverCost = 0;

  if (pickupLocation && dropLocation) {
    try {
      const route = await getRouteDetails(pickupLocation, dropLocation);
      totalDistance = route.distance;
      const truckDetails = towTruckTypes[formData.truckType];
      costPerKm = truckDetails.perKm * totalDistance;
      basePrice = truckDetails.basePrice;
      maneuverCost = requiresManeuver ? truckDetails.maneuverCharge : 0;
      totalCost = calculateTotalCost(totalDistance, formData.truckType, requiresManeuver);
      totalCost += formData.tollFees;
    } catch (error) {
      console.error('Error calculating route:', error);
    }
  }

  return [
    'SERVICE REQUEST INFORMATION',
    `Generated on: ${currentDate}`,
    '',
    'USER INFORMATION',
    `Name: ${formData.username}`,
    '',
    'LOCATION DETAILS',
    'Pickup Location',
    `Complete Address: ${pickupAddress}`,
    `Coordinates: ${pickupLocation?.lat.toFixed(6)}, ${pickupLocation?.lng.toFixed(6)}`,
    '',
    'Drop-off Location',
    `Complete Address: ${dropAddress}`,
    `Coordinates: ${dropLocation?.lat.toFixed(6)}, ${dropLocation?.lng.toFixed(6)}`,
    '',
    'VEHICLE DETAILS',
    `Make: ${formData.vehicleMake}`,
    `Model: ${formData.vehicleModel}`,
    `Year: ${formData.vehicleYear}`,
    `Color: ${formData.vehicleColor}`,
    '',
    'SERVICE DETAILS',
    `Service Type: ${serviceType}`,
    `Tow Truck Type: ${formData.truckType}`,
    `Requires Special Maneuver: ${requiresManeuver ? 'Yes' : 'No'}`,
    `Issue Description: ${formData.issueDescription}`,
    '',
    'COST BREAKDOWN',
    `Total Distance: ${totalDistance.toFixed(2)} km`,
    `Base Price: $${basePrice.toFixed(2)}`,
    `Cost per km ($${towTruckTypes[formData.truckType].perKm}/km): $${costPerKm.toFixed(2)}`,
    requiresManeuver ? `Special Maneuver Cost: $${maneuverCost.toFixed(2)}` : '',
    `Toll Fees: $${formData.tollFees.toFixed(2)}`,
    '----------------------------------------',
    `TOTAL COST: $${totalCost.toFixed(2)}`
  ].filter(Boolean); // Remove empty strings from maneuver cost when not required
};

export const downloadServiceInfo = async (
  format: 'csv' | 'txt',
  formData: FormData,
  pickupLocation: Location | null,
  dropLocation: Location | null,
  serviceType: string,
  requiresManeuver: boolean
) => {
  try {
    const content = await generateServiceInfo(
      formData,
      pickupLocation,
      dropLocation,
      serviceType,
      requiresManeuver
    );

    let blob;
    let filename;

    if (format === 'csv') {
      const csvContent = '\ufeff' + content.map(row => row.includes(',') ? `"${row}"` : row).join('\n');
      blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      filename = `service-request-${new Date().getTime()}.csv`;
    } else {
      const txtContent = content.join('\n');
      blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
      filename = `service-request-${new Date().getTime()}.txt`;
    }

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Information Downloaded",
      description: `Service request information has been saved as ${format.toUpperCase()} file.`,
      duration: 3000,
    });
  } catch (error) {
    toast({
      title: "Download Failed",
      description: "There was an error generating the download file.",
      variant: "destructive",
    });
  }
};