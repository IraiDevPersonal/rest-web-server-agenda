import { Request, Response } from "express";

import { Controllers } from "@/lib/controllers";
import { ProfessionService } from "./service";
import { CustomError } from "@/lib/custom-error";
import { ProfessionFilters } from "./types/professions";
import { ProfessionToFilterEntity } from "./entities/profession-to-filter-entity";
import { ProfessionEntity } from "./entities/profession-entity";

export class ProfessionController implements Controllers<ProfessionFilters> {
  public constructor(private readonly service: ProfessionService) { }

  public getProfessions = async (req: Request, res: Response) => {
    try {
      const filters = this.getFilters(req);
      const bdProfessions = await this.service.getProfessions(filters);
      const professions = ProfessionEntity.responseAdapter(bdProfessions)

      return res.json(professions);
    } catch (error) {
      const err = CustomError.internalServer(`${error}`);
      return CustomError.handleError(err, res);
    }
  };

  public getProfessionsToFilter = async (req: Request, res: Response) => {
    try {
      const filters = this.getFilters(req);
      const bdProfessions = await this.service.getProfessions(filters);
      const professions = ProfessionToFilterEntity.responseAdapter(bdProfessions)

      return res.json(professions);
    } catch (error) {
      const err = CustomError.internalServer(`${error}`);
      return CustomError.handleError(err, res);
    }
  };

  getFilters(request: Request) {
    const { id } = request.query;

    return {
      id: id ? Number(id) : undefined,
      // name: name as string,
    };
  }
}
