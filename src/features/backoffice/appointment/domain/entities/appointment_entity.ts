import { CustomError } from "@core/domain/custom.error";
import { AppointmentStatus } from "@prisma/client";
import { z } from "zod";

export const appointmentSchema = z.object({
  id: z.optional(z.number()),
  uid: z.optional(z.string()),
  patient_id: z.number(),
  schedule_id: z.number(),
  appointment_status: z.enum([
    "CANCELLED",
    "TO_CONFIRM",
    "CONFIRMED",
    "AVAILABLE",
  ]),
});

type Init = {
  id?: number | undefined;
  uid?: string | undefined;
  patient_id: number;
  schedule_id: number;
  appointment_status: AppointmentStatus;
};
export class AppointmentEntity {
  public id?: number | undefined;
  public uid?: string | undefined;
  public patient_id?: number | undefined;
  public schedule_id: number;
  public appointment_status: AppointmentStatus;

  private constructor(init: Init) {
    this.id = init?.id;
    this.uid = init?.uid;
    this.patient_id = init.patient_id;
    this.schedule_id = init.schedule_id;
    this.appointment_status = init.appointment_status;
  }

  static adapter(object: Record<string, any>) {
    return {
      uid: object["uid"],
      patient_id: object["patient_id"],
      schedule_id: object["schedule_id"],
      appointment_status: object["appointment_status"],
    };
  }

  static fromJson(object: Record<string, any>) {
    try {
      const schema = appointmentSchema.parse(object);
      return new AppointmentEntity(schema);
    } catch (error) {
      throw CustomError.badRequest(`parse error: ${error}`);
    }
  }

  static createDTO(object: Record<string, any>) {
    const model = AppointmentEntity.fromJson(object);
    delete model.id;
    return model;
  }

  static updateDTO(object: Record<string, any>) {
    const model = AppointmentEntity.fromJson(object);

    if (!model.id) {
      throw CustomError.badRequest("Id es requerida para actualizar");
    }
    return { data: model, id: model.id };
  }
}
