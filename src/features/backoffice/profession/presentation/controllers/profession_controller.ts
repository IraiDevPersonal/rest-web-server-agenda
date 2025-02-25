import { Controllers } from "@core/domain/controllers";
import { CustomError } from "@core/domain/custom.error";
import { ProfessionEntity } from "@professions/domain/entities/profession_entity";
import { ProfessionService } from "@professions/presentation/services/profession_service";
import { Request, Response } from "express";

export class ProfessionController implements Controllers {
  public constructor(private readonly professionService: ProfessionService) {}

  public getProfessions = async (req: Request, res: Response) => {
    try {
      const filters = this.getFilters(req);
      const professions = await this.professionService.getMany(filters);

      return res.json(professions.map(ProfessionEntity.adapter));
    } catch (error) {
      console.log("catch ", error);
      const e = CustomError.internalServer(`${error}`);
      return CustomError.handleError(e, res);
    }
  };

  getFilters(request: Request): Record<string, any> {
    const { id, name } = request.query;

    return {
      id: id ? Number(id) : undefined,
      name: name as string,
    };
  }
}
