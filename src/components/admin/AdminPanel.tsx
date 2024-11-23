import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReservationManagement } from "./ReservationManagement";
import { AdminMetrics } from "./AdminMetrics";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Search, RefreshCw, Settings, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const AdminPanel = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeUsers, setActiveUsers] = useState(45);
  const [totalReservations, setTotalReservations] = useState(156);
  const [totalRevenue, setTotalRevenue] = useState(15690);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update stats with random variations
      setActiveUsers(prev => Math.max(30, Math.min(60, prev + Math.floor(Math.random() * 10) - 5)));
      setTotalReservations(prev => prev + Math.floor(Math.random() * 5));
      setTotalRevenue(prev => prev + Math.floor(Math.random() * 1000));
      
      toast({
        title: "Panel Actualizado",
        description: "Los datos han sido actualizados correctamente",
      });
    } catch (error) {
      toast({
        title: "Error al actualizar",
        description: "No se pudieron actualizar los datos",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    handleRefresh();
    const interval = setInterval(handleRefresh, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const quickStats = [
    { label: "Reservas Totales", value: totalReservations.toString(), icon: Users },
    { label: "Ingresos", value: `$${totalRevenue.toLocaleString()}`, icon: RefreshCw },
    { label: "Usuarios Activos", value: activeUsers.toString(), icon: Settings },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto p-6 space-y-6"
    >
      <div className="glass-card p-6 rounded-xl border border-primary/10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold gradient-text">Panel de Administración</h1>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              className={`${isRefreshing ? 'animate-spin' : ''}`}
              disabled={isRefreshing}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key="stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
          >
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 glass-card hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-500">{stat.label}</h3>
                        <p className="text-2xl font-bold text-primary">{stat.value}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
        
        <Tabs defaultValue="reservations" className="w-full">
          <TabsList className="grid w-full grid-cols-2 glass-card">
            <TabsTrigger value="reservations">Reservas</TabsTrigger>
            <TabsTrigger value="metrics">Métricas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reservations" className="mt-6">
            <Card className="glass-card">
              <ScrollArea className="h-[calc(100vh-20rem)]">
                <ReservationManagement searchQuery={searchQuery} />
              </ScrollArea>
            </Card>
          </TabsContent>
          
          <TabsContent value="metrics" className="mt-6">
            <Card className="glass-card">
              <ScrollArea className="h-[calc(100vh-20rem)]">
                <AdminMetrics />
              </ScrollArea>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};