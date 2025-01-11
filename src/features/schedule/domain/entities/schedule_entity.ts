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
  uid?: string | undefined;
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
  public uid?: string | undefined;
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

  static toResponse(
    object: Record<string, any>
  ): Omit<ScheduleEntity, "professional_id"> {
    return {
      uid: object["uid"],
      week_day: object["week_day"],
      date: object["date"],
      time_from: object["time_from"],
      time_to: object["time_to"],
      is_enabled: object["is_enabled"],
      professional: UserEntity.toResponse(object["professional"]) as UserEntity,
    };
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
      delete schedule.uid;
    }

    if (action === "update" && !schedule.id) {
      throw CustomError.badRequest("Id es requerida para actualizar");
    }

    return schedule;
  }
}
