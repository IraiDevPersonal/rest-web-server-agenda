import {
  AlertAppointmentDetailMapperSchema,
  type AlertAppointmentDetailModel
} from "../models/appointment-detail";

import { CustomError } from "@/lib/custom-error";

export class AlertAppointmentMapper {
  static validate(item: any): AlertAppointmentDetailModel {
    try {
      const data = AlertAppointmentMapper.mapper(item);
      return AlertAppointmentDetailMapperSchema.parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "alert-appointment-detail-mapper.ts: (validate)"
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
