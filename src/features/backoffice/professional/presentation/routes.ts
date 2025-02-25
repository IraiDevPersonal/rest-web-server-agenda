import { Router } from "express";
import { ProfessionalService } from "./services/professional_service";
import { ProfessionalController } from "./controllers/professional_controller";

export class ProfessionalRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new ProfessionalService();
    const controller = new ProfessionalController(service);
    router.get("/to-filter", [], controller.getManyToFilter);

    return router;
  }
}
