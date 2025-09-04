import { Request, Response } from "express";

import { CustomError } from "@/lib/custom-error";
import { UserServiceRepository } from "./repository";
import { UserDetailUseCase } from "./use-cases/user-detail.use-case";
import { UserListUseCase } from "./use-cases/user-list.use-case";
import { CreateUserUseCase } from "./use-cases/create-user.use-case";
import { UpdateUserUseCase } from "./use-cases/update-user.use-case";
import { UpdateUserStatusUseCase } from "./use-cases/update-user-status.use-case";
import { UpdateUserRolesUseCase } from "./use-cases/update-user-roles.use-case";
import { UpdateUserProfessionsUseCase } from "./use-cases/update-user-professions.use-case";

export class UserController {
  private readonly userListUseCase: UserListUseCase;
  private readonly userDetailUseCase: UserDetailUseCase;
  private readonly createUserUseCase: CreateUserUseCase;
  private readonly updateUserUseCase: UpdateUserUseCase;
  private readonly updateUserStatusUseCase: UpdateUserStatusUseCase;
  private readonly updateUserRolesUseCase: UpdateUserRolesUseCase;
  private readonly updateUserProfessionsUseCase: UpdateUserProfessionsUseCase;

  constructor(service: UserServiceRepository) {
    this.userListUseCase = new UserListUseCase(service);
    this.userDetailUseCase = new UserDetailUseCase(service);
    this.createUserUseCase = new CreateUserUseCase(service);
    this.updateUserUseCase = new UpdateUserUseCase(service);
    this.updateUserStatusUseCase = new UpdateUserStatusUseCase(service);
    this.updateUserRolesUseCase = new UpdateUserRolesUseCase(service);
    this.updateUserProfessionsUseCase = new UpdateUserProfessionsUseCase(service);
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const data = await this.userListUseCase.list(req.query);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  getDetail = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const data = await this.userDetailUseCase.getDetail(uid);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const data = await this.createUserUseCase.create(req.body);
      return res.status(201).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const data = await this.updateUserUseCase.update(uid, req.body);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  updateStatus = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const data = await this.updateUserStatusUseCase.updateStatus(uid, req.body);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  updateRoles = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const data = await this.updateUserRolesUseCase.updateRoles(uid, req.body);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  updateProfessions = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const data = await this.updateUserProfessionsUseCase.updateProfessions(uid, req.body);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };
}
