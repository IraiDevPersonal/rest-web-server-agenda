import { ProfessionalMapper } from "@/app/professional/mappers/professional-mapper";
import { type ScheduleModel, ScheduleSchema } from "../models/schedule";

import { CustomError } from "@/lib/custom-error";
import { Uid } from "@/lib/uid";
import { safeArray } from "@/lib/utils";

export class ScheduleMapper {
  static validate(item: any): ScheduleModel {
    try {
      const data = ScheduleMapper.mapper(item);
      return ScheduleSchema.parse(data);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "schedule-mapper.ts: (validate)")
      );
    }
  }

  static response(object: any): ScheduleModel[] {
    try {
      return safeArray<ScheduleModel>(object, {
        throwErrors: true,
        errorMessage: "Se esperaba un arreglo de schedules"
      }).map(ScheduleMapper.validate);
    } catch (error) {
      throw CustomError.internalServer(
        CustomError.getErrorMessage(error, "schedule-mapper.ts: (response)")
      );
    }
  }

  static upsertDTO(object: any, action: "insert" | "update") {
    const schedule = ScheduleMapper.validate(object);
    delete schedule.professional;

    if (action === "insert") {
      delete schedule.id;
      delete schedule.uid;
    }

    if (action === "update" && !schedule.id) {
      throw CustomError.badRequest("Id es requerida para actualizar");
    }

    return schedule;
  }

  private static mapper(item: any): ScheduleModel {
    return {
      id: item?.id,
      uid: item?.uid ?? Uid.createV4(),
      professional_id: item?.professional_id ?? 0,
      date: item?.date ?? new Date(),
      time_from: item?.time_from ?? "hh:mm",
      time_to: item?.time_to ?? "hh:mm",
      is_enabled: item?.is_enabled ?? false,
      professional: item?.professional
        ? ProfessionalMapper.validate(item?.professional)
        : undefined
    };
  }
}
