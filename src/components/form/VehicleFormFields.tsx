import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/form";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { UserInfoFields } from "./UserInfoFields";
import { VehicleBasicFields } from "./VehicleBasicFields";
import { ManeuverField } from "./ManeuverField";
import { TowTruckSelector } from "./TowTruckSelector";

interface VehicleFormFieldsProps {
  form: UseFormReturn<FormData>;
  onVehicleModelChange: (value: string) => void;
  onTruckTypeChange: (value: "A" | "B" | "C" | "D") => void;
}

export const VehicleFormFields = ({
  form,
  onVehicleModelChange,
  onTruckTypeChange
}: VehicleFormFieldsProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="p-6 bg-gradient-to-br from-white/95 to-blue-50/30 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="space-y-6">
            <UserInfoFields form={form} />
            <VehicleBasicFields 
              form={form}
              onVehicleModelChange={onVehicleModelChange}
            />
            <ManeuverField form={form} />
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="p-6 bg-gradient-to-br from-white/95 to-blue-50/30 shadow-lg hover:shadow-xl transition-all duration-300">
          <TowTruckSelector
            form={form}
            selectedModel={form.watch("vehicleModel")}
            onTruckTypeChange={onTruckTypeChange}
          />
        </Card>
      </motion.div>
    </>
  );
};