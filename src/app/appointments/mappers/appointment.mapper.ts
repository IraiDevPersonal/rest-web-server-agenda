import { type AppointmentModel } from "../models/appointment.model";

import { CustomError } from "@/lib/custom-error";
import { DateFormatter } from "@/lib/date-formatter";
import { RelatedBdAppointmentSchema } from "../schemas/bd/appointment.schema";

export class AppointmentMapper {
  static map = (raw: unknown): AppointmentModel => {
    const { success, data, error } = RelatedBdAppointmentSchema.safeParse(raw);

    if (!success) {
      throw CustomError.internalServer("AppointmentMapper.map: " + CustomError.getError(error).message);
    }

    const patient = data.patient;
    const professional = data.user;
    const professions = professional.professions.map((p) => p.profession.name);

    return {
      uid: data.uid,
      time_to: data.time_to,
      time_from: data.time_from,
      appointment_status: data.appointment_status,
      date: DateFormatter.formatDate(data.date, "ymd"),
      professional: {
        full_name: `${professional.names} ${professional.last_names}`,
        professions: professions
      },
      patient: patient
        ? {
            full_name: `${patient.names} ${patient.last_names}`,
            phone: patient.phone,
            rut: patient.rut
          }
        : null
    };
  };

  static fromBdToDomain = (raw: unknown): AppointmentModel[] => {
    const { success, data, error } = RelatedBdAppointmentSchema.array().safeParse(raw);

    if (!success) {
      throw CustomError.internalServer(
        "AppointmentMapper.fromBdToDomain: " + CustomError.getError(error).message
      );
    }

    return data.map(this.map);
  };
}
