import { type AlertAppointmentDetailModel } from "../models/appointment-detail-model";
import { AlertAppointmentDetailSchema } from "../schemas/alert-appointment-detail-schema";

import { CustomError } from "@/lib/custom-error";

export class AlertAppointmentMapper {
  static validate(item: any): AlertAppointmentDetailModel {
    try {
      const data: AlertAppointmentDetailModel = {
        message: item?.message ?? "Profesional exige bono para confirmar paciente",
        is_required: true
      };
      return AlertAppointmentDetailSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "alert-appointment-mapper.ts: (validate)")
      );
    }
  }
}
