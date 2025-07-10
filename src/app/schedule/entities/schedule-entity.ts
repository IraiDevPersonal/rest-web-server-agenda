import { ProfessionalEntity } from "@/app/professional/entities/professional-entity";
import { CustomError } from "@/lib/custom-error";
import { z } from "zod";

export const ScheduleSchema = z.object({
  id: z.optional(z.number()),
  uid: z.optional(z.string()),
  professional_id: z.number(),
  date: z.date(),
  week_day: z.enum([
    "LUNES",
    "MARTES",
    "MIERCOLES",
    "JUEVES",
    "VIERNES",
    "SABADO",
    "DOMINGO",
  ]),
  time_from: z.string(),
  time_to: z.string(),
  is_enabled: z.boolean(),
});

type Init = z.infer<typeof ScheduleSchema> & {
  professional: ProfessionalEntity | undefined;
};

export class ScheduleEntity {
  public id?: Init["id"];
  public uid?: Init["uid"];
  public professional_id: Init["professional_id"];
  public week_day: Init["week_day"];
  public date: Init["date"];
  public time_from: Init["time_from"];
  public time_to: Init["time_to"];
  public is_enabled: Init["is_enabled"];
  public professional: Init["professional"];

  private constructor(init: Init) {
    this.id = init.id;
    this.professional_id = init.professional_id;
    this.week_day = init.week_day;
    this.date = init.date;
    this.time_from = init.time_from;
    this.time_to = init.time_to;
    this.is_enabled = init.is_enabled;
    this.professional = init.professional;
  }

  static toResponse(
    object: any
  ): Omit<ScheduleEntity, "professional_id"> {
    return {
      uid: object["uid"],
      week_day: object["week_day"],
      date: object["date"],
      time_from: object["time_from"],
      time_to: object["time_to"],
      is_enabled: object["is_enabled"],
      professional: ProfessionalEntity.validate(object["professional"]),
    };
  }

  static validate(object: Record<string, any>) {
    const { professional, ...schedule } = object;

    try {
      const scheme = this.getSchema().parse(schedule);
      return new ScheduleEntity({ ...scheme, professional: professional });
    } catch (error) {
      throw new Error(CustomError.getErrorMessage(error));
    }
  }

  static scheduleDTO(object: Record<string, any>, action: "insert" | "update") {
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

  static getSchema() {
    return ScheduleSchema;
  }
}
