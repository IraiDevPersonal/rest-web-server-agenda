import { AppointmentStatus } from "@prisma/client";
import { Request, Response } from "express";

import { CustomError } from "@/lib/custom-error";
import { DateFormatter } from "@/lib/date-formatter";
import { AppointmentUseCases } from "./use-cases/appoinment-use-cases";
import { isYearMonth } from "@/lib/utils";

export class AppointmentController {
  public constructor(private readonly useCases: AppointmentUseCases) {}

  public getAppointments = async (req: Request, res: Response) => {
    try {
      const appointments = await this.useCases.getAppointments(req.query);
      return res.status(200).json(appointments);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  public getAppointmentDetail = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const appointment = await this.useCases.getAppointmentDetail(uid);
      return res.status(200).json(appointment);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  public getFilters(req: Request) {
    const { date, patient_rut, professional_id, profession_id, date_to, month } =
      req.query;
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
