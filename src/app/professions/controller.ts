import { Request, Response } from "express";

import { CustomError } from "@/lib/custom-error";
import { ProfessionListUseCase } from "./use-cases/profession-list.use-case";
import { ProfessionServiceImpl } from "./service";

export class ProfessionController {
  private professionalListUseCases: ProfessionListUseCase;

  public constructor(service: ProfessionServiceImpl) {
    this.professionalListUseCases = new ProfessionListUseCase(service);
  }

  public getProfessions = async (req: Request, res: Response) => {
    try {
      const professions = await this.professionalListUseCases.list(req.query);
      return res.status(200).json(professions);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  public getProfessionsForFilters = async (req: Request, res: Response) => {
    try {
      const professions = await this.professionalListUseCases.listForFilters(req.query);
      return res.status(200).json(professions);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };
}
