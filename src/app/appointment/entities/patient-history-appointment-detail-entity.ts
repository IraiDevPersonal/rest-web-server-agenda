import { z } from "zod";

import { CustomError } from "@/lib/custom-error";
import { AppointmentStatus } from "@prisma/client";
import { DateFormatter } from "@/lib/date-formatter";
import { safeArray } from "@/lib/utils";

const PatientHistoryAppointmentDetailSchema = z.object({
  uid: z.string().uuid("El UID debe ser un UUID válido"),
  date_time: z.string(),
  status: z.nativeEnum(AppointmentStatus)
});

type PatientHistoryAppointmentDetailModel = z.infer<
  typeof PatientHistoryAppointmentDetailSchema
>;

export class PatientHistoryAppointmentDetailEntity {
  public uid: PatientHistoryAppointmentDetailModel["uid"];
  public date_time: PatientHistoryAppointmentDetailModel["date_time"];
  public status: PatientHistoryAppointmentDetailModel["status"];

  private constructor(init: PatientHistoryAppointmentDetailModel) {
    this.uid = init.uid;
    this.date_time = init.date_time;
    this.status = init.status;
  }

  static getSchema() {
    return PatientHistoryAppointmentDetailSchema;
  }

  static validate(item: any): PatientHistoryAppointmentDetailModel {
    try {
      const data = PatientHistoryAppointmentDetailEntity.mapper(item);
      return PatientHistoryAppointmentDetailEntity.getSchema().parse(data);
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
