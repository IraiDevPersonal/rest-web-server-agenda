import { Router } from "express";
import { AgendaRoutes } from "../../agenda/presentation/routes";
import { SeedRoutes } from "../../seed/presentation/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    console.log("en router");
    // Definir las rutas
    router.use("/api/agenda", AgendaRoutes.routes);
    router.use("/api/seed", SeedRoutes.routes);

    return router;
  }
}
