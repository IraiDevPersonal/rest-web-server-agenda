import { CustomError } from "../../../core/domain/custom.error";
import { PatientEntity } from "../../../patient/domain/entities/patient_entity";
import { ScheduleEntity } from "../../../schedule/domain/entities/schedule_entity";
import { appointmentSchema } from "../../presentation/schemas/appointment_schemas";

export type AppointmentStatus = "TO_CONFIRM" | "CONFIRMED" | "CANCELLED";

type Init = {
  id?: number | undefined;
  uid?: string | undefined;
  patient_id: number;
  schedule_id: number;
  patient: PatientEntity | undefined;
  appointment_status: AppointmentStatus;
  schedule: ScheduleEntity | undefined;
};
export class AppointmentEntity {
  public id?: number | undefined;
  public uid?: string | undefined;
  public patient_id: number;
  public schedule_id: number;
  public patient: PatientEntity | undefined;
  public appointment_status: AppointmentStatus;
  public schedule: ScheduleEntity | undefined;

  private constructor(init: Init) {
    this.id = init.id;
    this.uid = init.uid;
    this.patient_id = init.patient_id;
    this.schedule_id = init.schedule_id;
    this.patient = init.patient;
    this.appointment_status = init.appointment_status;
    this.schedule = init.schedule;
  }

  static toResponse(
    object: Record<string, any>
  ): Omit<
    AppointmentEntity,
    "appointment_status_id" | "patient_id" | "schedule_id"
  > {
    try {
      return {
        uid: object["uid"],
        patient: PatientEntity.toResponse(object["patient"]),
        appointment_status: object["appointment_status"],
        schedule: ScheduleEntity.toResponse(
          object["schedule"]
        ) as ScheduleEntity,
      };
    } catch (error) {
      throw CustomError.badRequest(`parse error: ${error}`);
    }
  }

  static fromJson(object: Record<string, any>) {
    try {
      const { patient, appointment_status, schedule } = object;
      const schema = appointmentSchema.parse(object);

      return new AppointmentEntity({
        ...schema,
        patient,
        appointment_status,
        schedule,
      });
    } catch (error) {
      throw CustomError.badRequest(`parse error: ${error}`);
    }
  }

  static appointmentDTO(
    object: Record<string, any>,
    action: "insert" | "update"
  ) {
    const model = AppointmentEntity.fromJson(object);

    delete model.patient;
    delete model.schedule;

    if (action === "insert") {
      delete model.id;
    }

    if (action === "update" && !model.id) {
      throw CustomError.badRequest("Id es requerida para actualizar");
    }

    return model;
  }
}
