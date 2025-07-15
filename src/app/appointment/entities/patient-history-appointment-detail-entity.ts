import { AppointmentStatus } from "@prisma/client";

import {
  type PatientHistoryAppointmentDetailModel,
  PatientHistoryAppointmentDetailSchema
} from "../models/appointment-detail";

import { CustomError } from "@/lib/custom-error";
import { DateFormatter } from "@/lib/date-formatter";
import { safeArray } from "@/lib/utils";

export class PatientHistoryAppointmentDetailEntity {
  static validate(item: any): PatientHistoryAppointmentDetailModel {
    try {
      const data = PatientHistoryAppointmentDetailEntity.mapper(item);
      return PatientHistoryAppointmentDetailSchema.parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "patient-history-appointment-detail-entity.ts: (validate)"
        )
      );
    }
  }

  static toArray(data: any[]): PatientHistoryAppointmentDetailModel[] {
    return safeArray<PatientHistoryAppointmentDetailModel>(data).map(
      PatientHistoryAppointmentDetailEntity.validate
    );
  }

  private static mapper(item: any): PatientHistoryAppointmentDetailModel {
    const schedule = item.schedule;
    const date = schedule?.date
      ? DateFormatter.formatDate(schedule?.date, "dmy")
      : "dd-mm-aaaa";
    const timeFrom = schedule?.time_from ?? "hh:mm";
    const timeTo = schedule?.time_to ?? "hh:mm";

    return {
      uid: item.uid,
      date_time: `${date} ${timeFrom}-${timeTo}`,
      status: item?.appointment_status ?? AppointmentStatus.INDETERMINATE
    };
  }
}
