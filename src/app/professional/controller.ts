import { Request, Response } from "express";

import { Controllers } from "@/lib/controllers";
import { ProfessionalService } from "./service";
import { CustomError } from "@/lib/custom-error";
import { ProfessionalFilters } from "./models/professional";
import { ProfessionalToFilterEntity } from "./entities/professional-to-filter-entity";
import { ProfessionalEntity } from "./entities/professional-entity";

export class ProfessionalController implements Controllers<ProfessionalFilters> {
  public constructor(private readonly service: ProfessionalService) { }

  public getProfessionals = async (req: Request, res: Response) => {
    try {
      const filters = this.getFilters(req);
      const bdProfessions = await this.service.getProfessionals(filters);
      const professions = ProfessionalEntity.responseAdapter(bdProfessions)

      return res.json(professions);
    } catch (error) {
      const err = CustomError.internalServer(`${error}`);
      return CustomError.handleError(err, res);
    }
  };

  public getProfessionalsToFilter = async (req: Request, res: Response) => {
    try {
      const filters = this.getFilters(req);
      const bdProfessions = await this.service.getProfessionalsToFilter(filters);
      const professions = ProfessionalToFilterEntity.responseAdapter(bdProfessions)

      return res.json(professions);
    } catch (error) {
      const err = CustomError.internalServer(`${error}`);
      return CustomError.handleError(err, res);
    }
  };

  getFilters(request: Request) {
    const { id, names, last_names, profession_id } = request.query;

    return {
      profession_id: profession_id ? Number(profession_id) : undefined,
      last_names: last_names as string | undefined,
      names: names as string | undefined,
      id: id ? Number(id) : undefined,
    };
  }
}
