import * as z from "zod";
import { AppointmentStatus } from "@prisma/client";
import {
  Completeusers,
  RelatedusersSchema,
  Completepatients,
  RelatedpatientsSchema
} from "./index";

export const appointmentsSchema = z.object({
  id: z.bigint(),
  uid: z.string(),
  user_id: z.bigint(),
  date: z.date(),
  time_from: z.string(),
  time_to: z.string(),
  patient_id: z.bigint().nullish(),
  is_enabled: z.boolean(),
  appointment_status: z.enum(AppointmentStatus)
});

export interface Completeappointments extends z.infer<typeof appointmentsSchema> {
  user: Completeusers;
  patient?: Completepatients | null;
}

/**
 * RelatedappointmentsSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedappointmentsSchema: z.ZodSchema<Completeappointments> = z.lazy(() =>
  appointmentsSchema.extend({
    user: RelatedusersSchema,
    patient: RelatedpatientsSchema.nullish()
  })
);
