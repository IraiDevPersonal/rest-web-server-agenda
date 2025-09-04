import { Request, Response } from "express";

import { CustomError } from "@/lib/custom-error";
import { CreateUserUseCase } from "../users/use-cases/create-user.use-case";
import { UpdateUserStatusUseCase } from "../users/use-cases/update-user-status.use-case";
import { UpdateUserUseCase } from "../users/use-cases/update-user.use-case";
import { UserDetailUseCase } from "../users/use-cases/user-detail.use-case";
import { ProfessionalServiceRepository } from "./repository";
import { ProfessionalListUseCase } from "./use-cases/professional-list.use-case";

export class ProfessionalController {
  private readonly professionalListUseCase: ProfessionalListUseCase;
  private readonly professionalDetailUseCase: UserDetailUseCase;
  private readonly createProfessionalUseCase: CreateUserUseCase;
  private readonly updateProfessionalUseCase: UpdateUserUseCase;
  private readonly updateProfessionalStatusUseCase: UpdateUserStatusUseCase;

  constructor(service: ProfessionalServiceRepository) {
    this.professionalListUseCase = new ProfessionalListUseCase(service);
    this.professionalDetailUseCase = new UserDetailUseCase(service);
    this.createProfessionalUseCase = new CreateUserUseCase(service);
    this.updateProfessionalUseCase = new UpdateUserUseCase(service);
    this.updateProfessionalStatusUseCase = new UpdateUserStatusUseCase(service);
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
