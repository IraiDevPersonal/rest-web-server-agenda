import { UserModel } from "../../../users/domain/entities/user_entity";

export type WeekDay =
  | "LUNES"
  | "MARTES"
  | "MIERCOLES"
  | "JUEVES"
  | "VIERNES"
  | "SABADO"
  | "DOMINGO";

export interface ScheduleModel {
  id: number;
  professional_id: number;
  week_day: WeekDay;
  time_from: string;
  time_to: string;
  is_enabled: boolean;
  professional: UserModel;
}
