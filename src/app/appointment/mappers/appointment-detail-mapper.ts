import { PatientMapper } from "@/app/patient/mappers/patient-mapper";
import { ProfessionalMapper } from "@/app/professional/mappers/professional-mapper";
import {
  type AppointmentDetailModel,
  AppointmentDetailSchema
} from "../models/appointment-detail";
import { AlertAppointmentMapper } from "./alert-appointment-mapper";

import { CustomError } from "@/lib/custom-error";
import { DateFormatter } from "@/lib/date-formatter";
import { BdAppointment } from "@/types/bd-model";

type BdAppointmentDetail = BdAppointment<{
  include: {
    patient: {
      include: {
        appointments: {
          select: {
            uid: true;
            appointment_status: true;
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
  private static _mapper(item: BdAppointmentDetail): AppointmentDetailModel {
    const patient = item.patient;

    return {
      uid: item.uid,
      date: DateFormatter.formatDate(item.date, "ymd"),
      time_from: item.time_from,
      time_to: item.time_to,
      is_enabled: item.is_enabled,
      status: item.appointment_status,
      professional: ProfessionalMapper.validateProfessionalForAppointmentDetail(
        item.professional
      ),
      patient_history: PatientMapper.patientHistoryToArray(patient?.appointments ?? []),
      patient: patient ? PatientMapper.validate(patient) : null,
      alert: AlertAppointmentMapper.validate(undefined)
    };
  }

  static validate(item: any): AppointmentDetailModel {
    try {
      const data = AppointmentDetailMapper._mapper(item);
      return AppointmentDetailSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "appointment-detail-mapper.ts: (validate)")
      );
    }
  }

  static response(object: any): AppointmentDetailModel {
    return AppointmentDetailMapper.validate(object);
  }
}
