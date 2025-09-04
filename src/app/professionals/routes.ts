import { UidValidatorMiddleware } from "@/lib/middlewares/uid-validator-middleware";
import { Router } from "express";
import { ProfessionalController } from "./controller";
import { ProfessionalService } from "./services";

export class ProfessionalRoutes {
  private static readonly service = new ProfessionalService();
  private static readonly controller = new ProfessionalController(this.service);

  static get routes(): Router {
    const router = Router();
    const controller = this.controller;

    router.get("/", [], controller.getAll);
    router.get("/for-filter", [], controller.getForFilters);
    router.get("/:uid", [UidValidatorMiddleware.validate], controller.getDetail);
    router.post("/", [], controller.create);
    router.put("/:uid", [UidValidatorMiddleware.validate], controller.update);
    router.patch("/:uid/status", [UidValidatorMiddleware.validate], controller.updateStatus);
    router.patch("/:uid/roles", [UidValidatorMiddleware.validate], controller.updateRoles);
    router.patch("/:uid/professions", [UidValidatorMiddleware.validate], controller.updateProfessions);

    return router;
  }
}
