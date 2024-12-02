import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Profile } from '@/types/user'
import { useToast } from '@/hooks/use-toast'

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isPending, setIsPending] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.id) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          if (error) throw error
          setProfile(data as Profile)
        }
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

    fetchProfile()
  }, [toast])

  const updateProfile = async (updates: Partial<Profile>) => {
    setIsPending(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user?.id) throw new Error('No user')

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)

      if (error) throw error

      setProfile(prev => prev ? { ...prev, ...updates } : null)
      return { ...profile, ...updates }
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: 'Error',
        description: 'Could not update profile',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsPending(false)
    }
  }

  const mutateAsync = updateProfile

  return {
    profile,
    loading,
    isLoading,
    isPending,
    updateProfile: Object.assign(updateProfile, { mutateAsync, isPending })
  }
}