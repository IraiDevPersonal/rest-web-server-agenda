import { Router } from "express";
import { AgendaController } from "./controllers/agenda_controller";
import { AppointmentService } from "../../appointment/presentation/services/appointment_service";

export class AgendaRoutes {
  static get routes(): Router {
    const router = Router();

    const appointmentService = new AppointmentService();
    const controller = new AgendaController(appointmentService);
    router.get("/", [], controller.getAgenda);

    return router;
  }
}
