import { Router } from "express";
import { ProfessionService } from "./service";
import { ProfessionController } from "./controller";
import { ProfessionUseCases } from "./use-cases/profession-use-cases";

export class ProfessionRoutes {
  private static readonly service = new ProfessionService();
  private static readonly useCases = new ProfessionUseCases(this.service);
  private static readonly controller = new ProfessionController(this.useCases);

  static get routes(): Router {
    const router = Router();
    const controller = this.controller;

    router.get("/", [], controller.getProfessions);
    router.get("/for-filter", [], controller.getProfessionsForFilters);

    return router;
  }
}
