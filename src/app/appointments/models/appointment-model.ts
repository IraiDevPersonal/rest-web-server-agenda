import { z } from "zod";
import { AppointmentSchema } from "../schemas/appointment-schema";
import { UpsertAppointmentSchema } from "../schemas/upsert-appointment-schema";

export type AppointmentModel = z.infer<typeof AppointmentSchema>;
export type UpsertAppointmentValues = z.infer<typeof UpsertAppointmentSchema>;
