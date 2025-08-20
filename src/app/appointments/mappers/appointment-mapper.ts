import { type AppointmentModel } from "../models/appointment-model";
import { AppointmentSchema } from "../schemas/appointment-schema";

import { CustomError } from "@/lib/custom-error";
import { DateFormatter } from "@/lib/date-formatter";
import { isYearMonth, parseQuery, safeArray } from "@/lib/utils";
import { BdAppointment } from "@/types/bd-model";
import { Request } from "express";
import { AppointmentFilters } from "../models/appointment-filters-model";
import { AppointmentStatus } from "@prisma/client";

type AppointmentWithProfessionalAndPatient = BdAppointment<{
  select: {
    id: true;
    uid: true;
    appointment_status: true;
    date: true;
    time_from: true;
    time_to: true;
    user: {
      select: {
        names: true;
        last_names: true;
        professions: {
          select: { profession: true };
        };
      };
    };
    patient: {
      select: {
        names: true;
        last_names: true;
        rut: true;
        phone: true;
      };
    };
  };
}>;

export class AppointmentMapper {
  private static map(
    bdAppointment: AppointmentWithProfessionalAndPatient
  ): AppointmentModel {
    const patient = bdAppointment.patient;
    const professional = bdAppointment.user;
    const professions = professional.professions.map((p) => p.profession.name);

    return {
      uid: bdAppointment.uid,
      time_to: bdAppointment.time_to,
      time_from: bdAppointment.time_from,
      appointment_status: bdAppointment.appointment_status,
      date: DateFormatter.formatDate(bdAppointment.date, "ymd"),
      professional: {
        full_name: `${professional.names} ${professional.last_names}`,
        professions: professions
      },
      patient: patient
        ? {
            full_name: `${patient.names} ${patient.last_names}`,
            phone: patient.phone,
            rut: patient.rut
          }
        : null
    };
  }

  static validate(item: AppointmentWithProfessionalAndPatient): AppointmentModel {
    try {
      const data = AppointmentMapper.map(item);
      return AppointmentSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "appointment-mapper.ts: (validate)")
      );
    }
  }

  static fromBdToDomain(
    data: AppointmentWithProfessionalAndPatient[]
  ): AppointmentModel[] {
    return safeArray(data, {
      errorMessage: "appointment-mapper.ts (response): se eperaba un array"
    }).map(AppointmentMapper.validate);
  }

  static getFilters(
    query: Request["query"],
    params?: Request["params"]
  ): AppointmentFilters {
    const { professional_id, profession_id, patient_rut, date_to, month, date } = query;
    const type = params?.type as AppointmentStatus | undefined;

    const {
      date: parsedDate,
      date_to: parsedDateTo,
      month: parsedMonth,
      ...parsedQueries
    } = parseQuery({
      professional_id,
      profession_id,
      patient_rut,
      date_to,
      month,
      date
    });

    let queryDate: Date | undefined = parsedDate
      ? DateFormatter.stringToDate(parsedDate as string)
      : undefined;
    let queryDateFrom: Date | undefined = undefined;
    let queryDateTo: Date | undefined = undefined;

    if (parsedDateTo && parsedDate) {
      queryDate = undefined;
      queryDateFrom = DateFormatter.stringToDate(date as string);
      queryDateTo = DateFormatter.stringToDate(parsedDateTo as string);
    }

    if (isYearMonth(parsedMonth as string | undefined)) {
      queryDate = undefined;
      const currentDate = `${parsedMonth}-01`;
      queryDateFrom = DateFormatter.stringToDate(currentDate);
      queryDateTo = DateFormatter.getLastDayOfMonth(currentDate) as Date;
    }

    return {
      ...parsedQueries,
      date_from: queryDateFrom,
      date_to: queryDateTo,
      date: queryDate,
      type
    };
  }
}
