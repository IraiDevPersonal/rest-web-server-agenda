import * as z from "zod"
import { Completeusers_roles, Relatedusers_rolesSchema } from "./index"

export const rolesSchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export interface Completeroles extends z.infer<typeof rolesSchema> {
  users: Completeusers_roles[]
}

/**
 * RelatedrolesSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedrolesSchema: z.ZodSchema<Completeroles> = z.lazy(() => rolesSchema.extend({
  users: Relatedusers_rolesSchema.array(),
}))
