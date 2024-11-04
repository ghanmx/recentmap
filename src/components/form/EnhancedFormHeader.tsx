import { motion } from "framer-motion";
import { FileText, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const EnhancedFormHeader = () => {
  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Información del Servicio</h2>
            <p className="text-gray-600 text-sm">Complete los detalles del vehículo y servicio requerido</p>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Info className="w-5 h-5 text-gray-500" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Todos los campos son requeridos para procesar su solicitud</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  );
};