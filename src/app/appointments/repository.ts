import type { AppointmentFilters } from "./models/appointment-filters.model";

export type AppointmentServiceRepository = {
  getAppointmentByUid: (uid: string) => Promise<unknown | null>;
  getAppointments: (filters: AppointmentFilters) => Promise<unknown>;
};
