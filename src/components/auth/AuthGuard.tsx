import { Navigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type UserRole = "admin" | "user";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export const AuthGuard = ({ children, requiredRole = "user" }: AuthGuardProps) => {
  const { toast } = useToast();
  const location = useLocation();
  
  // This is a mock authentication check. Replace with your actual auth logic
  const isAuthenticated = true; // Replace with actual auth check
  const userRole: UserRole = "user"; // Replace with actual user role

  if (!isAuthenticated) {
    toast({
      title: "Acceso Denegado",
      description: "Por favor inicia sesión para continuar",
      variant: "destructive",
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole === "admin" && userRole === "user") {
    toast({
      title: "Acceso Restringido",
      description: "No tienes permisos para acceder a esta sección",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};