import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

export const useVehicleRequests = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: vehicleRequests, isLoading } = useQuery({
    queryKey: ['vehicleRequests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicle_requests')
        .select(`
          *,
          profiles:profiles(username, full_name, phone_number)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error fetching requests",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
  });

  const createRequest = useMutation({
    mutationFn: async (requestData: {
      vehicle_make: string;
      vehicle_model: string;
      vehicle_year: string;
      vehicle_color: string;
      requires_maneuver: boolean;
      truck_type: string;
      pickup_location: { lat: number; lng: number };
      dropoff_location: { lat: number; lng: number };
    }) => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data, error } = await supabase
        .from('vehicle_requests')
        .insert([
          {
            ...requestData,
            user_id: userData.user.id,
            status: 'pending'
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Notify admin via email
      await supabase.functions.invoke('notify-request', {
        body: { requestId: data.id }
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicleRequests'] });
      toast({
        title: "Request Created",
        description: "Your towing request has been submitted successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateRequest = useMutation({
    mutationFn: async ({ id, ...updateData }: { 
      id: string;
      status?: string;
      requires_maneuver?: boolean;
      truck_type?: string;
    }) => {
      const { data, error } = await supabase
        .from('vehicle_requests')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicleRequests'] });
      toast({
        title: "Request Updated",
        description: "The towing request has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    vehicleRequests,
    isLoading,
    createRequest,
    updateRequest,
  };
};