import { Request, Response } from "express";
import { AppointmentStatus } from "@prisma/client";

import { AppointmentService } from "./service";

import { DateFormatter } from "@/lib/date-formatter";
import { CustomError } from "@/lib/custom-error";
import { Controllers } from "@/lib/controllers";
import { isYearMonth } from "@lib/utils";

import type { AppointmentFilters } from "./models/appointment-filters";
import { AppointmentMapper } from "./mappers/appointment-mapper";
import { AppointmentDetailMapper } from "./mappers/appointment-detail-mapper";

export class AppointmentController implements Controllers<AppointmentFilters> {
  public constructor(private readonly service: AppointmentService) {}

  public getAppointments = async (req: Request, res: Response) => {
    try {
      const filters = this.getFilters(req);
      const bdAppointments = await this.service.getAppointments(filters);
      const appointments = AppointmentMapper.serverResponse(bdAppointments);

      return res.status(200).json(appointments);
    } catch (error) {
      const err = CustomError.internalServer(`${error}`);
      return CustomError.handleError(err, res);
    }
  };

  public getOneAppointment = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const bdAppoitnment = await this.service.getOneAppointment(uid);

      if (!bdAppoitnment) {
        throw CustomError.badRequest(`No se encontró cita para el UID: ${uid}`);
      }

      const adaptedAppointments =
        AppointmentDetailMapper.serverResponse(bdAppoitnment);
      return res.status(200).json(adaptedAppointments);
    } catch (error) {
      const err = CustomError.internalServer(`${error}`);
      return CustomError.handleError(err, res);
    }
  };

  public getFilters(req: Request) {
    const {
      date,
      patient_rut,
      professional_id,
      profession_id,
      date_to,
      month
    } = req.query;
    const type = req.params.type ?? req.query.type;

    let queryDate: Date | undefined = date
      ? DateFormatter.stringToDate(date as string)
      : undefined;
    let queryDateFrom: Date | undefined = undefined;
    let queryDateTo: Date | undefined = undefined;

    if (date_to && date) {
      queryDate = undefined;
      queryDateFrom = DateFormatter.stringToDate(date as string);
      queryDateTo = DateFormatter.stringToDate(date_to as string);
    }

    if (isYearMonth(month as string | undefined)) {
      queryDate = undefined;
      const currentDate = `${month}-01`;
      queryDateFrom = DateFormatter.stringToDate(currentDate);
      queryDateTo = DateFormatter.getLastDayOfMonth(currentDate) as Date;
    }

    return {
      professional_id: professional_id ? Number(professional_id) : undefined,
      profession_id: profession_id ? Number(profession_id) : undefined,
      patient_rut: patient_rut as string,
      type: type as AppointmentStatus,
      date_from: queryDateFrom,
      date_to: queryDateTo,
      date: queryDate
    };
  }
}
