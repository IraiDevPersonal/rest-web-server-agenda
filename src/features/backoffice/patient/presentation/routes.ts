import { Router } from "express";
import { PatientController } from "./controller/patient_controller";
import { PatientMiddleware } from "./middlewares/patient_middleware";
import { PatientService } from "./service/patient_service";
import { Middlewares } from "@core/domain/middleware";

export class PatientRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new PatientService();
    const controller = new PatientController(service);

    router.get("/", [], controller.getAll);
    router.post("/", [PatientMiddleware.insertValidation], controller.create);
    router.put(
      "/:uid",
      [Middlewares.uidValidator, PatientMiddleware.updateValidation],
      controller.update
    );
    router.delete("/:uid", [Middlewares.uidValidator], controller.delete);

    return router;
  }
}
