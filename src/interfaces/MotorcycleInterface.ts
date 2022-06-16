import { z } from 'zod';
import { vehicleZodSchema } from './VehicleInterface';

export const motorcycleZodSchema = vehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().positive().lte(2500),
});

export type Motorcycle = z.infer<typeof motorcycleZodSchema>;