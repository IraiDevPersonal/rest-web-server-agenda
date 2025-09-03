import { Request, Response } from "express";

import { CustomError } from "@/lib/custom-error";
import { UserServiceImpl } from "./service";
import { UserDetailUseCase } from "./use-cases/user-detail.use-case";
import { UserListUseCase } from "./use-cases/user-list.use-case";
import { CreateUserUseCase } from "./use-cases/create-user.use-case";
import { UpdateUserUseCase } from "./use-cases/update-user.use-case";
import { UpdateUserStatusUseCase } from "./use-cases/update-user-status.use-case";

export class UserController {
  private readonly userListUseCase: UserListUseCase;
  private readonly userDetailUseCase: UserDetailUseCase;
  private readonly createUserUseCase: CreateUserUseCase;
  private readonly updateUserUseCase: UpdateUserUseCase;
  private readonly updateUserStatusUseCase: UpdateUserStatusUseCase;

  constructor(service: UserServiceImpl) {
    this.userListUseCase = new UserListUseCase(service);
    this.userDetailUseCase = new UserDetailUseCase(service);
    this.createUserUseCase = new CreateUserUseCase(service);
    this.updateUserUseCase = new UpdateUserUseCase(service);
    this.updateUserStatusUseCase = new UpdateUserStatusUseCase(service);
  }

  getUsers = async (req: Request, res: Response) => {
    try {
      const data = await this.userListUseCase.list(req.query);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  getUserDetail = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const data = await this.userDetailUseCase.getDetail(uid);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const data = await this.createUserUseCase.create(req.body);
      return res.status(201).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const data = await this.updateUserUseCase.update(uid, req.body);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };

  updateUserStatus = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const data = await this.updateUserStatusUseCase.updateStatus(uid, req.body);
      return res.status(200).json(data);
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };
}
