import { Router } from "express";
import { SeedController } from "./controllers/seed_controller";
import { SeedService } from "./service/seed_service";

export class SeedRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new SeedService();
    const controller = new SeedController(service);
    router.get("/seed", controller.seed);

    return router;
  }
}
