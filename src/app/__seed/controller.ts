import type { Request, Response } from "express";
import type { SeedService } from "./service";
import { CustomError } from "@/lib/custom-error";
import { ENVS } from "@/lib/config/envs";

export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  public run = async (req: Request, res: Response) => {
    try {
      if (ENVS.IS_PRODUCTION) {
        throw CustomError.badRequest("Seed operation not allowed in production environment");
      }
      await this.seedService.createSeed();
      return res.json({ message: "Seed created successfully" });
    } catch (error) {
      console.log({ error });
      CustomError.handleError(error, res);
    }
  };
}
