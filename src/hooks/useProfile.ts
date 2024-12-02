import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Profile } from '@/types/user'
import { useToast } from './use-toast'

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPending, setIsPending] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user?.id) return null

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) throw error
        setProfile(data)
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      setIsPending(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user?.id) return null

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error

      setProfile(data)
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
      })
      return data
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: 'Error',
        description: 'Failed to update profile.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsPending(false)
    }
  }

  return {
    profile,
    loading,
    isLoading: loading,
    isPending,
    updateProfile: Object.assign(updateProfile, {
      isPending,
      mutateAsync: updateProfile
    })
  }
}