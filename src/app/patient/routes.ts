import { Router } from "express";

import { PatientController } from "./controller";
import { PatientService } from "./service";

import { UidValidatorMiddleware } from "@/lib/middlewares/uid-validator-middleware";
import { PatientMiddleware } from "./middlewares/patient-middleware";
import { PatientUseCases } from "./use-cases/patient-use-cases";

export class PatientRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new PatientService();
    const useCases = new PatientUseCases(service);
    const controller = new PatientController(useCases);

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
