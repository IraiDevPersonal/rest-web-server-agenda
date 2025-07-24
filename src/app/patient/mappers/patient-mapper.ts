import {
  PatientForAppointmentDetailSchema,
  PatientHistoryForAppointmentDetailSchema,
  PatientSchema,
  type PatientForAppointmentDetailModel,
  type PatientHistoryForAppointmentDetailModel,
  type PatientModel
} from "../models/patient";

import { CustomError } from "@/lib/custom-error";
import { DateFormatter } from "@/lib/date-formatter";
import { safeArray } from "@/lib/utils";
import { BdAppointment, BdPatient } from "@/types/bd-model";

type BdAppointmentWithSchedule = BdAppointment<{
  select: {
    uid: true;
    appointment_status: true;
    schedule: {
      select: {
        date: true;
        time_from: true;
        time_to: true;
      };
    };
  };
}>;

export class PatientMapper {
  static validate(item: any): PatientModel {
    try {
      const data = PatientMapper.mapper(item);
      return PatientSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "patient-mapper.ts: (validate)")
      );
    }
  }

  static response(item: any): PatientModel[] {
    return safeArray(item, {
      errorMessage: "patient-mapper.ts (response): se espera un array"
    }).map(PatientMapper.validate);
  }

  static validatePatientForAppointmentDetail(
    item: BdPatient | null
  ): PatientForAppointmentDetailModel {
    try {
      let data: PatientForAppointmentDetailModel = null;

      if (item) {
        data = {
          names: item.names,
          last_names: item.last_names,
          rut: item.rut,
          phone: item.phone,
          email: item.email,
          address: item.address
        };
      }

      return PatientForAppointmentDetailSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(
          error,
          "patient-mapper.ts: (validatePatienForAppointmentDetail)"
        )
      );
    }
  }

  static validatePatientHistoryForAppointmentDetail(
    bdAppointment: BdAppointmentWithSchedule
  ): PatientHistoryForAppointmentDetailModel {
    try {
      const schedule = bdAppointment.schedule;
      const date = DateFormatter.formatDate(schedule.date, "dmy");
      const timeFrom = schedule.time_from;
      const timeTo = schedule.time_to;

      const data: PatientHistoryForAppointmentDetailModel = {
        uid: bdAppointment.uid,
        date_time: `${date} ${timeFrom}-${timeTo}`,
        status: bdAppointment.appointment_status
      };

      return PatientHistoryForAppointmentDetailSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(
          error,
          "patient-mapper.ts: (validatePatientHistoryForAppointmentDetail)"
        )
      );
    }
  }

  static patientHistoryToArray(
    data: BdAppointmentWithSchedule[]
  ): PatientHistoryForAppointmentDetailModel[] {
    return safeArray(data).map(
      PatientMapper.validatePatientHistoryForAppointmentDetail
    );
  }

  private static mapper(bdPatient: BdPatient): PatientModel {
    return {
      id: bdPatient.id,
      uid: bdPatient.uid,
      rut: bdPatient.rut,
      names: bdPatient.names,
      last_names: bdPatient.last_names,
      email: bdPatient.email,
      phone: bdPatient.phone,
      address: bdPatient.address,
      is_deleted: bdPatient.is_deleted,
      avatar_image: null // agregar avatar para usuarios en general
    };
  }
}
