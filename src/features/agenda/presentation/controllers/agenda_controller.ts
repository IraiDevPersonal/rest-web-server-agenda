import { Request, Response } from "express";
import { AppointmentStatus } from "@prisma/client";
import { CustomError } from "@core/domain/custom.error";
import { AgendaService } from "../service/agenda_service";
import { GetMyDay } from "../../domain/entities/get_my_day";
import { DateFormatter } from "@core/domain/date_formatter";

export class AgendaController {
  public constructor(private readonly agendaService: AgendaService) {}

  public getMyDay = async (req: Request, res: Response) => {
    try {
      const { type, date, patient_rut } = req.query;
      const appointments = await this.agendaService.getMyDay({
        type: type as AppointmentStatus,
        date: date ? DateFormatter.stringToDate(date as string) : undefined,
        patient_rut: patient_rut as string,
      });

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
}
