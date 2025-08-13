import { Request, Response } from "express";

import { CustomError } from "@/lib/custom-error";
import { ProfessionalUseCases } from "./use-cases/professional-use-cases";

export class ProfessionalController {
  constructor(private readonly useCases: ProfessionalUseCases) {}

  getProfessionals = async (req: Request, res: Response) => {
    try {
      const data = await this.useCases.getProfessionals(req.query);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  getProfessionalDetail = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const data = await this.useCases.getProfessionalDetail(uid);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  getProfessionalsForFilters = async (req: Request, res: Response) => {
    try {
      const data = await this.useCases.getProfessionalsForFilters(req.query);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };
}
