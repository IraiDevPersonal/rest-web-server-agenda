import * as z from "zod"
import { Completeusers, RelatedusersSchema, Completeprofessions, RelatedprofessionsSchema } from "./index"

export const professional_professionsSchema = z.object({
  user_id: z.bigint(),
  profession_id: z.number().int(),
})

export interface Completeprofessional_professions extends z.infer<typeof professional_professionsSchema> {
  user: Completeusers
  profession: Completeprofessions
}

/**
 * Relatedprofessional_professionsSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedprofessional_professionsSchema: z.ZodSchema<Completeprofessional_professions> = z.lazy(() => professional_professionsSchema.extend({
  user: RelatedusersSchema,
  profession: RelatedprofessionsSchema,
}))
