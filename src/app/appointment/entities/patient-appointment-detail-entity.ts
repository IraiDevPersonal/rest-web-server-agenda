import {
  PatientAppointmDetailEntitySchema,
  type PatientAppointmentDetailModel
} from "../models/appointment-detail";

import { CustomError } from "@/lib/custom-error";

export class PatientAppointmentDetailEntity {
  static validate(item: any): PatientAppointmentDetailModel {
    try {
      const data = PatientAppointmentDetailEntity.mapper(item);
      return PatientAppointmDetailEntitySchema.parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "patient-appointment-detail-entity.ts: (validate)"
        )
      );
    }
  }

  private static mapper(item: any): PatientAppointmentDetailModel {
    return {
      names: item.names ?? "sin nombres",
      last_names: item.names ?? "sin apellidos",
      rut: item.names ?? "sin rut",
      phone: item.names ?? "sin teléfono",
      email: item.names ?? "sin correo",
      address: item.names ?? "sin dirección"
    };
  }
}
