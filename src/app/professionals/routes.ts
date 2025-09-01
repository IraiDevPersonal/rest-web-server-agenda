import { UidValidatorMiddleware } from "@/lib/middlewares/uid-validator-middleware";
import { Router } from "express";
import { ProfessionalService } from "./services";
import { ProfessionalController } from "./controller";

export class ProfessionalRoutes {
  private static readonly service = new ProfessionalService();
  private static readonly controller = new ProfessionalController(this.service);

  static get routes(): Router {
    const router = Router();
    const controller = this.controller;

    router.get("/", [], controller.getProfessionals);
    router.get("/for-filter", [], controller.getProfessionalsForFilters);
    router.get("/:uid", [UidValidatorMiddleware.validate], controller.getProfessionalDetail);
    router.post("/", [], controller.createProfessional);
    router.put("/:uid", [UidValidatorMiddleware.validate], controller.updateProfessional);
    router.patch("/:uid", [UidValidatorMiddleware.validate], controller.updateProfessionalStatus);

    return router;
  }
}
