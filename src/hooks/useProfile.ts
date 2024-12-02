import { useQuery, useMutation } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { Profile } from '@/types/user'

export const useProfile = () => {
  const { data: profile, isLoading: loading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user?.id) return null

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      return data as Profile | null
    },
  })

  const updateProfileMutation = useMutation({
    mutationFn: async (updates: Partial<Profile>) => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user?.id) return null

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error
      return data as Profile
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