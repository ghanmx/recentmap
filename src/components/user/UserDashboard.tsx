import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserReservations } from "./UserReservations";
import { UserNotifications } from "./UserNotifications";
import { UserSettings } from "./UserSettings";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export const UserDashboard = () => {
  const { toast } = useToast();
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch user name
    const timer = setTimeout(() => {
      setUserName("John Doe");
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto p-6 space-y-6"
    >
      <div className="glass-card p-6 rounded-xl border border-primary/10">
        {isLoading ? (
          <div className="flex items-center gap-2 text-primary">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Cargando...</span>
          </div>
        ) : (
          <h1 className="text-3xl font-bold gradient-text mb-4">
            Bienvenido, {userName}
          </h1>
        )}
        
        <Tabs defaultValue="reservations" className="w-full">
          <TabsList className="grid w-full grid-cols-3 glass-card">
            <TabsTrigger value="reservations">Mis Reservas</TabsTrigger>
            <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reservations" className="mt-6">
            <Card className="glass-card p-6">
              <UserReservations />
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <Card className="glass-card p-6">
              <UserNotifications />
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <Card className="glass-card p-6">
              <UserSettings />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};