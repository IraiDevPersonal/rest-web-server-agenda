import { Router } from "express";
import { AgendaRoutes } from "../../agenda/presentation/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas
    router.use("/api/agenda", AgendaRoutes.routes);

    return router;
  }
}
