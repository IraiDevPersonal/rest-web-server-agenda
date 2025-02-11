import dayjs from "dayjs";
import { AppointmentEntity } from "../../../appointment/domain/entities/appointment_entity";

export type GetAgendaResponse = {
  uid: string;
  date: string;
  time_from: string;
  time_to: string;
  patient_name: string | undefined;
  patient_rut: string | undefined;
  patient_phone: string | undefined;
  professional_name: string;
  professions: string[];
};

export const getAgendaAdapter = (
  appointment: Omit<
    AppointmentEntity,
    "patient_id" | "schedule_id" | "appointment_status_id"
  >
): GetAgendaResponse => {
  return {
    uid: appointment.uid!,
    date: dayjs(appointment.schedule!.date).format("YYYY-MM-DD"),
    time_from: appointment.schedule!.time_from,
    time_to: appointment.schedule!.time_to,
    patient_name: appointment.patient?.names
      ? `${appointment.patient?.names} ${appointment.patient?.last_names}`
      : undefined,
    patient_rut: appointment.patient?.rut,
    patient_phone: appointment.patient?.phone,
    professional_name: appointment.schedule!.professional!.user!.names,
    professions:
      appointment.schedule?.professional?.professions?.map((p) => p.name) ?? [],
  };
};
