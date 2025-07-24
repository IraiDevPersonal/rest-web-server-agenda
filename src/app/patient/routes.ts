import { Router } from "express";

import { PatientController } from "./controller";
import { PatientService } from "./service";

import { UidValidatorMiddleware } from "@/lib/middlewares/uid-validator-middleware";
import { PatientMiddleware } from "./middlewares/patient-middleware";

export class PatientRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new PatientService();
    const controller = new PatientController(service);

    router.get("/", [], controller.getPatients);
    router.get(
      "/:uid",
      [
        UidValidatorMiddleware.validate,
        PatientMiddleware.queryExpandValidation
      ],
      controller.getPatientByUid
    );

    router.post("/", [PatientMiddleware.insertValidation], controller.create);

    router.put(
      "/:uid",
      [UidValidatorMiddleware.validate, PatientMiddleware.updateValidation],
      controller.update
    );

    router.delete(
      "/:uid",
      [UidValidatorMiddleware.validate],
      controller.delete
    );

    return router;
  }
}
