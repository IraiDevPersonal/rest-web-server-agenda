import { Request, Response } from "express";

import { CustomError } from "@/lib/custom-error";
import { ProfessionalServiceRepository } from "./repository";
import { ProfessionalListUseCase } from "./use-cases/professional-list.use-case";
import { UserController } from "../users/controller";

export class ProfessionalController extends UserController {
  private readonly professionalListUseCase: ProfessionalListUseCase;

  constructor(service: ProfessionalServiceRepository) {
    super(service);
    this.professionalListUseCase = new ProfessionalListUseCase(service);
  }

  getForFilters = async (req: Request, res: Response) => {
    try {
      const data = await this.professionalListUseCase.listForFilters(req.query);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };
}
