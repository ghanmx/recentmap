import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from './use-toast'
import { Database } from '@/integrations/supabase/types'

type Tables = Database['public']['Tables']
type Webhook = Tables['webhooks']['Row']
type WebhookInsert = Tables['webhooks']['Insert']
type WebhookUpdate = Tables['webhooks']['Update']

export const useWebhooks = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data: webhooks, isLoading } = useQuery({
    queryKey: ['webhooks'],
    queryFn: async () => {
      console.log('Fetching webhooks')
      const { data, error } = await supabase
        .from('webhooks')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching webhooks:', error)
        toast({
          title: 'Error al cargar webhooks',
          description: error.message,
          variant: 'destructive',
        })
        throw error
      }

      return data as Webhook[]
    },
  })

  const createWebhook = useMutation({
    mutationFn: async (webhookData: WebhookInsert) => {
      console.log('Creating webhook:', webhookData)
      const { data, error } = await supabase
        .from('webhooks')
        .insert([webhookData])
        .select()
        .single()

      if (error) throw error
      return data as Webhook
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] })
      toast({
        title: 'Webhook Creado',
        description: 'El webhook ha sido creado exitosamente.',
      })
    },
    onError: (error: Error) => {
      console.error('Error creating webhook:', error)
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const updateWebhook = useMutation({
    mutationFn: async ({
      id,
      ...updateData
    }: WebhookUpdate & { id: string }) => {
      console.log('Updating webhook:', id, updateData)
      const { data, error } = await supabase
        .from('webhooks')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data as Webhook
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] })
      toast({
        title: 'Webhook Actualizado',
        description: 'El webhook ha sido actualizado exitosamente.',
      })
    },
    onError: (error: Error) => {
      console.error('Error updating webhook:', error)
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const deleteWebhook = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting webhook:', id)
      const { error } = await supabase.from('webhooks').delete().eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] })
      toast({
        title: 'Webhook Eliminado',
        description: 'El webhook ha sido eliminado exitosamente.',
      })
    },
    onError: (error: Error) => {
      console.error('Error deleting webhook:', error)
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  return {
    webhooks,
    isLoading,
    createWebhook,
    updateWebhook,
    deleteWebhook,
  }
}