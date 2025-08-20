import { z } from "zod";
import { AppointmentDetailSchema } from "./appointment-detail-schema";
import { AlertAppointmentDetailSchema } from "../schemas/alert-appointment-detail-schema";

export type AlertAppointmentDetailModel = z.infer<typeof AlertAppointmentDetailSchema>;

export type AppointmentDetailModel = z.infer<typeof AppointmentDetailSchema>;
