import * as z from "zod"
import { Completeusers, RelatedusersSchema, Completeroles, RelatedrolesSchema } from "./index"

export const users_rolesSchema = z.object({
  user_id: z.bigint(),
  role_id: z.number().int(),
})

export interface Completeusers_roles extends z.infer<typeof users_rolesSchema> {
  user: Completeusers
  role: Completeroles
}

/**
 * Relatedusers_rolesSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedusers_rolesSchema: z.ZodSchema<Completeusers_roles> = z.lazy(() => users_rolesSchema.extend({
  user: RelatedusersSchema,
  role: RelatedrolesSchema,
}))
