import { AppointmentStatus } from "@prisma/client";
import { Request, Response } from "express";
import { AppointmentEntity } from "../../../appointment/domain/entities/appointment_entity";
import { AppointmentService } from "../../../appointment/presentation/services/appointment_service";
import { CustomError } from "../../../core/domain/custom.error";

export class AgendaController {
  public constructor(private readonly appointmentService: AppointmentService) {}

  public getAgenda = async (req: Request, res: Response) => {
    try {
      const { type } = req.query;

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
