import { Request, Response } from "express";

import { CustomError } from "@/lib/custom-error";
import { PatientServiceImpl } from "./service";
import { TogglePatientStatusUseCase } from "./use-cases/toggle-patient-status.use-case";
import { CreatePatientUseCase } from "./use-cases/create-patient.use-case";
import { UpdatePatientUseCase } from "./use-cases/update-patient.use-case";
import { PatientListUseCase } from "./use-cases/patient-list.use-case";
import { PatientDetailUseCase } from "./use-cases/patient-detail.use-case";

export class PatientController {
  private patientListUseCase: PatientListUseCase;
  private patientDetailUseCase: PatientDetailUseCase;
  private createPatientUseCase: CreatePatientUseCase;
  private updatePatientUseCase: UpdatePatientUseCase;
  private togglePatientStatusUseCase: TogglePatientStatusUseCase;

  constructor(service: PatientServiceImpl) {
    this.patientListUseCase = new PatientListUseCase(service);
    this.patientDetailUseCase = new PatientDetailUseCase(service);
    this.createPatientUseCase = new CreatePatientUseCase(service);
    this.updatePatientUseCase = new UpdatePatientUseCase(service);
    this.togglePatientStatusUseCase = new TogglePatientStatusUseCase(service);
  }

  getPatients = async (req: Request, res: Response) => {
    try {
      const data = await this.patientListUseCase.list(req.query);
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

  togglePatientStatus = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const data = await this.togglePatientStatusUseCase.toggleStatus(uid);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };
}
