import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import {
  User,
  Calendar,
  Bell,
  Settings,
  LogOut,
  Truck,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

export const UserNavigationMenu = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      toast({
        title: 'Sesión cerrada',
        description: 'Has cerrado sesión exitosamente',
      })
      navigate('/')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo cerrar la sesión',
        variant: 'destructive',
      })
    }
  }

  return (
    <NavigationMenu className="max-w-full w-full justify-start">
      <NavigationMenuList className="space-x-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <User className="w-4 h-4 mr-2" />
            Mi Cuenta
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 w-[400px]">
              <ListItem
                href="/user/profile"
                title="Perfil"
                icon={<User className="w-4 h-4" />}
              >
                Gestiona tu información personal y preferencias
              </ListItem>
              <ListItem
                href="/user/services"
                title="Servicios"
                icon={<Truck className="w-4 h-4" />}
              >
                Revisa tus servicios activos y el historial
              </ListItem>
              <ListItem
                href="/user/notifications"
                title="Notificaciones"
                icon={<Bell className="w-4 h-4" />}
              >
                Configura tus preferencias de notificación
              </ListItem>
              <ListItem
                href="/user/settings"
                title="Configuración"
                icon={<Settings className="w-4 h-4" />}
              >
                Ajusta la configuración de tu cuenta
              </ListItem>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors w-full text-left text-red-600"
              >
                <LogOut className="w-4 h-4" />
                <span>Cerrar Sesión</span>
              </button>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Calendar className="w-4 h-4 mr-2" />
            Reservaciones
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 w-[400px]">
              <ListItem
                href="/user/new-service"
                title="Nuevo Servicio"
                icon={<Truck className="w-4 h-4" />}
              >
                Solicita un nuevo servicio de grúa
              </ListItem>
              <ListItem
                href="/user/history"
                title="Historial"
                icon={<Calendar className="w-4 h-4" />}
              >
                Revisa tu historial de servicios
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = ({
  className,
  title,
  children,
  icon,
  href,
  ...props
}: {
  className?: string
  title: string
  children: React.ReactNode
  icon?: React.ReactNode
  href: string
}) => {
  return (
    <motion.li whileHover={{ scale: 1.02 }}>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </motion.li>
  )
}