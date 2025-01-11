import { Request, Response } from "express";
import { CustomError } from "../../../core/domain/custom.error";
import { AppointmentService } from "../../../appointment/presentation/services/appointment_service";
import { AppointmentEntity } from "../../../appointment/domain/model/appointment_entity";
import { AgendaFilter } from "../../domain/entities/entities/agenda_filters";
import { AppointmentStatus } from "@prisma/client";

export class AgendaController {
  public constructor(private readonly appointmentService: AppointmentService) {}

  public getAgenda = async (req: Request, res: Response) => {
    try {
      const { type } = req.params;

      const appointments = await this.appointmentService.getAppointments({
        type: type as AppointmentStatus,
      });

      // console.log(appointments);

      return res
        .status(200)
        .json({ data: appointments.map(AppointmentEntity.toResponse) });
    } catch (error) {
      console.log("catch ", error);
      return CustomError.internalServer(`${error}`);
    }
  };
}
