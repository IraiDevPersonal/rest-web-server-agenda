import { Router } from "express";
import { AgendaRoutes } from "../../agenda/presentation/routes";
import { SeedRoutes } from "../../seed/presentation/routes";
import { ProfessionRoute } from "@professions/presentation/routes";
import { ProfessionalRoutes } from "@professionals/presentation/routes";
import { CalendarRoutes } from "src/features/calendar/presentation/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    // Definir las rutas
    router.use("/api/professional", ProfessionalRoutes.routes);
    router.use("/api/profession", ProfessionRoute.routes);
    router.use("/api/agenda", AgendaRoutes.routes);
    router.use("/api/calendar", CalendarRoutes.routes);
    router.use("/api/seed", SeedRoutes.routes);

    return router;
  }
}
