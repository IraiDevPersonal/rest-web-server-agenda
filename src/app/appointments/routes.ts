import { Router } from "express";

import { AppointmentController } from "./controller";
import { AppointmentService } from "./service";

import { UidValidatorMiddleware } from "@/lib/middlewares/uid-validator-middleware";

export class AppointmentRoutes {
  private static readonly service = new AppointmentService();
  private static readonly controller = new AppointmentController(this.service);

  static get routes(): Router {
    const router = Router();
    const controller = this.controller;

    router.get("/", [], controller.getAppointments);
    router.get(
      "/:uid",
      [UidValidatorMiddleware.validate],
      controller.getAppointmentByUid
    );

    return router;
  }
}
