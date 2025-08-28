import { Router } from "express";

import { PatientController } from "./controller";
import { PatientService } from "./service";

import { UidValidatorMiddleware } from "@/lib/middlewares/uid-validator-middleware";
import { PatientMiddleware } from "./middlewares/patient.middleware";

export class PatientRoutes {
  private static readonly service = new PatientService();
  private static readonly controller = new PatientController(this.service);

  static get routes(): Router {
    const router = Router();
    const controller = this.controller;

    router.get("/", [], controller.getPatients);
    router.get(
      "/:uid",
      [UidValidatorMiddleware.validate, PatientMiddleware.validateExpandQuery],
      controller.getPatientDetail
    );

    router.post("/", [], controller.createPatient);

    router.put("/:uid", [UidValidatorMiddleware.validate], controller.updatePatient);

    router.patch("/:uid", [UidValidatorMiddleware.validate], controller.updatePatientStatus);

    return router;
  }
}
