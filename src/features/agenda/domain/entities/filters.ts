import { AppointmentStatus } from "@prisma/client";

export interface GetMyDayFilter {
  type?: AppointmentStatus;
}
