import { Request, Response } from "express";

import { CustomError } from "@/lib/custom-error";
import { ProfessionalServiceImpl } from "./services";
import { ProfessionalListUseCase } from "./use-cases/professional-list.use-case";
import { ProfessionalDetailUseCase } from "./use-cases/professional-detail.use-case";
import { CreateProfessionalUseCase } from "./use-cases/create-professional.use-case";
import { UpdateProfessionalUseCase } from "./use-cases/update-professional.use-case";
import { UpdateProfessionalStatusUseCase } from "./use-cases/update-professional-status.use-case";

export class ProfessionalController {
  private readonly professionalListUseCase: ProfessionalListUseCase;
  private readonly professionalDetailUseCase: ProfessionalDetailUseCase;
  private readonly createProfessionalUseCase: CreateProfessionalUseCase;
  private readonly updateProfessionalUseCase: UpdateProfessionalUseCase;
  private readonly updateProfessionalStatusUseCase: UpdateProfessionalStatusUseCase;

  constructor(service: ProfessionalServiceImpl) {
    this.professionalListUseCase = new ProfessionalListUseCase(service);
    this.professionalDetailUseCase = new ProfessionalDetailUseCase(service);
    this.createProfessionalUseCase = new CreateProfessionalUseCase(service);
    this.updateProfessionalUseCase = new UpdateProfessionalUseCase(service);
    this.updateProfessionalStatusUseCase = new UpdateProfessionalStatusUseCase(service);
  }

  getProfessionals = async (req: Request, res: Response) => {
    try {
      const data = await this.professionalListUseCase.list(req.query);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  getProfessionalDetail = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const data = await this.professionalDetailUseCase.getDetail(uid);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  getProfessionalsForFilters = async (req: Request, res: Response) => {
    try {
      const data = await this.professionalListUseCase.listForFilters(req.query);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  createProfessional = async (req: Request, res: Response) => {
    try {
      const data = await this.createProfessionalUseCase.create(req.body);
      return res.status(201).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  updateProfessional = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const data = await this.updateProfessionalUseCase.update(uid, req.body);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  updateProfessionalStatus = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const data = await this.updateProfessionalStatusUseCase.updateStatus(uid, req.body);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };
}
