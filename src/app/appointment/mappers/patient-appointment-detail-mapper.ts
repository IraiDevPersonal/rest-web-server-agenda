import {
  PatientAppointmDetailMapperSchema,
  type PatientAppointmentDetailModel
} from "../models/appointment-detail";

import { CustomError } from "@/lib/custom-error";

export class PatientAppointmentDetailMapper {
  static validate(item: any): PatientAppointmentDetailModel {
    try {
      const data = PatientAppointmentDetailMapper.mapper(item);
      return PatientAppointmDetailMapperSchema.parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "patient-appointment-detail-mapper.ts: (validate)"
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
