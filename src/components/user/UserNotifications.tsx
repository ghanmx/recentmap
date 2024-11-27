import { Bell } from "lucide-react";
import { motion } from "framer-motion";

export const UserNotifications = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-semibold mb-4">Notificaciones</h2>
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <Bell className="w-12 h-12 mb-4" />
        <p>No hay notificaciones nuevas</p>
      </div>
    </motion.div>
  );
};