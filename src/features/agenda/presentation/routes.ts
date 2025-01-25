import { Router } from "express";
import { AgendaController } from "./controllers/ageda_controller";
import { AppointmentService } from "../../appointment/presentation/services/appointment_service";

export class AgendaRoutes {
  static get routes(): Router {
    const router = Router();

    const appointmentService = new AppointmentService();
    const controller = new AgendaController(appointmentService);
    router.get("/hours", [], controller.getAgenda);

    return router;
  }
}
