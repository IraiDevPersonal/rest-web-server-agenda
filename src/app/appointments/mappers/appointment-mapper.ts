import { type AppointmentModel } from "../models/appointment-model";

import { CustomError } from "@/lib/custom-error";
import { DateFormatter } from "@/lib/date-formatter";
import { isYearMonth, parseQuery } from "@/lib/utils";
import { AppointmentStatus } from "@prisma/client";
import { Request } from "express";
import { AppointmentFilters } from "../models/appointment-filters-model";
import { RelatedBdAppointmentSchema } from "../schemas/appointment-schema";

export class AppointmentMapper {
  static map = (raw: unknown): AppointmentModel => {
    const { success, data, error } = RelatedBdAppointmentSchema.safeParse(raw);

    if (!success) {
      throw CustomError.internalServer(
        "AppointmentMapper.map: " + CustomError.getError(error).message
      );
    }

    const patient = data.patient;
    const professional = data.user;
    const professions = professional.professions.map((p) => p.profession.name);

    return {
      uid: data.uid,
      time_to: data.time_to,
      time_from: data.time_from,
      appointment_status: data.appointment_status,
      date: DateFormatter.formatDate(data.date, "ymd"),
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
  };

  static fromBdToDomain = (raw: unknown): AppointmentModel[] => {
    const { success, data, error } = RelatedBdAppointmentSchema.array().safeParse(raw);

    if (!success) {
      throw CustomError.internalServer(
        "AppointmentMapper.fromBdToDomain: " + CustomError.getError(error).message
      );
    }

    return data.map(this.map);
  };

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
