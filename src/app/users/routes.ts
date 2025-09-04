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

    router.get("/", [], controller.getAll);
    router.get("/:uid", [UidValidatorMiddleware.validate], controller.getDetail);
    router.post("/", [], controller.create);
    router.put("/:uid", [UidValidatorMiddleware.validate], controller.update);
    router.patch("/:uid/status", [UidValidatorMiddleware.validate], controller.updateStatus);
    router.patch("/:uid/roles", [UidValidatorMiddleware.validate], controller.updateRoles);
    router.patch("/:uid/professions", [UidValidatorMiddleware.validate], controller.updateProfessions);

    return router;
  }
}
