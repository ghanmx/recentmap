import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { Profile } from '@/types/user'

export const useProfile = () => {
  const queryClient = useQueryClient()

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user?.id
  }

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const userId = await fetchUser()
      if (!userId) return null

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      return data as Profile
    },
  })

  const { mutateAsync: updateProfile, isPending } = useMutation({
    mutationFn: async (updates: Partial<Profile>) => {
      const userId = await fetchUser()
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
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  return {
    profile,
    isLoading,
    updateProfile,
    isPending,
  }
}