import { Router } from "express";
import { AgendaController } from "./controllers/agenda_controller";
import { AgendaService } from "./service/agenda_service";
import { Middlewares } from "@core/domain/middleware";

export class AgendaRoutes {
  static get routes(): Router {
    const router = Router();

    const agendaService = new AgendaService();
    const controller = new AgendaController(agendaService);
    router.get("/", [], controller.getMyDay);
    router.get("/:type", [], controller.getAppointmentsByType);
    router.get(
      "/detail/:uid",
      [Middlewares.uidValidator],
      controller.getAppointmentDetail
    );

    return router;
  }
}
