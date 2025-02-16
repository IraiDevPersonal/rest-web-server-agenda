import { Router } from "express";
import { ProfessionService } from "@professions/presentation/services/profession_service";
import { ProfessionController } from "@professions/presentation/controllers/profession_controller";

export class ProfessionRoute {
  static get routes(): Router {
    const router = Router();

    const service = new ProfessionService();
    const controller = new ProfessionController(service);
    router.get("/", [], controller.getProfessions);

    return router;
  }
}
