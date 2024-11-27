import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/form";
import { Card } from "@/components/ui/card";

interface ManeuverFieldProps {
  form: UseFormReturn<FormData>;
  onManeuverChange?: () => void;
}

export const ManeuverField = ({ form, onManeuverChange }: ManeuverFieldProps) => {
  return (
    <Card className="p-4 space-y-4">
      <FormField
        control={form.control}
        name="issueDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Descripción del Problema</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describa el problema o situación especial del vehículo (ej: no enciende, llanta ponchada, etc.)"
                className="min-h-[100px] resize-none"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  if (e.target.value.length > 0) {
                    form.setValue("requiresManeuver", true);
                    onManeuverChange?.();
                  }
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </Card>
  );
};