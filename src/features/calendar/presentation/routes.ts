import { Router } from "express";
import { CalendarController } from "./controllers/calendar_controller";
import { CalendarService } from "./service/calendar_service";

export class CalendarRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new CalendarService();
    const controller = new CalendarController(service);
    router.get("/", [], controller.getCalendar);

    return router;
  }
}
