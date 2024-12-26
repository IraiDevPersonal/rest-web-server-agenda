import { Router } from "express";

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
    router.get("/:professional-id/hours/:type" /*Controller*/);

    return router;
  }
}
