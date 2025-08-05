import { Router } from "express";
import { ProfessionalService } from "./service";
import { ProfessionalController } from "./controller";
import { ProfessionalUseCases } from "./use-cases/professional-use-cases";

export class ProfessionalRoutes {
  private static readonly service = new ProfessionalService();
  private static readonly useCases = new ProfessionalUseCases(this.service);
  private static readonly controller = new ProfessionalController(this.useCases);

  static get routes(): Router {
    const router = Router();
    const controller = this.controller;

    router.get("/", [], controller.getProfessionals);
    router.get("/for-filter", [], controller.getProfessionalsForFilters);

    return router;
  }
}
