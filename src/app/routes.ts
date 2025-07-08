import { Router } from "express";
import { AppointmentRoutes } from "./appointment/routes";

export class Routes {
  static get routes(): Router {
    const router = Router();
    // Definir las rutas
    router.use("/api/appointments", AppointmentRoutes.routes);
    // router.use("/api/profession", ProfessionRoute.routes);
    // router.use("/api/calendar", CalendarRoutes.routes);
    // router.use("/api/seed", SeedRoutes.routes);
    // router.use("/api/patient", PatientRoutes.routes);

    return router;
  }
}
