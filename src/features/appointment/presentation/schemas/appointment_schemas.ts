import { z } from "zod";

export const appointmentSchema = z.object({
  id: z.optional(z.number()),
  patient_id: z.number(),
  schedule_id: z.number(),
  appointment_status: z.enum(["CANCELLED", "TO_CONFIRM", "CONFIRMED"]),
});
