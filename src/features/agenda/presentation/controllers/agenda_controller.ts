import { Request, Response } from "express";
import { AppointmentStatus } from "@prisma/client";
import { CustomError } from "@core/domain/custom.error";
import { AgendaService } from "../service/agenda_service";
import { GetMyDay } from "../../domain/entities/get_my_day";
import { DateFormatter } from "@core/domain/date_formatter";
import { Controllers } from "@core/domain/controllers";

export class AgendaController implements Controllers {
  public constructor(private readonly agendaService: AgendaService) {}

  public getMyDay = async (req: Request, res: Response) => {
    try {
      const filters = this.getFilters(req);
      const appointments = await this.agendaService.getMyDay(filters);

      const aps = appointments.map(GetMyDay.fromObject);
      const availables = aps.filter(
        (el) => el.appointment_status === "AVAILABLE"
      );
      const cancelled = aps.filter(
        (el) => el.appointment_status === "CANCELLED"
      );
      const confirmed = aps.filter(
        (el) => el.appointment_status === "CONFIRMED"
      );
      const toConfirm = aps.filter(
        (el) => el.appointment_status === "TO_CONFIRM"
      );

      return res
        .status(200)
        .json({ availables, cancelled, confirmed, toConfirm });
    } catch (error) {
      console.log("catch ", error);
      const e = CustomError.internalServer(`${error}`);
      return CustomError.handleError(e, res);
    }
  };

  public getAppointmentsByType = async (req: Request, res: Response) => {
    try {
      const filters = this.getFilters(req);

      if (filters.type in AppointmentStatus) {
        const appointments = await this.agendaService.getMyDay(filters);

        const adaptedAppointments = appointments.map(GetMyDay.fromObject);
        return res.status(200).json(adaptedAppointments);
      }
      throw CustomError.badRequest(`El tipo: ${filters.type} no es permitido`);
    } catch (error) {
      console.log("catch ", error);
      const e = CustomError.internalServer(`${error}`);
      return CustomError.handleError(e, res);
    }
  };

  public getFilters(req: Request) {
    const { date, patient_rut, professional_id, profession_id } = req.query;
    const type = req.params.type ?? req.query.type;

    return {
      date: date ? DateFormatter.stringToDate(date as string) : undefined,
      patient_rut: patient_rut as string,
      type: type as AppointmentStatus,
      profession_id: profession_id ? Number(profession_id) : undefined,
      professional_id: professional_id ? Number(professional_id) : undefined,
    };
  }
}
