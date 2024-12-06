import { supabase } from '@/integrations/supabase/client'
import { toast } from '@/hooks/use-toast'

export const completeService = async (
  requestId: string,
  completionNotes?: string,
) => {
  try {
    const { data, error } = await supabase
      .from('vehicle_requests')
      .update({
        service_completed_at: new Date().toISOString(),
        service_completed_by_client: true,
        service_completion_notes: completionNotes || null,
        status: 'completed',
      })
      .eq('id', requestId)
      .select()
      .single()

    if (error) throw error

    toast({
      title: 'Service Completed',
      description: 'Thank you for confirming the service completion!',
      className: 'bg-green-50 border-green-200 text-green-800',
    })

    return data
  } catch (error) {
    console.error('Error completing service:', error)
    toast({
      title: 'Error',
      description: 'Could not complete the service. Please try again.',
      variant: 'destructive',
    })
    throw error
  }
}