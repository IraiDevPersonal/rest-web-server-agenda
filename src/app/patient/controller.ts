import { Request, Response } from "express";

import { CustomError } from "@/lib/custom-error";
import { PatientUseCases } from "./use-cases/patient-use-cases";

export class PatientController {
  constructor(private readonly useCases: PatientUseCases) {}

  getPatients = async (req: Request, res: Response) => {
    try {
      const data = await this.useCases.getPatients(req.query);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  getPatientDetail = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const data = await this.useCases.getPatientDetail(uid, req.query);

      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  createPatient = async (req: Request, res: Response) => {
    try {
      const data = await this.useCases.createPatient(req.body);
      return res.status(201).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  updatePatient = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const data = await this.useCases.updatePatient(uid, req.body);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  togglePatientStatus = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const data = await this.useCases.togglePatientStatus(uid);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };
}
