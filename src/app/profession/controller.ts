import { Request, Response } from "express";

import { CustomError } from "@/lib/custom-error";
import { ProfessionUseCases } from "./use-cases/profession-use-cases";

export class ProfessionController {
  public constructor(private readonly useCases: ProfessionUseCases) {}

  public getProfessions = async (req: Request, res: Response) => {
    try {
      const professions = await this.useCases.getProfessions(req.query);
      return res.status(200).json(professions);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  public getProfessionsForFilters = async (req: Request, res: Response) => {
    try {
      const professions = await this.useCases.getProfessionsForFilters(req.query);
      return res.status(200).json(professions);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };
}
