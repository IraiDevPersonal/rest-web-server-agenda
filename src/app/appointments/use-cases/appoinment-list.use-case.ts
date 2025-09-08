import type { Request } from "express";
import { AppointmentMapper } from "../mappers/appointment.mapper";
import type { AppointmentModel } from "../models/appointment.model";
import type { AppointmentServiceRepository } from "../repository";
import type { AppointmentFilters } from "../models/appointment-filters.model";
import type { AppointmentStatus } from "@prisma/client";
import { isYearMonth, queryParser } from "@/lib/utils";
import { DateFormatter } from "@/lib/date-formatter";

export class AppointmentListUseCase {
  private readonly service: AppointmentServiceRepository;

  public constructor(service: AppointmentServiceRepository) {
    this.service = service;
  }

  list = async (query: Request["query"]): Promise<AppointmentModel[]> => {
    const filters = this.buildFilters(query);
    const bdAppointments = await this.service.getAppointments(filters);
    return AppointmentMapper.fromBdToDomain(bdAppointments);
  };

  private buildFilters = (query: Request["query"], params?: Request["params"]): AppointmentFilters => {
    const { professional_id, profession_id, patient_rut, date_to, month, date } = query;
    const type = params?.type as AppointmentStatus | undefined;

    const {
      date: parsedDate,
      date_to: parsedDateTo,
      month: parsedMonth,
      ...parsedQueries
    } = queryParser({
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
      queryDateFrom = DateFormatter.stringToDate(parsedDate as string);
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
  };
}
