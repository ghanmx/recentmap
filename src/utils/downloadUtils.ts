import { getAddressFromCoordinates } from "@/services/geocodingService";
import { toast } from "@/components/ui/use-toast";

export interface FormData {
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  issueDescription: string;
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
  
  // Get addresses asynchronously
  const pickupAddress = pickupLocation 
    ? await getAddressFromCoordinates(pickupLocation.lat, pickupLocation.lng)
    : 'Not specified';
  const dropAddress = dropLocation
    ? await getAddressFromCoordinates(dropLocation.lat, dropLocation.lng)
    : 'Not specified';

  return [
    'SERVICE REQUEST INFORMATION',
    `Generated on: ${currentDate}`,
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
    `Requires Special Maneuver: ${requiresManeuver ? 'Yes' : 'No'}`,
    `Issue Description: ${formData.issueDescription}`
  ];
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