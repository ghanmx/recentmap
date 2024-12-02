import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Profile } from '@/types/user'
import { useToast } from './use-toast'

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
      toast({
        title: 'Error',
        description: 'Could not fetch profile',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', profile?.id)
        .select()
        .single()

      if (error) throw error
      setProfile(data)
      return data
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: 'Error',
        description: 'Could not update profile',
        variant: 'destructive',
      })
      return null
    }
  }

  useEffect(() => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.id) {
      await fetchProfile(user.id)
    }
  }, [])

  return {
    profile,
    loading,
    isLoading: loading,
    updateProfile: Object.assign(updateProfile, {
      mutateAsync: updateProfile,
      isPending: loading
    })
  }
}