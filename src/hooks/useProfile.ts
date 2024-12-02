import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { Profile } from '@/types/user'

export const useProfile = () => {
  const queryClient = useQueryClient()
  const userId = supabase.auth.getUser()?.data.user?.id

  const { data: profile, isLoading: loading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) return null
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      return data as Profile
    },
    enabled: !!userId,
  })

  const { mutateAsync: updateProfile, isPending } = useMutation({
    mutationFn: async (updates: Partial<Profile>) => {
      if (!userId) return null
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error
      return data as Profile
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] })
    },
  })

  return {
    profile,
    isLoading: loading,
    updateProfile,
    isPending,
  }
}