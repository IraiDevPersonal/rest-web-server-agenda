import * as z from "zod"
import { UserStatus, Gender } from "@prisma/client"
import { Completeappointments, RelatedappointmentsSchema } from "./index"

export const patientsSchema = z.object({
  id: z.bigint(),
  uid: z.string(),
  rut: z.string(),
  names: z.string(),
  last_names: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  birth_date: z.date(),
  status: z.nativeEnum(UserStatus),
  gender: z.nativeEnum(Gender),
})

export interface Completepatients extends z.infer<typeof patientsSchema> {
  appointments: Completeappointments[]
}

/**
 * RelatedpatientsSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedpatientsSchema: z.ZodSchema<Completepatients> = z.lazy(() => patientsSchema.extend({
  appointments: RelatedappointmentsSchema.array(),
}))
