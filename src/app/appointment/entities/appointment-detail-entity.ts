import { AppointmentStatus } from "@prisma/client";
import { z } from "zod";

import { PatientAppointmentDetailEntity } from "./patient-appointment-detail-entity";
import { PatientHistoryAppointmentDetailEntity } from "./patient-history-appointment-detail-entity";
import { ProfessionalAppointmentDetailEntity } from "./professional-appointment-detail-entity";
import { AlertAppointmentDetailEntity } from "./alert-appointment-detail-entity";

import { CustomError } from "@/lib/custom-error";
import { DateFormatter } from "@/lib/date-formatter";
import { Uid } from "@/lib/uid";

const AppointmentDetailSchema = z.object({
  uid: z.string().uuid("El UID debe ser un UUID válido"),
  date: z.string(),
  time_from: z.string(),
  time_to: z.string(),
  is_enabled: z.boolean(),
  status: z.nativeEnum(AppointmentStatus),
  patient_history: z.array(PatientHistoryAppointmentDetailEntity.getSchema()),
  professional: ProfessionalAppointmentDetailEntity.getSchema(),
  patient: PatientAppointmentDetailEntity.getSchema(),
  alert: AlertAppointmentDetailEntity.getSchema()
});

type AppointmentDetailModel = z.infer<typeof AppointmentDetailSchema>;

export class AppointmentDetailEntity {
  public professional: AppointmentDetailModel["professional"];
  public patient: AppointmentDetailModel["patient"];
  public alert: AppointmentDetailModel["alert"];
  public patient_history: AppointmentDetailModel["patient_history"];
  public uid: AppointmentDetailModel["uid"];
  public date: AppointmentDetailModel["date"];
  public time_from: AppointmentDetailModel["time_from"];
  public time_to: AppointmentDetailModel["time_to"];
  public status: AppointmentDetailModel["status"];
  public is_enabled: AppointmentDetailModel["is_enabled"];

  private constructor(init: AppointmentDetailModel) {
    this.professional = init.professional;
    this.patient = init.patient;
    this.alert = init.alert;
    this.patient_history = init.patient_history;
    this.uid = init.uid;
    this.date = init.date;
    this.time_from = init.time_from;
    this.time_to = init.time_to;
    this.status = init.status;
    this.is_enabled = init.is_enabled;
  }

  static getSchema() {
    return AppointmentDetailSchema;
  }

  static validate(item: any): AppointmentDetailModel {
    try {
      const data = AppointmentDetailEntity.mapper(item);
      return AppointmentDetailEntity.getSchema().parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "one-appointment-entity.ts: (validate)"
        )
      );
    }
  }

  static responseAdapter(object: any): AppointmentDetailEntity {
    return AppointmentDetailEntity.validate(object);
  }

  private static mapper(item: any): AppointmentDetailModel {
    const schedule = item.schedule;
    const patient = item.patient;

    return {
      uid: item.uid ?? Uid.createV4(),
      date: schedule?.date
        ? DateFormatter.formatDate(schedule.date, "ymd")
        : "aaaa-mm-dd",
      time_from: schedule?.time_from ?? "hh:mm",
      time_to: schedule?.time_to ?? "hh:mm",
      is_enabled: schedule?.is_enabled ?? false,
      status: item.appointment_status ?? AppointmentStatus.INDETERMINATE,
      patient_history: PatientHistoryAppointmentDetailEntity.toArray(
        patient?.appointments
      ),
      professional: ProfessionalAppointmentDetailEntity.validate(
        schedule?.professional
      ),
      patient: PatientAppointmentDetailEntity.validate(patient),
      alert: AlertAppointmentDetailEntity.validate(item?.alert)
    };
  }
}
