import { z } from "zod";

export const AlertAppointmentDetailSchema = z.object({
  message: z.string(),
  is_required: z.boolean()
});
