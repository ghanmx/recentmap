import { useQuery, useMutation } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

export interface UserProfile {
  id: string
  username: string | null
  full_name: string | null
  phone_number: string | null
  avatar_url: string | null
  bio: string | null
  preferences: Record<string, any>
}

export const useUserProfile = () => {
  const { toast } = useToast()

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError) throw authError

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error
      return data as UserProfile
    },
  })

  const updateProfile = useMutation({
    mutationFn: async (updates: Partial<UserProfile>) => {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError) throw authError

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      toast({
        title: 'Perfil actualizado',
        description: 'Los cambios han sido guardados exitosamente.',
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

  return {
    profile,
    isLoading,
    error,
    updateProfile,
  }
}