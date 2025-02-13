import { Request, Response } from "express";
import { AppointmentStatus } from "@prisma/client";
import { CustomError } from "@core/domain/custom.error";
import { AgendaService } from "../service/agenda_service";
import { GetMyDay } from "../../domain/entities/get_my_day";

export class AgendaController {
  public constructor(private readonly agendaService: AgendaService) {}

  public getAgenda = async (req: Request, res: Response) => {
    try {
      const { type } = req.query;

      console.log(type);

      const appointments = await this.agendaService.getMyDay({
        type: type as AppointmentStatus,
      });

      const aps = appointments.map(GetMyDay.fromJson);
      console.log({ aps });

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
