import {
  AlertAppointmentDetailEntitySchema,
  type AlertAppointmentDetailModel
} from "../models/appointment-detail";

import { CustomError } from "@/lib/custom-error";

export class AlertAppointmentDetailEntity {
  static validate(item: any): AlertAppointmentDetailModel {
    try {
      const data = AlertAppointmentDetailEntity.mapper(item);
      return AlertAppointmentDetailEntitySchema.parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "alert-appointment-detail-entity.ts: (validate)"
        )
      );
    }
  }

  private static mapper(item: any): AlertAppointmentDetailModel {
    return {
      message:
        item?.message ?? "Profesional exige bono para confirmar paciente",
      is_required: true
    };
  }
}
