import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { ClipboardList, Users, BarChart3, Settings } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const AdminNavigationMenu = () => {
  const navigate = useNavigate()

  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-white/80 hover:bg-white/95">
            <ClipboardList className="w-4 h-4 mr-2" />
            Reservas
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 w-[400px]">
              <NavigationMenuLink 
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                onClick={() => navigate('/admin/reservations')}
              >
                <div className="text-sm font-medium leading-none">Ver Reservas</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Gestiona todas las reservas activas y completadas
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-white/80 hover:bg-white/95">
            <Users className="w-4 h-4 mr-2" />
            Usuarios
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 w-[400px]">
              <NavigationMenuLink 
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                onClick={() => navigate('/admin/users')}
              >
                <div className="text-sm font-medium leading-none">Gestión de Usuarios</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Administra las cuentas de usuarios y permisos
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-white/80 hover:bg-white/95">
            <BarChart3 className="w-4 h-4 mr-2" />
            Reportes
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 w-[400px]">
              <NavigationMenuLink 
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                onClick={() => navigate('/admin/reports')}
              >
                <div className="text-sm font-medium leading-none">Métricas y Estadísticas</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Accede a reportes detallados del servicio
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
                onClick={() => navigate('/admin/settings')}
              >
                <div className="text-sm font-medium leading-none">Ajustes del Sistema</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Configura precios y tipos de grúas
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}