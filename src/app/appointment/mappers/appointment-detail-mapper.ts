import { PatientMapper } from "@/app/patient/mappers/patient-mapper";
import { ProfessionalMapper } from "@/app/professional/mappers/professional-mapper";
import {
  type AppointmentDetailModel,
  AppointmentDetailSchema
} from "../models/appointment-detail";
import { AlertAppointmentMapper } from "./alert-appointment-mapper";

import { CustomError } from "@/lib/custom-error";
import { DateFormatter } from "@/lib/date-formatter";
import { BdSchedule } from "@/types/bd-model";

type BdAppointmentDetail = BdSchedule<{
  include: {
    patient: {
      include: {
        appointments: {
          select: {
            uid: true;
            schedule_status: true;
            date: true;
            time_from: true;
            time_to: true;
          };
        };
      };
    };
    professional: {
      include: {
        user: {
          include: {
            role: true;
          };
        };
        professional_profession: {
          select: {
            professions: {
              select: {
                id: true;
                name: true;
              };
            };
          };
        };
      };
    };
  };
}>;

export class AppointmentDetailMapper {
  static validate(item: any): AppointmentDetailModel {
    try {
      const data = AppointmentDetailMapper.mapper(item);
      return AppointmentDetailSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(
          error,
          "appointment-detail-mapper.ts: (validate)"
        )
      );
    }
  }

  static response(object: any): AppointmentDetailModel {
    return AppointmentDetailMapper.validate(object);
  }

  private static mapper(item: BdAppointmentDetail): AppointmentDetailModel {
    const patient = item.patient;

    return {
      uid: item.uid,
      date: DateFormatter.formatDate(item.date, "ymd"),
      time_from: item.time_from,
      time_to: item.time_to,
      is_enabled: item.is_enabled,
      status: item.schedule_status,
      professional: ProfessionalMapper.validateProfessionalForAppointmentDetail(
        item.professional
      ),
      patient_history: PatientMapper.patientHistoryToArray(
        patient?.appointments ?? []
      ),
      patient: PatientMapper.validatePatientForAppointmentDetail(patient),
      alert: AlertAppointmentMapper.validate(undefined)
    };
  }
}
