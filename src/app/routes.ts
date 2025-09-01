import { Router } from "express";

import { AppointmentRoutes } from "./appointments/routes";
import { ProfessionRoutes } from "./professions/routes";
import { UserRoutes } from "./users/routes";
import { PatientRoutes } from "./patients/routes";
import { SeedRoutes } from "./__seed/routes";
import { ProfessionalRoutes } from "./professionals/routes";

export class Routes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/professionals", ProfessionalRoutes.routes);
    router.use("/api/appointments", AppointmentRoutes.routes);
    router.use("/api/professions", ProfessionRoutes.routes);
    router.use("/api/patients", PatientRoutes.routes);
    router.use("/api/users", UserRoutes.routes);
    router.use("/api/seed", SeedRoutes.routes);

    return router;
  }
}
