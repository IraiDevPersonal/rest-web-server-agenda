import {
  PatientHistoryForAppointmentDetailSchema,
  PatientSchema,
  type PatientHistoryForAppointmentDetailModel,
  type PatientModel
} from "../models/patient";

import { CustomError } from "@/lib/custom-error";
import { DateFormatter } from "@/lib/date-formatter";
import { parseQuery, safeArray } from "@/lib/utils";
import { BdAppointment, BdPatient } from "@/types/bd-model";
import { PatientFilters } from "../models/patient-filters";
import { Request } from "express";

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
  static validate(item: BdPatient): PatientModel {
    try {
      const data = PatientMapper.mapper(item);
      return PatientSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "patient-mapper.ts: (validate)")
      );
    }
  }

  static response(item: BdPatient[]): PatientModel[] {
    return safeArray(item, {
      errorMessage: "patient-mapper.ts (response): se espera un array"
    }).map(PatientMapper.validate);
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
    return safeArray(data).map(PatientMapper.validatePatientHistoryForAppointmentDetail);
  }

  static getFilters(query: Request["query"]): PatientFilters {
    const { rut, name, email, status, page, limit } = query;

    const { status: statusQuery, ...parsedQueries } = parseQuery(
      { rut, name, email, status, page, limit },
      { page: "1", limit: "10" }
    );

    return {
      ...parsedQueries,
      is_deleted: statusQuery ? statusQuery === "inactive" : undefined
    };
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
