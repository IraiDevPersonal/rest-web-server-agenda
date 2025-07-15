import { Router } from "express";

import { AppointmentController } from "./controller";
import { AppointmentService } from "./service";

import { UidValidatorMiddleware } from "@/lib/middlewares/uid-validator-middleware";

export class AppointmentRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new AppointmentService();
    const controller = new AppointmentController(service);

    router.get("/", [], controller.getAppointments);
    router.get(
      "/:uid",
      [UidValidatorMiddleware.validate],
      controller.getOneAppointment
    );

    return router;
  }
}
