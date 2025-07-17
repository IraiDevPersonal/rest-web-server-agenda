import { AppointmentStatus } from "@prisma/client";

import { PatientMapper } from "@/app/patient/mappers/patient-mapper";
import {
  type AppointmentDetailModel,
  AppointmentDetailSchema
} from "../models/appointment-detail";
import { AlertAppointmentMapper } from "./alert-appointment-mapper";
import { ProfessionalMapper } from "@/app/professional/mappers/professional-mapper";

import { CustomError } from "@/lib/custom-error";
import { DateFormatter } from "@/lib/date-formatter";
import { Uid } from "@/lib/uid";

export class AppointmentDetailMapper {
  static validate(item: any): AppointmentDetailModel {
    try {
      const schedule = item.schedule;
      const patient = item.patient;
      const data: AppointmentDetailModel = {
        uid: item.uid ?? Uid.createV4(),
        date: schedule?.date
          ? DateFormatter.formatDate(schedule.date, "ymd")
          : "aaaa-mm-dd",
        time_from: schedule?.time_from ?? "hh:mm",
        time_to: schedule?.time_to ?? "hh:mm",
        is_enabled: schedule?.is_enabled ?? false,
        status: item.appointment_status ?? AppointmentStatus.INDETERMINATE,
        professional:
          ProfessionalMapper.validateProfessionalForAppointmentDetail(
            schedule?.professional
          ),
        patient_history: PatientMapper.patientHistoryArray(
          patient?.appointments
        ),
        patient: PatientMapper.validatePatientForAppointmentDetail(patient),
        alert: AlertAppointmentMapper.validate(item?.alert)
      };

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

  static response(object: any): AppointmentDetailModel {
    return AppointmentDetailMapper.validate(object);
  }
}
