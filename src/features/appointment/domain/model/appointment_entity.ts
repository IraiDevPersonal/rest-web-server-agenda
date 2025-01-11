import { CustomError } from "../../../core/domain/custom.error";
import { PatientEntity } from "../../../patients/domain/entities/patient_entity";
import { ScheduleEntity } from "../../../schedule/domain/entities/schedule_entity";
import { appointmentSchema } from "../../presentation/schemas/appointment_schemas";

export type AppointmentStatus = "TO_CONFIRM" | "CONFIRMED" | "CANCELLED";

type Init = {
  id?: number | undefined;
  patient_id: number;
  schedule_id: number;
  patient: PatientEntity | undefined;
  appointment_status: AppointmentStatus;
  schedule: ScheduleEntity | undefined;
};
export class AppointmentEntity {
  public id?: number | undefined;
  public patient_id: number;
  public schedule_id: number;
  public patient: PatientEntity | undefined;
  public appointment_status: AppointmentStatus;
  public schedule: ScheduleEntity | undefined;

  private constructor(init: Init) {
    this.id = init.id;
    this.patient_id = init.patient_id;
    this.schedule_id = init.schedule_id;
    this.patient = init.patient;
    this.appointment_status = init.appointment_status;
    this.schedule = init.schedule;
  }

  // {
  //   id: 15n,
  //   patient_id: 5n,
  //   schedule_id: 18n,
  //   appointment_status_id: 3,
  //   appointment_status: { id: 3, name: 'cancelado' },
  //   patient: {
  //     id: 5n,
  //     uid: '06ee8381-dab8-4d5c-ab2c-6b3481c41dff',
  //     rut: '15.953.693-9',
  //     names: 'cosme 5',
  //     last_names: 'fulano 5',
  //     email: 'cosme_fulano_5@gmail.com',
  //     phone: '+569555555555'
  //   }

  // }

  static toResponse(
    object: Record<string, any>
  ): Omit<
    AppointmentEntity,
    "appointment_status_id" | "patient_id" | "schedule_id"
  > {
    try {
      return {
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
