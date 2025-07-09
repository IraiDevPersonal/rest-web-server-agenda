import { Router } from "express";
import { AppointmentRoutes } from "./appointment/routes";
import { ProfessionRoutes } from "./profession/routes";
import { ProfessionalRoutes } from "./professional/routes";

export class Routes {
  static get routes(): Router {
    const router = Router();
    // Definir las rutas
    router.use("/api/appointments", AppointmentRoutes.routes);
    router.use("/api/professions", ProfessionRoutes.routes);
    router.use("/api/professionals", ProfessionalRoutes.routes);
    // router.use("/api/calendar", CalendarRoutes.routes);
    // router.use("/api/seed", SeedRoutes.routes);
    // router.use("/api/patient", PatientRoutes.routes);

    return router;
  }
}
