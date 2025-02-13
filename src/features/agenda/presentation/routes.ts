import { Router } from "express";
import { AgendaController } from "./controllers/agenda_controller";
import { AgendaService } from "./service/agenda_service";

export class AgendaRoutes {
  static get routes(): Router {
    const router = Router();

    const agendaService = new AgendaService();
    const controller = new AgendaController(agendaService);
    router.get("/", [], controller.getAgenda);

    return router;
  }
}
