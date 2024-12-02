import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Profile } from '@/types/user'
import { useToast } from './use-toast'

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      setIsLoading(true)

      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) throw new Error('No user found')

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
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
      setIsLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user found')

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
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

  return {
    profile,
    loading,
    isLoading,
    updateProfile: Object.assign(updateProfile, {
      mutateAsync: updateProfile,
      isPending: loading,
    }),
  }
}