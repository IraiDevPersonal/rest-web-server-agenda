import { CustomError } from "@core/domain/custom.error";
import { ProfessionEntity } from "@professions/domain/entities/profession_entity";
import { ProfessionService } from "@professions/presentation/services/profession_service";
import { Request, Response } from "express";

export class ProfessionController {
  public constructor(private readonly professionService: ProfessionService) {}

  public getProfessions = async (req: Request, res: Response) => {
    try {
      const { id, name } = req.query;

      const professions = await this.professionService.getMany({
        id: id ? Number(id) : undefined,
        name: name as string,
      });

      return res.json(professions.map(ProfessionEntity.adapter));
    } catch (error) {
      console.log("catch ", error);
      const e = CustomError.internalServer(`${error}`);
      return CustomError.handleError(e, res);
    }
  };
}
