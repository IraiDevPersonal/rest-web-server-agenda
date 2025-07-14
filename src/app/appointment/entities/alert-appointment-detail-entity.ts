import { z } from "zod";

import { CustomError } from "@/lib/custom-error";

const AlertAppointmentDetailEntitySchema = z.object({
  message: z.string(),
  is_required: z.boolean()
});

type AlertAppointmentDetailModel = z.infer<
  typeof AlertAppointmentDetailEntitySchema
>;

export class AlertAppointmentDetailEntity {
  public message: AlertAppointmentDetailModel["message"];
  public is_required: AlertAppointmentDetailModel["is_required"];

  private constructor(init: AlertAppointmentDetailModel) {
    this.message = init.message;
    this.is_required = init.is_required;
  }

  static getSchema() {
    return AlertAppointmentDetailEntitySchema;
  }

  static validate(item: any): AlertAppointmentDetailModel {
    try {
      const data = AlertAppointmentDetailEntity.mapper(item);
      return AlertAppointmentDetailEntity.getSchema().parse(data);
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
