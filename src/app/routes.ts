import { Router } from "express";

import { AppointmentRoutes } from "./appointments/routes";
import { ProfessionRoutes } from "./profession/routes";
import { ProfessionalRoutes } from "./professional/routes";
import { PatientRoutes } from "./patient/routes";
import { SeedRoutes } from "./__seed/routes";

export class Routes {
  static get routes(): Router {
    const router = Router();
    // Definir las rutas
    router.use("/api/appointments", AppointmentRoutes.routes);
    router.use("/api/professions", ProfessionRoutes.routes);
    router.use("/api/professionals", ProfessionalRoutes.routes);
    router.use("/api/patients", PatientRoutes.routes);
    router.use("/api/seed", SeedRoutes.routes);

    return router;
  }
}
