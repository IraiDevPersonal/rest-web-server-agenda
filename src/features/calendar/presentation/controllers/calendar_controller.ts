import { Controllers } from "@core/domain/controllers";
import { Request, Response } from "express";
import { CalendarService } from "../service/calendar_service";
import { CustomError } from "@core/domain/custom.error";
import { GetCalendar } from "../../domain/entities/get_calendar";
import { DateFormatter } from "@core/domain/date_formatter";
import { AppointmentStatus } from "@prisma/client";

export class CalendarController implements Controllers {
  public constructor(private readonly service: CalendarService) {}

  public getCalendar = async (req: Request, res: Response) => {
    try {
      const filters = this.getFilters(req);
      const rawCalendars = await this.service.getCalendar(filters);
      const calendars = rawCalendars.map(GetCalendar.fromObject);

      const calendarResponse: Record<string, any>[] = [];

      //agrupa calendars por fecha
      for (const calendar of calendars) {
        const index = calendarResponse.findIndex(
          (c) => c.date === calendar.date
        );
        if (index === -1) {
          calendarResponse.push({
            date: calendar.date,
            schedules: [...calendar.appointments],
          });
        }
        if (index !== -1) {
          calendarResponse[index].schedules.push(...calendar.appointments);
        }
      }

      return res.status(200).json(calendarResponse);
    } catch (error) {
      console.log("catch ", error);
      const e = CustomError.internalServer(`${error}`);
      return CustomError.handleError(e, res);
    }
  };

  getFilters(req: Request): Record<string, any> {
    const { patient_rut, professional_id, profession_id, year_month } =
      req.query;
    const type = req.params.type ?? req.query.type;

    const date_from = year_month
      ? DateFormatter.stringToDate(`${year_month}-01`)
      : undefined;

    const date_to = year_month
      ? DateFormatter.getLastDayOfMonth(date_from)
      : undefined;

    return {
      patient_rut: patient_rut as string,
      type: type as AppointmentStatus,
      profession_id: profession_id ? Number(profession_id) : undefined,
      professional_id: professional_id ? Number(professional_id) : undefined,
      date_from: date_from,
      date_to: date_to,
    };
  }
}
