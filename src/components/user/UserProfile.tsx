import { useProfile } from '@/hooks/useProfile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Loader2 } from 'lucide-react'

const profileSchema = z.object({
  full_name: z.string().min(2, 'El nombre es muy corto'),
  username: z.string().min(3, 'El usuario es muy corto'),
  phone_number: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos'),
  bio: z.string().optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

export const UserProfile = () => {
  const { profile, updateProfile, isPending, isLoading } = useProfile()
  const { toast } = useToast()

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile?.full_name || '',
      username: profile?.username || '',
      phone_number: profile?.phone_number || '',
      bio: profile?.bio || '',
    },
  })

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile(data)
      toast({
        title: 'Perfil actualizado',
        description: 'Tu información ha sido actualizada exitosamente',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar tu perfil',
        variant: 'destructive',
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-2xl mx-auto"
      >
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Tu nombre completo" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de Usuario</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Tu nombre de usuario" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  placeholder="Tu número de teléfono"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biografía</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Cuéntanos un poco sobre ti"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Actualizando...
            </>
          ) : (
            'Guardar Cambios'
          )}
        </Button>
      </form>
    </Form>
  )
}