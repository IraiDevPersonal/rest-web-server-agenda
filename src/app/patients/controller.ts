import { Request, Response } from "express";

import { CustomError } from "@/lib/custom-error";
import { PatientServiceImpl } from "./service";
import { UpdatePatientStatusUseCase } from "./use-cases/update-patient-status.use-case";
import { CreatePatientUseCase } from "./use-cases/create-patient.use-case";
import { UpdatePatientUseCase } from "./use-cases/update-patient.use-case";
import { PatientListUseCases } from "./use-cases/patient-list.use-case";
import { PatientDetailUseCase } from "./use-cases/patient-detail.use-case";

export class PatientController {
  private patientListUseCases: PatientListUseCases;
  private patientDetailUseCase: PatientDetailUseCase;
  private createPatientUseCase: CreatePatientUseCase;
  private updatePatientUseCase: UpdatePatientUseCase;
  private togglePatientStatusUseCase: UpdatePatientStatusUseCase;

  constructor(service: PatientServiceImpl) {
    this.patientListUseCases = new PatientListUseCases(service);
    this.patientDetailUseCase = new PatientDetailUseCase(service);
    this.createPatientUseCase = new CreatePatientUseCase(service);
    this.updatePatientUseCase = new UpdatePatientUseCase(service);
    this.togglePatientStatusUseCase = new UpdatePatientStatusUseCase(service);
  }

  getPatients = async (req: Request, res: Response) => {
    try {
      const data = await this.patientListUseCases.list(req.query);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  getPatientDetail = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const data = await this.patientDetailUseCase.getDetail(uid, req.query);

      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  createPatient = async (req: Request, res: Response) => {
    try {
      const data = await this.createPatientUseCase.create(req.body);
      return res.status(201).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  updatePatient = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const data = await this.updatePatientUseCase.update(uid, req.body);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  updatePatientStatus = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const data = await this.togglePatientStatusUseCase.updateStatus(uid, req.body);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };
}
