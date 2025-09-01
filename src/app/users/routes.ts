import { UidValidatorMiddleware } from "@/lib/middlewares/uid-validator-middleware";
import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "./service";

export class UserRoutes {
  private static readonly service = new UserService();
  private static readonly controller = new UserController(this.service);

  static get routes(): Router {
    const router = Router();
    const controller = this.controller;

    router.get("/", [], controller.getUsers);
    router.get("/for-filter", [], controller.getUsersForFilters);
    router.get("/:uid", [UidValidatorMiddleware.validate], controller.getUserDetail);

    return router;
  }
}