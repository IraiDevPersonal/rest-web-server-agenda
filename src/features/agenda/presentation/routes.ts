import { Router } from "express";
import { AgendaController } from "./controllers/ageda_controller";

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
    const controller = new AgendaController();
    router.get("/hours/:type", [], controller.getAgenda);

    return router;
  }
}
