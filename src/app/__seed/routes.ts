import { Router } from "express";
import { SeedService } from "./service";
import { SeedController } from "./controller";

export class SeedRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new SeedService();
    const controller = new SeedController(service);
    router.get("/run", controller.run);

    return router;
  }
}
