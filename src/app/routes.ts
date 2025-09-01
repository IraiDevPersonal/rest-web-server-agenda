import { Router } from "express";

import { AppointmentRoutes } from "./appointments/routes";
import { ProfessionRoutes } from "./professions/routes";
import { UserRoutes } from "./users/routes";
import { PatientRoutes } from "./patients/routes";
import { SeedRoutes } from "./__seed/routes";

export class Routes {
  static get routes(): Router {
    const router = Router();
    // Definir las rutas
    router.use("/api/appointments", AppointmentRoutes.routes);
    router.use("/api/professions", ProfessionRoutes.routes);
    router.use("/api/professionals", UserRoutes.routes);
    router.use("/api/patients", PatientRoutes.routes);
    router.use("/api/seed", SeedRoutes.routes);

    return router;
  }
}
