import { useToast } from "@/components/ui/use-toast";
import { ServiceRequest } from "@/types/service";
import { useMutation } from "@tanstack/react-query";

const submitServiceRequest = async (data: Omit<ServiceRequest, 'id' | 'status' | 'createdAt'>) => {
  // TODO: Replace with your actual API endpoint
  const response = await fetch('/api/service-requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to submit service request');
  }

  return response.json();
};

export const useServiceRequest = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: submitServiceRequest,
    onSuccess: () => {
      toast({
        title: "Service Request Submitted",
        description: "We'll notify you when a tow truck is assigned.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};