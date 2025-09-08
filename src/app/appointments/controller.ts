import type { Request, Response } from "express";

import { CustomError } from "@/lib/custom-error";
import type { AppointmentServiceRepository } from "./repository";
import { AppointmentDetailUseCase } from "./use-cases/appoinment-detail.use-case";
import { AppointmentListUseCase } from "./use-cases/appoinment-list.use-case";

export class AppointmentController {
  private readonly appointmentListUseCase: AppointmentListUseCase;
  private readonly appointmentDetailUseCase: AppointmentDetailUseCase;

  public constructor(service: AppointmentServiceRepository) {
    this.appointmentListUseCase = new AppointmentListUseCase(service);
    this.appointmentDetailUseCase = new AppointmentDetailUseCase(service);
  }

  public getAppointments = async (req: Request, res: Response) => {
    try {
      const appointments = await this.appointmentListUseCase.list(req.query);
      return res.status(200).json(appointments);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  public getAppointmentByUid = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const appointment = await this.appointmentDetailUseCase.getDetail(uid);
      return res.status(200).json(appointment);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };
}
