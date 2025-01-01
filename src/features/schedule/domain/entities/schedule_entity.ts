import { CustomError } from "../../../core/domain/custom.error";
import { UserEntity } from "../../../users/domain/entities/user_entity";
import { ScheduleSchema } from "../../presentation/schemas/schedule_schema";

export type WeekDay =
  | "LUNES"
  | "MARTES"
  | "MIERCOLES"
  | "JUEVES"
  | "VIERNES"
  | "SABADO"
  | "DOMINGO";

type Init = {
  id?: number | undefined;
  professional_id: number;
  week_day: WeekDay;
  date: Date;
  time_from: string;
  time_to: string;
  is_enabled: boolean;
  professional: UserEntity | undefined;
};

export class ScheduleEntity {
  public id?: number | undefined;
  public professional_id: number;
  public week_day: WeekDay;
  public date: Date;
  public time_from: string;
  public time_to: string;
  public is_enabled: boolean;
  public professional: UserEntity | undefined;

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

  static fromJson(object: Record<string, any>) {
    const { professional } = object;

    try {
      const scheme = ScheduleSchema.parse(object);
      return new ScheduleEntity({ ...scheme, professional: professional });
    } catch (error) {
      throw CustomError.badRequest(`parse error: ${error}`);
    }
  }

  static scheduleDTO(object: Record<string, any>, action: "insert" | "update") {
    const schedule = ScheduleEntity.fromJson(object);

    delete schedule.professional;
    if (action === "insert") {
      delete schedule.id;
    }

    if (action === "update" && !schedule.id) {
      throw CustomError.badRequest("Id es requerida para actualizar");
    }

    return schedule;
  }
}
