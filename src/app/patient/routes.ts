import { Router } from "express";

import { PatientController } from "./controller";
import { PatientService } from "./service";

import { PatientMiddleware } from "./middlewares/patient_middleware";
import { UidValidatorMiddleware } from "@/lib/middlewares/uid-validator-middleware";

export class PatientRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new PatientService();
    const controller = new PatientController(service);

    router.get("/", [], controller.getPatients);
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
