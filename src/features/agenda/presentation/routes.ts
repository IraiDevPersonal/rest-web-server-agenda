import { Router } from "express";
import { AgendaController } from "./controllers/ageda_controller";
import { AppointmentService } from "../../appointment/presentation/services/appointment_service";

export class AgendaRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas
    /**
     * los tipos que se permitidos para param type:
     * hours-available
     * hours-confirmed
     * hours-to-be-confirm
     */

    const appointmentService = new AppointmentService();
    const controller = new AgendaController(appointmentService);
    router.get("/hours/:type", [], controller.getAgenda);

    return router;
  }
}
