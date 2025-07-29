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

    router.get("/", [], controller.getAll);
    router.get(
      "/:uid",
      [
        UidValidatorMiddleware.validate,
        PatientMiddleware.queryExpandValidation
      ],
      controller.getByUid
    );

    router.post("/", [PatientMiddleware.insertValidation], controller.create);

    router.put(
      "/:uid",
      [UidValidatorMiddleware.validate, PatientMiddleware.updateValidation],
      controller.update
    );

    router.patch(
      "/:uid",
      [UidValidatorMiddleware.validate],
      controller.toggleStatus
    );

    return router;
  }
}
