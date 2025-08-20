import * as z from "zod"
import { UserStatus, Gender } from "@prisma/client"
import { Completeusers_roles, Relatedusers_rolesSchema, Completeprofessional_professions, Relatedprofessional_professionsSchema, Completeappointments, RelatedappointmentsSchema } from "./index"

export const usersSchema = z.object({
  id: z.bigint(),
  uid: z.string(),
  rut: z.string(),
  names: z.string(),
  last_names: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
  status: z.nativeEnum(UserStatus),
  avatar_image: z.string().nullish(),
  address: z.string(),
  gender: z.nativeEnum(Gender),
})

export interface Completeusers extends z.infer<typeof usersSchema> {
  roles: Completeusers_roles[]
  professions: Completeprofessional_professions[]
  appointments: Completeappointments[]
}

/**
 * RelatedusersSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedusersSchema: z.ZodSchema<Completeusers> = z.lazy(() => usersSchema.extend({
  roles: Relatedusers_rolesSchema.array(),
  professions: Relatedprofessional_professionsSchema.array(),
  appointments: RelatedappointmentsSchema.array(),
}))
