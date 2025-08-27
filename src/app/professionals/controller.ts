import { Request, Response } from "express";

import { CustomError } from "@/lib/custom-error";
import { ProfessionalServiceImpl } from "./service";
import { ProfessionalDetailUseCase } from "./use-cases/professional-detail.use-case";
import { ProfessionalListUseCase } from "./use-cases/professional-list.use-case";

export class ProfessionalController {
  private readonly professionalListUseCases: ProfessionalListUseCase;
  private readonly professionalDetailUseCases: ProfessionalDetailUseCase;

  constructor(service: ProfessionalServiceImpl) {
    this.professionalListUseCases = new ProfessionalListUseCase(service);
    this.professionalDetailUseCases = new ProfessionalDetailUseCase(service);
  }

  getProfessionals = async (req: Request, res: Response) => {
    try {
      const data = await this.professionalListUseCases.list(req.query);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  getProfessionalDetail = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const data = await this.professionalDetailUseCases.getDetail(uid);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  getProfessionalsForFilters = async (req: Request, res: Response) => {
    try {
      const data = await this.professionalListUseCases.listForFilters(req.query);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };
}
