import { Router } from "express";
import { PatientController } from "./controller/patient_controller";
import { PatientMiddleware } from "./middlewares/patient_middleware";
import { PatientService } from "./service/patient_service";

export class PatientRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new PatientService();
    const controller = new PatientController(service);
    // router.get("/", [], controller.getMyDay);
    // router.get("/:type", [], controller.getAppointmentsByType);
    // router.get(
    //   "/detail/:uid",
    //   [Middlewares.uidValidator],
    //   controller.getAppointmentDetail
    // );

    router.post("/", [PatientMiddleware.insertValidation], controller.create);

    return router;
  }
}
