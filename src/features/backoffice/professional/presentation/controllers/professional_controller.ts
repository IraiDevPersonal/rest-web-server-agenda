import { Controllers } from '@core/domain/controllers';
import { CustomError } from '@core/domain/custom.error';
import { GetProfessionalFilter } from '@professionals/domain/entities/get_professional_filter';
import { ProfessionalEntity } from '@professionals/domain/entities/professional_entity';
import { ProfessionalService } from '@professionals/presentation/services/professional_service';
import { Request, Response } from 'express';

export class ProfessionalController implements Controllers {
  public constructor(
    private readonly professionalService: ProfessionalService
  ) {}

  public getManyToFilter = async (request: Request, response: Response) => {
    try {
      const filters = this.getFilters(request);
      const professionals =
        await this.professionalService.getProfessionalToFilter(filters);

      const aps = professionals.map(GetProfessionalFilter.fromObject);

      return response.status(200).json(aps);
    } catch (error) {
      console.log('catch ', error);
      const e = CustomError.internalServer(`${error}`);
      return CustomError.handleError(e, response);
    }
  };

  getFilters(request: Request): Record<string, any> {
    const { profession_id } = request.query;

    return {
      profession_id: profession_id ? Number(profession_id) : undefined
    };
  }
}
