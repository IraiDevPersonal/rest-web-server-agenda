import { Router } from "express";

import { AppointmentController } from "./controller";
import { AppointmentService } from "./service";

import { UidValidator } from "@/lib/middlewares/uid-validator";

export class AppointmentRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new AppointmentService();
    const controller = new AppointmentController(service);

    router.get("/", [], controller.getAppointments);
    router.get(
      "/:uid",
      [UidValidator.validate],
      controller.getOneAppointment
    );

    return router;
  }
}
