import { AppointmentStatus } from "@prisma/client";

export interface AgendaFilter {
  type?: AppointmentStatus;
}
