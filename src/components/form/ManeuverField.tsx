import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/form";

interface ManeuverFieldProps {
  form: UseFormReturn<FormData>;
  onManeuverChange?: () => void;
}

export const ManeuverField = ({ form, onManeuverChange }: ManeuverFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="requiresManeuver"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">Requires Maneuver</FormLabel>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked);
                onManeuverChange?.();
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};