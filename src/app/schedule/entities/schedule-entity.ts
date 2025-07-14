import { z } from "zod";

import { ProfessionalEntity } from "@/app/professional/entities/professional-entity";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";
import { Uid } from "@/lib/uid";

const ScheduleSchema = z.object({
  id: z.optional(
    z.number().positive("el valor del id debe ser un número positivo")
  ),
  uid: z.optional(z.string().uuid("el uid debe ser un UUID válido")),
  professional_id: z.number(),
  date: z.date(),
  time_from: z.string(),
  time_to: z.string(),
  is_enabled: z.boolean(),
  professional: z.optional(ProfessionalEntity.getSchema())
});

type ScheduleModel = z.infer<typeof ScheduleSchema>;

export class ScheduleEntity {
  public id: ScheduleModel["id"];
  public uid: ScheduleModel["uid"];
  public professional_id: ScheduleModel["professional_id"];
  public date: ScheduleModel["date"];
  public time_from: ScheduleModel["time_from"];
  public time_to: ScheduleModel["time_to"];
  public is_enabled: ScheduleModel["is_enabled"];
  public professional: ScheduleModel["professional"];

  private constructor(init: ScheduleModel) {
    this.id = init.id;
    this.uid = init.uid;
    this.professional_id = init.professional_id;
    this.date = init.date;
    this.time_from = init.time_from;
    this.time_to = init.time_to;
    this.is_enabled = init.is_enabled;
    this.professional = init.professional;
  }

  static getSchema() {
    return ScheduleSchema;
  }

  static validate(item: any): ScheduleModel {
    try {
      const data = ScheduleEntity.mapper(item);
      return ScheduleEntity.getSchema().parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(error, "schedule-entity.ts: (validate)")
      );
    }
  }

  static responseAdapter(object: any): ScheduleModel[] {
    try {
      return safeArray<ScheduleModel>(object, {
        throwErrors: true,
        errorMessage: "Se esperaba un arreglo de schedules"
      }).map(ScheduleEntity.validate);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "schedule-entity.ts: (responseAdapter)"
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
