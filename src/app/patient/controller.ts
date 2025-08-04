import { Request, Response } from "express";

import { CustomError } from "@/lib/custom-error";
import { PatientFiltersMapper } from "./mappers/patient-filters-mapper";
import { PatientUseCases } from "./use-cases/patient-use-cases";

export class PatientController {
  constructor(private readonly useCases: PatientUseCases) {}

  getPatients = async (req: Request, res: Response) => {
    try {
      const filters = PatientFiltersMapper.getFilters(req);
      const response = await this.useCases.getPatients(filters);

      return res.status(200).json(response);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  getPatientDetail = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const expand = req.query.expand;
      const response = await this.useCases.getPatientDetail(uid, expand);

      return res.status(200).json(response);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  createPatient = async (req: Request, res: Response) => {
    try {
      const response = await this.useCases.createPatient(req.body);

      return res.status(201).json(response);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  updatePatient = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const response = await this.useCases.updatePatient(req.body, uid);

      return res.status(200).json(response);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  togglePatientStatus = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const response = await this.useCases.togglePatientStatus(uid);

      return res.status(200).json(response);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };
}
