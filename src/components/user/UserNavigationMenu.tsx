import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { History, Plus, Bell, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const UserNavigationMenu = () => {
  const navigate = useNavigate()

  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-white/80 hover:bg-white/95">
            <History className="w-4 h-4 mr-2" />
            Mis Reservas
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 w-[400px]">
              <NavigationMenuLink
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                onClick={() => navigate('/user/reservations')}
              >
                <div className="text-sm font-medium leading-none">
                  Historial de Reservas
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Ver y gestionar tus reservas anteriores
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-white/80 hover:bg-white/95">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Reserva
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 w-[400px]">
              <NavigationMenuLink
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                onClick={() => navigate('/new-reservation')}
              >
                <div className="text-sm font-medium leading-none">
                  Crear Reserva
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Solicita un nuevo servicio de grúa
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-white/80 hover:bg-white/95">
            <Bell className="w-4 h-4 mr-2" />
            Notificaciones
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 w-[400px]">
              <NavigationMenuLink
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                onClick={() => navigate('/user/notifications')}
              >
                <div className="text-sm font-medium leading-none">
                  Centro de Notificaciones
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Revisa tus alertas y actualizaciones
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-white/80 hover:bg-white/95">
            <Settings className="w-4 h-4 mr-2" />
            Configuración
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 w-[400px]">
              <NavigationMenuLink
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                onClick={() => navigate('/user/settings')}
              >
                <div className="text-sm font-medium leading-none">
                  Ajustes de Cuenta
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Gestiona tu perfil y métodos de pago
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
