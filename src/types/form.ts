import { z } from "zod";

export const vehicleFormSchema = z.object({
  username: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  vehicleMake: z.string().min(1, "Brand is required"),
  vehicleModel: z.string().min(1, "Model is required"),
  vehicleYear: z.string().min(4, "Year must be 4 digits"),
  vehicleColor: z.string().min(1, "Color is required"),
  issueDescription: z.string().min(10, "Please provide more details about the issue"),
  truckType: z.enum(["A", "B", "C", "D"]),
  tollFees: z.number().min(0, "Toll fees cannot be negative"),
});

export type VehicleFormValues = z.infer<typeof vehicleFormSchema>;