import {
  type ProfessionalAppointmentDetailModel,
  ProfessionalAppointmentDetailSchema
} from "../models/appointment-detail";

import { CustomError } from "@/lib/custom-error";
import { safeArray } from "@/lib/utils";

export class ProfessionalAppointmentDetailEntity {
  static validate(item: any): ProfessionalAppointmentDetailModel {
    try {
      const data = ProfessionalAppointmentDetailEntity.mapper(item);
      return ProfessionalAppointmentDetailSchema.parse(data);
    } catch (error) {
      throw new Error(
        CustomError.getErrorMessage(error, "profesional-entity.ts: (validate)")
      );
    }
  }

  private static mapper(item: any): ProfessionalAppointmentDetailModel {
    const user = item?.user;
    const professions = safeArray<any>(item?.professional_profession).map(
      (p, idx) => p?.professions?.name ?? `profession desconocida ${idx + 1}`
    );

    return {
      full_name: `${user?.names ?? "sin nombres"} ${user?.last_names ?? "sin apellidos"}`,
      professions: professions,
      pay_methods: ["fonasa", "particular (Efectivo, Transferencia)"],
      confirm_methods: ["whatsapp", "teléfono", "correo", "presencial"]
    };
  }
}
