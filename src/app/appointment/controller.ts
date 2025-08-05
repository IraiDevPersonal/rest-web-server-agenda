import { Request, Response } from "express";
import { CustomError } from "@/lib/custom-error";
import { AppointmentUseCases } from "./use-cases/appoinment-use-cases";

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
}
