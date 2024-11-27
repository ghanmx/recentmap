import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export const UserReservations = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-semibold mb-4">Mis Reservas</h2>
      <Card className="p-4 gradient-border">
        <p className="text-gray-600">No hay reservas activas</p>
      </Card>
    </motion.div>
  );
};