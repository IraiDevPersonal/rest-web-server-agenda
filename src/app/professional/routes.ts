import { Router } from "express";
import { ProfessionalService } from "./service";
import { ProfessionalController } from "./controller";

export class ProfessionalRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new ProfessionalService();
    const controller = new ProfessionalController(service);

    router.get("/", [], controller.getProfessionals);
    router.get("/to-filter", [], controller.getProfessionalsToFilter);

    return router;
  }
}
