import { z } from "zod";

import { ProfessionalEntity } from "@/app/professional/entities/professional-entity";

import { CustomError } from "@/lib/custom-error";
import { WeekDaySchema } from "@/schemas/global";
import { safeArray } from "@/lib/utils";

export const ScheduleSchema = z.object({
  id: z.optional(z.number().positive("el valor del id debe ser un número positivo")),
  uid: z.optional(z.string().uuid("el uid debe ser un UUID válido")),
  professional_id: z.number(),
  date: z.date(),
  week_day: WeekDaySchema,
  time_from: z.string(),
  time_to: z.string(),
  is_enabled: z.boolean(),
  professional: z.optional(ProfessionalEntity.getSchema())
});

type ScheduleModel = z.infer<typeof ScheduleSchema>

export class ScheduleEntity {
  public id?: ScheduleModel["id"];
  public uid?: ScheduleModel["uid"];
  public professional_id: ScheduleModel["professional_id"];
  public week_day: ScheduleModel["week_day"];
  public date: ScheduleModel["date"];
  public time_from: ScheduleModel["time_from"];
  public time_to: ScheduleModel["time_to"];
  public is_enabled: ScheduleModel["is_enabled"];
  public professional: ScheduleModel["professional"];

  private constructor(init: ScheduleModel) {
    this.id = (init.id) ? Number(init.id) : undefined;
    this.uid = (init.uid) ? String(init.uid) : undefined;
    this.professional_id = Number(init.professional_id);
    this.week_day = init.week_day;
    this.date = new Date(init.date);
    this.time_from = init.time_from;
    this.time_to = init.time_to;
    this.is_enabled = init.is_enabled;
    this.professional = init.professional ? ProfessionalEntity.validate(init.professional) : undefined;
  }

  static getSchema() {
    return ScheduleSchema;
  }

  static responseAdapter(object: any): ScheduleModel[] {
    try {
      return safeArray<ScheduleModel>(object, {
        throwErrors: true,
        errorMessage: "schedule-entity.ts: (responseAdapter) Se esperaba un arreglo"
      }).map(ScheduleEntity.validate);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(
          error,
          "schedule-entity.ts: (responseAdapter) Error al adaptar la respuesta"));
    }
  }

  static validate(item: any): ScheduleModel {
    try {
      const data = ScheduleEntity.itemAdapter(item);
      return ScheduleEntity.getSchema().parse(data)
    } catch (error) {
      throw new Error(CustomError.getErrorMessage(error));
    }
  }

  static upsertDTO(object: Record<string, any>, action: "insert" | "update") {
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

  private static itemAdapter(item: any): ScheduleEntity {
    return new ScheduleEntity({
      id: item["id"],
      uid: item["uid"],
      professional_id: item["professional_id"],
      week_day: item["week_day"],
      date: item["date"],
      time_from: item["time_from"],
      time_to: item["time_to"],
      is_enabled: item["is_enabled"],
      professional: item["professional"],
    });
  }
}
