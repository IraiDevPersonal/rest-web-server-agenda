import * as z from "zod"
import { Completeprofessional_professions, Relatedprofessional_professionsSchema } from "./index"

export const professionsSchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export interface Completeprofessions extends z.infer<typeof professionsSchema> {
  professional_professions: Completeprofessional_professions[]
}

/**
 * RelatedprofessionsSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedprofessionsSchema: z.ZodSchema<Completeprofessions> = z.lazy(() => professionsSchema.extend({
  professional_professions: Relatedprofessional_professionsSchema.array(),
}))
