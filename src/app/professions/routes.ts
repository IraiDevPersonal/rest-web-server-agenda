import { Router } from "express";
import { ProfessionController } from "./controller";
import { ProfessionService } from "./service";

export class ProfessionRoutes {
  private static readonly service = new ProfessionService();
  private static readonly controller = new ProfessionController(this.service);

  static get routes(): Router {
    const router = Router();
    const controller = this.controller;

    router.get("/", [], controller.getProfessions);
    router.get("/for-filter", [], controller.getProfessionsForFilters);

    return router;
  }
}
