import { Router } from "express";
import { ProfessionalService } from "./service";
import { ProfessionalController } from "./controller";
import { ProfessionalUseCases } from "./use-cases/professional-use-cases";
import { UidValidatorMiddleware } from "@/lib/middlewares/uid-validator-middleware";

export class ProfessionalRoutes {
  private static readonly service = new ProfessionalService();
  private static readonly useCases = new ProfessionalUseCases(this.service);
  private static readonly controller = new ProfessionalController(this.useCases);

  static get routes(): Router {
    const router = Router();
    const controller = this.controller;

    router.get("/", [], controller.getProfessionals);
    router.get(
      "/:uid",
      [UidValidatorMiddleware.validate],
      controller.getProfessionalDetail
    );
    router.get("/for-filter", [], controller.getProfessionalsForFilters);

    return router;
  }
}
