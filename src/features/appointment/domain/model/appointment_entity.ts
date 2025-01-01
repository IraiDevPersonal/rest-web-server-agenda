import { AppointmentStatusEntity } from "../../../appointment-status/domain/model/appointment-status_entity";
import { CustomError } from "../../../core/domain/custom.error";
import { PatientEntity } from "../../../patients/domain/entities/patient_entity";
import { ScheduleEntity } from "../../../schedule/domain/entities/schedule_entity";
import { appointmentSchema } from "../../presentation/schemas/appointment_schemas";

type Init = {
  id?: number | undefined;
  patient_id: number;
  schedule_id: number;
  appointment_status_id: number;
  patient: PatientEntity | undefined;
  appointmentStatus: AppointmentStatusEntity | undefined;
  schedule: ScheduleEntity | undefined;
};
export class AppointmentEntity {
  public id?: number | undefined;
  public patient_id: number;
  public schedule_id: number;
  public appointment_status_id: number;
  public patient: PatientEntity | undefined;
  public appointmentStatus: AppointmentStatusEntity | undefined;
  public schedule: ScheduleEntity | undefined;

  private constructor(init: Init) {
    this.id = init.id;
    this.patient_id = init.patient_id;
    this.schedule_id = init.schedule_id;
    this.appointment_status_id = init.appointment_status_id;
    this.patient = init.patient;
    this.appointmentStatus = init.appointmentStatus;
    this.schedule = init.schedule;
  }

  static fromJson(object: Record<string, any>) {
    try {
      const { patient, appointmentStatus, schedule } = object;
      const schema = appointmentSchema.parse(object);

      return new AppointmentEntity({
        ...schema,
        patient,
        appointmentStatus,
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
    delete model.appointmentStatus;

    if (action === "insert") {
      delete model.id;
    }

    if (action === "update" && !model.id) {
      throw CustomError.badRequest("Id es requerida para actualizar");
    }

    return model;
  }
}
