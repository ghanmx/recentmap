import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Wrench } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface ServiceRequirementsProps {
  form: UseFormReturn<any>;
  requiresManeuver: boolean;
  onManeuverChange: (checked: boolean) => void;
}

export const ServiceRequirements = ({ 
  form, 
  requiresManeuver, 
  onManeuverChange 
}: ServiceRequirementsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
        <Wrench className="w-5 h-5 text-secondary animate-spin-slow" />
        <h2>Service Requirements</h2>
      </div>

      <div className="flex items-center justify-between p-4 bg-white/80 rounded-lg border border-gray-200">
        <FormLabel className="text-gray-600">Requires Special Maneuver</FormLabel>
        <Switch
          checked={requiresManeuver}
          onCheckedChange={onManeuverChange}
        />
      </div>

      <FormField
        control={form.control}
        name="issueDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Issue Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Describe the problem with your vehicle..."
                className="bg-white/80 border-gray-300 focus:ring-2 ring-primary/20 min-h-[100px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
        <AlertTriangle className="w-5 h-5 text-yellow-600" />
        <p className="text-sm text-yellow-700">
          Additional fees may apply based on vehicle type and service requirements
        </p>
      </div>
    </div>
  );
};