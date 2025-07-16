import { AppointmentStatus } from "@prisma/client";

import { AlertAppointmentMapper } from "./alert-appointment-mapper";
import { PatientAppointmentDetailMapper } from "./patient-appointment-detail-mapper";
import { PatientHistoryAppointmentDetailMapper } from "./patient-history-appointment-detail-mapper";
import { ProfessionalAppointmentDetailMapper } from "./professional-appointment-detail-mapper";
import {
  type AppointmentDetailModel,
  AppointmentDetailSchema
} from "../models/appointment-detail";

import { CustomError } from "@/lib/custom-error";
import { DateFormatter } from "@/lib/date-formatter";
import { Uid } from "@/lib/uid";

export class AppointmentDetailMapper {
  static validate(item: any): AppointmentDetailModel {
    try {
      const data = AppointmentDetailMapper.mapper(item);
      return AppointmentDetailSchema.parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "one-appointment-mapper.ts: (validate)"
        )
      );
    }
  }

  static serverResponse(object: any): AppointmentDetailModel {
    return AppointmentDetailMapper.validate(object);
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
      patient_history: PatientHistoryAppointmentDetailMapper.toArray(
        patient?.appointments
      ),
      professional: ProfessionalAppointmentDetailMapper.validate(
        schedule?.professional
      ),
      patient: PatientAppointmentDetailMapper.validate(patient),
      alert: AlertAppointmentMapper.validate(item?.alert)
    };
  }
}
