import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

interface Webhook {
  id: string;
  url: string;
  description?: string;
  is_active: boolean;
  secret_key: string;
}

export const useWebhooks = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: webhooks, isLoading } = useQuery({
    queryKey: ['webhooks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('webhooks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error fetching webhooks",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
  });

  const createWebhook = useMutation({
    mutationFn: async (webhookData: Omit<Webhook, 'id'>) => {
      const { data, error } = await supabase
        .from('webhooks')
        .insert([webhookData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] });
      toast({
        title: "Webhook Created",
        description: "Your webhook has been created successfully.",
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

  const updateWebhook = useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<Webhook> & { id: string }) => {
      const { data, error } = await supabase
        .from('webhooks')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] });
      toast({
        title: "Webhook Updated",
        description: "The webhook has been updated successfully.",
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

  const deleteWebhook = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('webhooks')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] });
      toast({
        title: "Webhook Deleted",
        description: "The webhook has been deleted successfully.",
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
    webhooks,
    isLoading,
    createWebhook,
    updateWebhook,
    deleteWebhook,
  };
};