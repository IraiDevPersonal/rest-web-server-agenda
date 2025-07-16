import {
  AlertAppointmentDetailMapperSchema,
  type AlertAppointmentDetailModel
} from "../models/appointment-detail";

import { CustomError } from "@/lib/custom-error";

export class AlertAppointmentMapper {
  static validateAlertAppointment(item: any): AlertAppointmentDetailModel {
    try {
      const data: AlertAppointmentDetailModel = {
        message:
          item?.message ?? "Profesional exige bono para confirmar paciente",
        is_required: true
      };
      return AlertAppointmentDetailMapperSchema.parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "alert-appointment-mapper.ts: (validateAlertAppointment)"
        )
      );
    }
  }
}
