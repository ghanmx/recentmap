import { z } from 'zod'

export const formSchema = z.object({
  userName: z.string().min(1, 'Username is required'),
  phone: z.string().min(1, 'Phone number is required'),
  vehicleMake: z.string().min(1, 'Vehicle make is required'),
  vehicleModel: z.string().min(1, 'Vehicle model is required'),
  vehicleYear: z.string().min(1, 'Vehicle year is required'),
  vehicleColor: z.string().min(1, 'Vehicle color is required'),
  truckType: z.enum(['A', 'B', 'C', 'D']),
  requiresManeuver: z.boolean().default(false),
  issueDescription: z.string().optional(),
  pickupLocation: z
    .object({
      lat: z.number(),
      lng: z.number(),
      address: z.string(),
    })
    .optional(),
  dropoffLocation: z
    .object({
      lat: z.number(),
      lng: z.number(),
      address: z.string(),
    })
    .optional(),
})

export type FormData = z.infer<typeof formSchema>

export const vehicleFormSchema = formSchema
