import { z } from 'zod';

export const vehicleZodSchema = z.object({
  model: z.string().min(3),
  year: z.number().int().gte(1900).lte(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

export type Vehicle = z.infer<typeof vehicleZodSchema>;
