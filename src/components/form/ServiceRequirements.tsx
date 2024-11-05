import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Wrench } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/form";
import { motion } from "framer-motion";

export interface ServiceRequirementsProps {
  form: UseFormReturn<FormData>;
  requiresManeuver?: boolean;
  onManeuverChange?: (checked: boolean) => void;
}

export const ServiceRequirements = ({ 
  form,
  requiresManeuver,
  onManeuverChange 
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
    </motion.div>
  );
};