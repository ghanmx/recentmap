import { z } from "zod";

export const formSchema = z.object({
  vehicleModel: z.string().min(1, "Selecciona un tipo de vehículo"),
  truckType: z.enum(["A", "B", "C", "D"]),
  issueDescription: z.string().optional(),
  pickupLocation: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string()
  }).optional(),
  dropoffLocation: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string()
  }).optional(),
});

export type FormData = z.infer<typeof formSchema>;

export const vehicleFormSchema = formSchema;