import type { AppointmentDetailModel } from "../models/appointment-detail.model";

import { CustomError } from "@/lib/custom-error";
import { DateFormatter } from "@/lib/date-formatter";
import { AppointmentDetailBdSchema } from "../schemas/bd/appointment-detail.schema";

export class AppointmentDetailMapper {
  static map = (raw: unknown): AppointmentDetailModel => {
    const { success, data, error } = AppointmentDetailBdSchema.safeParse(raw);

    if (!success) {
      throw CustomError.mapperError(error, "AppointmentDetailMapper.map");
    }

    const patient = data.patient;
    const professional = data.user;
    const patientHistory = patient?.appointments ?? [];

    return {
      uid: data.uid,
      time_to: data.time_to,
      time_from: data.time_from,
      is_enabled: data.is_enabled,
      status: data.appointment_status,
      date: DateFormatter.formatDate(data.date, "ymd"),
      professional: {
        names: professional.names,
        last_names: professional.last_names,
        pay_methods: ["Fonasa", "Particular"],
        confirm_methods: ["Whatsapp", "Correo", "Teléfono"],
        professions: professional.professions.map((p) => p.profession.name)
      },
      alert: {
        message: "Profesional requiere bono para confirmar cita",
        is_required: !!patient?.rut.endsWith("9") // FIXME: corregir cuando se maneje la alerta de forma correcta
      },
      patient: patient
        ? {
            uid: patient.uid,
            rut: patient.rut,
            phone: patient.phone,
            email: patient.email,
            names: patient.names,
            address: patient.address,
            last_names: patient.last_names,
            avatar_image: patient.avatar_image,
            history: patientHistory.map((appointment) => ({
              uid: appointment.uid,
              time_to: appointment.time_to,
              time_from: appointment.time_from,
              status: appointment.appointment_status,
              date: DateFormatter.formatDate(appointment.date, "ymd")
            }))
          }
        : null
    };
  };

  static fromBdToDomain = (raw: unknown): AppointmentDetailModel => {
    return this.map(raw);
  };
}
