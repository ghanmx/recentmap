import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useMapNotifications } from './useMapNotifications';
import { getAddressFromCoordinates } from '@/services/geocodingService';

interface Location {
  lat: number;
  lng: number;
}

export const useMapState = () => {
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [dropLocation, setDropLocation] = useState<Location | null>(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropAddress, setDropAddress] = useState("");
  const [selectingPickup, setSelectingPickup] = useState(false);
  const [selectingDrop, setSelectingDrop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { showLocationUpdateSuccess } = useMapNotifications();

  const handleLocationSelect = async (location: Location, type: 'pickup' | 'drop') => {
    setIsLoading(true);
    try {
      const address = await getAddressFromCoordinates(location.lat, location.lng);
      
      if (type === 'pickup') {
        setPickupLocation(location);
        setPickupAddress(address);
        setSelectingPickup(false);
      } else {
        setDropLocation(location);
        setDropAddress(address);
        setSelectingDrop(false);
      }

      showLocationUpdateSuccess(type, address);
    } catch (error) {
      console.error('Error getting address:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    pickupLocation,
    dropLocation,
    pickupAddress,
    dropAddress,
    selectingPickup,
    selectingDrop,
    isLoading,
    setSelectingPickup,
    setSelectingDrop,
    handleLocationSelect
  };
};