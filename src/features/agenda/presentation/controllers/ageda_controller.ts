import { Request, Response } from "express";
import {
  AppointmentEntity,
  AppointmentStatus,
} from "../../../appointment/domain/entities/appointment_entity";
import { AppointmentService } from "../../../appointment/presentation/services/appointment_service";
import { CustomError } from "../../../core/domain/custom.error";

export class AgendaController {
  public constructor(private readonly appointmentService: AppointmentService) {}

  public getAgenda = async (req: Request, res: Response) => {
    try {
      const { type } = req.query;

      console.log(type);

      const appointments = await this.appointmentService.getAppointments({
        type: type as AppointmentStatus,
      });

      const aps = appointments.map(AppointmentEntity.toResponse);
      // console.log(appointments);
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
        .json({ data: { availables, cancelled, confirmed, toConfirm } });
    } catch (error) {
      console.log("catch ", error);
      const e = CustomError.internalServer(`${error}`);
      return CustomError.handleError(e, res);
    }
  };
}
