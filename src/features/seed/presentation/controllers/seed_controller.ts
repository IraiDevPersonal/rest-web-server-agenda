import { Request, Response } from "express";
import { SeedServiceModel } from "../../domain/model/seed_service_model";

export class SeedController {
  constructor(private readonly seedService: SeedServiceModel) {}

  public seed = async (req: Request, res: Response) => {
    try {
      await this.seedService.createSeed();
      return res.json({ mesage: "Seed created" });
    } catch (error) {
      res.status(500).json({ message: "Error" + error });
    }
  };
}
