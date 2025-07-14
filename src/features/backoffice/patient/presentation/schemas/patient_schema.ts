import { RutManager } from '@core/domain/rut';
import { z } from 'zod';

export const patientSchema = z.object({
  id: z.optional(z.number()),
  uid: z.optional(z.string()),
  rut: z
    .string()
    .max(12)
    .refine((rut) => RutManager.validate(rut), {
      message: 'Debe ser un rut valido'
    }),
  names: z.string(),
  last_names: z.string(),
  email: z.string().email({ message: 'Debe ser un email valido' }),
  phone: z.string().min(9, { message: 'Mínimo 9 caracteres' }),
  address: z.string().min(10, { message: 'Minimo 10 caracteres' }),
  is_deleted: z.boolean().default(false)
});
