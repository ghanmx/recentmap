import { useToast } from '@/components/ui/use-toast'
import { ServiceRequest } from '@/types/service'
import { useMutation } from '@tanstack/react-query'

// Mock service request function
const mockSubmitServiceRequest = async (
  data: Omit<ServiceRequest, 'id' | 'status' | 'createdAt'>,
): Promise<ServiceRequest> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Create a mock response
  return {
    ...data,
    id: Math.random().toString(36).substr(2, 9),
    status: 'pending',
    createdAt: new Date(),
  }
}

export const useServiceRequest = () => {
  const { toast } = useToast()

  return useMutation({
    mutationFn: mockSubmitServiceRequest,
    onSuccess: () => {
      toast({
        title: 'Service Request Submitted',
        description: "We'll notify you when a tow truck is assigned.",
      })
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })
}
