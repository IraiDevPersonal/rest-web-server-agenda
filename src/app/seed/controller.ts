import { Request, Response } from "express";
import { SeedService } from "./service";
import { CustomError } from "@/lib/custom-error";
import { ENVS } from "@/config/envs";

export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  public run = async (req: Request, res: Response) => {
    try {
      if (ENVS.IS_PRODUCTION) {
        throw CustomError.badRequest("Estas en producción accion denegada!!!!");
      }
      await this.seedService.createSeed();
      return res.json({ message: "Seed created successfully" });
    } catch (error) {
      console.log({ error });
      CustomError.handleError(error, res);
    }
  };
}
