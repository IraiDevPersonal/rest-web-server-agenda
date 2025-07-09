import { Router } from "express";
import { ProfessionService } from "./service";
import { ProfessionController } from "./controller";

export class ProfessionRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new ProfessionService();
    const controller = new ProfessionController(service);

    router.get("/", [], controller.getProfessions);
    router.get("/to-filter", [], controller.getProfessionsToFilter);

    return router;
  }
}
