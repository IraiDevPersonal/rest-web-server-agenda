import { Request, Response } from "express";

import { CustomError } from "@/lib/custom-error";
import { UserServiceImpl } from "./service";
import { UserDetailUseCase } from "./use-cases/user-detail.use-case";
import { UserListUseCase } from "./use-cases/user-list.use-case";

export class UserController {
  private readonly userListUseCases: UserListUseCase;
  private readonly userDetailUseCases: UserDetailUseCase;

  constructor(service: UserServiceImpl) {
    this.userListUseCases = new UserListUseCase(service);
    this.userDetailUseCases = new UserDetailUseCase(service);
  }

  getUsers = async (req: Request, res: Response) => {
    try {
      const data = await this.userListUseCases.list(req.query);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  getUserDetail = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const data = await this.userDetailUseCases.getDetail(uid);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  getUsersForFilters = async (req: Request, res: Response) => {
    try {
      const data = await this.userListUseCases.listForFilters(req.query);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };
}