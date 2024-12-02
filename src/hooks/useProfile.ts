import { useQuery, useMutation } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { Profile } from '@/types/user'

export const useProfile = () => {
  const { data: profile, isLoading: loading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .single()

      if (error) throw error
      return data as Profile | null
    },
  })

  const updateProfileMutation = useMutation({
    mutationFn: async (updates: Partial<Profile>) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', profile?.id)
        .single()

      if (error) throw error
      return data as Profile | null
    },
  })

  return {
    profile,
    loading,
    isLoading: loading,
    updateProfile: updateProfileMutation.mutateAsync,
    isPending: updateProfileMutation.isPending
  }
}