import { Router } from "express";
import { ProfessionalService } from "./service";
import { ProfessionalController } from "./controller";
import { ProfessionalUseCases } from "./use-cases/professional-use-cases";

export class ProfessionalRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new ProfessionalService();
    const useCases = new ProfessionalUseCases(service);
    const controller = new ProfessionalController(useCases);

    router.get("/", [], controller.getProfessionals);
    router.get("/to-filter", [], controller.getProfessionalsForFilters);

    return router;
  }
}
