import { AppointmentStatus } from "@prisma/client";

import { AlertAppointmentDetailEntity } from "./alert-appointment-detail-entity";
import { PatientAppointmentDetailEntity } from "./patient-appointment-detail-entity";
import { PatientHistoryAppointmentDetailEntity } from "./patient-history-appointment-detail-entity";
import { ProfessionalAppointmentDetailEntity } from "./professional-appointment-detail-entity";
import {
  type AppointmentDetailModel,
  AppointmentDetailSchema
} from "../models/appointment-detail";

import { CustomError } from "@/lib/custom-error";
import { DateFormatter } from "@/lib/date-formatter";
import { Uid } from "@/lib/uid";

export class AppointmentDetailEntity {
  static validate(item: any): AppointmentDetailModel {
    try {
      const data = AppointmentDetailEntity.mapper(item);
      return AppointmentDetailSchema.parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "one-appointment-entity.ts: (validate)"
        )
      );
    }
  }

  static serverResponse(object: any): AppointmentDetailModel {
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
