import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Wrench } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/form";
import { motion } from "framer-motion";

interface ServiceRequirementsProps {
  form: UseFormReturn<FormData>;
}

export const ServiceRequirements = ({ 
  form
}: ServiceRequirementsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
        <Wrench className="w-5 h-5 text-primary animate-spin-slow" />
        <h2>Requerimientos del Servicio</h2>
      </div>

      <FormField
        control={form.control}
        name="issueDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-medium">Descripción del Problema</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Por favor, proporcione información detallada sobre el problema de su vehículo. Por ejemplo: 'El auto no arranca, hace ruidos de clic' o 'Llanta ponchada del lado del pasajero'"
                className="bg-white/80 border-gray-300 focus:ring-2 ring-primary/20 min-h-[120px] text-gray-800 resize-none"
              />
            </FormControl>
            <FormMessage className="text-sm text-red-500 mt-1" />
          </FormItem>
        )}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="flex items-center gap-2 p-3 bg-yellow-50/50 rounded-lg border border-yellow-200/50"
      >
        <AlertTriangle className="w-5 h-5 text-yellow-600" />
        <p className="text-sm text-yellow-700">
          Se pueden aplicar cargos adicionales según el tipo de vehículo y los requisitos del servicio
        </p>
      </motion.div>
    </motion.div>
  );
};