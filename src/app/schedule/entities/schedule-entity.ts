import { ProfessionalEntity } from "@/app/professional/entities/professional-entity";
import { type ScheduleModel, ScheduleSchema } from "../models/schedule";

import { CustomError } from "@/lib/custom-error";
import { Uid } from "@/lib/uid";
import { safeArray } from "@/lib/utils";

export class ScheduleEntity {
  static validate(item: any): ScheduleModel {
    try {
      const data = ScheduleEntity.mapper(item);
      return ScheduleSchema.parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(error, "schedule-entity.ts: (validate)")
      );
    }
  }

  static serverResponse(object: any): ScheduleModel[] {
    try {
      return safeArray<ScheduleModel>(object, {
        throwErrors: true,
        errorMessage: "Se esperaba un arreglo de schedules"
      }).map(ScheduleEntity.validate);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "schedule-entity.ts: (serverResponse)"
        )
      );
    }
  }

  static upsertDTO(object: any, action: "insert" | "update") {
    const schedule = ScheduleEntity.validate(object);
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
      id: item?.id ?? null,
      uid: item?.uid ?? Uid.createV4(),
      professional_id: item?.professional_id ?? 0,
      date: item?.date ?? new Date(),
      time_from: item?.time_from ?? "hh:mm",
      time_to: item?.time_to ?? "hh:mm",
      is_enabled: item?.is_enabled ?? false,
      professional: ProfessionalEntity.validate(item?.professional)
    };
  }
}
