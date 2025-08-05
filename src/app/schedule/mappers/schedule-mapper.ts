import { ProfessionalMapper } from "@/app/professional/mappers/professional-mapper";
import { type ScheduleModel, ScheduleSchema } from "../models/schedule";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";
import { BdSchedule } from "@/types/bd-model";

type BdScheduleWithProfessional = BdSchedule<{
  include: {
    professional: {
      include: {
        user: {
          include: {
            role: true;
          };
        };
        professional_profession: {
          select: {
            professions: {
              select: {
                id: true;
                name: true;
              };
            };
          };
        };
      };
    };
  };
}>;

export class ScheduleMapper {
  private static _mapper(item: BdScheduleWithProfessional): ScheduleModel {
    return {
      id: item.id,
      uid: item.uid,
      professional_id: item.professional_id,
      date: item.date,
      time_from: item.time_from,
      time_to: item.time_to,
      is_enabled: item.is_enabled,
      professional: ProfessionalMapper.validate(item.professional)
    };
  }

  static validate(item: BdScheduleWithProfessional): ScheduleModel {
    try {
      const data = ScheduleMapper._mapper(item);
      return ScheduleSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "schedule-mapper.ts: (validate)")
      );
    }
  }

  static response(object: BdScheduleWithProfessional[]): ScheduleModel[] {
    return safeArray(object, {
      errorMessage: "schedule-mapper (response): Se esperaba un arreglo de schedules"
    }).map(ScheduleMapper.validate);
  }
}
