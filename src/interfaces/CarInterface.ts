import { z } from 'zod';
import { vehicleZodSchema } from './VehicleInterface';

export const carZodSchema = vehicleZodSchema.extend({
  doorsQty: z.number().int().gte(2).lte(4),
  seatsQty: z.number().int().gte(2).lte(7),
});

export type Car = z.infer<typeof carZodSchema>;