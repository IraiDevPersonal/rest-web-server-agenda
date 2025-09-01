import { type AppointmentDetailModel } from "../models/appointment-detail.model";

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

    return {
      uid: data.uid,
      time_to: data.time_to,
      time_from: data.time_from,
      is_enabled: data.is_enabled,
      status: data.appointment_status,
      date: DateFormatter.formatDate(data.date, "ymd"),
      professional: {
        pay_methods: ["Fonasa", "Particular"],
        confirm_methods: ["Whatsapp", "Correo", "Teléfono"],
        fullname: `${professional.names} ${professional.last_names}`,
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
            names: patient.names,
            phone: patient.phone,
            email: patient.email,
            address: patient.address,
            last_names: patient.last_names,
            avatar_image: patient.avatar_image
          }
        : null,
      patient_history: (patient?.appointments ?? []).map((appointment) => ({
        uid: appointment.uid,
        status: appointment.appointment_status,
        date_time: `${DateFormatter.formatDate(appointment.date, "dmy")} ${appointment.time_from}-${appointment.time_to}`
      }))
    };
  };

  static fromBdToDomain = (raw: unknown): AppointmentDetailModel => {
    return this.map(raw);
  };
}
