import { Router } from "express";

import { PatientController } from "./controller";
import { PatientService } from "./service";

import { UidValidatorMiddleware } from "@/lib/middlewares/uid-validator-middleware";
import { PatientMiddleware } from "./middlewares/patient-middleware";
import { PatientUseCases } from "./use-cases/patient-use-cases";

export class PatientRoutes {
  // TODO: Esto para mejorar el consumo de memoria y CPU creando una unica instancia de de estas clases y no creandolas cada vez que se llame a get routes()
  private static readonly service = new PatientService();
  private static readonly useCases = new PatientUseCases(this.service);
  private static readonly controller = new PatientController(this.useCases);

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

    router.patch(
      "/:uid",
      [UidValidatorMiddleware.validate],
      controller.togglePatientStatus
    );

    return router;
  }
}
